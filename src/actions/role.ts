import { io } from "@colab/client";
import { IOAction, createIOAction, createAction, Action } from "./index";
import {
    CREATE_SPACE_ROLE,
    UPDATE_SPACE_PERMISSIONS,
    SPACE_ROLE_DELETED,
    FETCH_SPACE_ROLES,
    DELETE_SPACE_ROLE,
    SPACE_ROLE_CREATED,
    SPACE_ROLE_UPDATED,
    PUT_SPACE_ROLE,
    PUT_SPACE_ROLES,
    PATCH_SPACE_ROLE,
    REMOVE_SPACE_ROLE,
    LOAD_SPACE_ROLES,
    PATCH_SPACE_ROLES,
} from "./types";

export interface CreateSpaceRolePayload {
    space_id: string;
    role_id: string;
}

export interface UpdateSpacePermissionsPayload {
    space_id: string;
    role_id: string;
    permissions: any;
}

export interface DeleteSpaceRolePayload {
    space_id: string;
    role_id: string;
}

export interface RemoveSpaceRolePayload {
    id: string;
    space_id: string;
}

export interface FetchSpaceRolesPayload {
    space_id: string;
}

export type CreateSpaceRoleAction = IOAction<
    CREATE_SPACE_ROLE,
    CreateSpaceRolePayload,
    io.SpaceRole
>;

export type UpdateSpacePermissionsAction = IOAction<
    UPDATE_SPACE_PERMISSIONS,
    UpdateSpacePermissionsPayload,
    io.SpaceRole
>;

export type DeleteSpaceRoleAction = IOAction<
    DELETE_SPACE_ROLE,
    DeleteSpaceRolePayload,
    any
>;

export type FetchSpaceRolesAction = IOAction<
    FETCH_SPACE_ROLES,
    FetchSpaceRolesPayload,
    io.SpaceRole[]
>;

export type LoadSpaceRolesAction = IOAction<
    LOAD_SPACE_ROLES,
    FetchSpaceRolesPayload,
    io.SpaceRole[]
>;

export type SpaceRoleCreatedAction = Action<
    SPACE_ROLE_CREATED,
    io.SpaceRole
>;

export type SpaceRoleUpdatedAction = Action<
    SPACE_ROLE_UPDATED,
    io.SpaceRole
>;

export type SpaceRoleDeletedAction = Action<
    SPACE_ROLE_DELETED,
    io.SpaceRole
>;

export type PutSpaceRoleAction = Action<PUT_SPACE_ROLE, io.SpaceRole>;

export type PutSpaceRolesAction = Action<PUT_SPACE_ROLES, io.SpaceRole[]>;

export type PatchSpaceRoleAction = Action<PATCH_SPACE_ROLE, io.SpaceRole>;

export type PatchSpaceRolesAction = Action<
    PATCH_SPACE_ROLES,
    io.SpaceRole[]
>;

export type RemoveSpaceRoleAction = Action<
    REMOVE_SPACE_ROLE,
    RemoveSpaceRolePayload
>;

export function fetchSpaceRoles(
    payload: FetchSpaceRolesPayload
): FetchSpaceRolesAction {
    return createIOAction<io.SpaceRole[], FETCH_SPACE_ROLES>(
        FETCH_SPACE_ROLES,
        payload
    );
}

export function loadSpaceRoles(
    payload: FetchSpaceRolesPayload
): LoadSpaceRolesAction {
    return createIOAction<io.SpaceRole[], LOAD_SPACE_ROLES>(
        LOAD_SPACE_ROLES,
        payload
    );
}

export function createSpaceRole(
    payload: CreateSpaceRolePayload
): CreateSpaceRoleAction {
    return createIOAction<io.SpaceRole, CREATE_SPACE_ROLE>(
        CREATE_SPACE_ROLE,
        payload
    );
}

export function updateSpacePermissions(
    payload: UpdateSpacePermissionsPayload
):  UpdateSpacePermissionsAction{
    return createIOAction(UPDATE_SPACE_PERMISSIONS, payload);
}

export function deleteSpaceRole(
    payload: DeleteSpaceRolePayload
): DeleteSpaceRoleAction {
    return createIOAction<any, DELETE_SPACE_ROLE>(
        DELETE_SPACE_ROLE,
        payload
    );
}

export function roleCreated(role: io.SpaceRole): SpaceRoleCreatedAction {
    return createAction(SPACE_ROLE_CREATED, role);
}

export function roleUpdated(role: io.SpaceRole): SpaceRoleUpdatedAction {
    return createAction(SPACE_ROLE_UPDATED, role);
}

export function roleDeleted(role: io.SpaceRole): SpaceRoleDeletedAction {
    return createAction(SPACE_ROLE_DELETED, role);
}

export function putSpaceRole(role: io.SpaceRole): PutSpaceRoleAction {
    return createAction(PUT_SPACE_ROLE, role);
}

export function putSpaceRoles(
    roles: io.SpaceRole[]
): PutSpaceRolesAction {
    return createAction(PUT_SPACE_ROLES, roles);
}

export function patchSpaceRole(role: io.SpaceRole): PatchSpaceRoleAction {
    return createAction(PATCH_SPACE_ROLE, role);
}

export function patchSpaceRoles(
    roles: io.SpaceRole[]
): PatchSpaceRolesAction {
    return createAction(PATCH_SPACE_ROLES, roles);
}

export function removeSpaceRole(
    payload: RemoveSpaceRolePayload
): RemoveSpaceRoleAction {
    return createAction(REMOVE_SPACE_ROLE, payload);
}
