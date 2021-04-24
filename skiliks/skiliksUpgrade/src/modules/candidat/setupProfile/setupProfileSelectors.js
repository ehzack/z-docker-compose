import { createSelector } from 'reselect';

const selectRaw = (state) => state.candidat.candidatSetup.setupProfile;

const selectLoading = createSelector([selectRaw], (setup) => !!setup.loading);

const selectors = {
  selectLoading,
};

export default selectors;
