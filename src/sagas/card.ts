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

function* fetch({ payload, meta }: FetchCardsAction) {
    try {
        const { data } = yield Client.board.fetchCards(payload);
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

function* load({ payload, meta }: LoadCardsAction) {
    try {
        const data = yield yield put(fetchCards(payload));
        yield put(storeCards(data));
        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

function* create({ payload, meta }: CreateCardAction) {
    try {
        const { data } = yield Client.board.createCard(payload);

        yield put(cardCreated(data));

        meta.success(data);
    } catch (e) {
        meta.error(e);
    }
}

function* update({ payload, meta }: UpdateCardAction) {
    try {
        const { data } = yield Client.board.updateCard(payload);
        meta.success(data);
        yield put(cardUpdated(data));
    } catch (e) {
        meta.error(e);
    }
}

function* move({ payload, meta }: MoveCardAction) {
    if (payload.position == 0 || payload.position) {
        let patches: CardPosition[] = [];

        let { cards } = (yield select()) as State;

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
        const { data } = yield Client.board.moveCard(payload);
        yield put(cardUpdated(data));
        meta.success(data);
    } catch (e) {
        meta.error(e.toString());
    }
}

function* store({
    payload,
}: CardCreatedAction | StoreCardAction | StoreCardsAction) {
    let [cards, related] = CardSchema.normalize(payload as any);

    yield put(storeRelated(related));

    if (Array.isArray(cards)) {
        yield put(putCards(cards));
    } else {
        yield put(putCard(cards));
    }
}

function* patch({ payload }: PatchCardAction | PatchCardsAction) {
    let [cards, related] = CardSchema.normalize(payload as any);

    yield put(storeRelated(related));

    if (Array.isArray(cards)) {
        yield put(patchCards(cards));
    } else {
        yield put(patchCard(cards));
    }
}

function* tagged({ payload }: CardTaggedAction) {
    const { cards } = (yield select()) as State;
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

function* untagged({ payload }: CardUntaggedAction) {
    const { cards } = (yield select()) as State;
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

function* remove({ payload }: CardDeletedAction | CardArchivedAction) {
    yield put(removeCard(payload.id));
}

function* related({ payload }: StoreRelatedAction) {
    let cards = CardSchema.getCollection(payload);

    if (cards.length > 0) {
        yield put(putCards(cards));
    }
}

function* trash({ payload, meta }: DeleteCardAction) {
    try {
        const { data } = yield Client.board.deleteCard(payload);
        meta.success(data);
        yield put(cardDeleted(payload.card_id));
    } catch (e) {
        meta.error(e.toString());
    }
}

function* archive({ payload, meta }: ArchiveCardAction) {
    try {
        const { data } = yield Client.board.archiveCard(payload);
        meta.success(data);
        yield put(cardArchived(data));
    } catch (e) {
        meta.error(e.toString());
    }
}

function* done({ payload, meta }: MarkCardAsDoneAction) {
    try {
        const { data } = yield Client.board.markAsDone(payload);
        yield put(cardUpdated(data));
        meta.success(data);
    } catch (e) {
        meta.error(e.toString());
    }
}

function* unarchive({ payload, meta }: UnarchiveCardAction) {
    try {
        const { data } = yield Client.board.unarchiveCard(payload);
        meta.success(data);
        yield put(cardUnarchived(data));
    } catch (e) {
        meta.error(e.toString());
    }
}

function* tag({ payload, meta }: TagCardAction) {
    try {
        const { data } = yield Client.board.tagCard(payload);
        meta.success(data);
        yield put(cardTagged(data));
    } catch (e) {
        meta.error(e.toString());
    }
}

function* untag({ payload, meta }: UntagCardAction) {
    try {
        const { data } = yield Client.board.untagCard(payload);
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
