import { combineReducers } from 'redux';
import authReducer from './auth/reducers';
import candidatReducer from './candidat/reducers';
import recruiterReducer from './recruiter/reducers';
import notificationReducer from './notification/reducers';

import chatsReducer from './chats/reducers';

const rootReducer = combineReducers({
  auth: authReducer,
  candidat: candidatReducer,
  chats: chatsReducer,
  recruiter: recruiterReducer,
  notification: notificationReducer,
});
export default rootReducer;
