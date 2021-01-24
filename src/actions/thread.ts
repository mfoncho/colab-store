import { Require, Optional } from "@colab/types";
import { io } from "@colab/client";
import { IOAction, createIOAction, createAction, Action } from "./index";
import { NormalizedMessage } from "../schemas";
import {
    CREATE_TOPIC,
    UPDATE_TOPIC,
    DELETE_TOPIC,
    LOAD_TOPICS,
    THREAD_CREATED,
    THREAD_UPDATED,
    THREAD_DELETED,
    POST_MESSAGE,
    PATCH_THREAD,
    LOAD_THREAD,
    PUT_THREAD,
    PUT_THREADS,
    DELETE_MESSAGE,
    REACT_MESSAGE,
    UNREACT_MESSAGE,
    FLAG_MESSAGE,
    PATCH_MESSAGE,
    UNFLAG_MESSAGE,
    PIN_MESSAGE,
    REMOVE_THREAD,
    THREAD_ACTIVITY,
    UNPIN_MESSAGE,
    LOAD_CONVERSATION,
    GET_THREAD,
    USER_REACTED,
    USER_UNREACTED,
    UPDATE_MESSAGE,
    NEW_MESSAGE,
    TRIM_CONVSERSATION,
    SET_CONVERSATION_PAGE,
    INIT_CONVERSATION,
    CREATE_CONVERSATION,
    FETCH_MESSAGES,
    REMOVE_CONVERSATION,
    LOADING_CONVERSATION,
    PUT_MESSAGES,
    REMOVE_MESSAGE,
    PUT_MESSAGE,
    MESSAGE_UPDATED,
    MESSAGE_DELETED,
    CONCAT_CONVERSATION,
} from "./types";

export interface LoadTopicsPayload {
    channel_id: string;
}

export interface CreateTopicPayload {
    channel_id: string;
    topic: string;
}

export interface UpdateTopicPayload {
    channel_id: string;
    thread_id: string;
    is_active?: boolean;
    is_default?: boolean;
    topic?: string;
}

export interface DeleteTopicPayload {
    channel_id: string;
    thread_id: string;
}

export interface TrimConversationPayload {
    mode: "top" | "bottom";
    amount: number;
    thread_id: string;
    channel_id?: string;
}

export interface ThreadActivityPayload {
    type: "typing" | "viewing";
    thread_id: string;
    channel_id: string;
}

export interface SetConversationPagePayload {
    mid: string;
    top: number;
    follow: boolean;
    thread_id: string;
    channel_id: string;
}

export interface LoadConversationPayload {
    message_id?: string;
    channel_id: string;
    thread_id: string;
    limit: number;
    more: "top" | "bottom" | "around";
}

export interface LoadThreadPayload {
    channel_id: string;
    thread_id: string;
}

export interface UpdateMessagePayload {
    markdown?: boolean;
    text: string;
    thread_id: string;
    channel_id: string;
    message_id: string;
}

export interface ConcatConversationPayload {
    thread_id: string;
    mode: "prepend" | "append";
    messages: NormalizedMessage[];
}

export interface PostMessagePayload {
    text: string;
    file?: File;
    markdown?: boolean;
    thread_id: string;
    channel_id: string;
}

export type ThreadDeletedPayload = Require<
    Partial<io.Thread>,
    "id" | "channel_id"
>;

export type RemoveThreadPayload = ThreadDeletedPayload;

export type MinimalMessage = Require<Partial<io.Message>, "id" | "thread_id">;

export interface InitConversationPayload {
    thread_id: string;
    channel_id: string;
}

export interface FetchMessagesPayload {
    thread_id: string;
    channel_id: string;
    page?: {
        limit?: number;
        after?: string;
        before?: string;
    };
}

export interface DeleteMessagePayload {
    channel_id: string;
    thread_id: string;
    message_id: string;
}

export interface RemoveConversationPayload {
    thread_id: string;
}

export interface LoadingConversationPayload {
    thread_id: string;
    loading: {
        top?: boolean;
        bottom?: boolean;
    };
}

export interface ReactMessagePayload {
    message_id: string;
    thread_id: string;
    channel_id: string;
    name: string;
}

