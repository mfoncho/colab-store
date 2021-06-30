import { Map, OrderedMap } from "immutable";
import {
    PUT_MEMBER,
    PUT_MEMBERS,
    PATCH_MEMBER,
    PATCH_MEMBERS,
    REMOVE_MEMBER,
} from "../actions/types";
import { MemberRecord } from "../records";
import {
    PatchMemberAction,
    PutMembersAction,
    PutMemberAction,
    RemoveMemberAction,
} from "../actions/member";

export type State = Map<string, OrderedMap<string, MemberRecord>>;

export const state: State = Map();

function put(state: State, { payload }: PutMemberAction) {
    const path = [payload.space_id, payload.id];
    return state.withMutations((state) => {
        return state.setIn(path, new MemberRecord(payload));
    });
}

function puts(state: State, { payload }: PutMembersAction) {
    return state.withMutations((state) => {
        return payload.reduce((state, member) => {
            const path = [member.space_id, member.id];
            return state.setIn(path, new MemberRecord(member));
        }, state);
    });
}

function patch(state: State, { payload }: PatchMemberAction) {
    const path = [payload.space_id, payload.id];
    return state.withMutations((state) => {
        return state.mergeIn(path, payload);
    });
}

function remove(state: State, { payload }: RemoveMemberAction) {
    return state.deleteIn([payload.space_id, payload.id]);
}

export const reducers = {
    [PUT_MEMBER]: put,

    [PUT_MEMBERS]: puts,

    [PATCH_MEMBER]: patch,

    [PATCH_MEMBERS]: patch,

    [REMOVE_MEMBER]: remove,
};

export default { state, reducers };
