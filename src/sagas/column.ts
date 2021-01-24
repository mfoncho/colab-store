import { put, select, takeEvery } from "redux-saga/effects";
import Client from "@colab/client";
import { State } from "..";
import { ColumnSchema } from "../schemas";
import {
    ARCHIVE_COLUMN,
    COLUMNS_REORDERED,
    COLUMN_ARCHIVED,
    COLUMN_CREATED,
    COLUMN_DELETED,
    COLUMN_UNARCHIVED,
    COLUMN_UPDATED,
    CREATE_COLUMN,
    DELETE_COLUMN,
    FETCH_COLUMNS,
    LOAD_COLUMNS,
    MOVE_COLUMN,
    STORE_COLUMNS,
    STORE_RELATED,
    UNARCHIVE_COLUMN,
    UPDATE_COLUMN,
} from "../actions/types";
import {
    ArchiveColumnAction,
    columnArchived,
    ColumnCreateAction,
    columnCreated,
    columnDeleted,
    ColumnDeletedAction,
    columnsReordered,
    columnUnarchived,
    columnUpdated,
    ColumnUpdatedAction,
    CreateColumnAction,
    DeleteColumnAction,
    fetchColumns,
    FetchColumnsAction,
    LoadColumnsAction,
    MoveColumnAction,
    patchColumn,
    patchColumns,
    putColumn,
    putColumns,
    removeColumn,
    UnarchiveColumnAction,
    UpdateColumnAction,
    StoreColumnsAction,
} from "../actions/board";
import { storeRelated, StoreRelatedAction } from "../actions/app";

function* fetch({ payload, meta }: FetchColumnsAction) {
    try {
        const { data } = yield Client.board.fetchColumns(payload);
        meta.success(data);
    } catch (e) {
        meta.error(e.toString());
    }
}

function* load({ payload, meta }: LoadColumnsAction) {
    try {
        const task = yield put(fetchColumns(payload));

        const columns = yield task;

        let [normalized, related] = ColumnSchema.normalize(columns);

        yield put(storeRelated(related));

        if (Array.isArray(normalized)) {
            yield put(putColumns(normalized));
        }
        meta.success(columns);
    } catch (e) {
        meta.error(e);
    }
}

function* move({ payload, meta }: MoveColumnAction) {
    let patches = [] as { id: string; position: number }[];

    let { columns } = (yield select()) as State;

    const path = columns.paths.get(payload.column_id);

    if (path) {
        const ccolumns = columns.entities.get(path[0])!;
        const column = ccolumns.get(path[1])!;

        ccolumns
            .delete(column.id)
            .toList()
            .insert(payload.position, column)
            .forEach((ccol, index) => {
                if (ccol.position != index) {
                    patches.push({ id: ccol.id, position: index });
                }
            });

        yield put(columnsReordered(patches));

        try {
            const { data } = yield Client.board.moveColumn(payload);
            meta.success(data);
        } catch (e) {
            meta.error(e.toString());
        }
    }
}

function* patch({ payload }: ColumnUpdatedAction) {
    let [normalized, related] = ColumnSchema.normalize(payload);

    yield put(storeRelated(related));

    if (Array.isArray(normalized)) {
        yield put(patchColumns(normalized));
    } else {
        yield put(patchColumn(normalized));
    }
}

function* related({ payload }: StoreRelatedAction) {
    let columns = ColumnSchema.getCollection(payload);
    if (columns.length > 0) {
        yield put(putColumns(columns));
    }
}

function* store({ payload }: StoreColumnsAction) {
    let [normalized, related] = ColumnSchema.normalize(payload);

    yield put(storeRelated(related));

    if (Array.isArray(normalized)) {
        yield put(putColumns(normalized));
    } else {
        yield put(putColumn(normalized));
    }
}

function* created({ payload }: ColumnCreateAction) {
    let [normalized, related] = ColumnSchema.normalize(payload);

    yield put(storeRelated(related));

    if (Array.isArray(normalized)) {
        yield put(putColumns(normalized));
    } else {
        yield put(putColumn(normalized));
    }
}

function* archive({ payload, meta }: ArchiveColumnAction) {
    try {
        const { data } = yield Client.board.archiveColumn(payload);
        yield put(columnArchived(data));
        meta.success(data);
    } catch (e) {
        meta.error(e.toString());
    }
}

function* unarchive({ payload, meta }: UnarchiveColumnAction) {
    try {
        const { data } = yield Client.board.unarchiveColumn(payload);
        yield put(columnUnarchived(data));
        meta.success(data);
    } catch (e) {
        meta.error(e.toString());
    }
}

function* remove({ payload }: ColumnDeletedAction) {
    yield put(removeColumn(payload.id));
}

function* update({ payload, meta }: UpdateColumnAction) {
    try {
        const { data } = yield Client.board.updateColumn(payload);
        yield put(columnUpdated(data));
        meta.success(data);
    } catch (e) {
        meta.error(e.toString());
    }
}

function* trash({ payload, meta }: DeleteColumnAction) {
    try {
        const { data } = yield Client.board.deleteColumn(payload);
        meta.success(data);
        const params = {
            id: payload.column_id,
            channel_id: payload.channel_id,
        };
        yield put(columnDeleted(params));
    } catch (e) {
        meta.error(e.toString());
    }
}

function* create({ payload, meta }: CreateColumnAction) {
    try {
        const { data } = yield Client.board.createColumn(payload);
        yield put(columnCreated(data));
        meta.success(data);
    } catch (e) {
        meta.error(e.toString());
    }
}

export const tasks = [
    { effect: takeEvery, type: CREATE_COLUMN, handler: create },

    { effect: takeEvery, type: DELETE_COLUMN, handler: trash },

    { effect: takeEvery, type: UPDATE_COLUMN, handler: update },

    { effect: takeEvery, type: STORE_RELATED, handler: related },

    { effect: takeEvery, type: FETCH_COLUMNS, handler: fetch },

    { effect: takeEvery, type: LOAD_COLUMNS, handler: load },

    { effect: takeEvery, type: STORE_COLUMNS, handler: store },

    { effect: takeEvery, type: MOVE_COLUMN, handler: move },

    { effect: takeEvery, type: ARCHIVE_COLUMN, handler: archive },

    { effect: takeEvery, type: UNARCHIVE_COLUMN, handler: unarchive },

    { effect: takeEvery, type: COLUMN_CREATED, handler: created },

    { effect: takeEvery, type: COLUMN_DELETED, handler: remove },

    { effect: takeEvery, type: COLUMN_UPDATED, handler: patch },

    { effect: takeEvery, type: COLUMN_ARCHIVED, handler: patch },

    { effect: takeEvery, type: COLUMN_UNARCHIVED, handler: patch },

    { effect: takeEvery, type: COLUMNS_REORDERED, handler: patch },
];
