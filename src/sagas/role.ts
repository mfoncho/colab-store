import { put, takeEvery } from "redux-saga/effects";
import {
    UPDATE_CHANNEL_ROLE,
    CREATE_CHANNEL_ROLE,
    CHANNEL_ROLE_UPDATED,
    DELETE_CHANNEL_ROLE,
    CHANNEL_ROLE_CREATED,
    FETCH_CHANNEL_ROLES,
    LOAD_CHANNEL_ROLES,
    SET_DEFAULT_CHANNEL_ROLE,
} from "../actions/types";
import {
    UpdateChannelRoleAction,
    ChannelRoleUpdatedAction,
    roleUpdated,
    removeChannelRole,
    patchChannelRole,
    ChannelRoleCreatedAction,
    CreateChannelRoleAction,
    roleCreated,
    DeleteChannelRoleAction,
    putChannelRole,
    FetchChannelRolesAction,
    LoadChannelRolesAction,
    fetchChannelRoles,
    putChannelRoles,
    SetDefaultChannelRoleAction,
} from "../actions/channelRole";
import Client from "@colab/client";

function* fetch({ payload, meta }: FetchChannelRolesAction): Iterable<any> {
    try {
        const { data } = (yield Client.fetchRoles(payload)) as any;
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

function* setDefault({
    payload,
    meta,
}: SetDefaultChannelRoleAction): Iterable<any> {
    try {
        const { data } = (yield Client.setDefaultRole(payload)) as any;
        yield put(patchChannelRole(data));
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

function* load({ payload, meta }: LoadChannelRolesAction): Iterable<any> {
    try {
        const roles = (yield yield put(fetchChannelRoles(payload))) as any;
        yield put(putChannelRoles(roles));
        meta.success(roles);
    } catch (e) {
        meta.error(e);
    }
}

function* create({ payload, meta }: CreateChannelRoleAction): Iterable<any> {
    try {
        const { data } = (yield Client.createRole(payload)) as any;
        yield put(roleCreated(data));
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

function* created({ payload }: ChannelRoleCreatedAction): Iterable<any> {
    yield put(putChannelRole(payload));
}

function* update({ payload, meta }: UpdateChannelRoleAction): Iterable<any> {
    try {
        const { data } = (yield Client.updateRole(payload)) as any;
        yield put(roleUpdated(data));
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

function* updated({ payload }: ChannelRoleUpdatedAction): Iterable<any> {
    yield put(patchChannelRole(payload));
}

function* destroy({ payload, meta }: DeleteChannelRoleAction): Iterable<any> {
    try {
        const { data } = (yield Client.deleteRole(payload)) as any;
        yield put(
            removeChannelRole({
                id: payload.role_id,
                channel_id: payload.channel_id,
            })
        );
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

export const tasks = [
    { effect: takeEvery, type: LOAD_CHANNEL_ROLES, handler: load },
    { effect: takeEvery, type: FETCH_CHANNEL_ROLES, handler: fetch },
    { effect: takeEvery, type: CREATE_CHANNEL_ROLE, handler: create },
    { effect: takeEvery, type: UPDATE_CHANNEL_ROLE, handler: update },
    { effect: takeEvery, type: DELETE_CHANNEL_ROLE, handler: destroy },
    { effect: takeEvery, type: CHANNEL_ROLE_UPDATED, handler: updated },
    { effect: takeEvery, type: CHANNEL_ROLE_CREATED, handler: created },
    { effect: takeEvery, type: SET_DEFAULT_CHANNEL_ROLE, handler: setDefault },
];
