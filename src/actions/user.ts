import { Unique } from "@colab/types";
import { io } from "@colab/client";
import {
    PUT_USER,
    PUT_USERS,
    PATCH_USER,
    PATCH_USERS,
    REMOVE_USER,
    USER_UPDATED,
    SET_USER_STATUS,
    SET_USER_PRESENCE,
    PUT_PRESENCE,
    REMOVE_PRESENCE,
    PATCH_PRESENCE,
    UPDATE_USER_PROFILE,
    PATCH_PREFERENCES,
    UPDATE_PREFERENCES,
} from "./types";

import { createAction, createIOAction, Action, IOAction } from "./index";

export type PatchPreferencesPayload = Partial<io.Preferences>;

export type UpdatePreferencesPayload = Partial<io.Preferences>;

export interface UpdateUserProfilePayload {
    name?: string;
    about?: string;
    email?: string;
    phone?: string;
    avatar?: string;
    user_id: string;
    password?: string;
    new_password?: string;
}

export interface SetUserStatusPayload {
    user_id: string;
    status_id: string;
}

export interface PutPresencePayload {
    user_id: string;
    state: io.PresenceState;
    timestamp: string;
}

export interface PatchPresencePayload {
    user_id: string;
    state?: io.PresenceState;
    timestamp?: string;
}

export interface RemovePresencePayload {
    user_id: string;
}

export interface SetUserPresencePayload {
    user_id: string;
    presence: io.PresenceState;
}

export type SetUserStatusAction = IOAction<
    SET_USER_STATUS,
    SetUserStatusPayload,
    io.User
>;

export type UpdatePreferencesAction = IOAction<
    UPDATE_PREFERENCES,
    UpdatePreferencesPayload,
    io.Preferences
>;

export type SetUserPresenceAction = IOAction<
    SET_USER_PRESENCE,
    SetUserPresencePayload,
    any
>;

export type UpdateUserProfileAction = IOAction<
    UPDATE_USER_PROFILE,
    UpdateUserProfilePayload,
    io.User
>;

export type PatchPreferencesAction = Action<
    PATCH_PREFERENCES,
    PatchPreferencesPayload
>;

export type PutPresenceAction = Action<PUT_PRESENCE, PutPresencePayload>;

export type PatchPresenceAction = Action<PATCH_PRESENCE, PatchPresencePayload>;

export type RemovePresenceAction = Action<
    REMOVE_PRESENCE,
    RemovePresencePayload
>;

export type UserUpdatedAction = Action<USER_UPDATED, io.User>;

export type PutUserAction = Action<PUT_USER, io.User>;

export type PutUsersAction = Action<PUT_USERS, io.User[]>;

export type PatchUserAction = Action<PATCH_USER, io.User>;

export type PatchUsersAction = Action<PATCH_USERS, io.User[]>;

export type RemoveUserAction = Action<REMOVE_USER, Unique>;

export function setStatus(payload: SetUserStatusPayload): SetUserStatusAction {
    return createIOAction<io.User, SET_USER_STATUS>(SET_USER_STATUS, payload);
}

export function setPresence(
    payload: SetUserPresencePayload
): SetUserPresenceAction {
    return createIOAction<any, SET_USER_PRESENCE>(SET_USER_PRESENCE, payload);
}

export function updateProfile(
    payload: UpdateUserProfilePayload
): UpdateUserProfileAction {
    return createIOAction<io.User, UPDATE_USER_PROFILE>(
        UPDATE_USER_PROFILE,
        payload
    );
}

export function patchUser(user: io.User): PatchUserAction {
    return createAction(PATCH_USER, user);
}

export function patchUsers(users: io.User[]): PatchUsersAction {
    return createAction(PATCH_USERS, users);
}

export function putUser(user: io.User): PutUserAction {
    return createAction(PUT_USER, user);
}

export function putUsers(users: io.User[]): PutUsersAction {
    return createAction(PUT_USERS, users);
}

export function removeUser(id: string): RemoveUserAction {
    return createAction(REMOVE_USER, { id });
}

export function putPresence(payload: PutPresencePayload): PutPresenceAction {
    return createAction(PUT_PRESENCE, payload);
}

export function patchPresence(
    payload: PatchPresencePayload
): PatchPresenceAction {
    return createAction(PATCH_PRESENCE, payload);
}

export function patchPreferences(
    payload: PatchPreferencesPayload
): PatchPreferencesAction {
    return createAction(PATCH_PREFERENCES, payload);
}

export function updatePreferences(
    payload: UpdatePreferencesPayload
): UpdatePreferencesAction {
    return createIOAction<io.Preferences, UPDATE_PREFERENCES>(
        UPDATE_PREFERENCES,
        payload
    );
}

export function removePresence(
    payload: RemovePresencePayload
): RemovePresenceAction {
    return createAction(REMOVE_PRESENCE, payload);
}

export function userUpdated(payload: io.User): UserUpdatedAction {
    return createAction(USER_UPDATED, payload);
}
