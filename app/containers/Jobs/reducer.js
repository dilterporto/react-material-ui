/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import { 
  LOAD_JOBS,
  LOAD_JOBS_ERROR,
  JOBS_LOADED,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  jobs: false,
});

function jobsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_JOBS:
      return state
        .set('loading', true)
        .set('error', false);
    case JOBS_LOADED:
      return state
        .set('jobs', action.jobs)
        .set('loading', false);
    case LOAD_JOBS_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default jobsReducer;
