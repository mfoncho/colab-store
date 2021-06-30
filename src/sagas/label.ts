import { put, takeEvery } from "redux-saga/effects";
import {
    CREATE_LABEL,
    LABEL_CREATED,
    DELETE_LABEL,
    LABEL_DELETED,
} from "../actions/types";
import {
    CreateLabelAction,
    LabelCreatedAction,
    DeleteLabelAction,
    LabelDeletedAction,
    labelCreated,
    labelDeleted,
    putLabel,
    removeLabel,
} from "../actions/board";

import Client from "@colab/client";

function* create({ payload, meta }: CreateLabelAction): Iterable<any> {
    try {
        const { data } = (yield Client.createLabel(payload)) as any;
        yield put(labelCreated(data));
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

function* destroy({ payload, meta }: DeleteLabelAction): Iterable<any> {
    try {
        const { data } = (yield Client.deleteLabel(payload)) as any;
        const param = {
            id: payload.label_id,
            board_id: payload.board_id,
        };
        yield put(labelDeleted(param as any));
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

function* created({ payload }: LabelCreatedAction): Iterable<any> {
    yield put(putLabel(payload));
}

function* deleted({ payload }: LabelDeletedAction): Iterable<any> {
    yield put(removeLabel(payload as any));
}

export const tasks = [
    { effect: takeEvery, type: CREATE_LABEL, handler: create },
    { effect: takeEvery, type: DELETE_LABEL, handler: destroy },
    { effect: takeEvery, type: LABEL_CREATED, handler: created },
    { effect: takeEvery, type: LABEL_DELETED, handler: deleted },
];
