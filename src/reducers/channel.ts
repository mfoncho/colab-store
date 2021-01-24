import { Record, Map, List } from "immutable";
import { ChannelRecord, TagRecord } from "../records";
import {
    PUT_TAG,
    PUT_CHANNEL,
    REMOVE_CHANNEL,
    PUT_CHANNELS,
    PATCH_CHANNEL,
    PATCH_CHANNELS,
    REMOVE_TAG,
} from "../actions/types";

const StateFactory = Record(
    {
        paths: Map<string, [string, string]>(),
        entities: Map<string, Map<string, ChannelRecord>>(),
    },
    "channels"
);

export class ChannelState extends StateFactory {}

export const state = new ChannelState();

function put(state: ChannelState, { payload }: any) {
    const path = [payload.workspace_id, payload.id];

    const channel = state.paths.has(payload.id)
        ? state.entities.getIn(path).merge(payload)
        : new ChannelRecord(payload);
    return state.withMutations((state: ChannelState) => {
        state.setIn(["paths", payload.id], path);
        state.setIn(["entities", ...path], channel);
    });
}

function puts(state: ChannelState, action: any): ChannelState {
    return action.payload.reduce((state: ChannelState, payload: any) => {
        return put(state, { payload });
    }, state);
}

function patch(state: ChannelState, { payload }: any) {
    const path = state.paths.get(payload.id);

    if (path) {
        const channel = ChannelRecord.mapFromJS(payload);
        return state.withMutations((state: ChannelState) => {
            state.mergeIn(["entities", ...path], channel);
        });
    } else {
        return state;
    }
}

function patches(state: ChannelState, { payload }: any): ChannelState {
    for (let channel of payload) {
        state = patch(state, { payload: channel });
    }
    return state;
}

function remove(state: ChannelState, action: any) {
    const id = action.payload.id;

    const path = state.paths.get(id);

    if (path) {
        return state.withMutations((state: ChannelState) => {
            state.deleteIn(["paths", id]);
            state.deleteIn(["entities", ...path]);
        });
    } else {
        return state;
    }
}

function putTag(state: ChannelState, { payload }: any): ChannelState {
    const path = state.paths.get(payload.channel_id);

    if (path) {
        return state.withMutations((state: ChannelState) => {
            let tags = state.getIn(["entities", ...path, "tags"]) as List<
                TagRecord
            >;
            if (!tags.find((tag) => tag.id == payload.id)) {
                tags = tags.push(new TagRecord(payload));
            }
            state.setIn(["entities", ...path, "tags"], tags);
        });
    } else {
        return state;
    }
}

function removeTag(state: ChannelState, { payload }: any): ChannelState {
    const path = state.paths.get(payload.channel_id);

    if (path) {
        return state.withMutations((state: ChannelState) => {
            let tags = state.getIn(["entities", ...path, "tags"]) as List<
                TagRecord
            >;
            tags = tags.filter((tag) => tag.id != payload.id);
            state.setIn(["entities", ...path, "tags"], tags);
        });
    } else {
        return state;
    }
}

export const reducers = {
    [PUT_CHANNEL]: put,

    [PUT_CHANNELS]: puts,

    [PATCH_CHANNEL]: patch,

    [PATCH_CHANNELS]: patches,

    [REMOVE_CHANNEL]: remove,

    [PUT_TAG]: putTag,

    [REMOVE_TAG]: removeTag,
};

export default { state, reducers };
