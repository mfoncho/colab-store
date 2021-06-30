import { io } from "@colab/client";
import {
    PUT_WORKSPACE,
    PATCH_WORKSPACE,
    WORKSPACE_UPDATED,
    LOAD_WORKSPACE,
} from "./types";

import { IOAction, createAction, createIOAction, Action } from "./index";

export type WorkspaceUpdatedAction = 
    Action<WORKSPACE_UPDATED, io.Workspace>;

export type PutWorkspaceAction = 
    Action<PUT_WORKSPACE, io.Workspace>;

export type PatchWorkspaceAction = 
    Action<PATCH_WORKSPACE, io.Workspace>;

export type LoadWorkspaceAction = IOAction<
    LOAD_WORKSPACE,
    {},
    io.Workspace
>;

export function patchWorkspace(workspace: io.Workspace): PatchWorkspaceAction {
    return createAction(PATCH_WORKSPACE, workspace);
}

export function putWorkspace(workspace: io.Workspace): PutWorkspaceAction {
    return createAction(PUT_WORKSPACE, workspace);
}

export function workspaceUpdated(
    payload: io.Workspace
): WorkspaceUpdatedAction {
    return createAction(WORKSPACE_UPDATED, payload);
}

export function loadWorkspace(): LoadWorkspaceAction{
    return createIOAction<io.Workspace, LOAD_WORKSPACE>(LOAD_WORKSPACE, {});
}
