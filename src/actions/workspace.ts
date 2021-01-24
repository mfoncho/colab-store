import { Id, Unique } from "@colab/types";
import { io } from "@colab/client";
import {
    CREATE_WORKSPACE,
    UPDATE_WORKSPACE,
    PUT_WORKSPACE,
    PUT_WORKSPACES,
    PATCH_WORKSPACE,
    PATCH_WORKSPACES,
    REMOVE_WORKSPACE,
    WORKSPACE_UPDATED,
    WORKSPACE_DELETED,
    WORKSPACE_CREATED,
} from "./types";

import { IOAction, createAction, createIOAction, Action } from "./index";
import { NormalizedUserWorkspace } from "../schemas";

export interface CreateWorkspacePayload {
    name: string;
    description: string;
}

export interface UpdateWorkspacePayload extends Unique {
    icon?: string;
    name?: string;
    description?: string;
}

export type WorkspaceCreatedAction = 
    Action<WORKSPACE_CREATED, io.Workspace>;

export type WorkspaceUpdatedAction = 
    Action<WORKSPACE_UPDATED, io.Workspace>;

export type WorkspaceDeletedAction = 
    Action<WORKSPACE_DELETED, io.Workspace>;

export type PutWorkspaceAction = 
    Action<PUT_WORKSPACE, NormalizedUserWorkspace>;

export type PutWorkspacesAction = 
    Action<PUT_WORKSPACES, NormalizedUserWorkspace[]>;

export type PatchWorkspaceAction = 
    Action<PATCH_WORKSPACE, NormalizedUserWorkspace>;

export type PatchWorkspacesAction = 
    Action<PATCH_WORKSPACES, NormalizedUserWorkspace[]>;

export type RemoveWorkspaceAction = 
    Action<REMOVE_WORKSPACE, Unique>;

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

export function patchWorkspace(workspace: NormalizedUserWorkspace): PatchWorkspaceAction {
    return createAction(PATCH_WORKSPACE, workspace);
}

export function patchWorkspaces(
    workspaces: NormalizedUserWorkspace[]
): PatchWorkspacesAction {
    return createAction(PATCH_WORKSPACES, workspaces);
}

export function putWorkspace(workspace: NormalizedUserWorkspace): PutWorkspaceAction {
    return createAction(PUT_WORKSPACE, workspace);
}

export function putWorkspaces(workspaces: NormalizedUserWorkspace[]): PutWorkspacesAction {
    return createAction(PUT_WORKSPACES, workspaces);
}

export function removeWorkspace(id: Id): RemoveWorkspaceAction {
    return createAction(REMOVE_WORKSPACE, { id });
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
