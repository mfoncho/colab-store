import { Record } from "immutable";
import { STORE_INIT } from "../actions/types";

export class AppState extends Record({}) {}

function init(state: AppState, action: any) {
    return state;
}

const state = new AppState();

const reducers = {
    [STORE_INIT]: init,
};

export default { state, reducers };
