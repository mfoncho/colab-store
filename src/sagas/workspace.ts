import { put, takeEvery, takeLatest, select } from "redux-saga/effects";
import { State } from "..";
import client from "@colab/client";
import { patchWorkspace, putWorkspaces,WorkspaceUpdatedAction,  JoinedWorkspaceAction, LeftWorkspaceAction, removeWorkspace, LoadWorkspaceAction, LoadWorkspacesAction, putWorkspace } from "../actions/workspace";
import { CREATE_WORKSPACE, INIT, JOINED_WORKSPACE, LEFT_WORKSPACE, LOAD_WORKSPACE, LOAD_WORKSPACES, WORKSPACE_PERMISSIONS_UPDATED, WORKSPACE_UPDATED } from "../actions/types";
import { loadChannels } from "../actions/channel";
import { CreateWorkspaceAction } from "../actions/workspace";

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

function * create({ payload, meta }: CreateWorkspaceAction): Iterable<any>{
    try {
        const { data } = (yield client.createWorkspace(payload)) as any;
        yield put(putWorkspace(payload));
        yield put(loadChannels({workspace_id: data.id}));
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

function *init():Iterable<any> {
    try {
        const { data } = (yield client.fetchWorkspaces()) as any;
        yield put(putWorkspaces(data));
    } catch (e) {}
}

function *load({meta, payload}: LoadWorkspaceAction): Iterable<any> {
    try {
        const { data } = (yield client.getWorkspace(payload)) as any;
        yield put(putWorkspace(data));
        meta.success(data);

    }catch(e){
        meta.error(e);
    }
}

function *loads({meta}: LoadWorkspacesAction): Iterable<any> {
    try {
        const { data } = (yield client.fetchWorkspaces()) as any;
        yield put(putWorkspaces(data));
        meta.success(data);

    }catch(e){
        meta.error(e);
    }
}

function* patch({ payload }: WorkspaceUpdatedAction): Iterable<any> {
    yield put(patchWorkspace(payload));
}

function* joined({ payload }: JoinedWorkspaceAction): Iterable<any> {
    yield put(putWorkspace(payload));
    yield put(loadChannels({workspace_id: payload.id}));
}

function* left({ payload }: LeftWorkspaceAction): Iterable<any> {
    yield put(removeWorkspace(payload));
}


export const tasks = [
    { effect: takeEvery, type: INIT, handler:  init},

    { effect: takeEvery, type: LOAD_WORKSPACE, handler: load },

    { effect: takeEvery, type: LOAD_WORKSPACES, handler: loads},

    { effect: takeEvery, type: LEFT_WORKSPACE, handler: left },

    { effect: takeEvery, type: CREATE_WORKSPACE, handler: create },

    { effect: takeEvery, type: JOINED_WORKSPACE, handler: joined },

    { effect: takeEvery, type: WORKSPACE_UPDATED, handler: patch },

    {
        effect: takeEvery,
        type: WORKSPACE_PERMISSIONS_UPDATED,
        handler: patch,
    },
];
