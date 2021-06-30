import { put, takeEvery } from "redux-saga/effects";
import Client, { io, socket } from "@colab/client";
import { dispatch } from "..";
import { SpaceSchema as Schema } from "../schemas";
import { roleUpdated, roleCreated, roleDeleted } from "../actions/role";
import {
    spaceCreated,
    CreateSpaceAction,
    SpaceCreatedAction,
    putSpace,
    SpaceJoinedAction,
    PatchSpaceAction,
    patchSpace,
    JoinSpaceAction,
    LoadSpaceAction,
    spaceJoined,
    ArchiveSpaceAction,
    UnarchiveSpaceAction,
    spaceArchived,
    spaceUnarchived,
    SpaceArchivedAction,
    PutSpaceAction,
    PutSpacesAction,
    spaceUpdated,
    ClearSpaceAction,
    removeSpace,
    putSpaces,
    LoadSpacesAction,
} from "../actions/space";
import {
    INIT,
    JOIN_SPACE,
    ARCHIVE_SPACE,
    UNARCHIVE_SPACE,
    LOAD_SPACE,
    CREATE_SPACE,
    SPACE_JOINED,
    SPACE_UPDATED,
    SPACE_ARCHIVED,
    PUT_SPACE,
    LOAD_SPACES,
    PUT_SPACES,
    SPACE_UNARCHIVED,
    SPACE_CREATED,
    CLEAR_SPACE,
} from "../actions/types";
import { memberJoined, memberLeft } from "../actions/member";
import { loadTopics } from "../actions/thread";
import { storeRelated } from "../actions/app";

function* init(): Iterable<any> {
    try {
        const { data } = (yield Client.fetchSpaces({})) as any;
        const [normalized, related] = Schema.normalizeMany(data);
        yield put(storeRelated(related));
        yield put(putSpaces(normalized));
    } catch (e) {}
}

function* archive({ payload, meta }: ArchiveSpaceAction): Iterable<any> {
    try {
        const { data } = (yield Client.archiveSpace(payload)) as any;
        const [normalized, related] = Schema.normalizeOne(data);
        yield put(storeRelated(related));
        yield put(spaceArchived(normalized as any));
        meta.success(data);
    } catch (e) {
        meta.error(e.toString());
    }
}

function* unarchive({ payload, meta }: UnarchiveSpaceAction): Iterable<any> {
    try {
        const { data } = (yield Client.unarchiveSpace(payload)) as any;
        const [normalized, related] = Schema.normalizeOne(data);
        yield put(storeRelated(related));
        yield put(spaceUnarchived(normalized as any));
        meta.success(data);
    } catch (e) {
        meta.error(e.toString());
    }
}

function* load({ payload, meta }: LoadSpaceAction): Iterable<any> {
    try {
        const { data } = (yield Client.getSpace(payload)) as any;
        const [normalized, related] = Schema.normalizeOne(data);
        yield put(storeRelated(related));
        yield put(putSpace(normalized as any));
        meta.success(data);
    } catch (e) {
        meta.error(e.toString());
    }
}

function* loads({ payload, meta }: LoadSpacesAction): Iterable<any> {
    try {
        const { data } = (yield Client.fetchSpaces(payload)) as any;
        const [normalized, related] = Schema.normalizeOne(data);
        yield put(storeRelated(related));
        yield put(putSpaces(normalized as any));
        meta.success(data);
    } catch (e) {
        meta.error(e.toString());
    }
}

function* join({ payload, meta }: JoinSpaceAction): Iterable<any> {
    try {
        const { data } = (yield Client.joinSpace(payload)) as any;
        yield put(spaceJoined(data));
        meta.success(data);
    } catch (e) {
        meta.error(e.toString());
    }
}

function* patch({
    payload,
}: PatchSpaceAction | SpaceArchivedAction): Iterable<any> {
    yield put(patchSpace(payload));
}

function* subscribe({
    payload,
}: PutSpaceAction | PutSpacesAction): Iterable<any> {
    if (!Array.isArray(payload)) {
        payload = [payload];
    }
    for (let space of payload as any) {
        const topic = `space:${space.id}`;

        if (socket.getChannel(topic)) continue;

        let ch = socket.channel(topic, {});

        ch.on("updated", (payload: io.Space) => {
            dispatch(spaceUpdated(payload));
        });

        ch.on("permissions.updated", (permissions: io.SpaceRole) => {
            const payload = {
                id: space.id,
                workspace_id: space.workspace_id,
                permissions: permissions,
            };
            dispatch(spaceUpdated(payload as any));
        });

        ch.on("archived", (payload: io.Space) => {
            dispatch(spaceArchived(payload));
        });

        ch.on("unarchived", (payload: io.Space) => {
            dispatch(spaceUnarchived(payload));
        });

        ch.on("role.created", (payload: io.SpaceRole) => {
            dispatch(roleCreated(payload));
        });

        ch.on("role.updated", (payload: io.SpaceRole) => {
            dispatch(roleUpdated(payload));
        });

        ch.on("role.deleted", (payload: io.SpaceRole) => {
            dispatch(roleDeleted(payload));
        });

        ch.on("member.joined", (payload: io.Member) => {
            dispatch(memberJoined(payload));
        });

        ch.on("member.left", (payload: io.Member) => {
            dispatch(memberLeft(payload));
        });

        ch.join()
            .receive("ok", () => {})
            .receive("error", () => {});
    }
}

function* create({ payload, meta }: CreateSpaceAction): Iterable<any> {
    try {
        const { data } = (yield Client.createSpace(payload)) as any;
        yield put(spaceCreated(data));
        meta.success(data);
    } catch (e) {
        meta.error(e.toString());
    }
}

function* clear({ payload }: ClearSpaceAction): Iterable<any> {
    const topic = `space:${payload.id}`;
    let ch = socket.getChannel(topic);
    if (ch) {
        ch.leave();
    }
    yield put(removeSpace(payload));
}

function* store({
    payload,
}: SpaceCreatedAction | SpaceJoinedAction): Iterable<any> {
    const [normalized, related] = Schema.normalizeOne(payload as any);
    yield put(loadTopics({ space_id: payload.id }));
    yield put(storeRelated(related));
    yield put(putSpace(normalized));
}

export const tasks = [
    { effect: takeEvery, type: INIT, handler: init },

    { effect: takeEvery, type: CLEAR_SPACE, handler: clear },

    { effect: takeEvery, type: CREATE_SPACE, handler: create },

    { effect: takeEvery, type: ARCHIVE_SPACE, handler: archive },

    { effect: takeEvery, type: UNARCHIVE_SPACE, handler: unarchive },

    { effect: takeEvery, type: PUT_SPACE, handler: subscribe },

    { effect: takeEvery, type: PUT_SPACES, handler: subscribe },

    { effect: takeEvery, type: LOAD_SPACE, handler: load },

    { effect: takeEvery, type: LOAD_SPACES, handler: loads },

    { effect: takeEvery, type: JOIN_SPACE, handler: join },

    { effect: takeEvery, type: "STORE_SPACE", handler: store },

    { effect: takeEvery, type: SPACE_CREATED, handler: store },

    { effect: takeEvery, type: SPACE_JOINED, handler: store },

    { effect: takeEvery, type: SPACE_UPDATED, handler: patch },

    { effect: takeEvery, type: SPACE_ARCHIVED, handler: patch },

    { effect: takeEvery, type: SPACE_UNARCHIVED, handler: store },

    { effect: takeEvery, type: "SPACE_ROLE_UPDATED", handler: patch },
];
