import { put, takeEvery, select } from "redux-saga/effects";
import { INIT } from "../actions/types";
import { socket } from "@colab/client";
import { State } from "..";

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
    let { config, auth } = ((yield select()) as any) as State;
    socket.connect(config.socket_api_endpoint, {
        token:  auth.token,
        version: config.socket_api_version,
    });
}

export const tasks = [
    { effect: takeEvery, type: INIT, handler: auth },

    { effect: takeEvery, type: INIT, handler: role },

    { effect: takeEvery, type: INIT, handler: workspaces },

    { effect: takeEvery, type: INIT, handler: wsconn },

    { effect: takeEvery, type: INIT, handler: channels },

    { effect: takeEvery, type: INIT, handler: threads },
];
