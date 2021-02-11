import { BelongsToChannel, Require, Unique } from "@colab/types";
import { io } from "@colab/client";
import {
    MOVE_CARD,
    UNARCHIVE_CARD,
    ARCHIVE_COLUMN,
    STORE_COLUMNS,
    UNARCHIVE_COLUMN,
    MOVE_COLUMN,
    UPDATE_COLUMN,
    REMOVE_CARD,
    CREATE_CARD,
    UPDATE_CARD,
    CARDS_REORDERED,
    COMPLETE_TASK,
    UNCOMPLETE_TASK,
    STORE_CARD,
    STORE_CARDS,
    PUT_CARD,
    PATCH_CARD,
    PUT_CARDS,
    PATCH_CARDS,
    CARD_UPDATED,
    CARD_DELETED,
    COLUMN_DELETED,
    CREATE_COLUMN,
    FETCH_CARDS,
    PUT_COLUMN,
    PUT_COLUMNS,
    REMOVE_COLUMN,
    COLUMNS_REORDERED,
    PATCH_COLUMNS,
    COLUMN_UPDATED,
    PATCH_COLUMN,
    ARCHIVE_CARD,
    CARD_CREATED,
    COLUMN_CREATED,
    COLUMN_ARCHIVED,
    COLUMN_UNARCHIVED,
    GET_CARD,
    CARD_TAGGED,
    CARD_UNTAGGED,
    CARD_ARCHIVED,
    CARD_UNARCHIVED,
    DELETE_CARD,
    CARD_DONE,
    MARK_CARD_AS_DONE,
    MARK_CARD_AS_UNDONE,
    TAG_CARD,
    UNTAG_CARD,
    CREATE_TASK,
    UPDATE_TASK,
    DELETE_TASK,
    TASK_UPDATED,
    TASK_CREATED,
    TASK_DELETED,
    PUT_TASK,
    PATCH_TASK,
    PATCH_TASKS,
    REMOVE_TASK,
    CREATE_CHECKLIST,
    DELETE_CHECKLIST,
    UPDATE_CHECKLIST,
    PUT_CHECKLIST,
    PUT_CHECKLISTS,
    CHECKLIST_UPDATED,
    CHECKLIST_CREATED,
    CHECKLIST_DELETED,
    PATCH_CHECKLIST,
    PATCH_CHECKLISTS,
    REMOVE_CHECKLIST,
    LOAD_CARDS,
    LOAD_COLUMNS,
    FETCH_COLUMNS,
    DELETE_COLUMN,
    CLEAR_CARDS,
} from "./types";

import { Action, createAction, createIOAction, IOAction } from ".";
import {
    NormalizedCard,
    NormalizedChecklist,
    NormalizedColumn,
} from "../schemas";

export interface GetCardPayload {
    channel_id: string;
    card_id?: string;
}

export interface CompleteTaskPayload {
    task_id: string;
    channel_id: string;
}

export interface UncompleteTaskPayload {
    task_id: string;
    channel_id: string;
}

export interface ClearCardPayload {
    id: string;
    thread_id: string;
    column_id: string | null;
    channel_id: string;
}

export interface CreateColumnPayload {
    name: string;
    origin: boolean;
    capacity: number;
    channel_id: string;
    type: "stack" | "queue";
}

export interface UpdateColumnPayload {
    name?: string;
    origin?: boolean;
    column_id: string;
    channel_id: string;
    capacity?: number;
    type?: "stack" | "queue";
}

export interface MoveColumnPayload {
    position: number;
    column_id: string;
    channel_id: string;
}

export interface ArchiveColumnPayload {
    column_id: string;
    channel_id: string;
}

export interface UnarchiveColumnPayload {
    column_id: string;
    channel_id: string;
}

export interface DeleteColumnPayload {
    channel_id: string;
    column_id: string;
}

export interface CreateTaskPayload {
    name: string;
    channel_id: string;
    card_id: string;
    checklist_id: string;
}

export interface UpdateTaskPayload {
    name?: string;
    complete?: boolean;
    task_id: string;
    card_id: string;
    channel_id: string;
    checklist_id: string;
}

export interface DeleteTaskPayload {
    task_id: string;
    card_id: string;
    channel_id: string;
    checklist_id: string;
}

export interface FetchCardsPayload {
    channel_id: string;
    column_id?: string;
}

