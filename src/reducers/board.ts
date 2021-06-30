import { Map } from "immutable";
import common from "./common";
import { BoardRecord } from "../records";

export const state = Map<string, BoardRecord>();

export const reducers = {
    PUT_BOARD: common.put,

    PUT_BOARDS: common.put,

    PATCH_BOARD: common.patch,

    REMOVE_BOARD: common.remove,

    CLEAR_BOARDS: common.clear,
};

export default { state, reducers };
