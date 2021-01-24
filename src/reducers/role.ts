import { Map, OrderedMap } from "immutable";
import { ChannelRoleRecord } from "../records";
import {
    PutChannelRoleAction,
    PutChannelRolesAction,
    PatchChannelRoleAction,
    PatchChannelRolesAction,
    RemoveChannelRoleAction,
} from "../actions/channelRole";
import {
    PUT_CHANNEL_ROLE,
    PUT_CHANNEL_ROLES,
    PATCH_CHANNEL_ROLES,
    PATCH_CHANNEL_ROLE,
    REMOVE_CHANNEL_ROLE,
} from "../actions/types";

type Roles = OrderedMap<string, ChannelRoleRecord>;

export type State = Map<string, Roles>;

export const state: State = Map();

function put(state: State, { payload }: PutChannelRoleAction) {
    let roles = state.get(
        payload.channel_id,
        OrderedMap<string, ChannelRoleRecord>()
    );

    roles = roles.set(payload.id, new ChannelRoleRecord(payload));
    return state.set(payload.channel_id, roles);
}

function puts(state: State, { payload }: PutChannelRolesAction) {
    return payload.reduce((state, role) => {
        let roles = state.get(
            role.channel_id,
            OrderedMap<string, ChannelRoleRecord>()
        );

        roles = roles.set(role.id, new ChannelRoleRecord(role));
        return state.set(role.channel_id, roles);
    }, state);
}

function patch(state: State, { payload }: PatchChannelRoleAction) {
    const path = [payload.channel_id, payload.id];
    if (state.getIn([payload.channel_id, payload.id])) {
        return state.mergeIn(path, payload);
    } else {
        return state;
    }
}

function patches(state: State, { payload }: PatchChannelRolesAction) {
    return state.withMutations((state) => {
        payload.reduce((state, role) => {
            const path = [role.channel_id, role.id];
            if (state.getIn([role.channel_id, role.id])) {
                return state.mergeIn(path, role);
            } else {
                return state;
            }
        }, state);
    });
}

function remove(state: State, { payload }: RemoveChannelRoleAction) {
    let roles = state.get(payload.channel_id);
    if (roles) {
        return state.set(payload.channel_id, roles.delete(payload.id));
    } else {
        return state;
    }
}

export const reducers = {
    [PUT_CHANNEL_ROLE]: put,
    [PUT_CHANNEL_ROLES]: puts,
    [PATCH_CHANNEL_ROLE]: patch,
    [PATCH_CHANNEL_ROLES]: patches,
    [REMOVE_CHANNEL_ROLE]: remove,
};

export default { state, reducers };
