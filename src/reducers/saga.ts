
export const state = {};

export const reducers = 
{
    START_JOB( state: any, {
        payload
    }: any){
		return state;
    },

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
    STOP_JOB( state, { payload } ){
		return state;
    },

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
    REMOVE_JOB(state, { payload }){
		return state;
    },

};

export default { state, reducers }
