import common from './common';

export const state = {};

export const reducers =
{

	STORE_WORKSPACE_KANBAN_BOARD: common.put,

	PATCH_TREAM_KANBAN_BOARD: common.patch,

    REMOVE_WORKSPACE_KANBAN_BOARD: common.remove,

    CLEAR_WORKSPACE_KANBAN_BOARDS: common.clear,

};

export default { state, reducers }
