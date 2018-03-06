import { USER_LOGGIN, USER_LOGGED, USER_LOGGIN_FAILURE } from './constant';
import reach, {users} from '../../utils/reach';
import generateName from '../../utils/nameGenerator';

/*
export const loggin = () => (
    dispatch => {
        dispatch({
            type: USER_LOGGIN
        });
        return reach().anonymous(generateName())
            .then((user) => {
                users.add(user);
                dispatch({
                    type: USER_LOGGED,
                    anonymous: user.anonymous,
                    lastSeen: user.lastSeen,
                    name: user.name,
                    status: user.status,
                    uid: user.uid
                });
            });
    }
);*/

export function loggin() {
  return dispatch => {
      dispatch({ type: USER_LOGGIN });
      return reach().anonymous(generateName())
          .then(
              user => {
                  users.add(user);
                  return dispatch({
                      type: USER_LOGGED,
                      anonymous: user.anonymous,
                      lastSeen: user.lastSeen,
                      name: user.name,
                      status: user.status,
                      uid: user.uid
                  });
              },
              error => {
                  dispatch({ type: USER_LOGGIN_FAILURE, error });
                  throw error;
              }
          )
  };
}