import { createSelector } from 'reselect';

const selectRaw = (state) => state.notification;

const selectLoading = createSelector(
  [selectRaw],
  (candidat) => !!candidat.loading,
);
const selectLoadingInit = createSelector(
  [selectRaw],
  (candidat) => !!candidat.loadingInit,
);
const selectListNotification = createSelector(
  [selectRaw],
  (candidat) => candidat.notification,
);

const selectors = {
  selectListNotification,
  selectLoading,
  selectLoadingInit,
};

export default selectors;
