import { Record, Map, OrderedMap } from "immutable";
import {
    patchCard,
    PatchCardAction,
    PatchCardsAction,
    putCard,
    PutCardAction,
    PutCardsAction,
    RemoveCardAction,
} from "../actions/board";
import { CardRecord } from "../records";
import { positionSort } from '../utils';


type CardIDT = string;

type ColumnIDT = string;

type ChannelIDT = string;

type CardPathT = [ChannelIDT, ColumnIDT, CardIDT];

const defaultColumnCards = OrderedMap<string, CardRecord>();

export class Cards extends Record(
    {
        paths: Map<CardIDT, CardPathT>(),
        entities: Map<
            ChannelIDT,
            Map<ColumnIDT, OrderedMap<CardIDT, CardRecord>>
        >(),
    },
    "cards"
) {}

export const state = new Cards();

function PUT_CARD(state: Cards, { payload }: PutCardAction) {
    if (state.paths.has(payload.id!)) {
        return PATCH_CARD(state, patchCard(payload));
    } else {
        const card = new CardRecord(payload);

        const path = card.getStorePath();

        return state.withMutations((state: Cards) => {
            state.setIn(["paths", payload.id], path);
            state.updateIn(
                ["entities", path[0], path[1]],
                (
                    cards: OrderedMap<string, CardRecord> = defaultColumnCards
                ) => {
                    return cards
                        .set(card.id, card)
                        .sort(positionSort)
                        .toOrderedMap();
                }
            );
        });
    }
}

function PUT_CARDS(state: Cards, action: PutCardsAction) {
    state = action.payload.reduce((state: Cards, payload) => {
        return PUT_CARD(state, putCard(payload));
    }, state);
    return state;
}

function PATCH_CARD(state: Cards, { payload }: PatchCardAction) {
    let path = state.paths.get(payload.id!)!;

    if (path) {
        return state.withMutations((state: Cards) => {
            let card = state.entities.getIn(path) as CardRecord;

            let updated = card.merge(CardRecord.objectFromJS(payload));

            if (card.column_id == payload.column_id) {
                if (payload.position != card.position) {
                    state.updateIn(
                        ["entities", path[0], path[1]],
                        (cards: OrderedMap<string, CardRecord>) => {
                            return cards
                                .set(card.id, updated)
                                .sort(positionSort);
                        }
                    );
                } else {
                    state.setIn(["entities", ...path], updated);
                }
            } else {
                state.updateIn(
                    ["entities", path[0]],
                    (
                        channelCards: Map<
                            string,
                            OrderedMap<string, CardRecord>
                        >
                    ) => {
                        return channelCards
                            .update(
                                path[1],
                                (cards: OrderedMap<string, CardRecord>) => {
                                    return cards
                                        .delete(card.id)
                                        .sort(positionSort)
                                        .toOrderedMap();
                                }
                            )
                            .update(
                                updated.column_id,
                                (
                                    cards: OrderedMap<
                                        string,
                                        CardRecord
                                    > = defaultColumnCards
                                ) => {
                                    return cards
                                        .set(card.id, updated)
                                        .sort(positionSort)
                                        .toOrderedMap();
                                }
                            );
                    }
                );

                state.setIn(["paths", payload.id], updated.getStorePath());
            }
        });
    } else {
        return state;
    }
}

function PATCH_CARDS(state: Cards, { payload }: PatchCardsAction) {
    for (let card of payload) {
        state = PATCH_CARD(state, patchCard(card));
    }
    return state;
}

function REMOVE_CARD(state: Cards, action: RemoveCardAction) {
    const id = action.payload.id;

    const path = state.paths.get(id);

    if (path) {
        return state.withMutations((state: Cards) => {
            state.deleteIn(["paths", id]);
            state.deleteIn(["entities", ...path]);
        });
    } else {
        return state;
    }
}

export const reducers = {
    PUT_CARD,

    PUT_CARDS,

    PATCH_CARD,

    PATCH_CARDS,

    REMOVE_CARD,
};

export default { state, reducers };
