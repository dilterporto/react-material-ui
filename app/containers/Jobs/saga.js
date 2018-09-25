/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';

import { 
  LOAD_JOBS,  
} from './constants';

import {   
  loadJobsError,
  jobsLoaded,  
} from './actions';

export function* getJobs() {  
  const requestURL = `http://localhost:5001/jobs`;
  try {
    // Call our request helper (see 'utils/request')
    let jobs = yield call(request, requestURL);

    jobs = jobs.map((j) => {      
      j.executing = j.id === '5ba8fe2519a2d955cc9ca267' || j.id === '5ba9013719a2d955cc9ca26d';
      return j;
    });

    yield put(jobsLoaded(jobs));
  } catch (err) {
    yield put(loadJobsError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* jobsData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_JOBS, getJobs);
}
