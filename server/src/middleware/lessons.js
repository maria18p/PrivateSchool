import {
  checkLessonCreationValid,
  checkRoomAvailable,
  createLesson,
  getUserLessons,
  userHasAnotherLesson,
} from '../controllers/LessonActions.js';
import { getPairings } from '../controllers/PairingActions.js';
import { getSubjects } from '../controllers/SubjectActions.js';
import { getUsers } from '../controllers/UserActions.js';
import { requestFailure, requestSuccess } from './commonModule.js';
import { createNotification } from './notifications.js';
import { getAllPairings } from './pairings.js';

export const postRequestCreateLesson = async (req) => {
  const userObj = (await getUsers(req.user))[0];
  const pairing_student = (await getUsers({ _id: req.student._id }))[0];
  req.student = pairing_student;
  const pairing_teacher = (await getUsers({ _id: userObj._id }))[0];
  req.teacher = pairing_teacher;
  // console.log(`-----------------------------------`);
  // console.log(
  // 	`-> GOT FROM REQ:\n\tUSER:\t${req.user._id}\nSTUDENT:\t${req.student._id}}`
  // );

  req.pairing = (
    await getPairings({
      teacher: userObj._id,
      student: req.student._id,
      subject: req.subject,
    })
  ).data[0];
  // console.log("-> UPDATED PAIRING\n\t", req.pairing);
  // console.log(`-----------------------------------`);
  let lessonValid = await checkLessonCreationValid(req);
  if (!lessonValid || !lessonValid.data)
    return requestFailure({ message: 'Lesson overlaps with another lesson' });

  const pairing = (await getAllPairings({ _id: req.pairing })).json.data.data[0];

  const studentOverlaps = await userHasAnotherLesson(req);
  if (!studentOverlaps.success || !studentOverlaps.data)
    return requestFailure({ message: 'Lesson overlaps with another lesson' });

  const teacherOverlaps = await userHasAnotherLesson(req);
  if (!teacherOverlaps.success || !teacherOverlaps.data)
    return requestFailure({ message: 'Lesson overlaps with another lesson' });

  const roomOverlaps = await checkRoomAvailable(req);
  if (!roomOverlaps.success || !roomOverlaps.data)
    return requestFailure({ message: 'Lesson overlaps with another lesson' });

  const queryResult = await createLesson(req);
  if (!queryResult.success) return requestFailure({ message: 'SOMETHING WENT WRONG' });
  const subjectName = (await getSubjects({ _id: queryResult.subject }))[0].name;
  const date = queryResult.data.date;
  const start = queryResult.data.start;
  const finish = queryResult.data.finish;

  await createNotification({
    user: req.student,
    text: 'A new lesson has been set for you ' + `${subjectName}: on: ${date} ${start} - ${finish}`,
  });
  return queryResult.success
    ? requestSuccess({ message: queryResult.message })
    : requestFailure({ message: queryResult.message });
};

export const getRequestGetLessons = async (req) => {
  req.user = (await getUsers(req.user))[0];
  req.pairings = (await getPairings({ role: req.user.role, participant: req.user._id })).data;

  const queryResult = await getUserLessons(req);
  return queryResult.success
    ? requestSuccess({ data: queryResult.data })
    : requestFailure({ message: queryResult.message });
};