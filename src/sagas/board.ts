import { takeEvery } from "redux-saga/effects";
import { socket } from "@colab/client";
import { io } from "@colab/client";
import { dispatch } from "..";
import { PUT_CHANNEL, PUT_CHANNELS } from "../actions/types";
import { PutChannelAction, PutChannelsAction } from "../actions/channel";
import {
    cardCreated,
    cardUpdated,
    cardDeleted,
    cardUnarchived,
    columnCreated,
    columnUpdated,
    columnDeleted,
    checklistCreated,
    checklistUpdated,
    checklistDeleted,
    taskCreated,
    taskUpdated,
    taskDeleted,
    cardsReordered,
    columnsReordered,
    cardTagged,
    cardUntagged,
} from "../actions/board";

function* subscribe({
    payload,
}: PutChannelAction | PutChannelsAction): Iterable<any> {
    if (!Array.isArray(payload)) {
        payload = [payload];
    }
    for (let board of payload as any) {
        const topic = `board:${board.id}`;

        if ((socket as any).channels.find((ch: any) => ch.topic == topic))
            continue;

        let ch = socket.channel(topic, {});

        ch.on("card.created", (payload: io.Card) => {
            dispatch(cardCreated(payload));
        });

        ch.on("card.updated", (payload: io.Card) => {
            dispatch(cardUpdated(payload));
        });

        ch.on("card.done", (payload: io.Card) => {
            dispatch(cardUpdated(payload));
        });

        ch.on("card.undone", (payload: io.Card) => {
            dispatch(cardUpdated(payload));
        });

        ch.on("card.archived", (payload: io.Card) => {
            dispatch(cardUpdated(payload));
        });

        ch.on("card.unarchived", (payload: io.Card) => {
            dispatch(cardUnarchived(payload));
        });

        ch.on("card.deleted", (payload: io.Card) => {
            dispatch(cardDeleted(payload.id));
        });

        ch.on("column.created", (payload: io.Column) => {
            dispatch(columnCreated(payload));
        });

        ch.on("column.updated", (payload: io.Column) => {
            dispatch(columnUpdated(payload));
        });

        ch.on("column.archived", (payload: io.Column) => {
            dispatch(columnUpdated(payload));
        });

        ch.on("column.unarchived", (payload: io.Column) => {
            dispatch(columnUpdated(payload));
        });

        ch.on("column.deleted", (payload: io.Column) => {
            dispatch(columnDeleted(payload));
        });

        ch.on("checklist.created", (payload: io.Checklist) => {
            dispatch(checklistCreated(payload));
        });

        ch.on("checklist.updated", (payload: io.Checklist) => {
            dispatch(checklistUpdated(payload));
        });

        ch.on("checklist.deleted", (payload: io.Checklist) => {
            dispatch(checklistDeleted(payload));
        });

        ch.on("task.created", (payload: io.Task) => {
            dispatch(taskCreated(payload));
        });

        ch.on("task.updated", (payload: io.Task) => {
            dispatch(taskUpdated(payload));
        });

        ch.on("task.completed", (payload: io.Task) => {
            dispatch(taskUpdated(payload));
        });

        ch.on("task.uncompleted", (payload: io.Task) => {
            dispatch(taskUpdated(payload));
        });

        ch.on("task.deleted", (payload: io.Task) => {
            dispatch(taskDeleted(payload));
        });

        ch.on("card.tagged", (payload: io.CardTag) => {
            dispatch(cardTagged(payload));
        });

        ch.on("card.untagged", (payload: io.CardTag) => {
            dispatch(cardUntagged(payload));
        });

        ch.on("cards.reordered", ({ cards }: { cards: io.Card[] }) => {
            dispatch(cardsReordered(cards));
        });

        ch.on("columns.reordered", ({ columns }: { columns: io.Column[] }) => {
            dispatch(columnsReordered(columns));
        });

        ch.join()
            .receive("ok", () => {})
            .receive("error", () => {});
    }
}

export const tasks = [
    { effect: takeEvery, type: PUT_CHANNEL, handler: subscribe },
    { effect: takeEvery, type: PUT_CHANNELS, handler: subscribe },
];
