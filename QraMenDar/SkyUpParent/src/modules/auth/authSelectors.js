import { createSelector } from "reselect";
import UploadFile from "../shared/upload/upload";
import Roles from "../../sercurity/roles";
const selectRaw = (state) => state.auth;

const selectAuthenticationUser = createSelector(
  [selectRaw],
  (auth) => auth.authenticationUser
);

const selectCurrentUser = createSelector(
  [selectRaw],
  (auth) => auth.currentUser
);

const selectCurrentUserEmail = createSelector(
  [selectCurrentUser],
  (currentUser) => (currentUser ? currentUser.email : null)
);

const selectCurrentUserFullName = createSelector(
  [selectCurrentUser],
  (currentUser) =>
    currentUser ? currentUser.first_name + " " + currentUser.last_name : ""
);
const selectCurrentUserfirst_name = createSelector(
  [selectCurrentUser],
  (currentUser) => (currentUser ? currentUser.first_name : "")
);
const selectCurrentUserlast_name = createSelector(
  [selectCurrentUser],
  (currentUser) => (currentUser ? currentUser.last_name : "")
);

const selectSignedIn = createSelector(
  [selectCurrentUser],
  (currentUser) => !!currentUser && !!currentUser.id
);

const selectRoles = createSelector([selectCurrentUser], (currentUser) =>
  currentUser ? currentUser.user_roles[0].role || [] : []
);

const selectEmptyPermissions = createSelector(
  [selectRoles],
  (roles) => !roles || !roles.length
);

const selectLoading = createSelector([selectRaw], (auth) => !!auth.loading);

const selectLoadingInit = createSelector(
  [selectRaw],
  (auth) => !!auth.loadingInit
);

const selectLoadingEmailConfirmation = createSelector(
  [selectRaw],
  (auth) => !!auth.loadingEmailConfirmation
);

const selectLoadingPasswordReset = createSelector(
  [selectRaw],
  (auth) => !!auth.loadingPasswordReset
);

const selectGender = createSelector([selectRaw], (auth) =>
  auth.currentUser && auth.currentUser.gender ? auth.currentUser.gender : ""
);

const selectLoadingUpdateProfile = createSelector(
  [selectRaw],
  (auth) => !!auth.loadingUpdateProfile
);

const selectErrorMessage = createSelector(
  [selectRaw],
  (auth) => auth.errorMessage
);

const selectCurrentUserNameOrEmailPrefix = createSelector(
  [selectCurrentUser, selectCurrentUserFullName],
  (currentUser, fullName) => {
    if (!currentUser) {
      return "";
    }

    if (fullName && fullName.length < 25) {
      return fullName;
    }

    if (currentUser.first_name) {
      return currentUser.first_name;
    }
    return currentUser.first_name.split("@")[0];
  }
);

const selectCurrentUserAvatar = createSelector(
  [selectCurrentUser],
  (currentUser) => {
    if (!currentUser || !currentUser.avatar_profile) {
      return null;
    } else {
      return currentUser.avatar_profile;
    }
  }
);

const selectAvatar = createSelector([selectCurrentUser], (currentUser) => {
  if (!currentUser || !currentUser.avatar_profile) {
    return null;
  }
  console.log(currentUser.avatar_profile);
  return currentUser.avatar_profile;
});
const selectShowModalActivateAccounte = createSelector(
  [selectRaw],
  (auth) => auth.showModalActivateAccount
);
const isRecruiter = createSelector([selectRaw], (auth) => {
  if (
    auth.currentUser.user_roles.some((e) => e.role == Roles.values.recruiter)
  ) {
    return true;
  }
  return false;
});

const isCandidat = createSelector([selectRaw], (auth) => {
  console.log(auth.currentUser);
  if (
    auth.currentUser.user_roles.some((e) => e.role == Roles.values.candidat)
  ) {
    return true;
  }
  return false;
});
const selectSocket = createSelector([selectRaw], (auth) => {
  return auth.socket;
});

const selectors = {
  selectSocket,
  selectLoadingPasswordReset,
  selectLoadingEmailConfirmation,
  selectLoadingInit,
  selectLoadingUpdateProfile,
  selectLoading,
  selectEmptyPermissions,
  selectRoles,
  selectSignedIn,
  selectAvatar,
  selectCurrentUserFullName,
  selectCurrentUserEmail,
  selectCurrentUser,
  selectAuthenticationUser: selectAuthenticationUser,
  selectErrorMessage,
  selectRaw,
  selectCurrentUserNameOrEmailPrefix,
  selectCurrentUserAvatar,
  selectShowModalActivateAccounte,
  selectCurrentUserfirst_name,
  selectCurrentUserlast_name,
  selectGender,
  isRecruiter,
  isCandidat,
};

export default selectors;
