import { Map } from "immutable";
import { WorkspaceRecord } from "../records";

export type WorkspacesState = Map<string, WorkspaceRecord>;

const state: WorkspacesState = Map();

function PUT_WORKSPACE(state: WorkspacesState, { payload }: any) {
    if (state.has(payload.id)) {
        return PATCH_WORKSPACE(state, { payload });
    } else {
        return state.set(payload.id, new WorkspaceRecord(payload));
    }
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
    if (state.has(payload.id)) {
        const workspace = WorkspaceRecord.objectFromJS(payload);
        return state.withMutations((state: WorkspacesState) => {
            state.mergeIn([payload.id], workspace);
        });
    } else {
        return state;
    }
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

function REMOVE_WORKSPACE(
    state: WorkspacesState,
    action: any
): WorkspacesState {
    return state.delete(action.payload);
}

export const reducers = {
    PUT_WORKSPACE,

    PUT_WORKSPACES,

    PATCH_WORKSPACE,

    PATCH_WORKSPACES,

    REMOVE_WORKSPACE,
};

export default { state, reducers };
