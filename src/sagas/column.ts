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

function* fetch({ payload, meta }: FetchColumnsAction): Iterable<any> {
    try {
        const { data } = (yield Client.fetchColumns(payload)) as any;
        meta.success(data);
    } catch (e) {
        meta.error(e.toString());
    }
}

function* load({ payload, meta }: LoadColumnsAction): Iterable<any> {
    try {
        const task = yield put(fetchColumns(payload));

        const columns = (yield task) as any;

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

function* move({ payload, meta }: MoveColumnAction): Iterable<any> {
    let patches = [] as { id: string; position: number }[];

    let { columns } = ((yield select()) as any) as State;

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
            const { data } = (yield Client.moveColumn(payload)) as any;
            meta.success(data);
        } catch (e) {
            meta.error(e.toString());
        }
    }
}

function* patch({ payload }: ColumnUpdatedAction): Iterable<any> {
    let [normalized, related] = ColumnSchema.normalize(payload);

    yield put(storeRelated(related));

    if (Array.isArray(normalized)) {
        yield put(patchColumns(normalized));
    } else {
        yield put(patchColumn(normalized));
    }
}

function* related({ payload }: StoreRelatedAction): Iterable<any> {
    let columns = ColumnSchema.getCollection(payload);
    if (columns.length > 0) {
        yield put(putColumns(columns));
    }
}

function* store({ payload }: StoreColumnsAction): Iterable<any> {
    let [normalized, related] = ColumnSchema.normalize(payload);

    yield put(storeRelated(related));

    if (Array.isArray(normalized)) {
        yield put(putColumns(normalized));
    } else {
        yield put(putColumn(normalized));
    }
}

function* created({ payload }: ColumnCreateAction): Iterable<any> {
    let [normalized, related] = ColumnSchema.normalize(payload);

    yield put(storeRelated(related));

    if (Array.isArray(normalized)) {
        yield put(putColumns(normalized));
    } else {
        yield put(putColumn(normalized));
    }
}

function* archive({ payload, meta }: ArchiveColumnAction): Iterable<any> {
    try {
        const { data } = (yield Client.archiveColumn(payload)) as any;
        yield put(columnArchived(data));
        meta.success(data);
    } catch (e) {
        meta.error(e.toString());
    }
}

function* unarchive({ payload, meta }: UnarchiveColumnAction): Iterable<any> {
    try {
        const { data } = (yield Client.unarchiveColumn(payload)) as any;
        yield put(columnUnarchived(data));
        meta.success(data);
    } catch (e) {
        meta.error(e.toString());
    }
}

function* remove({ payload }: ColumnDeletedAction): Iterable<any> {
    yield put(removeColumn(payload.id));
}

function* update({ payload, meta }: UpdateColumnAction): Iterable<any> {
    try {
        const { data } = (yield Client.updateColumn(payload)) as any;
        yield put(columnUpdated(data));
        meta.success(data);
    } catch (e) {
        meta.error(e.toString());
    }
}

function* trash({ payload, meta }: DeleteColumnAction): Iterable<any> {
    try {
        const { data } = (yield Client.deleteColumn(payload)) as any;
        meta.success(data);
        const params = {
            id: payload.column_id,
            board_id: payload.board_id,
        };
        yield put(columnDeleted(params));
    } catch (e) {
        meta.error(e.toString());
    }
}

function* create({ payload, meta }: CreateColumnAction): Iterable<any> {
    try {
        const { data } = (yield Client.createColumn(payload)) as any;
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
