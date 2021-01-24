import { put, select, takeEvery } from "redux-saga/effects";
import client from "@colab/client";

function* getConfig() {
    try {
        const { data } = yield client.getConfig();
        yield put({ type: "PUT_APP_CONFIG", payload: data });
    } catch (e) {}
}

function* logout() {
    const state = yield select();
    const form: any = document.createElement("FORM");
    const input: any = document.createElement("INPUT");
    input.name = "_token";
    input.value = state.auth.token;
    form.appendChild(input);
    form.method = "post";
    form.action = "/logout";
    document.body.appendChild(form);
    form.submit();
    yield "logged out";
}

export const tasks = [
    { effect: takeEvery, type: "LOGOUT", handler: logout },
    { effect: takeEvery, type: "GET_CONFIG", handler: getConfig },
];
