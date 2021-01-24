
export const state = {
    '@personal': true
};

export const reducers =
{

    PATCH_WORKSPACE_PERMISSIONS( state: any, {
        payload
    }: any ){
		const permissions = state[payload.workspace_id];
		if(permissions){
			return { 
                ...state, 
                [payload.workspace_id] : { ...permissions, ...payload } 
            };
		}
		return state;
    },

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
    PUT_WORKSPACE_PERMISSIONS( state, { payload } ){
		return { ...state, [payload.workspace_id] : payload };
    },

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
    DESTROY_CHANNEL( state, { payload } ){
		return state;
    },

};

export default { state, reducers }