export interface UnreactMessagePayload {
    message_id: string;
    thread_id: string;
    channel_id: string;
    name: string;
}

export interface PinMessagePayload {
    message_id: string;
    thread_id: string;
    channel_id: string;
}

export interface FlagMessagePayload {
    message_id: string;
    thread_id: string;
    channel_id: string;
}

export interface UnpinMessagePayload {
    message_id: string;
    thread_id: string;
    channel_id: string;
}

export interface UnflagMessagePayload {
    message_id: string;
    thread_id: string;
    channel_id: string;
}

export interface PutMessagesPayload {
    prepend?: boolean;
    thread_id: string;
    messages: io.UserMessage[];
}

export interface PutMessagePayload {
    prepend?: boolean;
    message: io.UserMessage;
}

export interface GetThreadPayload {
    thread_id: string;
    channel_id: string;
}

export interface RemoveMessagePayload {
    id: string;
    thread_id: string;
}

export type RemoveMessageAction = Action<REMOVE_MESSAGE, RemoveMessagePayload>;

export type PutMessageAction = Action<PUT_MESSAGE, NormalizedMessage>;

export type PutMessagesAction = Action<PUT_MESSAGES, NormalizedMessage[]>;

export type CreateConversationAction = Action<
    CREATE_CONVERSATION,
    InitConversationPayload
>;

export type ConcatConversationAction = Action<
    CONCAT_CONVERSATION,
    ConcatConversationPayload
>;

export type MessageDeletedAction = Action<MESSAGE_DELETED, MinimalMessage>;

export type NewMessageAction = Action<NEW_MESSAGE, io.Message>;

export type PatchMessageAction = Action<PATCH_MESSAGE, NormalizedMessage>;

export type RemoveConversationAction = Action<
    REMOVE_CONVERSATION,
    RemoveConversationPayload
>;

export type LoadingConversationAction = Action<
    LOADING_CONVERSATION,
    LoadingConversationPayload
>;

export type PutThreadAction = Action<PUT_THREAD, io.Thread>;

export type PatchThreadAction = Action<PATCH_THREAD, io.Thread>;

export type PutThreadsAction = Action<PUT_THREADS, io.Thread[]>;

export type MessageUpdatedAction = Action<MESSAGE_UPDATED, io.Message>;

export type CreateTopicAction = IOAction<
    CREATE_TOPIC,
    CreateTopicPayload,
    io.Thread
>;

export type UpdateTopicAction = IOAction<
    UPDATE_TOPIC,
    UpdateTopicPayload,
    io.Thread
>;

export type LoadTopicsAction = IOAction<
    LOAD_TOPICS,
    LoadTopicsPayload,
    io.Thread[]
>;

export type DeleteTopicAction = IOAction<DELETE_TOPIC, DeleteTopicPayload, any>;

export type GetThreadAction = IOAction<GET_THREAD, GetThreadPayload, io.Thread>;

export type LoadThreadAction = IOAction<
    LOAD_THREAD,
    LoadThreadPayload,
    io.Thread
>;

export type InitConversationAction = IOAction<
    INIT_CONVERSATION,
    InitConversationPayload,
    undefined
>;

export type ReactMessageAction = IOAction<
    REACT_MESSAGE,
    ReactMessagePayload,
    io.Message
>;

export type UnreactMessageAction = IOAction<
    UNREACT_MESSAGE,
    UnreactMessagePayload,
    io.Message
>;

export type DeleteMessageAction = IOAction<
    DELETE_MESSAGE,
    DeleteMessagePayload,
    any
>;

export type UpdateMessageAction = IOAction<
    UPDATE_MESSAGE,
    UpdateMessagePayload,
    io.Message
>;

export type FetchMessagesAction = IOAction<
    FETCH_MESSAGES,
    FetchMessagesPayload,
    io.UserMessage
>;

export type PinMessageAction = IOAction<
    PIN_MESSAGE,
    PinMessagePayload,
    io.Message
>;

export type UnpinMessageAction = IOAction<
    UNPIN_MESSAGE,
    UnpinMessagePayload,
    io.Message