export interface FetchColumnsPayload {
    channel_id: string;
}

export interface MoveCardPayload {
    card_id: string;
    position?: number;
    column_id: string;
    channel_id: string;
}

export interface CardPosition {
    id: string;
    position: number;
    column_id: string;
}

export interface DeleteCardPayload {
    channel_id: string;
    card_id: string;
}

export interface ColumnPosition {
    id: string;
    position: number;
}

export interface UpdateCardPayload {
    name?: string;
    card_id: string;
    deadline?: string | null;
    channel_id: string;
    description?: string | null;
}

export interface CreateCardPayload {
    name: string;
    column_id: string;
    channel_id: string;
    description: string;
}

export interface ArchiveCardPayload {
    card_id: string;
    channel_id: string;
}

export interface UnarchiveCardPayload extends ArchiveCardPayload {
    column_id: string;
}

export interface MarkCardAsDonePayload {
    card_id: string;
    channel_id: string;
}

export interface MarkCardAsUndonePayload {
    card_id: string;
    channel_id: string;
}

export interface TagCardPayload {
    tag_id: string;
    card_id: string;
    channel_id: string;
}

export interface UntagCardPayload {
    tag_id: string;
    card_id: string;
    channel_id: string;
}

export interface CreateChecklistPayload {
    name: string;
    card_id: string;
    member_id: string;
    channel_id: string;
}

export interface UpdateChecklistPayload {
    name?: string;
    card_id: string;
    member_id?: string;
    channel_id: string;
    checklist_id: string;
}

export interface DeleteChecklistPayload {
    card_id: string;
    channel_id: string;
    checklist_id: string;
}

export interface LoadColumnsPayload {
    channel_id: string;
}

export interface LoadCardsPayload {
    channel_id: string;
}

export interface RemoveChecklistPayload extends Unique {}

export type CardUntaggedPayload = Require<
    Partial<io.CardTag>,
    "card_id" | "tag_id"
>;

export type TaskDeletedPayload = Require<
    Partial<io.Task>,
    "id" | "checklist_id"
>;

export type ChecklistDeletedPayload = Require<
    Partial<io.Checklist>,
    "id" | "card_id"
>;

export interface UnarchiveColumnPayload extends ArchiveColumnPayload {}

export type PutChecklistAction = Action<PUT_CHECKLIST, NormalizedChecklist>;

export type PutChecklistsAction = Action<PUT_CHECKLISTS, NormalizedChecklist[]>;

export type RemoveChecklistAction = Action<
    REMOVE_CHECKLIST,
    RemoveChecklistPayload
>;

export type ChecklistUpdatedAction = Action<CHECKLIST_UPDATED, io.Checklist>;

export type ChecklistCreatedAction = Action<CHECKLIST_CREATED, io.Checklist>;

export type ChecklistDeletedAction = Action<
    CHECKLIST_DELETED,
    ChecklistDeletedPayload
>;

export type CompleteTaskAction = IOAction<
    COMPLETE_TASK,
    CompleteTaskPayload,
    io.Task
>;

export type UncompleteTaskAction = IOAction<
    UNCOMPLETE_TASK,
    UncompleteTaskPayload,
    io.Task
>;

export type CreateChecklistAction = IOAction<
    CREATE_CHECKLIST,
    CreateChecklistPayload,
    io.Checklist
>;

export type PatchChecklistAction = Action<PATCH_CHECKLIST, NormalizedChecklist>;

export type PatchChecklistsAction = Action<
    PATCH_CHECKLISTS,
    NormalizedChecklist[]
>;

export type UpdateChecklistAction = IOAction<
    UPDATE_CHECKLIST,
    UpdateChecklistPayload,
    io.Checklist
>;

export type DeleteChecklistAction = IOAction<
    DELETE_CHECKLIST,
    DeleteChecklistPayload,
    ChecklistDeletedPayload
>;

export type CreateTaskAction = IOAction<
    CREATE_TASK,
    CreateTaskPayload,
    io.Task
>;

export type UpdateTaskAction = IOAction<
    UPDATE_TASK,
    UpdateTaskPayload,
    io.Task
>;

export type DeleteTaskAction = IOAction<DELETE_TASK, DeleteTaskPayload, any>;

export type TaskUpdatedAction = Action<TASK_UPDATED, io.Task>;

