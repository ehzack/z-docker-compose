import { createSelector } from 'reselect';

const selectRaw = (state) => state.recruiter.offer;

const selectLoading = createSelector([selectRaw], (setup) => !!setup.loading);
const selectErrorMsg = createSelector([selectRaw], (setup) => setup.error);
const item_to_edit = createSelector([selectRaw], (setup) => setup.item_to_edit);
const selectIsEditing = createSelector([selectRaw], (setup) => setup.isEditing);
const selectUploadPhoto = createSelector(
  [selectRaw],
  (setup) => setup.uploadPhoto,
);

const selectCandidatLikeAd = createSelector(
  [selectRaw],
  (setup) => setup.candidat_like_ad,
);
const selectors = {
  selectLoading,
  selectErrorMsg,
  item_to_edit,
  selectIsEditing,
  selectCandidatLikeAd,
  selectUploadPhoto,
};

export default selectors;
