import { Map } from "immutable";
import { STORE_INIT } from "../actions/types";

export type WorkspacesState = Map<string, any>;

const state: WorkspacesState = Map();

function PUT_WORKSPACE(_state: WorkspacesState, { payload }: any) {
    return Map<string, any>(payload);
}

function PUT_WORKSPACES(state: WorkspacesState, action: any): WorkspacesState {
    return action.payload.reduce((state: WorkspacesState, payload: any) => {
        return PUT_WORKSPACE(state, { payload });
    }, state);
}

function PATCH_WORKSPACE(
    state: WorkspacesState,
    { payload }: any
): WorkspacesState {
    return state.merge(payload);
}

function PATCH_WORKSPACES(
    state: WorkspacesState,
    { payload }: any
): WorkspacesState {
    for (let workspace of payload) {
        state = PATCH_WORKSPACE(state, { payload: workspace });
    }
    return state;
}

function REMOVE_WORKSPACE(): WorkspacesState {
    return Map<string, any>();
}

export const reducers = {
    PUT_WORKSPACE,

    PUT_WORKSPACES,

    PATCH_WORKSPACE,

    PATCH_WORKSPACES,

    REMOVE_WORKSPACE,
};

export default { state, reducers };
