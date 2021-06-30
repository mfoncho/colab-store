import { put, takeEvery } from "redux-saga/effects";
import {
    UPDATE_SPACE_PERMISSIONS,
    CREATE_SPACE_ROLE,
    SPACE_ROLE_UPDATED,
    DELETE_SPACE_ROLE,
    SPACE_ROLE_CREATED,
    FETCH_SPACE_ROLES,
    LOAD_SPACE_ROLES,
    SET_DEFAULT_SPACE_ROLE,
} from "../actions/types";
import {
    UpdateSpacePermissionsAction,
    SpaceRoleUpdatedAction,
    roleUpdated,
    removeSpaceRole,
    patchSpaceRole,
    SpaceRoleCreatedAction,
    CreateSpaceRoleAction,
    roleCreated,
    DeleteSpaceRoleAction,
    putSpaceRole,
    FetchSpaceRolesAction,
    LoadSpaceRolesAction,
    fetchSpaceRoles,
    putSpaceRoles,
    UpdateSpacePermissionsPayload,
} from "../actions/role";

import Client from "@colab/client";

function* fetch({ payload, meta }: FetchSpaceRolesAction): Iterable<any> {
    try {
        const { data } = (yield Client.fetchSpaceRoles(payload)) as any;
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

function* load({ payload, meta }: LoadSpaceRolesAction): Iterable<any> {
    try {
        const roles = (yield yield put(fetchSpaceRoles(payload))) as any;
        yield put(putSpaceRoles(roles));
        meta.success(roles);
    } catch (e) {
        meta.error(e);
    }
}

function* create({ payload, meta }: CreateSpaceRoleAction): Iterable<any> {
    try {
        const { data } = (yield Client.createSpaceRole(payload)) as any;
        yield put(roleCreated(data));
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

function* created({ payload }: SpaceRoleCreatedAction): Iterable<any> {
    yield put(putSpaceRole(payload));
}

function* update({ payload, meta }: UpdateSpacePermissionsAction): Iterable<any> {
    try {
        const { data } = (yield Client.updateSpaceRolePermissions(payload)) as any;
        yield put(roleUpdated(data));
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

function* updated({ payload }: SpaceRoleUpdatedAction): Iterable<any> {
    yield put(patchSpaceRole(payload));
}

function* destroy({ payload, meta }: DeleteSpaceRoleAction): Iterable<any> {
    try {
        const { data } = (yield Client.deleteSpaceRole(payload)) as any;
        yield put(
            removeSpaceRole({
                id: payload.role_id,
                space_id: payload.space_id,
            })
        );
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

export const tasks = [
    { effect: takeEvery, type: LOAD_SPACE_ROLES, handler: load },
    { effect: takeEvery, type: FETCH_SPACE_ROLES, handler: fetch },
    { effect: takeEvery, type: CREATE_SPACE_ROLE, handler: create },
    { effect: takeEvery, type: UPDATE_SPACE_PERMISSIONS, handler: update },
    { effect: takeEvery, type: DELETE_SPACE_ROLE, handler: destroy },
    { effect: takeEvery, type: SPACE_ROLE_UPDATED, handler: updated },
    { effect: takeEvery, type: SPACE_ROLE_CREATED, handler: created },
];
