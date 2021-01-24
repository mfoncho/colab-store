import common from './common';

export const state = {};

export const reducers =
{

	PUT_TAG: common.put,

	PUT_TAGS: common.put,

	PATCH_TAG: common.patch,

    REMOVE_TAG: common.remove,

    CLEAR_TAG: common.clear,

};

export default { state, reducers }