>;

export type FlagMessageAction = IOAction<
    FLAG_MESSAGE,
    FlagMessagePayload,
    io.Message
>;

export type UnflagMessageAction = IOAction<
    UNFLAG_MESSAGE,
    UnflagMessagePayload,
    io.Message
>;

export type PostMessageAction = IOAction<
    POST_MESSAGE,
    PostMessagePayload,
    io.Message
>;

export type ThreadActivityAction = Action<
    THREAD_ACTIVITY,
    ThreadActivityPayload
>;

export type SetConversationPageAction = Action<
    SET_CONVERSATION_PAGE,
    SetConversationPagePayload
>;

export type ThreadCreatedAction = Action<THREAD_CREATED, io.Thread>;

export type ThreadUpdatedAction = Action<THREAD_UPDATED, io.Thread>;

export type ThreadDeletedAction = Action<THREAD_DELETED, ThreadDeletedPayload>;

export type LoadConversationAction = IOAction<
    LOAD_CONVERSATION,
    LoadConversationPayload,
    io.Message[]
>;

export type RemoveThreadAction = Action<REMOVE_THREAD, RemoveThreadPayload>;

export type UserReactedAction = Action<USER_REACTED, io.Reaction>;

export type UserUnreactedAction = Action<USER_UNREACTED, io.Reaction>;

export type TrimConversationAction = Action<
    TRIM_CONVSERSATION,
    TrimConversationPayload
>;

export function setConversationPage(
    payload: SetConversationPagePayload
): SetConversationPageAction {
    return createAction(SET_CONVERSATION_PAGE, payload);
}

export function removeMessage(
    payload: RemoveMessagePayload
): RemoveMessageAction {
    return {
        type: REMOVE_MESSAGE,
        payload: payload,
    };
}

export function putMessage(payload: NormalizedMessage): PutMessageAction {
    return {
        type: PUT_MESSAGE,
        payload: payload,
    };
}

export function postMessage(payload: NormalizedMessage): PostMessageAction {
    return createIOAction<io.Message, POST_MESSAGE>(POST_MESSAGE, payload);
}

export function flagMesssag(payload: FlagMessagePayload): FlagMessageAction {
    return createIOAction<io.Message, FLAG_MESSAGE>(FLAG_MESSAGE, payload);
}

export function unflagMesssag(
    payload: UnflagMessagePayload
): UnflagMessageAction {
    return createIOAction<io.Message, UNFLAG_MESSAGE>(UNFLAG_MESSAGE, payload);
}

export function pinMesssag(payload: PinMessagePayload): PinMessageAction {
    return createIOAction<io.Message, PIN_MESSAGE>(PIN_MESSAGE, payload);
}

export function unpinMesssag(payload: UnpinMessagePayload): UnpinMessageAction {
    return createIOAction<io.Message, UNPIN_MESSAGE>(UNPIN_MESSAGE, payload);
}

export function deleteMessage(
    payload: DeleteMessagePayload
): DeleteMessageAction {
    return createIOAction<any, DELETE_MESSAGE>(DELETE_MESSAGE, payload);
}

export function putMessages(payload: NormalizedMessage[]): PutMessagesAction {
    return createAction(PUT_MESSAGES, payload);
}

export function createConversation(
    payload: InitConversationPayload
): CreateConversationAction {
    return createAction(CREATE_CONVERSATION, payload);
}

export function removeConversation(
    payload: RemoveConversationPayload
): RemoveConversationAction {
    return createAction(REMOVE_CONVERSATION, payload);
}

export function loadingConversation(
    payload: LoadingConversationPayload
): LoadingConversationAction {
    return createAction(LOADING_CONVERSATION, payload);
}

export function removeThread(payload: RemoveThreadPayload): RemoveThreadAction {
    return createAction(REMOVE_THREAD, payload);
}

export function getThread(payload: GetThreadPayload): GetThreadAction {
    return createIOAction<io.Thread, GET_THREAD>(GET_THREAD, payload);
}

export function initConversation(
    payload: InitConversationPayload
): InitConversationAction {
    return createIOAction<undefined, INIT_CONVERSATION>(
        INIT_CONVERSATION,
        payload
    );
}

