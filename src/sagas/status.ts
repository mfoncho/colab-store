import { put, takeEvery } from "redux-saga/effects";
import client from "@colab/client";
import { LOAD_STATUSES } from "../actions/types";
import {
    putStatuses,
    loadStatuses,
    LoadStatusesAction,
} from "../actions/status";

function* init() {
    yield put(loadStatuses());
}

function* load({ meta }: LoadStatusesAction) {
    try {
        const { data } = yield client.fetchStatuses();
        yield put(putStatuses(data));
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

export const tasks = [
    { effect: takeEvery, type: "PLUME_INIT", handler: init },
    { effect: takeEvery, type: LOAD_STATUSES, handler: load },
];
