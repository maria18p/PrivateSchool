import { createStudent } from '../controllers/StudentActions.js';
import { createTeacher } from '../controllers/TeacherActions.js';
import {
   getUsers,
   login,
   removeUser,
   getUserPassword,
   updatePassword,
   updateFirstName,
   updateLastName,
   updateStudentActive,
   updateStudentInactive,
} from '../controllers/UserActions.js';
import { requestFailure, requestSuccess, userHasAdminPermission } from './commonModule.js';
import { sendAdminNotification } from './notifications.js';
import { addPairing } from './pairings.js';
import colors from 'colors';

export const postLoginRequest = async (req) => {
   const result = await login(req);
   return result.user !== null
      ? requestSuccess({ data: result.user })
      : requestFailure({ message: result.message });
};

export const postTeacherRequest = async (req) => {
   if (req.code !== '123') return requestFailure({ message: 'Invalid Code !' });
   try {
      const queryResult = await createTeacher(req);
      await sendAdminNotification({
         text: 'A new teacher has joined !',
         // type: '',
         payload: queryResult.data,
      });
      return queryResult.success
         ? requestSuccess({ message: queryResult.message })
         : requestFailure({ message: queryResult.message });
   } catch (err) {
      console.log('err', err);
      return requestFailure({ message: 'SOMETHING WENT WRONG' });
   }
};

export const postStudentRequest = async (req) => {
   try {
      const queryResult = await createStudent(req);
      let pairings = await req.subjects.map(async (subject) => {
         const pairingCreation = await addPairing({
            user: queryResult.data,
            subject: subject,
         });
         if (pairingCreation.success) return pairingCreation;
         else throw new Error(pairingCreation.message);
      });
      await sendAdminNotification({
         text: 'A new student has joined !',
         type: 'pair',
         payload: queryResult.data,
      });
      return queryResult.success
         ? requestSuccess({ message: queryResult.message })
         : requestFailure({ message: queryResult.message });
   } catch (err) {
      console.log('err', err);
      return requestFailure({ message: 'SOMETHING WENT WRONG' });
   }
};

export const getAllUsers = async (req) => {
   // const hasPermission = userHasAdminPermission(req.user);
   // if (!userHasAdminPermission === true) return hasPermission;
   const result = await getUsers(req);
   return requestSuccess({ data: result });
};

export const getRequestUserPassword = async (req) => {
   const queryResult = await getUserPassword(req);
   return queryResult.success
      ? requestSuccess({ message: queryResult.message })
      : requestFailure({ message: queryResult.message });
};

export const postRequestUpdateUserPassword = async (req) => {
   const queryResult = await updatePassword(req);
   try {
      return queryResult.success
         ? requestSuccess({ message: queryResult.json.message })
         : requestFailure({ message: queryResult.json.message });
   } catch (err) {
      console.log('err', err);
      return requestFailure({ message: 'SOMETHING WENT WRONG' });
   }
};

export const postRequestUpdateUserFirstName = async (req) => {
   const queryResult = await updateFirstName(req);
   try {
      return queryResult.success
         ? requestSuccess({
              message: queryResult.json.message,
              data: queryResult.json.data,
           })
         : requestFailure({ message: queryResult.json.message });
   } catch (err) {
      console.log('err', err);
      return requestFailure({ message: 'SOMETHING WENT WRONG' });
   }
};

export const postRequestUpdateUserLastName = async (req) => {
   const queryResult = await updateLastName(req);
   try {
      return queryResult.success
         ? requestSuccess({
              message: queryResult.json.message,
              data: queryResult.json.data,
           })
         : requestFailure({ message: queryResult.json.message });
   } catch (err) {
      console.log('err', err);
      return requestFailure({ message: 'SOMETHING WENT WRONG' });
   }
};

export const deleteUserRequest = async (req) => {
   const queryResult = await removeUser(req.user);
   return queryResult.success
      ? requestSuccess({ message: queryResult.message })
      : requestFailure({ message: queryResult.message });
};

export const postRequestUpdateStudentActive = async (req) => {
   const queryResult = await updateStudentActive(req);
   return queryResult.success
      ? requestSuccess({ message: queryResult.json.message })
      : requestFailure({ message: queryResult.json.message });
};

export const postRequestUpdateStudentInactive = async (req) => {
   const queryResult = await updateStudentInactive(req);
   return queryResult.success
      ? requestSuccess({ message: queryResult.json.message })
      : requestFailure({ message: queryResult.json.message });
};
