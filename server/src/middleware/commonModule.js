import { setupODM } from '../config/setupMongoDB.js';
import { addAdmin, checkUserLoggedIn } from '../controllers/UserActions.js';

let ODM;

export const createDBConnection = async () => {
  ODM = await setupODM();
  console.log('SERVER READY');
  // await addAdmin();
};

// ============================== Utility functions ==============================

export const requestSuccess = async (data) => {
  data.success = true;
  return {
    success: true,
    json: data,
  };
};

export const requestFailure = async (data) => {
  data.success = false;
  return {
    success: false,
    json: data,
  };
};

export const userLoggedIn = async (user) => {
  return (await checkUserLoggedIn(user))
    ? requestSuccess({ data: true })
    : requestFailure({ data: false, message: 'Session Timed Out !' });
};

export const userHasTeacherPermission = async (user) => {
  const res = await userLoggedIn(user);
  if (res.success !== true) return res;
  return user.role === 'Teacher' || user.role === 'Admin'
    ? true
    : requestFailure({ message: "You don't have permission !" });
};

export const userHasStudentPermission = async (user) => {
  const res = await userLoggedIn(user);
  if (res !== true) return res;
  return user.role === 'Student' || user.role === 'Admin'
    ? true
    : requestFailure({ message: "You don't have permission !" });
};

export const userHasAdminPermission = async (user) => {
  const res = await checkUserLoggedIn(user);
  if (res.success !== true) return res;
  return user.role === 'Admin' ? true : requestFailure({ message: "You don't have permission" });
};

export { ODM };
