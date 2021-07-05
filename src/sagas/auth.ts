import { put, takeEvery } from "redux-saga/effects";
import { dispatch, INIT, LOGIN, LOGOUT, AUTH, LOAD_AUTH } from "..";
import client, { io, socket, Presence, Response } from "@colab/client";
import {
    patchPresence,
    putUser,
    putPresence,
    removePresence,
} from "../actions/user";
import { setAuth, authenticate, login, LoginAction, LogoutAction, AuthAction, LoadAuthAction } from "../actions/app";
import { IOAction } from "../actions";

function* init(): Iterable<any> {
    const topic = `colab`;
    let ch = socket.channel(topic, {});
    const presence = new Presence(ch);
    presence.onSync(() => {
        //console.log("online", presence.list());
    });

    presence.onJoin((id, current: io.PresenceSync, pres: io.PresenceSync) => {
        if (current && id) {
            const presence = { ...pres.metas[pres.metas.length - 1] };
            dispatch(patchPresence({ user_id: id, ...presence }));
        } else if (id) {
            const presence = pres.metas[0];
            dispatch(putPresence({ user_id: id, ...presence }));
        }
    });

    presence.onLeave((id, current) => {
        if (id && current.metas.length == 0) {
            dispatch(removePresence({ user_id: id }));
        }
    });

    ch.join()
        .receive("ok", () => {})
        .receive("error", () => {});
}

function * auth({ payload }: AuthAction) : Iterable<any> {
    if("user" in payload && "token" in payload && "roles" in payload){
        let data = payload as any as io.Auth
        if(!Array.isArray(data.roles) || data.roles.length < 1) return false;
        if(typeof data.user !== "object") return false;
        if(typeof data.token !== "string") return false;
        if(typeof data.token === "string" && data.token.length === 0) return false;

        yield put(setAuth( data));
        yield put(putUser( data.user));
        return true;
    }
    return false;
}

function * loadAuth({ meta} : LoadAuthAction ): Iterable<any>{
    try {
        const { data } = (yield client.getAuth()) as any;
        yield put(authenticate(data));
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

function* doLogin({ payload, meta }: LoginAction): Iterable<any> {
    try {
        const { data } = (yield client.login(payload)) as any;
        yield put(authenticate(data));
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

function* doLogout({ meta }: LogoutAction): Iterable<any> {
    try {
        const { data } = (yield client.logout()) as any;
        socket.shutdown();
        yield put(setAuth({ id: "", token: "", timestamp: "" }));
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

export const tasks = [
    { effect: takeEvery, type: INIT, handler: init },
    { effect: takeEvery, type: AUTH, handler: auth },
    { effect: takeEvery, type: LOGIN, handler: doLogin },
    { effect: takeEvery, type: LOGOUT, handler: doLogout },
    { effect: takeEvery, type: LOAD_AUTH, handler: loadAuth},
];
