import { put, takeEvery } from "redux-saga/effects";
import { socket } from "@colab/client";

function* auth() {
    yield put({ type: "GET_CONFIG" });
}

function* workspaces() {
    yield put({ type: "FETCH_WORKSPACES" });
}

function* channels() {
    yield put({ type: "FETCH_CHANNELS" });
}

function* role() {
    yield put({ type: "FETCH_ROLE" });
}

function* threads() {
    yield put({ type: "FETCH_THREADS" });
}

function* wsconn() {
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
