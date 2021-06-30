import { Map, OrderedMap } from "immutable";
import { SpaceRoleRecord } from "../records";
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

type Roles = OrderedMap<string, SpaceRoleRecord>;

export type State = Map<string, Roles>;

export const state: State = Map();

function put(state: State, { payload }: PutSpaceRoleAction) {
    let roles = state.get(
        payload.space_id,
        OrderedMap<string, SpaceRoleRecord>()
    );

    roles = roles.set(payload.id, new SpaceRoleRecord(payload));
    return state.set(payload.space_id, roles);
}

function puts(state: State, { payload }: PutSpaceRolesAction) {
    return payload.reduce((state, role) => {
        let roles = state.get(
            role.space_id,
            OrderedMap<string, SpaceRoleRecord>()
        );

        roles = roles.set(role.id, new SpaceRoleRecord(role));
        return state.set(role.space_id, roles);
    }, state);
}

function patch(state: State, { payload }: PatchSpaceRoleAction) {
    const path = [payload.space_id, payload.id];
    if (state.getIn([payload.space_id, payload.id])) {
        return state.mergeIn(path, payload);
    } else {
        return state;
    }
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
    let roles = state.get(payload.space_id);
    if (roles) {
        return state.set(payload.space_id, roles.delete(payload.id));
    } else {
        return state;
    }
}

export const reducers = {
    [PUT_SPACE_ROLE]: put,
    [PUT_SPACE_ROLES]: puts,
    [PATCH_SPACE_ROLE]: patch,
    [REMOVE_SPACE_ROLE]: remove,
    [PATCH_SPACE_ROLES]: patches,
};

export default { state, reducers };
