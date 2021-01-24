import { put, takeEvery } from "redux-saga/effects";
import {
    CreateTaskAction,
    DeleteTaskAction,
    patchTask,
    putTask,
    removeTask,
    taskCreated,
    TaskCreatedAction,
    taskDeleted,
    TaskDeletedAction,
    taskUpdated,
    TaskUpdatedAction,
    UpdateTaskAction,
} from "../actions/board";
import {
    CREATE_TASK,
    DELETE_TASK,
    TASK_CREATED,
    TASK_DELETED,
    TASK_UPDATED,
    UPDATE_TASK,
} from "../actions/types";
import Client from "@colab/client";

function* create({ payload, meta }: CreateTaskAction): Iterable<any> {
    try {
        const { data } = (yield Client.createTask(payload)) as any;
        yield put(taskCreated(data));
        meta.success(data);
    } catch (e) {
        meta.error(e.toString());
    }
}

function* update({ payload, meta }: UpdateTaskAction): Iterable<any> {
    try {
        const { data } = (yield Client.updateTask(payload)) as any;
        yield put(taskUpdated(data));
        meta.success(data);
    } catch (e) {
        meta.error(e.toString());
    }
}

function* trash({ payload, meta }: DeleteTaskAction): Iterable<any> {
    try {
        const { data } = (yield Client.deleteTask(payload)) as any;
        yield put(taskDeleted({ ...payload, id: payload.task_id }));
        meta.success(data);
    } catch (e) {
        meta.error(e.toString());
    }
}

function* created({ payload }: TaskCreatedAction): Iterable<any> {
    yield put(putTask(payload));
}

function* patch({ payload }: TaskUpdatedAction): Iterable<any> {
    yield put(patchTask(payload));
}

function* remove({ payload }: TaskDeletedAction): Iterable<any> {
    yield put(removeTask(payload));
}

export const tasks = [
    { effect: takeEvery, type: CREATE_TASK, handler: create },
    { effect: takeEvery, type: UPDATE_TASK, handler: update },
    { effect: takeEvery, type: DELETE_TASK, handler: trash },
    { effect: takeEvery, type: TASK_CREATED, handler: created },
    { effect: takeEvery, type: TASK_DELETED, handler: remove },
    { effect: takeEvery, type: TASK_UPDATED, handler: patch },
];
