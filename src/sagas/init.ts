import { put, takeEvery } from "redux-saga/effects";
import { socket } from "@colab/client";

function* auth(): Iterable<any> {
    yield put({ type: "GET_CONFIG" });
}

function* workspaces(): Iterable<any> {
    yield put({ type: "FETCH_WORKSPACES" });
}

function* channels(): Iterable<any> {
    yield put({ type: "FETCH_CHANNELS" });
}

function* role(): Iterable<any> {
    yield put({ type: "FETCH_ROLE" });
}

function* threads(): Iterable<any> {
    yield put({ type: "FETCH_THREADS" });
}

function* wsconn(): Iterable<any> {
    socket.connect();
}

export const tasks = [
    { effect: takeEvery, type: "PLUME_INIT", handler: auth },

    { effect: takeEvery, type: "PLUME_INIT", handler: role },

    { effect: takeEvery, type: "PLUME_INIT", handler: workspaces },

    { effect: takeEvery, type: "PLUME_INIT", handler: wsconn },

    { effect: takeEvery, type: "PLUME_INIT", handler: channels },

    { effect: takeEvery, type: "PLUME_INIT", handler: threads },
];
