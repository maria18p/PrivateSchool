// import { getUserSchedule, updateSchedule } from '../controllers/UserActions.js';
// import { requestFailure, requestSuccess, userHasTeacherPermission } from './commonModule.js';

// export const getRequestUserSchedule = async (req) => {
//   const hasPermission = await userHasTeacherPermission(req.user);
//   if (hasPermission !== true) return hasPermission;
//   const userSchedule = await getUserSchedule(req.user);
//   return userSchedule.success
//     ? requestSuccess({ data: userSchedule.data })
//     : requestFailure({ message: userSchedule.message });
// };

// export const postRequestUpdateSchedule = async (req) => {
//   const hasPermission = await userHasTeacherPermission(req.user);
//   if (hasPermission !== true) return hasPermission;
//   const updateResult = await updateSchedule(req);
//   return updateResult.success
//     ? requestSuccess({ message: updateResult.message })
//     : requestFailure({ message: updateResult.message });
// };