export type PutTaskAction = Action<PUT_TASK, io.Task>;

export type PatchTaskAction = Action<PATCH_TASK, io.Task>;

export type PatchTasksAction = Action<PATCH_TASKS, io.Task[]>;

export type RemoveTaskAction = Action<REMOVE_TASK, TaskDeletedPayload>;

export type TaskDeletedAction = Action<TASK_DELETED, TaskDeletedPayload>;

export type TaskCreatedAction = Action<TASK_CREATED, io.Task>;

export type LoadCardsAction = IOAction<LOAD_CARDS, LoadCardsPayload, io.Card[]>;

export type StoreCardAction = Action<STORE_CARD, io.Card>;

export type StoreCardsAction = Action<STORE_CARDS, io.Card[]>;

export type CardCreatedAction = Action<CARD_CREATED, io.Card>;

export type CardTaggedAction = Action<CARD_TAGGED, io.CardTag>;

export type CardUntaggedAction = Action<CARD_UNTAGGED, CardUntaggedPayload>;

export type CardDeletedAction = Action<CARD_DELETED, Unique>;

export type CardUpdatedAction = Action<CARD_UPDATED, io.Card>;

export type PutCardAction = Action<PUT_CARD, NormalizedCard>;

export type PutCardsAction = Action<PUT_CARDS, NormalizedCard[]>;

export type PatchCardAction = Action<PATCH_CARD, NormalizedCard>;

export type PatchCardsAction = Action<PATCH_CARDS, NormalizedCard[]>;

export type RemoveCardAction = Action<REMOVE_CARD, Unique>;

export type ClearCardsAction = Action<CLEAR_CARDS, ClearCardPayload[]>;

export type CardsReorderedAction = Action<CARDS_REORDERED, CardPosition[]>;

export type MarkCardAsDoneAction = IOAction<
    MARK_CARD_AS_DONE,
    MarkCardAsDonePayload,
    Partial<io.Card>
>;

export type MarkCardAsUndoneAction = IOAction<
    MARK_CARD_AS_UNDONE,
    MarkCardAsDonePayload,
    Partial<io.Card>
>;

export type DeleteCardAction = IOAction<
    DELETE_CARD,
    DeleteCardPayload,
    Partial<io.Card>
>;

export type MoveCardAction = IOAction<MOVE_CARD, MoveCardPayload, CardPosition>;

export type FetchCardsAction = IOAction<
    FETCH_CARDS,
    FetchCardsPayload,
    io.Card[]
>;

export type FetchColumnsAction = IOAction<
    FETCH_COLUMNS,
    FetchColumnsPayload,
    io.Column[]
>;

export type TagCardAction = IOAction<TAG_CARD, TagCardPayload, io.CardTag>;

export type UntagCardAction = IOAction<UNTAG_CARD, UntagCardPayload, string>;

export type GetCardAction = IOAction<GET_CARD, GetCardPayload, io.Card>;

export type CreateCardAction = IOAction<
    CREATE_CARD,
    CreateCardPayload,
    io.Card
>;

export type UpdateCardAction = IOAction<
    UPDATE_CARD,
    UpdateCardPayload,
    io.Card
>;

export type ArchiveCardAction = IOAction<
    ARCHIVE_CARD,
    ArchiveCardPayload,
    io.Card
>;

export type UnarchiveCardAction = IOAction<
    UNARCHIVE_CARD,
    UnarchiveCardPayload,
    io.Card
>;

export type CardArchivedAction = Action<CARD_ARCHIVED, io.Card>;

export type CardUnarchivedAction = Action<CARD_UNARCHIVED, io.Card>;

export type ColumnCreateAction = Action<COLUMN_CREATED, io.Column>;

export type ColumnDeletedAction = Action<
    COLUMN_DELETED,
    Unique & BelongsToChannel
>;

export type ColumnUpdatedAction = Action<COLUMN_UPDATED, io.Column>;

export type ColumnArchivedAction = Action<COLUMN_ARCHIVED, io.Column>;

export type ColumnUnarchivedAction = Action<COLUMN_UNARCHIVED, io.Column>;

export type StoreColumnsAction = Action<STORE_COLUMNS, io.Column[]>;

export type PutColumnAction = Action<PUT_COLUMN, NormalizedColumn>;

