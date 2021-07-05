import { put, takeEvery } from "redux-saga/effects";
import client from "@colab/client";
import { LOAD_WORKSPACE } from "../actions/types";
import { LoadWorkspaceAction, putWorkspace } from "../actions/workspace";

function* load({ meta }: LoadWorkspaceAction): Iterable<any> {
    try {
        const { data } = (yield client.getWorkspace()) as any;
        yield put(putWorkspace(data));
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

export const tasks = [
    { effect: takeEvery, type: LOAD_WORKSPACE, handler: load },
];
