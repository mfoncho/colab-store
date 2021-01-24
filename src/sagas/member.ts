import { put, select, takeEvery } from "redux-saga/effects";
import Client from "@colab/client";
import { State } from "..";
import { MemberSchema } from "../schemas";
import {
    FETCH_MEMBERS,
    LOAD_MEMBERS,
    CREATE_MEMBER,
    DELETE_MEMBER,
    UPDATE_MEMBER,
    MEMBER_JOINED,
    MEMBER_LEFT,
    MEMBER_UPDATED,
} from "../actions/types";
import {
    FetchMembersAction,
    LoadMembersAction,
    CreateMemberAction,
    fetchMembers,
    memberJoined,
    putMember,
    putMembers,
    MemberJoinedAction,
    MemberUpdatedAction,
    patchMember,
    MemberLeftAction,
    removeMember,
    DeleteMemberAction,
    UpdateMemberAction,
    memberUpdated,
} from "../actions/member";
import { storeRelated } from "../actions/app";
import { clearChannel } from "../actions/channel";

function* fetch(action: FetchMembersAction): Iterable<any> {
    try {
        const { payload } = action;
        const { data } = (yield Client.fetchChannelMembers(payload)) as any;
        action.meta.success(data);
    } catch (e) {
        action.meta.error(e);
    }
}

function* create({ payload, meta }: CreateMemberAction): Iterable<any> {
    try {
        const { data } = (yield Client.createChannelMember(payload)) as any;
        yield put(memberJoined(data));
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

function* joined({ payload }: MemberJoinedAction): Iterable<any> {
    const [normalized, related] = MemberSchema.normalizeOne(payload);
    yield put(storeRelated(related));
    yield put(putMember(normalized));
}

function* updated({ payload }: MemberUpdatedAction): Iterable<any> {
    const [normalized, related] = MemberSchema.normalizeOne(payload);
    yield put(storeRelated(related));
    yield put(patchMember(normalized));
}

function* update({ payload, meta }: UpdateMemberAction): Iterable<any> {
    try {
        const { data } = (yield Client.updateChannelMember(payload)) as any;
        yield put(memberUpdated(data));
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

function* destroy({ payload, meta }: DeleteMemberAction): Iterable<any> {
    try {
        const { data } = (yield Client.deleteChannelMember(payload)) as any;
        yield put(
            removeMember({
                id: payload.member_id,
                channel_id: payload.channel_id,
            })
        );
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

function* left({ payload }: MemberLeftAction): Iterable<any> {
    const { auth, channels } = ((yield select()) as any) as State;
    if (auth.id == payload.user.id && channels.paths.has(payload.channel_id)) {
        const path = channels.paths.get(payload.channel_id);
        const channel = channels.entities.getIn(path as any).toJS();
        yield put(clearChannel(channel));
    } else {
        yield put(removeMember(payload));
    }
}

function* load(action: LoadMembersAction): Iterable<any> {
    try {
        const { payload } = action;
        const members = (yield yield put(fetchMembers(payload))) as any;
        const [normalized, related] = MemberSchema.normalizeMany(members);
        yield put(storeRelated(related));
        yield put(putMembers(normalized));
        action.meta.success(members);
    } catch (e) {
        action.meta.error(e);
    }
}

export const tasks = [
    { effect: takeEvery, type: LOAD_MEMBERS, handler: load },
    { effect: takeEvery, type: FETCH_MEMBERS, handler: fetch },
    { effect: takeEvery, type: CREATE_MEMBER, handler: create },
    { effect: takeEvery, type: UPDATE_MEMBER, handler: update },
    { effect: takeEvery, type: DELETE_MEMBER, handler: destroy },
    { effect: takeEvery, type: MEMBER_JOINED, handler: joined },
    { effect: takeEvery, type: MEMBER_LEFT, handler: left },
    { effect: takeEvery, type: MEMBER_UPDATED, handler: updated },
];