export type PutColumnsAction = Action<PUT_COLUMNS, NormalizedColumn[]>;

export type PatchColumnAction = Action<PATCH_COLUMN, NormalizedColumn>;

export type RemoveColumnAction = Action<REMOVE_COLUMN, Unique>;

export type PatchColumnsAction = Action<PATCH_COLUMNS, NormalizedColumn[]>;

export type ColumnsReorderedAction = Action<COLUMNS_REORDERED, CardPosition[]>;

export type LoadColumnsAction = IOAction<
    LOAD_COLUMNS,
    LoadColumnsPayload,
    io.Column[]
>;

export type CreateColumnAction = IOAction<
    CREATE_COLUMN,
    CreateColumnPayload,
    io.Column
>;

export type DeleteColumnAction = IOAction<
    DELETE_COLUMN,
    DeleteColumnPayload,
    any
>;

export type UpdateColumnAction = IOAction<
    UPDATE_COLUMN,
    UpdateColumnPayload,
    io.Column
>;

export type MoveColumnAction = IOAction<
    MOVE_COLUMN,
    MoveColumnPayload,
    ColumnPosition
>;

export type ArchiveColumnAction = IOAction<
    ARCHIVE_COLUMN,
    ArchiveColumnPayload,
    io.Column
>;

export type UnarchiveColumnAction = IOAction<
    UNARCHIVE_COLUMN,
    ArchiveColumnPayload,
    io.Column
>;

export function fetchColumns(payload: FetchColumnsPayload): FetchColumnsAction {
    return createIOAction<io.Column[], FETCH_COLUMNS>(FETCH_COLUMNS, payload);
}

export function loadCards(payload: LoadCardsPayload): LoadCardsAction {
    return createIOAction<io.Card[], LOAD_CARDS>(LOAD_CARDS, payload);
}

export function loadColumns(payload: LoadColumnsPayload): LoadColumnsAction {
    return createIOAction<io.Column[], LOAD_COLUMNS>(LOAD_COLUMNS, payload);
}

export function createChecklist(
    payload: CreateChecklistPayload
): CreateChecklistAction {
    return createIOAction<io.Checklist, CREATE_CHECKLIST>(
        CREATE_CHECKLIST,
        payload
    );
}

export function updateChecklist(
    payload: UpdateChecklistPayload
): UpdateChecklistAction {
    return createIOAction<io.Checklist, UPDATE_CHECKLIST>(
        UPDATE_CHECKLIST,
        payload
    );
}

export function deleteChecklist(
    payload: DeleteChecklistPayload
): DeleteChecklistAction {
    return createIOAction<ChecklistDeletedPayload, DELETE_CHECKLIST>(
        DELETE_CHECKLIST,
        payload
    );
}

export function checklistCreated(
    payload: io.Checklist
): ChecklistCreatedAction {
    return createAction(CHECKLIST_CREATED, payload);
}

export function checklistUpdated(
    payload: io.Checklist
): ChecklistUpdatedAction {
    return createAction(CHECKLIST_UPDATED, payload);
}

export function checklistDeleted(
    payload: ChecklistDeletedPayload
): ChecklistDeletedAction {
    return createAction(CHECKLIST_DELETED, payload);
}

export function putChecklist(payload: NormalizedChecklist): PutChecklistAction {
    return createAction(PUT_CHECKLIST, payload);
}

export function putChecklists(
    payload: NormalizedChecklist[]
): PutChecklistsAction {
    return createAction(PUT_CHECKLISTS, payload);
}

export function patchChecklist(
    payload: NormalizedChecklist
): PatchChecklistAction {
    return createAction(PATCH_CHECKLIST, payload);
}

export function patchChecklists(
    payload: NormalizedChecklist[]
): PatchChecklistsAction {
    return createAction(PATCH_CHECKLISTS, payload);
}

export function removeChecklist(
    payload: RemoveChecklistPayload
): RemoveChecklistAction {
    return createAction(REMOVE_CHECKLIST, payload);
}

export function putTask(payload: io.Task): PutTaskAction {
    return createAction(PUT_TASK, payload);
}

export function removeTask(payload: TaskDeletedPayload): RemoveTaskAction {
    return createAction(REMOVE_TASK, payload);
}

export function patchTask(payload: io.Task): PatchTaskAction {
    return createAction(PATCH_TASK, payload);
}

