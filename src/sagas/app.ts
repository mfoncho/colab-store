import { put, takeEvery } from "redux-saga/effects";
import client from "@colab/client";
import { LOAD_CONFIG, LOAD_SITE, LOGOUT, STORE_INIT } from "../actions/types";
import { LoadConfigAction, LoadSiteAction, setConfig, setSite, StoreIntAction } from "../actions/app";

function* loadConfig(payload: LoadConfigAction): Iterable<any> {
    try {
        const { data } = (yield client.getConfig()) as any;
        yield put(setConfig(data));

        if(payload.meta){
            payload.meta.success(data);
        }

    } catch (e) {
        if(payload.meta){
            payload.meta.error(e);
        }
    }
}

function* loadSite(payload: LoadSiteAction): Iterable<any> {
    try {
        const { data } = (yield client.getSite()) as any;
        yield put(setSite(data));

        if(payload.meta){
            payload.meta.success(data);
        }

    } catch (e) {
        if(payload.meta){
            payload.meta.error(e);
        }
    }
}

function* logout(): Iterable<any> {
    const form: any = document.createElement("FORM");
    form.method = "post";
    form.action = "/logout";
    document.body.appendChild(form);
    form.submit();
    yield "logged out";
}

export const tasks = [
    { effect: takeEvery, type: LOGOUT, handler: logout },
    { effect: takeEvery, type: STORE_INIT, handler: loadConfig },
    { effect: takeEvery, type: STORE_INIT, handler: loadSite },
    { effect: takeEvery, type: LOAD_SITE, handler: loadSite },
    { effect: takeEvery, type: LOAD_CONFIG, handler: loadSite },
];
