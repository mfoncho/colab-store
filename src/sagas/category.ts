import { put, select, takeEvery } from "redux-saga/effects";
import { PATCH_WORKSPACE } from "../actions/types";

function* deleted({ payload }: any) {
    const { workspaces } = yield select();

    const workspace = workspaces[payload.workspace_id];

    if (workspace) {
        let categories = workspace.categories.filter(
            (cat: any) => cat.id !== payload.id
        );

        yield put({
            type: "PATCH_WORKSPACE",
            payload: { ...workspace, categories },
        });
    }
}

function* created({ payload }: any) {
    const { workspaces } = yield select();

    const workspace = workspaces[payload.workspace_id];

    if (workspace) {
        let category = workspace.categories.find(
            (cat: any) => cat.id === payload.id
        );

        if (!Boolean(category)) {
            const categories = workspace.categories.concat(payload);
            yield put({
                type: "PATCH_WORKSPACE",
                payload: { ...workspace, categories },
            });
        }
    }
}

function* updated({ payload }: any) {
    yield put({ type: PATCH_WORKSPACE, payload: payload });
}

export const tasks = [
    { effect: takeEvery, type: "CATEGORY_CREATED", handler: created },
    { effect: takeEvery, type: "CATEGORY_UPDATED", handler: updated },
    { effect: takeEvery, type: "CATEGORY_DELETED", handler: deleted },
];
