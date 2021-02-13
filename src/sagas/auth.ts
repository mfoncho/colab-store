import { put, takeEvery } from "redux-saga/effects";
import { dispatch, INIT, LOGIN, LOGOUT } from "..";
import client, { io, socket, Presence } from "@colab/client";
import { patchPresence, putUser, putPresence, removePresence } from "../actions/user";
import { setAuth, login, LoginAction, LogoutAction } from "../actions/app";

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

function* doLogin({ payload, meta }: LoginAction){
    try {
        const { data } = (yield client.login(payload)) as any;
        yield put(setAuth(data))
        yield put(putUser(data.user))
        meta.success(data)
    } catch (e) {
        meta.error(e);
    }
}

function* doLogout({ meta }: LogoutAction): Iterable<any> {
    try {
        const { data } = (yield client.logout()) as any;
        socket.shutdown();
        yield put(setAuth({id:"", token:"", timestamp:""}))
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

export const tasks = [
    { effect: takeEvery, type: INIT, handler: init},
    { effect: takeEvery, type: LOGIN, handler: doLogin},
    { effect: takeEvery, type: LOGOUT, handler: doLogout},
];
