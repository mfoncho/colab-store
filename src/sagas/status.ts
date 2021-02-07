import { put, takeEvery } from "redux-saga/effects";
import client from "@colab/client";
import { LOAD_STATUSES, INIT } from "../actions/types";
import {
    putStatuses,
    loadStatuses,
    LoadStatusesAction,
} from "../actions/status";

function* init(): Iterable<any> {
    yield put(loadStatuses());
}

function* load({ meta }: LoadStatusesAction): Iterable<any> {
    try {
        const { data } = (yield client.fetchStatuses()) as any;
        yield put(putStatuses(data));
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

export const tasks = [
    { effect: takeEvery, type: INIT, handler: init },
    { effect: takeEvery, type: LOAD_STATUSES, handler: load },
];
