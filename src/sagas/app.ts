import { put, takeEvery, select } from "redux-saga/effects";
import client from "@colab/client";
import { socket } from '@colab/client'
import { INIT, LOAD_CONFIG, LOAD_SITE, LOGOUT, STORE_INIT } from "../actions/types";
import { LoadConfigAction, LoadSiteAction, setAuth, setConfig, setSite, StoreIntAction } from "../actions/app";
import { State } from "..";

function* init(){
    let { config, auth } = ((yield select()) as any) as State;
    socket.connect(config.socket_api_endpoint, {
        token:  auth.token,
    });
}

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
    socket.shutdown();
    yield put(setAuth({id:"", token:"", timestamp:""}))
}

export const tasks = [
    { effect: takeEvery, type: INIT, handler: init},
    { effect: takeEvery, type: LOGOUT, handler: logout },
    { effect: takeEvery, type: STORE_INIT, handler: loadSite },
    { effect: takeEvery, type: STORE_INIT, handler: loadConfig },
    { effect: takeEvery, type: LOAD_SITE, handler: loadSite },
    { effect: takeEvery, type: LOAD_CONFIG, handler: loadConfig },
];
