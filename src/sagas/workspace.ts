import { put, takeEvery } from "redux-saga/effects";
import client from "@colab/client";
import {
    patchWorkspace,
    WorkspaceUpdatedAction,
    LoadWorkspaceAction,
    putWorkspace,
} from "../actions/workspace";
import { INIT, LOAD_WORKSPACE, WORKSPACE_UPDATED } from "../actions/types";

function* init(): Iterable<any> {
    try {
        const { data } = (yield client.getWorkspace()) as any;
        yield put(putWorkspace(data));
    } catch (e) {}
}

function* load({ meta }: LoadWorkspaceAction): Iterable<any> {
    try {
        const { data } = (yield client.getWorkspace()) as any;
        yield put(putWorkspace(data));
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

function* patch({ payload }: WorkspaceUpdatedAction): Iterable<any> {
    yield put(patchWorkspace(payload));
}

export const tasks = [
    { effect: takeEvery, type: INIT, handler: init },

    { effect: takeEvery, type: LOAD_WORKSPACE, handler: load },

    { effect: takeEvery, type: WORKSPACE_UPDATED, handler: patch },
];
