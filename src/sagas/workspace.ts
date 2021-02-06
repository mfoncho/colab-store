import { put, takeEvery, takeLatest, select } from "redux-saga/effects";
import { State } from "..";
import client from "@colab/client";
import { putWorkspace } from "../actions/workspace";

function* get(action: any): Iterable<any> {
    const { payload } = action;

    try {
        const { data, status } = (yield client.getWorkspace(payload)) as any;
        if (status === 200) {
            yield put({
                type: "INIT_WORKSPACE",
                payload: data,
                params: payload,
            });
        }
    } catch (e) {
        yield put({ type: "GET_WORKSPACE_FAILURE", payload });
    }
}

function* init(): Iterable<any> {
    console.log("init");
    yield put(putWorkspace({ is_root: true, name: "" } as any));
}

function* fetch(): Iterable<any> {
    try {
        const { data } = (yield client.fetchWorkspaces()) as any;

        for (let workspace of data) {
            yield put({ type: "INIT_WORKSPACE", payload: workspace });
        }
    } catch (e) {}
}

function* patch({ payload }: any): Iterable<any> {
    yield put({ type: "PATCH_WORKSPACE", payload });
}

function* memberUpdated({ payload }: any): Iterable<any> {
    const { auth } = ((yield select()) as any) as State;

    if (payload.user.id === auth.id) {
        const workspace = { id: payload.workspace_id, role: payload.role };
        yield put({ type: "PATCH_WORKSPACE", payload: workspace });
    }
}

function* destroy({ payload }: any): Iterable<any> {
    const state = ((yield select()) as any) as State;

    const channels = Object.values(state.channels).filter(
        (channel) => channel.workspace_id === payload.id
    );

    for (let channel of channels) {
        yield put({ type: "LEFT_CHANNEL", payload: channel });
    }

    if (state.route.params.get("workspace_id") === payload.id) {
        yield put({ type: "OPEN_WORKSPACE", payload: "1" });
    }

    yield put({ type: "REMOVE_WORKSPACE", payload: payload.id });
}

function* initialize({ payload }: any): Iterable<any> {
    yield put({ type: "STORE_WORKSPACE", payload });
}

function* serialize({ payload: { ...workspace } }: any): Iterable<any> {
    yield put({ type: "PUT_WORKSPACE", payload: workspace });
}

function* joined({ payload }: any): Iterable<any> {
    yield put({ type: "INIT_WORKSPACE", payload });
}

function* left({ payload }: any): Iterable<any> {
    yield put({ type: "DESTROY_WORKSPACE", payload: payload });
}

function* workspaceMemberUpdated({ payload }: any): Iterable<any> {
    const state = ((yield select()) as any) as State;
    const workspace = state.workspaces.get(payload.workspace_id);
    if (state.auth.id === payload.user_id && workspace) {
        const role = payload.role ? payload.role : workspace.role;
        yield put({
            type: "PATCH_WORKSPACE",
            payload: { ...workspace, role },
        });
    }
}

export const tasks = [
    { effect: takeEvery, type: "@@INIT", handler: init },

    { effect: takeEvery, type: "INIT_WORKSPACE", handler: initialize },

    { effect: takeEvery, type: "STORE_WORKSPACE", handler: serialize },

    { effect: takeEvery, type: "GET_WORKSPACE", handler: get },

    { effect: takeEvery, type: "LEFT_WORKSPACE", handler: left },

    { effect: takeEvery, type: "JOINED_WORKSPACE", handler: joined },

    { effect: takeEvery, type: "WORKSPACE_UPDATED", handler: patch },

    { effect: takeEvery, type: "DESTROY_WORKSPACE", handler: destroy },

    { effect: takeLatest, type: "FETCH_WORKSPACES", handler: fetch },

    { effect: takeEvery, type: "WORKSPACE_ROLE_UPDATED", handler: patch },

    {
        effect: takeEvery,
        type: "WORKSPACE_MEMBER_UPDATED",
        handler: workspaceMemberUpdated,
    },
];
