import { Map } from "immutable";
import moment from "moment";
import { Presence } from "../records";
import {
    PUT_PRESENCE,
    PATCH_PRESENCE,
    REMOVE_PRESENCE,
} from "../actions/types";
import {
    PutPresenceAction,
    PatchPresenceAction,
    RemovePresenceAction,
} from "../actions/user";

type State = Map<string, Presence>;

export const state = Map<string, Presence>();

export const reducers = {
    [PUT_PRESENCE]: (state: State, { payload }: PutPresenceAction) => {
        const presence = state.get(payload.user_id);
        if (presence) {
            if (moment(payload.timestamp).isAfter(presence.timestamp)) {
                return state.set(payload.user_id, presence.merge(payload));
            }
            return state;
        }
        return state.set(payload.user_id, new Presence(payload));
    },
    [PATCH_PRESENCE]: (state: State, { payload }: PatchPresenceAction) => {
        const presence = state.get(payload.user_id);
        if (presence) {
            if (payload.timestamp) {
                if (moment(payload.timestamp).isAfter(presence.timestamp)) {
                    return state.set(payload.user_id, presence.merge(payload));
                }
            } else {
                return state.set(payload.user_id, presence.merge(payload));
            }
        }
        return state;
    },
    [REMOVE_PRESENCE]: (state: State, { payload }: RemovePresenceAction) => {
        return state.delete(payload.user_id);
    },
};

export default { state, reducers };
