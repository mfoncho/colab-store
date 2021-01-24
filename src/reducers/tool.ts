export const state = null;

export const reducers = {

	OPEN_TOOL(state: any, { payload }: any ){
		return payload;
	},

	PATCH_TOOL_PROPS(state: any, {payload}: any){
		if(state){
			return { 
				...state, 
				props:{ 
					...state.props, 
					...payload 
				}
			}
		}
		return null;
	},

	CLOSE_TOOL(state: any, { payload }: any ){
		return null;
	}

};

export default { state, reducers }
