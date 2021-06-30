import { Record } from "immutable";
import { Action } from "redux";
import config from "./config";
import role from "./role";
import user from "./user";
import board from "./board";
import auth from "./auth";
import snack from "./snack";
import route from "./route";
import member from "./member";
import thread from "./thread";
import status from "./status";
import preferences from "./preferences";
import drawer from "./drawer";
import presence from "./presence";
import card from "./card";
import space from "./space";
import column from "./column";
import workspace from "./workspace";
import checklist from "./checklist";

interface IAction extends Action {
    meta?: any;
    payload: any;
}

interface IHandlers<T> {
    [type: string]: (state: T, action: IAction) => T;
}

const INIT = "@@INIT";

const RootStates = {
    config: config.state,
    roles: role.state,
    auth: auth.state,
    route: route.state,
    users: user.state,
    cards: card.state,
    boards: board.state,
    members: member.state,
    status: status.state,
    preferences: preferences.state,
    snacks: snack.state,
    presence: presence.state,
    drawer: drawer.state,
    threads: thread.state,
    columns: column.state,
    spaces: space.state,
    workspace: workspace.state,
    checklists: checklist.state,
};

export class RootStateRecord extends Record(RootStates, "root") {}

export const RootState = new RootStateRecord({});

export type RootStateT = typeof RootState;

function createReducer<T>(
    handlers: IHandlers<T>,
    defaultState: T
): (state: T, action: IAction) => T {
    type ActionType = keyof typeof handlers;

    const actions: ActionType[] = Object.keys(handlers);

    if (actions.includes(INIT)) {
        return (state: T = defaultState, action: IAction): T => {
            if (actions.includes(action.type)) {
                return handlers[action.type](state, action);
            } else {
                return state;
            }
        };
    } else {
        return (state: T = defaultState, action: IAction): T => {
            const { type } = action;

            if (type === INIT) {
                return defaultState;
            } else if (actions.includes(type)) {
                return handlers[type](state, action);
            } else {
                return state;
            }
        };
    }
}

const reducers = {
    config: createReducer(config.reducers, config.state),
    roles: createReducer(role.reducers, role.state),
    auth: createReducer(auth.reducers, auth.state),
    preferences: createReducer(preferences.reducers, preferences.state),
    route: createReducer(route.reducers, route.state),
    users: createReducer(user.reducers, user.state),
    cards: createReducer(card.reducers, card.state),
    members: createReducer(member.reducers, member.state),
    boards: createReducer(board.reducers, board.state),
    presence: createReducer(presence.reducers, presence.state),
    drawer: createReducer(drawer.reducers, drawer.state),
    status: createReducer(status.reducers, status.state),
    snacks: createReducer(snack.reducers, snack.state),
    threads: createReducer(thread.reducers, thread.state),
    columns: createReducer(column.reducers, column.state),
    spaces: createReducer(space.reducers, space.state),
    workspace: createReducer(workspace.reducers, workspace.state),
    checklists: createReducer(checklist.reducers, checklist.state),
};

type PartitionT = keyof typeof reducers;

const partitions = Object.keys(reducers) as PartitionT[];

function validatePartition(state: RootStateT, value: PartitionT) {
    if (!state.has(value)) {
        throw Error("Unkown store partition " + value);
    }
    if (!(value in reducers)) {
        throw Error("No reducers defined for store partition " + value);
    }
}

export default function rootReducer(state = RootState, action: Action) {
    return state.withMutations((state) => {
        partitions.forEach((partition: PartitionT) => {
            validatePartition(state, partition);
            const current = state.get(partition)!;
            const reducer = reducers[partition];
            const next = reducer(current as any, action as IAction);
            state.set(partition, next);
        });
    });
}
