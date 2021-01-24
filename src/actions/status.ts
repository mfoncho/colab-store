import { Unique } from "@colab/types";
import { io } from "@colab/client";
import {
    CREATE_STATUS,
    DELETE_STATUS,
    PUT_STATUS,
    PUT_STATUSES,
    LOAD_STATUSES,
    UPDATE_STATUS,
    PATCH_STATUS,
    REMOVE_STATUS,
    STATUS_UPDATED,
    STATUS_DELETED,
    STATUS_CREATED,
} from "./types";

import { IOAction, createAction, createIOAction, Action } from "./index";

export interface CreateStatusPayload {
    icon: string;
    name: string;
}

export interface DeleteStatusPayload {
    status_id: string;
}

export interface UpdateStatusPayload extends Unique {
    icon?: string;
    name?: string;
}

export type StatusCreatedAction = Action<STATUS_CREATED, io.Status>;

export type StatusUpdatedAction = Action<STATUS_UPDATED, io.Status>;

export type StatusDeletedAction = Action<STATUS_DELETED, io.Status>;

export type PutStatusAction = Action<PUT_STATUS, io.Status>;

export type PutStatusesAction = Action<PUT_STATUSES, io.Status[]>;

export type PatchStatusAction = Action<PATCH_STATUS, io.Status>;

export type RemoveStatusAction = Action<REMOVE_STATUS, Unique>;

export type CreateStatusAction = IOAction<
    CREATE_STATUS,
    CreateStatusPayload,
    io.Status
>;

export type LoadStatusesAction = IOAction<LOAD_STATUSES, {}, io.Status[]>;

export type UpdateStatusAction = IOAction<
    UPDATE_STATUS,
    UpdateStatusPayload,
    io.Status
>;

export type DeleteStatusAction = IOAction<
    DELETE_STATUS,
    DeleteStatusPayload,
    any
>;

export function loadStatuses(): LoadStatusesAction {
    return createIOAction<io.Status[], LOAD_STATUSES>(LOAD_STATUSES, {});
}

export function deleteStatus(id: string): DeleteStatusAction {
    return createIOAction<any, DELETE_STATUS>(DELETE_STATUS, { status_id: id });
}

export function statusCreated(status: io.Status): StatusCreatedAction {
    return createAction(STATUS_CREATED, status);
}

export function patchStatus(status: io.Status): PatchStatusAction {
    return createAction(PATCH_STATUS, status);
}

export function putStatus(status: io.Status): PutStatusAction {
    return createAction(PUT_STATUS, status);
}

export function putStatuses(statuses: io.Status[]): PutStatusesAction {
    return createAction(PUT_STATUSES, statuses);
}

export function removeStatus(id: string): RemoveStatusAction {
    return createAction(REMOVE_STATUS, { id });
}

export function updateStatus(payload: UpdateStatusPayload): UpdateStatusAction {
    return createIOAction<io.Status, UPDATE_STATUS>(UPDATE_STATUS, payload);
}

export function createStatus(payload: CreateStatusPayload): CreateStatusAction {
    return createIOAction<io.Status, CREATE_STATUS>(CREATE_STATUS, payload);
}

export function statusUpdated(payload: io.Status): StatusUpdatedAction {
    return createAction(STATUS_UPDATED, payload);
}

export function statusDeleted(payload: io.Status): StatusDeletedAction {
    return createAction(STATUS_DELETED, payload);
}
