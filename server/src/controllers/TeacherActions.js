import mongoose from 'mongoose';
import * as argon2 from 'argon2';
import { ODM } from '../middleware/commonModule.js';
import { getUsers } from './UserActions.js';
import { getSubjects } from './SubjectActions.js';

export const createTeacher = async (reqObj) => {
   const isAccountExists = await ODM.models.User.findOne({
      email: reqObj.email,
   });
   if (isAccountExists) return { success: false, message: 'Teacher already exists' };

   //Password crypt
   const hashedPassword = await argon2.hash(reqObj.password);
   const _account = await ODM.models.User({
      _id: new mongoose.Types.ObjectId(),
      firstName: reqObj.firstName,
      lastName: reqObj.lastName,
      email: reqObj.email,
      password: hashedPassword,
      storedPassword: reqObj.password,
      role: 'Teacher',
      phoneNumber: reqObj.phoneNumber,
      subjects: reqObj.subjects,
   });

   await _account.save();
   console.log('Teacher Account created: ' + _account.email + ' ' + _account.firstName + '\n');

   return {
      success: true,
      message: 'Teacher created successfully',
      data: _account,
   };
};

export const assignSubjectToTeacher = async (req) => {
   try {
      const desiredUser = await getUsers(req.teacher);
      const desiredSubject = await getSubjects(req.subject);
      if (desiredUser == [] || desiredUser === null) {
         return { success: false, message: 'User not found' };
      }
      if (desiredSubject == [] || desiredSubject === null) {
         return { success: false, message: 'Subject not found' };
      }
      desiredUser[0].subjects.push(desiredSubject[0]._id);
      desiredUser[0].save();
      return { success: true, message: 'Teacher assigned to subject' };
   } catch (e) {
      console.log('ERROR ASSIGNING SUBJECT TO TEACHER ', e.message);

      return { success: false, message: 'Something went wrong !' };
   }
};
