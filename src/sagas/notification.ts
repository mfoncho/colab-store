import React from 'react';
import {put, takeEvery, select } from 'redux-saga/effects';

function * notifier({
    payload
}: any){

	yield put({type:'ENQUEUE_SNACK', payload});

}

function * httpError ( { payload }: any ){
	/**
	yield put({type:'NOTIFICATION', payload: { 
		message:(payload.message || payload.reason ), 
		config:{
			variant:'error'
		}
	}});
	**/
}

function * newMessage({ origin, payload }: any){


	if( payload.is_dm && payload.thread_id === 'main'){

		const state = yield select();

		if(state.auth.id === payload.author.id)
			return

		const workspace = state.workspaces[state.route.params.workspace];

		if( workspace && workspace.is_personal )
			return


		const snack = {
			message:'',
			config:{
				anchorOrigin: {
					vertical: 'bottom',
					horizontal: 'right',
				},
				children:(id: any) => {
				},
				autoHideDuration: 15000,
			}
		}

		yield put({type:'ENQUEUE_SNACK', payload:snack });

	}

}

export const tasks = [

    { effect:takeEvery, type:'NOTIFICATION', handler:notifier},

    { effect:takeEvery, type:'NEW_MESSAGE', handler:newMessage},

    { effect:takeEvery, type:'HTTP_ERROR', handler:httpError},

];
