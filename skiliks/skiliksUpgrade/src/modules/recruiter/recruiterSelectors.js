import { createSelector } from 'reselect';

const selectRaw = (state) => state.recruiter.recruiter;
const selectRawAuth = (state) => state.auth.currentUser;

const selectLoading = createSelector(
  [selectRaw],
  (recruiter) => !!recruiter.loading,
);

const selectAvatarProfile = createSelector([selectRawAuth], (recruiter) => {
  return recruiter && recruiter.avatar_profile
    ? recruiter.avatar_profile
    : null;
});

const selectTitle = createSelector([selectRaw], (recruiter) => {
  return recruiter.title;
});

const selectListContractType = createSelector([selectRaw], (recruiter) => {
  return recruiter.listContractType;
});
const selectListLanguages = createSelector([selectRaw], (recruiter) => {
  return recruiter.listLanguages;
});

const selectSettings = createSelector([selectRaw], (recruiter) => {
  return recruiter.settings;
});
const selectListI18n = createSelector([selectRaw], (recruiter) => {
  return recruiter.i18n;
});
const selectListAds = createSelector([selectRaw], (recruiter) => {
  return recruiter.listAds;
});
const selectListCandidatLikeAd = createSelector([selectRaw], (recruiter) => {
  return recruiter.candidats_like_ad;
});
const selectCurrentAds = createSelector([selectRaw], (recruiter) => {
  return recruiter.currentAds;
});

const selectLoadingInit = createSelector(
  [selectRaw],
  (recruiter) => !!recruiter.loadingInit,
);

const selectRecruiterShwoSettings = createSelector([selectRaw], (recruiter) => {
  return !!recruiter.showSettings;
});

const selectCompanyName = createSelector([selectRaw], (recruiter) => {
  return recruiter.company_name;
});

const selectors = {
  selectCompanyName,
  selectLoadingInit,
  selectRecruiterShwoSettings,
  selectLoading,
  selectAvatarProfile,

  selectListContractType,
  selectListLanguages,

  selectSettings,
  selectListI18n,

  selectTitle,
  selectListAds,
  selectListCandidatLikeAd,
  selectCurrentAds,
};

export default selectors;
