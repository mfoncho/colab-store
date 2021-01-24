import { Record } from 'immutable';

export class Drawer extends Record({
	tools: false,
	workspace: false,
	channels: true,
}){}

export const state = new Drawer();

export const reducers = {

	SET_APPS_DRAWER(state: Drawer, { payload }: any){
		return state;
	},

	SET_TOOLS_DRAWER(state: Drawer, { payload }: any){
		return state.set('tools', payload);
	},

	SET_WORKSPACES_DRAWER(state: Drawer, { payload }: any){
		return state.set('workspace', payload);
	},

	SET_CHANNELS_DRAWER(state: Drawer, { payload }: any){
		return state.set('channels', payload);
	},
};

export default { state, reducers }
