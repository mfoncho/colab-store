import { Unique } from "@colab/types";
import { io } from "@colab/client";
import {
    CREATE_WORKSPACE,
    PUT_WORKSPACE,
    PUT_WORKSPACES,
    UPDATE_WORKSPACE,
    PATCH_WORKSPACE,
    PATCH_WORKSPACES,
    REMOVE_WORKSPACE,
    WORKSPACE_UPDATED,
    WORKSPACE_DELETED,
    WORKSPACE_CREATED,
} from "./types";

import { IOAction, createAction, createIOAction, Action } from "./index";

export interface CreateWorkspacePayload {
    name: string;
    description: string;
}

export interface UpdateWorkspacePayload extends Unique {
    icon?: string;
    name?: string;
    description?: string;
}

export type WorkspaceCreatedAction = Action<WORKSPACE_CREATED, io.Workspace>;

export type WorkspaceUpdatedAction = Action<WORKSPACE_UPDATED, io.Workspace>;

export type WorkspaceDeletedAction = Action<WORKSPACE_DELETED, io.Workspace>;

export type PutWorkspaceAction = Action<PUT_WORKSPACE, io.Workspace>;

export type PutWorkspacesAction = Action<PUT_WORKSPACES, io.Workspace[]>;

export type PatchWorkspaceAction = Action<PATCH_WORKSPACE, io.Workspace>;

export type PatchWorkspacesAction = Action<PATCH_WORKSPACES, io.Workspace[]>;

export type RemoveWorkspaceAction = Action<REMOVE_WORKSPACE, Unique>;

export type CreateWorkspaceAction = IOAction<
    CREATE_WORKSPACE,
    CreateWorkspacePayload,
    io.Workspace
>;

export type UpdateWorkspaceAction = IOAction<
    UPDATE_WORKSPACE,
    UpdateWorkspacePayload,
    io.Workspace
>;

export function workspaceCreated(
    workspace: io.Workspace
): WorkspaceCreatedAction {
    return createAction(WORKSPACE_CREATED, workspace);
}

export function patchWorkspace(workspace: io.Workspace): PatchWorkspaceAction {
    return createAction(PATCH_WORKSPACE, workspace);
}

export function patchWorkspaces(
    workspaces: io.Workspace[]
): PatchWorkspacesAction {
    return createAction(PATCH_WORKSPACES, workspaces);
}

export function putWorkspace(workspace: io.Workspace): PutWorkspaceAction {
    return createAction(PUT_WORKSPACE, workspace);
}

export function putWorkspaces(workspaces: io.Workspace[]): PutWorkspacesAction {
    return createAction(PUT_WORKSPACES, workspaces);
}

export function removeWorkspace(id: string): RemoveWorkspaceAction {
    return createAction(REMOVE_WORKSPACE, { id });
}

export function updateWorkspace(
    payload: UpdateWorkspacePayload
): UpdateWorkspaceAction {
    return createIOAction<io.Workspace, UPDATE_WORKSPACE>(
        UPDATE_WORKSPACE,
        payload
    );
}

export function createWorkspace(
    payload: CreateWorkspacePayload
): CreateWorkspaceAction {
    return createIOAction<io.Workspace, CREATE_WORKSPACE>(
        CREATE_WORKSPACE,
        payload
    );
}

export function workspaceUpdated(
    payload: io.Workspace
): WorkspaceUpdatedAction {
    return createAction(WORKSPACE_UPDATED, payload);
}

export function workspaceDeleted(
    payload: io.Workspace
): WorkspaceDeletedAction {
    return createAction(WORKSPACE_DELETED, payload);
}
