import {
  createPairing,
  findPairingSubjects,
  getManagePairingInfo,
  getPairings,
  reAssignPairing,
  teacherStudents,
  updatePairing,
} from '../controllers/PairingActions.js';
import { getUsers } from '../controllers/UserActions.js';
import {
  requestFailure,
  requestSuccess,
  userHasAdminPermission,
  userHasTeacherPermission,
  userLoggedIn,
} from './commonModule.js';
import { createNotification } from './notifications.js';

export const getRequestManagePairings = async (req) => {
  const queryResult = await getManagePairingInfo(req);
  return requestSuccess({ data: queryResult.data });
};

export const addPairing = async (req) => {
  return await createPairing(req);
};

export const getAllPairings = async (req) => {
  const result = await getPairings(req);
  return requestSuccess({ data: result });
};

export const pairTeacherToStudent = async (req) => {
  const hasPermission = userHasAdminPermission(req.user);
  if (!hasPermission) return requestFailure({ message: hasPermission.message });
  const isLoggedIn = await userLoggedIn(req.user);
  if (!isLoggedIn.success) return requestFailure({ message: isLoggedIn.message });
  const result = await updatePairing(req);

  await createNotification({
    user: result.data.student,
    text: `You were paired for learning ${result.data.subject.name} with ${result.data.teacher.firstName} ${result.data.teacher.lastName}`,
  });

  await createNotification({
    user: result.data.teacher,
    text: `You were assigned for teaching ${result.data.subject.name} with ${result.data.student.firstName} ${result.data.student.lastName}`,
  });

  return result.success
    ? requestSuccess({ message: result.message })
    : requestFailure({ message: result.message });
};

export const getTeacherStudents = async (req) => {
  const hasPermission = userHasTeacherPermission(req.user);
  if (!hasPermission) return requestFailure({ message: hasPermission.message });
  req.teacher = (await getUsers({ email: req.user.email }))[0];
  const isLoggedIn = await userLoggedIn(req);
  if (!isLoggedIn.success) return requestFailure({ message: isLoggedIn.message });
  const students = await teacherStudents(req);
  return students.success
    ? requestSuccess({ data: students.data })
    : requestFailure({ message: students.message });
};

export const getPairingSubjects = async (req) => {
  req.teacher = (await getUsers(req.user))[0];
  req.student = (await getUsers(req.student))[0];

  const result = await findPairingSubjects(req);
  return result.success
    ? requestSuccess({ data: result.data })
    : requestFailure({ message: result.message });
};

export const postRequestUpdatePairing = async (req) => {
  const queryResult = await reAssignPairing(req);

  await createNotification({
    user: queryResult.data.student._id,
    text: `You have been reassigned to learning ${queryResult.data.subject.name} with ${queryResult.data.teacher.firstName} ${queryResult.data.teacher.lastName}`,
  });

  await createNotification({
    user: queryResult.data.teacher._id,
    text: `You have been reassigned to teaching ${queryResult.data.subject.name} to ${queryResult.data.student.firstName} ${queryResult.data.student.lastName}`,
  });

  return requestSuccess({ message: 'Successfully updated pair' });
};