export function messageDeleted(message: MinimalMessage): MessageDeletedAction {
    return createAction(MESSAGE_DELETED, message);
}

export function updateMessage(
    payload: UpdateMessagePayload
): UpdateMessageAction {
    return createIOAction<io.Message, UPDATE_MESSAGE>(UPDATE_MESSAGE, payload);
}

export function putThread(payload: io.Thread): PutThreadAction {
    return createAction(PUT_THREAD, payload);
}

export function putThreads(payload: io.Thread[]): PutThreadsAction {
    return createAction(PUT_THREADS, payload);
}

export function createTopic(payload: CreateTopicPayload): CreateTopicAction {
    return createIOAction<io.Thread, CREATE_TOPIC>(CREATE_TOPIC, payload);
}

export function updateTopic(payload: UpdateTopicPayload): UpdateTopicAction {
    return createIOAction<io.Thread, UPDATE_TOPIC>(UPDATE_TOPIC, payload);
}

export function deleteTopic(payload: DeleteTopicPayload): DeleteTopicAction {
    return createIOAction<any, DELETE_TOPIC>(DELETE_TOPIC, payload);
}

export function loadThread(payload: LoadThreadPayload): LoadThreadAction {
    return createIOAction<io.Thread, LOAD_THREAD>(LOAD_THREAD, payload);
}

export function patchMessage(payload: NormalizedMessage): PatchMessageAction {
    return createAction(PATCH_MESSAGE, payload);
}

export function threadActivity(
    payload: ThreadActivityPayload
): ThreadActivityAction {
    return createAction(THREAD_ACTIVITY, payload);
}

export function concatConversation(payload: ConcatConversationPayload) {
    return createAction(CONCAT_CONVERSATION, payload);
}

export function newMessage(payload: io.Message): NewMessageAction {
    return createAction(NEW_MESSAGE, payload);
}

export function messageUpdated(payload: io.Message): MessageUpdatedAction {
    return createAction(MESSAGE_UPDATED, payload);
}

export function reactMessage(payload: ReactMessagePayload): ReactMessageAction {
    return createIOAction<io.Message, REACT_MESSAGE>(REACT_MESSAGE, payload);
}

export function userReacted(reaction: io.Reaction): UserReactedAction {
    return createAction(USER_REACTED, reaction);
}

export function userUnreacted(reaction: io.Reaction): UserUnreactedAction {
    return createAction(USER_UNREACTED, reaction);
}

export function unreactMessage(
    payload: UnreactMessagePayload
): UnreactMessageAction {
    return createIOAction<io.Message, UNREACT_MESSAGE>(
        UNREACT_MESSAGE,
        payload
    );
}

export function threadCreated(payload: io.Thread): ThreadCreatedAction {
    return createAction(THREAD_CREATED, payload);
}

export function threadUpdated(payload: io.Thread): ThreadUpdatedAction {
    return createAction(THREAD_UPDATED, payload);
}

export function threadDeleted(
    payload: ThreadDeletedPayload
): ThreadDeletedAction {
    return createAction(THREAD_DELETED, payload);
}

export function patchThread(payload: io.Thread): PatchThreadAction {
    return createAction(PATCH_THREAD, payload);
}

export function loadConversation({
    limit = 25,
    ...params
}: Optional<LoadConversationPayload, "limit">): LoadConversationAction {
    return createIOAction<io.Message[], LOAD_CONVERSATION>(LOAD_CONVERSATION, {
        ...params,
        limit,
    });
}

export function loadTopics(payload: LoadTopicsPayload): LoadTopicsAction {
    return createIOAction<io.Thread[], LOAD_TOPICS>(LOAD_TOPICS, payload);
}

export function trimConversation(
    params: TrimConversationPayload
): TrimConversationAction {
    return createAction(TRIM_CONVSERSATION, params);
}

export function fetchMessages(
    payload: FetchMessagesPayload
): FetchMessagesAction {
    return createIOAction<io.UserMessage, FETCH_MESSAGES>(
        FETCH_MESSAGES,
        payload
    );
}
