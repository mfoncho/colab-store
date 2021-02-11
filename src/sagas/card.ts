import { put, select, takeEvery } from "redux-saga/effects";
import { State } from "..";
import { CardRecord } from "../records";
import {
    MOVE_CARD,
    FETCH_CARDS,
    STORE_RELATED,
    CARD_UPDATED,
    CARD_DELETED,
    LOAD_CARDS,
    CARD_CREATED,
    CREATE_CARD,
    CARD_ARCHIVED,
    CARD_UNARCHIVED,
    CARDS_REORDERED,
    CARD_TAGGED,
    CARD_UNTAGGED,
    STORE_CARDS,
    CARD_DONE,
    DELETE_CARD,
    ARCHIVE_CARD,
    UNARCHIVE_CARD,
    MARK_CARD_AS_DONE,
    MARK_CARD_AS_UNDONE,
    UPDATE_CARD,
    TAG_CARD,
    STORE_CARD,
    UNTAG_CARD,
} from "../actions/types";
import { CardSchema } from "../schemas";
import {
    CardPosition,
    patchCard,
    patchCards,
    removeCard,
    StoreCardAction,
    StoreCardsAction,
    CardCreatedAction,
    cardsReordered,
    PatchCardAction,
    PatchCardsAction,
    CreateCardAction,
    CardDeletedAction,
    MoveCardAction,
    putCards,
    FetchCardsAction,
    CardTaggedAction,
    CardUntaggedAction,
    CardArchivedAction,
    cardCreated,
    DeleteCardAction,
    cardDeleted,
    ArchiveCardAction,
    UnarchiveCardAction,
    cardArchived,
    cardUnarchived,
    putCard,
    MarkCardAsDoneAction,
    cardUpdated,
    UpdateCardAction,
    TagCardAction,
    UntagCardAction,
    LoadCardsAction,
    cardTagged,
    cardUntagged,
    storeCards,
    fetchCards,
} from "../actions/board";
import { storeRelated, StoreRelatedAction } from "../actions/app";
import Client, { io } from "@colab/client";