export function patchTasks(payload: io.Task[]): PatchTasksAction {
    return createAction(PATCH_TASKS, payload);
}

export function createTask(payload: CreateTaskPayload): CreateTaskAction {
    return createIOAction<io.Task, CREATE_TASK>(CREATE_TASK, payload);
}

export function updateTask(payload: UpdateTaskPayload): UpdateTaskAction {
    return createIOAction<io.Task, UPDATE_TASK>(UPDATE_TASK, payload);
}

export function completeTask(payload: CompleteTaskPayload): CompleteTaskAction {
    return createIOAction<io.Task, COMPLETE_TASK>(COMPLETE_TASK, payload);
}

export function uncompleteTask(
    payload: UncompleteTaskPayload
): UncompleteTaskAction {
    return createIOAction<io.Task, UNCOMPLETE_TASK>(UNCOMPLETE_TASK, payload);
}

export function deleteTask(payload: DeleteTaskPayload): DeleteTaskAction {
    return createIOAction<io.Task, DELETE_TASK>(DELETE_TASK, payload);
}

export function taskCreated(payload: io.Task): TaskCreatedAction {
    return createAction(TASK_CREATED, payload);
}

export function taskUpdated(payload: io.Task): TaskUpdatedAction {
    return createAction(TASK_UPDATED, payload);
}

export function taskDeleted(payload: TaskDeletedPayload): TaskDeletedAction {
    return createAction(TASK_DELETED, payload);
}

export function tagCard(payload: TagCardPayload): TagCardAction {
    return createIOAction<io.CardTag, TAG_CARD>(TAG_CARD, payload);
}

export function untagCard(payload: UntagCardPayload): UntagCardAction {
    return createIOAction<string, UNTAG_CARD>(UNTAG_CARD, payload);
}

export function getCard(payload: GetCardPayload): GetCardAction {
    return createIOAction<io.Card, GET_CARD>(GET_CARD, payload);
}

export function fetchCards(payload: FetchCardsPayload): FetchCardsAction {
    return createIOAction<io.Card[], FETCH_CARDS>(FETCH_CARDS, payload);
}

export function markCardAsDone(
    payload: MarkCardAsDonePayload
): MarkCardAsDoneAction {
    return createIOAction<io.Card, MARK_CARD_AS_DONE>(
        MARK_CARD_AS_DONE,
        payload
    );
}

export function markCardAsUndone(
    payload: MarkCardAsUndonePayload
): MarkCardAsUndoneAction {
    return createIOAction<io.Card, MARK_CARD_AS_UNDONE>(
        MARK_CARD_AS_UNDONE,
        payload
    );
}

export function removeCard(id: string): RemoveCardAction {
    return createAction(REMOVE_CARD, { id });
}

export function cardArchived(card: io.Card): CardArchivedAction {
    return createAction(CARD_ARCHIVED, card);
}

export function cardUnarchived(card: io.Card): CardUnarchivedAction {
    return createAction(CARD_UNARCHIVED, card);
}

export function storeCard(card: io.Card): StoreCardAction {
    return createAction(STORE_CARD, card);
}

export function storeCards(cards: io.Card[]): StoreCardsAction {
    return createAction(STORE_CARDS, cards);
}

export function clearCards(payload: ClearCardPayload[]): ClearCardsAction {
    return createAction(CLEAR_CARDS, payload);
}

export function cardCreated(card: io.Card): CardCreatedAction {
    return createAction(CARD_CREATED, card);
}

export function cardDeleted(id: string): CardDeletedAction {
    return createAction(CARD_DELETED, { id });
}

export function patchCard(card: NormalizedCard): PatchCardAction {
    return createAction(PATCH_CARD, card);
}

export function patchCards(cards: NormalizedCard[]): PatchCardsAction {
    return createAction(PATCH_CARDS, cards);
}

export function putCard(card: NormalizedCard): PutCardAction {
    return createAction(PUT_CARD, card);
}

export function putCards(cards: NormalizedCard[]): PutCardsAction {
    return createAction(PUT_CARDS, cards);
}

export function moveCard(payload: MoveCardPayload): MoveCardAction {
    return createIOAction<CardPosition, MOVE_CARD>(MOVE_CARD, payload);
}

