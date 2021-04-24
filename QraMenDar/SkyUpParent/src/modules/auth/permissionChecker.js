export default class PermissionChecker {
  constructor(currentUser) {
    this.currentUser = currentUser;
    this.userRoles = currentUser ? [currentUser.user_roles[0].role] : [];
  }

  match(permission) {
    if (!permission) {
      return true;
    }

    return this.rolesMatchOneOf(permission);
  }

  rolesMatchOneOf(arg) {
    if (!this.userRoles) {
      return false;
    }

    if (!arg) {
      return false;
    }

    if (Array.isArray(arg)) {
      if (!arg.length) {
        return false;
      }

      return arg.some((role) => this.userRoles.includes(role));
    }

    return this.userRoles.includes(arg);
  }

  get isEmptyPermissions() {
    if (!this.isAuthenticated) {
      return false;
    }

    return !this.currentUser.default_role /*||!this.userRoles.length*/;
  }

  get isAuthenticated() {
    return !!this.currentUser && !!this.currentUser.id;
  }

  get isEmailVerified() {
    return this.currentUser.active;
  }
}