function* fetch({ payload, meta }: FetchCardsAction): Iterable<any> {
    try {
        const { data } = (yield Client.fetchCards(payload)) as any;
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

function* load({ payload, meta }: LoadCardsAction): Iterable<any> {
    try {
        const data = ((yield yield put(
            fetchCards(payload)
        )) as any) as io.Card[];
        yield put(storeCards(data));
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

function* create({ payload, meta }: CreateCardAction): Iterable<any> {
    try {
        const { data } = (yield Client.createCard(payload)) as any;

        yield put(cardCreated(data));

        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

function* update({ payload, meta }: UpdateCardAction): Iterable<any> {
    try {
        const { data } = (yield Client.updateCard(payload)) as any;
        meta.success(data);
        yield put(cardUpdated(data));
    } catch (e) {
        meta.error(e);
    }
}

function* move({ payload, meta }: MoveCardAction): Iterable<any> {
    if (payload.position == 0 || payload.position) {
        let patches: CardPosition[] = [];

        let { cards } = ((yield select()) as any) as State;

        const path = cards.paths.get(payload.card_id)!;

        const card = cards.entities.getIn(path) as CardRecord;

        let destination = cards.entities.get(path[0])!.get(payload.column_id);

        if (path[1] != payload.column_id) {
            if (destination != null) {
                const updates = { column_id: payload.column_id };
                destination
                    .toList()
                    .insert(payload.position, card.merge(updates))
                    .forEach((ccard, index) => {
                        if (ccard.position != index || ccard.id == card.id) {
                            patches.push({
                                id: ccard.id,
                                position: index,
                                column_id: ccard.column_id,
                            });
                        }
                    });
            } else {
                patches.push({
                    id: payload.card_id,
                    position: payload.position,
                    column_id: payload.column_id,
                });
            }
        } else {
            cards.entities
                .get(path[0])!
                .get(path[1])!
                .delete(card.id)
                .toList()
                .insert(payload.position, card)
                .forEach((ccard, index) => {
                    if (ccard.position != index) {
                        patches.push({
                            id: ccard.id,
                            position: index,
                            column_id: ccard.column_id,
                        });
                    }
                });
        }

        yield put(cardsReordered(patches));
    }

    try {
        const { data } = (yield Client.moveCard(payload)) as any;
        yield put(cardUpdated(data));
        meta.success(data);
    } catch (e) {
        meta.error(e.toString());
    }
}

function* store({
    payload,
}: CardCreatedAction | StoreCardAction | StoreCardsAction): Iterable<any> {
    let [cards, related] = CardSchema.normalize(payload as any);

    yield put(storeRelated(related));

    if (Array.isArray(cards)) {
        yield put(putCards(cards));
    } else {
        yield put(putCard(cards));
    }
}

function* patch({
    payload,
}: PatchCardAction | PatchCardsAction): Iterable<any> {
    let [cards, related] = CardSchema.normalize(payload as any);

    yield put(storeRelated(related));

    if (Array.isArray(cards)) {
        yield put(patchCards(cards));
    } else {
        yield put(patchCard(cards));
    }
}

function* tagged({ payload }: CardTaggedAction): Iterable<any> {
    const { cards } = ((yield select()) as any) as State;
    const path = cards.paths.get(payload.card_id);

    if (path) {
        const card = cards.entities
            .get(path[0])!
            .get(path[1])!
            .get(payload.card_id)!;
        if (!Boolean(card.tags.find((tag) => tag.get("id") == payload.id))) {
            const tags = card.tags.toJS().concat(payload) as typeof payload[];

            let params = {
                id: payload.card_id,
                tags: tags,
            };

            yield put(patchCard(params));
        }
    }
}

function* untagged({ payload }: CardUntaggedAction): Iterable<any> {
    const { cards } = ((yield select()) as any) as State;
    const path = cards.paths.get(payload.card_id);

    if (path) {
        const card = cards.entities
            .get(path[0])!
            .get(path[1])!
            .get(payload.card_id)!;
        const tags = (card.tags
            .filter((tag) => tag.tag_id !== payload.tag_id)
            .toJS() as any) as io.CardTag[];
        let params = {
            id: payload.card_id,
            tags: tags,
        };
        yield put(patchCard(params));
    }
}

function* remove({
    payload,
}: CardDeletedAction | CardArchivedAction): Iterable<any> {
    yield put(removeCard(payload.id));
}

function* related({ payload }: StoreRelatedAction): Iterable<any> {
    let cards = CardSchema.getCollection(payload);

    if (cards.length > 0) {
        yield put(putCards(cards));
    }
}

function* trash({ payload, meta }: DeleteCardAction): Iterable<any> {
    try {
        const { data } = (yield Client.deleteCard(payload)) as any;
        meta.success(data);
        yield put(cardDeleted(payload.card_id));
    } catch (e) {
        meta.error(e.toString());
    }
}

function* archive({ payload, meta }: ArchiveCardAction): Iterable<any> {
    try {
        const { data } = (yield Client.archiveCard(payload)) as any;
        meta.success(data);
        yield put(cardArchived(data));
    } catch (e) {
        meta.error(e.toString());
    }
}

function* done({ payload, meta }: MarkCardAsDoneAction): Iterable<any> {
    try {
        const { data } = (yield Client.markCardAsDone(payload)) as any;
        yield put(cardUpdated(data));
        meta.success(data);
    } catch (e) {
        meta.error(e.toString());
    }
}

function* undone({ payload, meta }: MarkCardAsDoneAction): Iterable<any> {
    try {
        const { data } = (yield Client.markCardAsUndone(payload)) as any;
        yield put(cardUpdated(data));
        meta.success(data);
    } catch (e) {
        meta.error(e.toString());
    }
}

function* unarchive({ payload, meta }: UnarchiveCardAction): Iterable<any> {
    try {
        const { data } = (yield Client.unarchiveCard(payload)) as any;
        meta.success(data);
        yield put(cardUnarchived(data));
    } catch (e) {
        meta.error(e.toString());
    }
}

function* tag({ payload, meta }: TagCardAction): Iterable<any> {
    try {
        const { data } = (yield Client.tagCard(payload)) as any;
        meta.success(data);
        yield put(cardTagged(data));
    } catch (e) {
        meta.error(e.toString());
    }
}

function* untag({ payload, meta }: UntagCardAction): Iterable<any> {
    try {
        const { data } = (yield Client.untagCard(payload)) as any;
        meta.success(data);
        yield put(cardUntagged(payload));
    } catch (e) {
        meta.error(e.toString());
    }
}

export const tasks = [
    { effect: takeEvery, type: STORE_RELATED, handler: related },

    { effect: takeEvery, type: MOVE_CARD, handler: move },

    { effect: takeEvery, type: CREATE_CARD, handler: create },

    { effect: takeEvery, type: CARD_UPDATED, handler: patch },

    { effect: takeEvery, type: STORE_CARD, handler: store },

    { effect: takeEvery, type: LOAD_CARDS, handler: load },

    { effect: takeEvery, type: STORE_CARDS, handler: store },

    { effect: takeEvery, type: CARD_CREATED, handler: store },

    { effect: takeEvery, type: CARD_DELETED, handler: remove },

    { effect: takeEvery, type: CARD_DONE, handler: patch },

    { effect: takeEvery, type: DELETE_CARD, handler: trash },

    { effect: takeEvery, type: MARK_CARD_AS_DONE, handler: done },

    { effect: takeEvery, type: MARK_CARD_AS_UNDONE, handler: undone },

    { effect: takeEvery, type: UNARCHIVE_CARD, handler: unarchive },

    { effect: takeEvery, type: ARCHIVE_CARD, handler: archive },

    { effect: takeEvery, type: CARD_ARCHIVED, handler: store },

    { effect: takeEvery, type: CARD_UNARCHIVED, handler: store },

    { effect: takeEvery, type: CARD_TAGGED, handler: tagged },

    { effect: takeEvery, type: CARDS_REORDERED, handler: patch },

    { effect: takeEvery, type: UPDATE_CARD, handler: update },

    { effect: takeEvery, type: TAG_CARD, handler: tag },

    { effect: takeEvery, type: UNTAG_CARD, handler: untag },

    { effect: takeEvery, type: CARD_UNTAGGED, handler: untagged },

    { effect: takeEvery, type: FETCH_CARDS, handler: fetch },
];
