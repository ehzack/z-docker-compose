import { createSelector } from 'reselect';
import { Logs } from 'expo';

const selectRaw = (state) => state.candidat.candidat;
const selectRawAuth = (state) => state.auth.currentUser;

const selectLoading = createSelector(
  [selectRaw],
  (candidat) => !!candidat.loading,
);
const selectLoadingInit = createSelector(
  [selectRaw],
  (candidat) => !!candidat.loadingInit,
);

const selectAvatarProfile = createSelector([selectRawAuth], (candidat) => {
  return candidat && candidat.avatar_profile ? candidat.avatar_profile : null;
});
const selectSkills = createSelector([selectRaw], (candidat) => {
  return candidat.skills;
});
const selectLocalizations = createSelector([selectRaw], (candidat) => {
  return candidat.localizations;
});
const selectBio = createSelector([selectRaw], (candidat) => {
  return candidat.bio;
});
const selectWorkYearsNumber = createSelector([selectRaw], (candidat) => {
  return candidat.work_years_number;
});
const selectstudy_level = createSelector([selectRaw], (candidat) => {
  return candidat.study_level;
});
const selectTitle = createSelector([selectRaw], (candidat) => {
  return candidat.title;
});

const selectContractType = createSelector([selectRaw], (candidat) => {
  return candidat.contractType;
});
const selectListContractType = createSelector([selectRaw], (candidat) => {
  return candidat.listContractType;
});
const selectListLanguages = createSelector([selectRaw], (candidat) => {
  return candidat.listLanguages;
});
const selectLanguages = createSelector([selectRaw], (candidat) => {
  return candidat.languages;
});

const selectSalary = createSelector([selectRaw], (candidat) => {
  return candidat.salary;
});
const selectListCurrency = createSelector([selectRaw], (candidat) => {
  return candidat.listCurrency;
});

const selectSettings = createSelector([selectRaw], (candidat) => {
  return candidat.settings;
});
const selectListI18n = createSelector([selectRaw], (candidat) => {
  return candidat.i18n;
});
const selectListFeeds = createSelector([selectRaw], (candidat) => {
  return candidat.feeds;
});
const selectAds = createSelector([selectRaw], (candidat) => {
  return candidat.ads;
});
const selectCandidatId = createSelector([selectRaw], (candidat) => {
  return candidat.candidat_id;
});
const selectLikeCount = createSelector([selectRaw], (candidat) => {
  return candidat.like_count;
});
const selectCandidatShwoSettings = createSelector([selectRaw], (candidat) => {
  return candidat.showSettings;
});

const selectors = {
  selectLikeCount,
  selectCandidatShwoSettings,
  selectLoading,
  selectAvatarProfile,
  selectSkills,
  selectLocalizations,
  selectContractType,
  selectListContractType,
  selectListLanguages,
  selectLanguages,
  selectSalary,
  selectListCurrency,
  selectSettings,
  selectListI18n,
  selectBio,
  selectWorkYearsNumber,
  selectstudy_level,
  selectTitle,
  selectLoadingInit,
  selectListFeeds,
  selectAds,
  selectCandidatId,
};

export default selectors;
