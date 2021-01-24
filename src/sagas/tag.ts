import { put, takeEvery } from "redux-saga/effects";
import {
    CREATE_TAG,
    TAG_CREATED,
    DELETE_TAG,
    TAG_DELETED,
} from "../actions/types";
import {
    CreateTagAction,
    TagCreatedAction,
    DeleteTagAction,
    TagDeletedAction,
    tagCreated,
    tagDeleted,
    putTag,
    removeTag,
} from "../actions/channel";

import Client from "@colab/client";

function* create({ payload, meta }: CreateTagAction): Iterable<any> {
    try {
        const { data } = (yield Client.createTag(payload)) as any;
        yield put(tagCreated(data));
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

function* destroy({ payload, meta }: DeleteTagAction): Iterable<any> {
    try {
        const { data } = (yield Client.deleteTag(payload)) as any;
        const param = {
            id: payload.tag_id,
            channel_id: payload.channel_id,
        };
        yield put(tagDeleted(param));
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

function* created({ payload }: TagCreatedAction): Iterable<any> {
    yield put(putTag(payload));
}

function* deleted({ payload }: TagDeletedAction): Iterable<any> {
    yield put(removeTag(payload));
}

export const tasks = [
    { effect: takeEvery, type: CREATE_TAG, handler: create },
    { effect: takeEvery, type: DELETE_TAG, handler: destroy },
    { effect: takeEvery, type: TAG_CREATED, handler: created },
    { effect: takeEvery, type: TAG_DELETED, handler: deleted },
];
