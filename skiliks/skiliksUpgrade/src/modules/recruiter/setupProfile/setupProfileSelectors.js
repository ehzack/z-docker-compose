import { createSelector } from "reselect";

const selectRaw = (state) => state.recruiter.recruiterSetup.setupProfile;

const selectLoading = createSelector([selectRaw], (setup) => !!setup.loading);

const selectors = {
  selectLoading,
};

export default selectors;
