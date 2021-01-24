import { Map } from "immutable";
import { StatusRecord } from "../records";
import {
    PUT_STATUS,
    PUT_STATUSES,
    PATCH_STATUS,
    REMOVE_STATUS,
} from "../actions/types";
import {
    PutStatusAction,
    PutStatusesAction,
    PatchStatusAction,
    RemoveStatusAction,
} from "../actions/status";

type StatusState = Map<string, StatusRecord>;

export const state = Map<string, StatusRecord>();

export const reducers = {
    [PUT_STATUS]: (state: StatusState, { payload }: PutStatusAction) => {
        return state.set(payload.id, new StatusRecord(payload));
    },
    [PUT_STATUSES]: (state: StatusState, { payload }: PutStatusesAction) => {
        return state.withMutations((state) => {
            payload.reduce((state, status) => {
                return state.set(status.id, new StatusRecord(status));
            }, state);
        });
    },
    [PATCH_STATUS]: (state: StatusState, { payload }: PatchStatusAction) => {
        return state.mergeIn([payload.id], payload);
    },
    [REMOVE_STATUS]: (state: StatusState, { payload }: RemoveStatusAction) => {
        return state.delete(payload.id);
    },
};

export default { state, reducers };
