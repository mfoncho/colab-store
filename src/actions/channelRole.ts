import { io } from "@colab/client";
import { IOAction, createIOAction, createAction, Action } from "./index";
import {
    CREATE_CHANNEL_ROLE,
    UPDATE_CHANNEL_ROLE,
    CHANNEL_ROLE_DELETED,
    FETCH_CHANNEL_ROLES,
    DELETE_CHANNEL_ROLE,
    CHANNEL_ROLE_CREATED,
    CHANNEL_ROLE_UPDATED,
    PUT_CHANNEL_ROLE,
    PUT_CHANNEL_ROLES,
    PATCH_CHANNEL_ROLE,
    REMOVE_CHANNEL_ROLE,
    LOAD_CHANNEL_ROLES,
    PATCH_CHANNEL_ROLES,
    SET_DEFAULT_CHANNEL_ROLE,
} from "./types";

export interface CreateChannelRolePayload {
    channel_id: string;
    name: string;
}

export interface SetDefaultChannelRolePayload {
    channel_id: string;
    role_id: string;
}

export interface UpdateChannelRolePayload {
    channel_id: string;
    role_id: string;
    name: string;
}

export interface DeleteChannelRolePayload {
    channel_id: string;
    role_id: string;
}

export interface RemoveChannelRolePayload {
    id: string;
    channel_id: string;
}

export interface FetchChannelRolesPayload {
    channel_id: string;
}

export type CreateChannelRoleAction = IOAction<
    CREATE_CHANNEL_ROLE,
    CreateChannelRolePayload,
    io.ChannelRole
>;

export type SetDefaultChannelRoleAction = IOAction<
    SET_DEFAULT_CHANNEL_ROLE,
    SetDefaultChannelRolePayload,
    io.ChannelRole
>;

export type UpdateChannelRoleAction = IOAction<
    UPDATE_CHANNEL_ROLE,
    UpdateChannelRolePayload,
    io.ChannelRole
>;

export type DeleteChannelRoleAction = IOAction<
    DELETE_CHANNEL_ROLE,
    DeleteChannelRolePayload,
    any
>;

export type FetchChannelRolesAction = IOAction<
    FETCH_CHANNEL_ROLES,
    FetchChannelRolesPayload,
    io.ChannelRole[]
>;

export type LoadChannelRolesAction = IOAction<
    LOAD_CHANNEL_ROLES,
    FetchChannelRolesPayload,
    io.ChannelRole[]
>;

export type ChannelRoleCreatedAction = Action<
    CHANNEL_ROLE_CREATED,
    io.ChannelRole
>;

export type ChannelRoleUpdatedAction = Action<
    CHANNEL_ROLE_UPDATED,
    io.ChannelRole
>;

export type ChannelRoleDeletedAction = Action<
    CHANNEL_ROLE_DELETED,
    io.ChannelRole
>;

export type PutChannelRoleAction = Action<PUT_CHANNEL_ROLE, io.ChannelRole>;

export type PutChannelRolesAction = Action<PUT_CHANNEL_ROLES, io.ChannelRole[]>;

export type PatchChannelRoleAction = Action<PATCH_CHANNEL_ROLE, io.ChannelRole>;

export type PatchChannelRolesAction = Action<
    PATCH_CHANNEL_ROLES,
    io.ChannelRole[]
>;

export type RemoveChannelRoleAction = Action<
    REMOVE_CHANNEL_ROLE,
    RemoveChannelRolePayload
>;

export function fetchChannelRoles(
    payload: FetchChannelRolesPayload
): FetchChannelRolesAction {
    return createIOAction<io.ChannelRole[], FETCH_CHANNEL_ROLES>(
        FETCH_CHANNEL_ROLES,
        payload
    );
}

export function loadChannelRoles(
    payload: FetchChannelRolesPayload
): LoadChannelRolesAction {
    return createIOAction<io.ChannelRole[], LOAD_CHANNEL_ROLES>(
        LOAD_CHANNEL_ROLES,
        payload
    );
}

export function createChannelRole(
    payload: CreateChannelRolePayload
): CreateChannelRoleAction {
    return createIOAction<io.ChannelRole, CREATE_CHANNEL_ROLE>(
        CREATE_CHANNEL_ROLE,
        payload
    );
}

export function setDefaultChannelRole(
    payload: SetDefaultChannelRolePayload
): SetDefaultChannelRoleAction {
    return createIOAction<io.ChannelRole, SET_DEFAULT_CHANNEL_ROLE>(
        SET_DEFAULT_CHANNEL_ROLE,
        payload
    );
}

export function updateChannelRole(
    payload: UpdateChannelRolePayload
): UpdateChannelRoleAction {
    return createIOAction(UPDATE_CHANNEL_ROLE, payload);
}

export function deleteChannelRole(
    payload: DeleteChannelRolePayload
): DeleteChannelRoleAction {
    return createIOAction<any, DELETE_CHANNEL_ROLE>(
        DELETE_CHANNEL_ROLE,
        payload
    );
}

export function roleCreated(role: io.ChannelRole): ChannelRoleCreatedAction {
    return createAction(CHANNEL_ROLE_CREATED, role);
}

export function roleUpdated(role: io.ChannelRole): ChannelRoleUpdatedAction {
    return createAction(CHANNEL_ROLE_UPDATED, role);
}

export function roleDeleted(role: io.ChannelRole): ChannelRoleDeletedAction {
    return createAction(CHANNEL_ROLE_DELETED, role);
}

export function putChannelRole(role: io.ChannelRole): PutChannelRoleAction {
    return createAction(PUT_CHANNEL_ROLE, role);
}

export function putChannelRoles(
    roles: io.ChannelRole[]
): PutChannelRolesAction {
    return createAction(PUT_CHANNEL_ROLES, roles);
}

export function patchChannelRole(role: io.ChannelRole): PatchChannelRoleAction {
    return createAction(PATCH_CHANNEL_ROLE, role);
}

export function patchChannelRoles(
    roles: io.ChannelRole[]
): PatchChannelRolesAction {
    return createAction(PATCH_CHANNEL_ROLES, roles);
}

export function removeChannelRole(
    payload: RemoveChannelRolePayload
): RemoveChannelRoleAction {
    return createAction(REMOVE_CHANNEL_ROLE, payload);
}
