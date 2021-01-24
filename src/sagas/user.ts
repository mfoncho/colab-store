import { put, takeEvery } from "redux-saga/effects";
import { dispatch } from "..";
import {
    PUT_USERS,
    STORE_RELATED,
    SET_USER_STATUS,
    SET_USER_PRESENCE,
    UPDATE_USER_PROFILE,
    UPDATE_PREFERENCES,
} from "../actions/types";
import {
    putUser,
    patchUser,
    putUsers,
    patchPreferences,
    patchPresence,
    SetUserStatusAction,
    SetUserPresenceAction,
    UpdateUserProfileAction,
    UpdatePreferencesAction,
} from "../actions/user";
import client, { socket, io } from "@colab/client";
import { UserSchema } from "../schemas";

function* init() {
    try {
        const { data } = yield client.getAuth();
        yield put(putUser(data));
        yield put({ type: "SET_AUTH_ID", payload: data.id });
    } catch (e) {}
}

function* getPreferences() {
    try {
        const { data } = yield client.getPreferences();
        yield put(patchPreferences(data));
    } catch (e) {}
}

function* preferences({ payload, meta }: UpdatePreferencesAction) {
    try {
        const { data } = yield client.updatePreferences(payload);
        yield put(patchPreferences(data));
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

function* presence({ payload, meta }: SetUserPresenceAction) {
    try {
        const { data } = yield client.setUserPresence(payload);
        yield put(
            patchPresence({ user_id: payload.user_id, state: payload.presence })
        );
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

function* update({ payload, meta }: UpdateUserProfileAction) {
    try {
        const { data } = yield client.updateUserProfile(payload);
        yield put(patchUser(data));
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

function* store({ payload }: any) {
    if (Array.isArray(payload)) {
        yield put({ type: "PUT_USERS", payload });
    } else {
        yield put({ type: "PUT_USER", payload });
    }
}

function* status({ payload, meta }: SetUserStatusAction) {
    try {
        const { data } = yield client.setUserStatus(payload);
        yield put(patchUser(data));
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

function* patch({ type, payload }: any) {
    yield put({ type: "PATCH_USER", payload: payload });
}

function* get(action: any) {
    try {
    } catch (e) {}
}

function* related({ payload }: any) {
    let users = Object.values(payload[UserSchema.collect] || {}) as io.User[];
    if (users.length > 0) {
        yield put(putUsers(users));
    }
}

function* subscribe({ payload }: any) {
    const topic = `user:${payload}`;
    const sub = (socket as any).channels.find((ch: any) => ch.topic == topic);
    if (!Boolean(sub)) {
        let ch = socket.channel(topic, {});
        ch.on("updated", (payload: io.User) => {
            dispatch(patchUser(payload));
        });

        ch.join()
            .receive("ok", () => {})
            .receive("error", () => {});
    }
}

export const tasks = [
    { effect: takeEvery, type: "PLUME_INIT", handler: getPreferences },
    { effect: takeEvery, type: "PLUME_INIT", handler: init },
    { effect: takeEvery, type: STORE_RELATED, handler: related },
    { effect: takeEvery, type: SET_USER_STATUS, handler: status },
    { effect: takeEvery, type: SET_USER_PRESENCE, handler: presence },
    { effect: takeEvery, type: UPDATE_USER_PROFILE, handler: update },
    { effect: takeEvery, type: UPDATE_PREFERENCES, handler: preferences },
    { effect: takeEvery, type: "SET_AUTH_ID", handler: subscribe },
    { effect: takeEvery, type: "GET_USER", handler: get },
    { effect: takeEvery, type: "STORE_USER", handler: store },
    { effect: takeEvery, type: "STORE_USERS", handler: store },
    { effect: takeEvery, type: "USER_UPDATED", handler: patch },
];
