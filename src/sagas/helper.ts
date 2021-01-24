import {cancel, cancelled, fork, put, select, take, takeEvery, takeLatest} from 'redux-saga/effects';

export const factory = ( SIGSRT: any, SIGTSTP: any, start: any, effect=takeEvery ) => {

    function* worker(sigsrt: any){

        let sigtstp = { type: SIGTSTP };

        //const { jobs } = yield select();
        const job = { 
            id : sigsrt.id, 
            signals : { 
                stop :SIGTSTP,
                start : SIGSRT
            }  
        };


		const task = yield fork(start, sigsrt);

		do{

			sigtstp = yield take(SIGTSTP);

// @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type '{ type: any;... Remove this comment to see the full error message
		}while(sigtstp.id !== sigsrt.id);

		yield cancel(task);


    }

    return { effect, type:SIGSRT, handler:worker }
};

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'SIGSRT' implicitly has an 'any' type.
export const singleton = ( SIGSRT, SIGSTOP, handler, effect=takeLatest) => {

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sigsrt' implicitly has an 'any' type.
    function* worker(sigsrt){

        const job = { id:SIGSRT,  signals:[ SIGSTOP, SIGSRT ] };

        try { 

            yield put({type:'START_JOB', payload:job});
            const task = yield fork(handler, sigsrt);

            yield take(SIGSTOP);
            yield put({type:'STOP_JOB', payload:job});

            yield cancel(task);

        } finally {

            if(yield cancelled()){
                yield put({type:'STOP_JOB', payload:job});
            }

            yield put({type:'REMOVE_JOB', payload:job});
        }

    }

    return { effect, type:SIGSRT, handler:worker }
};

export const job = { singleton, factory };
