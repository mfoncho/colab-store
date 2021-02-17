import { Id, Require, Unique } from "@colab/types";
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
    JOINED_WORKSPACE,
    LEFT_WORKSPACE,
    WORKSPACE_CREATED,
    LOAD_WORKSPACES,
    WORKSPACE_PERMISSIONS_UPDATED,
    LOAD_WORKSPACE,
} from "./types";

import { IOAction, createAction, createIOAction, Action } from "./index";
import { NormalizedUserWorkspace } from "../schemas";

export interface CreateWorkspacePayload {
    name: string;
    is_home: boolean;
    template_id: string;
}

export interface UpdateWorkspacePayload {
    name?: string;
    workspace_id: string;
}

export type JoinedWorkspaceAction = 
    Action<JOINED_WORKSPACE, io.Workspace>;

export type WorkspacePermissionsUpdatedAction = 
    Action<WORKSPACE_PERMISSIONS_UPDATED, Require<Partial<io.Workspace>, "id">>

export type LeftWorkspaceAction = 
    Action<LEFT_WORKSPACE, Require<Partial<io.Workspace>, "id">>;

export type WorkspaceCreatedAction = 
    Action<WORKSPACE_CREATED, io.Workspace>;

export type WorkspaceUpdatedAction = 
    Action<WORKSPACE_UPDATED, io.Workspace>;

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

export type LoadWorkspacesAction = IOAction<
    LOAD_WORKSPACES,
    {},
    io.Workspace[]
>;

export type LoadWorkspaceAction = IOAction<
    LOAD_WORKSPACE,
    {workspace_id: string},
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

export function removeWorkspace(payload: Unique): RemoveWorkspaceAction {
    return createAction(REMOVE_WORKSPACE, payload);
}

export function JoinedWorkspace(workspace: io.Workspace): JoinedWorkspaceAction{
    return createAction(JOINED_WORKSPACE, workspace);
}

export function leftWorkspace(workspace: Require<Partial<io.Workspace>, "id">): LeftWorkspaceAction{
    return createAction(LEFT_WORKSPACE, workspace);
}

export function workspacePermissionsUpdated(workspace: Require<Partial<io.Workspace>, "id">): WorkspacePermissionsUpdatedAction{
    return createAction(WORKSPACE_PERMISSIONS_UPDATED, workspace);
}

export function workspaceUpdated(
    payload: io.Workspace
): WorkspaceUpdatedAction {
    return createAction(WORKSPACE_UPDATED, payload);
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

export function loadWorksapces(): LoadWorkspacesAction{
    return createIOAction<io.Workspace[], LOAD_WORKSPACES>(LOAD_WORKSPACES, {});
}

export function loadWorkspace(id: string): LoadWorkspaceAction{
    return createIOAction<io.Workspace, LOAD_WORKSPACE>(LOAD_WORKSPACE, {workspace_id: id});
}
