import { Record, Map, List } from "immutable";
import { SpaceRecord } from "../records";
import {
    PUT_SPACE,
    REMOVE_SPACE,
    PUT_SPACES,
    PATCH_SPACE,
    PATCH_SPACES,
} from "../actions/types";

type SpaceState = Map<string, SpaceRecord>;

export const state = Map<string, SpaceRecord>();

function put(state: SpaceState, { payload }: any) {
    const path = [payload.id];

    const space = state.has(payload.id)
        ? state.getIn(path).merge(payload)
        : new SpaceRecord(payload);
    return state.withMutations((state: SpaceState) => {
        state.setIn(path, space);
    });
}

function puts(state: SpaceState, action: any): SpaceState {
    return action.payload.reduce((state: SpaceState, payload: any) => {
        return put(state, { payload });
    }, state);
}

function patch(state: SpaceState, { payload }: any) {
    if (state.has(payload.id)) {
        const space = SpaceRecord.mapFromJS(payload);
        return state.withMutations((state: SpaceState) => {
            state.mergeIn([space.id], space);
        });
    } else {
        return state;
    }
}

function patches(state: SpaceState, { payload }: any): SpaceState {
    for (let space of payload) {
        state = patch(state, { payload: space });
    }
    return state;
}

function remove(state: SpaceState, { payload }: any) {
    return state.deleteIn([payload.id]);
}

export const reducers = {
    [PUT_SPACE]: put,

    [PUT_SPACES]: puts,

    [PATCH_SPACE]: patch,

    [PATCH_SPACES]: patches,

    [REMOVE_SPACE]: remove,
};

export default { state, reducers };
