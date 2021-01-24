
export const state = {};

export const reducers =
{

    PATCH_CHANNEL_PERMISSIONS( state: any, {
        payload
    }: any ){
		const permissions = state[payload.channel_id];
		if(permissions){
			return { ...state, [payload.channel_id] : { ...permissions, ...payload } };
		}
		return state;
    },

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
    PUT_CHANNEL_PERMISSIONS( state, { payload } ){
		return { ...state, [payload.channel_id] : payload };
    },

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
    DESTROY_CHANNEL( state, { payload } ){
		return state;
    },

};

export default { state, reducers }
