import common from "./common";

export const state = {};

export const reducers = {
    PUT_BOARD: common.put,

    PUT_BOARDS: common.put,

    PATCH_BOARD: common.patch,

    REMOVE_BOARD: common.remove,

    CLEAR_BOARDS: common.clear,
};

export default { state, reducers };
