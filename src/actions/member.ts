import { io } from "@colab/client";
import { NormalizedMember } from "../schemas";
import { IOAction, createIOAction, createAction, Action } from "./index";
import {
    CREATE_MEMBER,
    MEMBER_LEFT,
    FETCH_MEMBERS,
    DELETE_MEMBER,
    MEMBER_JOINED,
    LOAD_MEMBERS,
    PUT_MEMBER,
    PUT_MEMBERS,
    PATCH_MEMBER,
    REMOVE_MEMBER,
    PATCH_MEMBERS,
} from "./types";

export interface CreateMemberPayload {
    space_id: string;
    user_id: string;
    role_id?: string;
}

export interface DeleteMemberPayload {
    space_id: string;
    member_id: string;
}
export interface RemoveMemberPayload {
    id: string;
    space_id: string;
}

export interface FetchMembersPayload {
    space_id: string;
}

export type CreateMemberAction = IOAction<
    CREATE_MEMBER,
    CreateMemberPayload,
    io.Member
>;

export type DeleteMemberAction = IOAction<
    DELETE_MEMBER,
    DeleteMemberPayload,
    any
>;

export type FetchMembersAction = IOAction<
    FETCH_MEMBERS,
    FetchMembersPayload,
    io.Member[]
>;

export type LoadMembersAction = IOAction<
    LOAD_MEMBERS,
    FetchMembersPayload,
    io.Member[]
>;

export type MemberJoinedAction = Action<MEMBER_JOINED, io.Member>;

export type MemberLeftAction = Action<MEMBER_LEFT, io.Member>;

export type PutMemberAction = Action<PUT_MEMBER, NormalizedMember>;

export type PutMembersAction = Action<PUT_MEMBERS, NormalizedMember[]>;

export type PatchMemberAction = Action<PATCH_MEMBER, NormalizedMember>;

export type PatchMembersAction = Action<PATCH_MEMBERS, NormalizedMember[]>;

export type RemoveMemberAction = Action<REMOVE_MEMBER, RemoveMemberPayload>;

export function fetchMembers(payload: FetchMembersPayload): FetchMembersAction {
    return createIOAction<io.Member[], FETCH_MEMBERS>(FETCH_MEMBERS, payload);
}

export function loadMembers(payload: FetchMembersPayload): LoadMembersAction {
    return createIOAction<io.Member[], LOAD_MEMBERS>(LOAD_MEMBERS, payload);
}

export function createMember(payload: CreateMemberPayload): CreateMemberAction {
    return createIOAction<io.Member, CREATE_MEMBER>(CREATE_MEMBER, payload);
}

export function deleteMember(payload: DeleteMemberPayload): DeleteMemberAction {
    return createIOAction<any, DELETE_MEMBER>(DELETE_MEMBER, payload);
}

export function memberJoined(member: io.Member): MemberJoinedAction {
    return createAction(MEMBER_JOINED, member);
}

export function memberLeft(member: io.Member): MemberLeftAction {
    return createAction(MEMBER_LEFT, member);
}

export function putMember(member: NormalizedMember): PutMemberAction {
    return createAction(PUT_MEMBER, member);
}

export function putMembers(members: NormalizedMember[]): PutMembersAction {
    return createAction(PUT_MEMBERS, members);
}

export function patchMember(member: NormalizedMember): PatchMemberAction {
    return createAction(PATCH_MEMBER, member);
}

export function patchMembers(members: NormalizedMember[]): PatchMembersAction {
    return createAction(PATCH_MEMBERS, members);
}

export function removeMember(payload: RemoveMemberPayload): RemoveMemberAction {
    return createAction(REMOVE_MEMBER, payload);
}
