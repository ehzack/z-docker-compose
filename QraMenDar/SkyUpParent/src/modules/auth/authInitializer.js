import actions from './authActions';
import service from './authService';

export default store => {
  // const unsubscribe = service.onAuthStateChanged(
  //   authenticationUser => {
  //     store.dispatch(actions.doSigninFromAuthChange(authenticationUser));
  //   },
  //   error => {
  //     store.dispatch({
  //       type: actions.AUTH_INIT_ERROR,
  //       payload: error,
  //     });
  //   },
  // );
};
