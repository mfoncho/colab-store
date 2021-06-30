import { Map, OrderedMap } from "immutable";
import { RoleRecord } from "../records";
import {
    PutSpaceRoleAction,
    PutSpaceRolesAction,
    PatchSpaceRoleAction,
    PatchSpaceRolesAction,
    RemoveSpaceRoleAction,
} from "../actions/role";
import {
    PUT_SPACE_ROLE,
    PUT_SPACE_ROLES,
    PATCH_SPACE_ROLES,
    PATCH_SPACE_ROLE,
    REMOVE_SPACE_ROLE,
} from "../actions/types";

type Roles = OrderedMap<string, RoleRecord>;

export type State = Roles;

export const state: State = Map();

function put(state: State, { payload }: PutSpaceRoleAction) {
    return state.set(payload.id, new RoleRecord(payload));
}

function puts(state: State, { payload }: PutSpaceRolesAction) {
    return payload.reduce((state, role) => {
        return state.set(role.id, new RoleRecord(role));
    }, state);
}

function patch(state: State, { payload }: PatchSpaceRoleAction) {
    return state.mergeIn([payload.id], payload);
}

function patches(state: State, { payload }: PatchSpaceRolesAction) {
    return state.withMutations((state) => {
        payload.reduce((state, role) => {
            const path = [role.space_id, role.id];
            if (state.getIn([role.space_id, role.id])) {
                return state.mergeIn(path, role);
            } else {
                return state;
            }
        }, state);
    });
}

function remove(state: State, { payload }: RemoveSpaceRoleAction) {
    return state.delete(payload.space_id);
}

export const reducers = {
    [PUT_SPACE_ROLE]: put,
    [PUT_SPACE_ROLES]: puts,
    [PATCH_SPACE_ROLE]: patch,
    [REMOVE_SPACE_ROLE]: remove,
    [PATCH_SPACE_ROLES]: patches,
};

export default { state, reducers };
