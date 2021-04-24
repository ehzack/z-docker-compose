import { createSelector } from 'reselect';

const selectRaw = (state) => state.chats;
const selectAuth = (state) => state.auth;

const selectdiscussion = createSelector([selectRaw], (candidat) => {
  return candidat.discussion;
});

const selectLoading = createSelector([selectRaw], (candidat) => {
  return candidat.loading;
});

const selectCurrentUser = createSelector(
  [selectAuth],
  (auth) => auth.currentUser,
);
const selectors = {
  selectdiscussion,
  selectLoading,
  selectCurrentUser,
};

export default selectors;
