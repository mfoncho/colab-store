import { put, takeEvery } from "redux-saga/effects";
import { ChecklistSchema } from "../schemas";
import {
    REMOVE_CHECKLIST,
    STORE_RELATED,
    CHECKLIST_DELETED,
    CHECKLIST_CREATED,
    CHECKLIST_UPDATED,
    DELETE_CHECKLIST,
    UPDATE_CHECKLIST,
    CREATE_CHECKLIST,
} from "../actions/types";
import { storeRelated, StoreRelatedAction } from "../actions/app";
import {
    removeChecklist,
    checklistCreated,
    checklistDeleted,
    checklistUpdated,
    CreateChecklistAction,
    DeleteChecklistAction,
    patchChecklist,
    patchChecklists,
    putChecklist,
    putChecklists,
    UpdateChecklistAction,
    ChecklistCreatedAction,
    ChecklistUpdatedAction,
    ChecklistDeletedAction,
} from "../actions/board";
import Client from "@colab/client";

function* create({ payload, meta }: CreateChecklistAction): Iterable<any> {
    try {
        const { data } = (yield Client.createChecklist(payload)) as any;
        yield put(checklistCreated(data));
        meta.success(data);
    } catch (e) {
        meta.error(e.toString());
    }
}

function* update({ payload, meta }: UpdateChecklistAction): Iterable<any> {
    try {
        const { data } = (yield Client.updateChecklist(payload)) as any;
        yield put(checklistUpdated(data));
        meta.success(data);
    } catch (e) {
        meta.error(e.toString());
    }
}

function* trash({ payload, meta }: DeleteChecklistAction): Iterable<any> {
    try {
        const { data } = (yield Client.deleteChecklist(payload)) as any;
        meta.success(data);
        yield put(checklistDeleted({ ...payload, id: payload.checklist_id }));
    } catch (e) {
        meta.error(e.toString());
    }
}

function* created({ payload }: ChecklistCreatedAction): Iterable<any> {
    let [checklists, related] = ChecklistSchema.normalize(payload);

    yield put(storeRelated(related));
    if (Array.isArray(checklists)) {
        yield put(putChecklists(checklists));
    } else {
        yield put(putChecklist(checklists));
    }
}

function* patch({ payload }: ChecklistUpdatedAction): Iterable<any> {
    let [checklist, related] = ChecklistSchema.normalize(payload);
    yield put(storeRelated(related));
    if (Array.isArray(checklist)) {
        yield put(patchChecklists(checklist));
    } else {
        yield put(patchChecklist(checklist));
    }
}

function* remove({ payload }: ChecklistDeletedAction): Iterable<any> {
    yield put(removeChecklist(payload));
}

function* related({ payload }: StoreRelatedAction): Iterable<any> {
    let checklists = ChecklistSchema.getCollection(payload) as any;

    if (checklists.length > 0) {
        yield put(putChecklists(checklists));
    }
}

export const tasks = [
    { effect: takeEvery, type: STORE_RELATED, handler: related },
    { effect: takeEvery, type: DELETE_CHECKLIST, handler: trash },
    { effect: takeEvery, type: CREATE_CHECKLIST, handler: create },
    { effect: takeEvery, type: UPDATE_CHECKLIST, handler: update },
    { effect: takeEvery, type: CHECKLIST_UPDATED, handler: patch },
    { effect: takeEvery, type: CHECKLIST_DELETED, handler: remove },
    { effect: takeEvery, type: CHECKLIST_CREATED, handler: created },
];