export function updateCard(payload: UpdateCardPayload): UpdateCardAction {
    return createIOAction<io.Card, UPDATE_CARD>(UPDATE_CARD, payload);
}

export function cardUpdated(payload: io.Card): CardUpdatedAction {
    return createAction(CARD_UPDATED, payload);
}

export function createCard(payload: CreateCardPayload): CreateCardAction {
    return createIOAction<io.Card, CREATE_CARD>(CREATE_CARD, payload);
}

export function cardsReordered(payload: CardPosition[]): CardsReorderedAction {
    return createAction(CARDS_REORDERED, payload);
}

export function cardTagged(payload: io.CardTag): CardTaggedAction {
    return createAction(CARD_TAGGED, payload);
}

export function cardUntagged(payload: CardUntaggedPayload): CardUntaggedAction {
    return createAction(CARD_UNTAGGED, payload);
}

export function archiveCard(payload: ArchiveCardPayload): ArchiveCardAction {
    return createIOAction<io.Card, ARCHIVE_CARD>(ARCHIVE_CARD, payload);
}

export function delelteCard(payload: DeleteCardPayload): DeleteCardAction {
    return createIOAction<Partial<io.Card>, DELETE_CARD>(DELETE_CARD, payload);
}

export function unarchiveCard(
    payload: UnarchiveCardPayload
): UnarchiveCardAction {
    return createIOAction<io.Card, UNARCHIVE_CARD>(UNARCHIVE_CARD, payload);
}
export function removeColumn(id: string): RemoveColumnAction {
    return createAction(REMOVE_COLUMN, { id });
}

export function columnDeleted(
    channel: Unique & BelongsToChannel
): ColumnDeletedAction {
    return createAction(COLUMN_DELETED, channel);
}

export function columnUnarchived(column: io.Column): ColumnUnarchivedAction {
    return createAction(COLUMN_UNARCHIVED, column);
}

export function columnArchived(column: io.Column): ColumnArchivedAction {
    return createAction(COLUMN_ARCHIVED, column);
}

export function patchColumn(column: NormalizedColumn): PatchColumnAction {
    return createAction(PATCH_COLUMN, column);
}

export function patchColumns(columns: NormalizedColumn[]): PatchColumnsAction {
    return createAction(PATCH_COLUMNS, columns);
}

export function columnCreated(column: io.Column): ColumnCreateAction {
    return createAction(COLUMN_CREATED, column);
}

export function putColumn(column: NormalizedColumn): PutColumnAction {
    return createAction(PUT_COLUMN, column);
}

export function putColumns(columns: NormalizedColumn[]): PutColumnsAction {
    return createAction(PUT_COLUMNS, columns);
}

export function moveColumn(payload: MoveColumnPayload): MoveColumnAction {
    return createIOAction<CardPosition, MOVE_COLUMN>(MOVE_COLUMN, payload);
}

export function updateColumn(payload: UpdateColumnPayload): UpdateColumnAction {
    return createIOAction<io.Column, UPDATE_COLUMN>(UPDATE_COLUMN, payload);
}

export function deleteColumn(payload: DeleteColumnPayload): DeleteColumnAction {
    return createIOAction<any, DELETE_COLUMN>(DELETE_COLUMN, payload);
}

export function columnUpdated(payload: io.Column): ColumnUpdatedAction {
    return createAction(COLUMN_UPDATED, payload);
}

export function createColumn(payload: CreateColumnPayload): CreateColumnAction {
    return createIOAction<io.Column, CREATE_COLUMN>(CREATE_COLUMN, payload);
}

export function storeColumns(payload: io.Column[]): StoreColumnsAction {
    return createAction<STORE_COLUMNS>(STORE_COLUMNS, payload);
}

export function columnsReordered(
    payload: ColumnPosition[]
): ColumnsReorderedAction {
    return createAction<COLUMNS_REORDERED>(COLUMNS_REORDERED, payload);
}

export function archiveColumn(
    payload: ArchiveColumnPayload
): ArchiveColumnAction {
    return createIOAction<io.Column, ARCHIVE_COLUMN>(ARCHIVE_COLUMN, payload);
}

export function unarchiveColumn(
    payload: UnarchiveColumnPayload
): UnarchiveColumnAction {
    return createIOAction<io.Column, UNARCHIVE_COLUMN>(
        UNARCHIVE_COLUMN,
        payload
    );
}
