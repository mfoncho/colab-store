import {put, select, takeEvery} from 'redux-saga/effects';
import { State } from '..';
import client from '@colab/client';

function * get(action: any){
	try{

		const { data, status } = yield client.getOrg();
		yield put({type:'SET_ORG', payload:data});

	} catch (e){}
}

export const tasks = [
    { effect:takeEvery, type:'PLUME_INIT', handler:get},
];
