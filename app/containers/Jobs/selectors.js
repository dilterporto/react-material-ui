/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.get('global', initialState);

const makeSelectJobs = () =>
  createSelector(selectGlobal, jobsState => jobsState.get('jobs'));

export { selectGlobal, makeSelectJobs };
