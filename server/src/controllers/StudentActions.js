import mongoose from 'mongoose';
import { ODM } from '../middleware/commonModule.js';
import bcryptjs from 'bcryptjs';
import { getUsers } from './UserActions.js';

//AUTH FUNCTIONS

//REGISTER
export const createStudent = async (reqObj) => {
   const isAccountExists = await ODM.models.User.findOne({
      email: reqObj.email,
   });
   if (isAccountExists) return { success: false, message: 'Student already exists' };

   //Password crypt
   const hashedPassword = await bcryptjs.hash(reqObj.password, 8);

   const _account = await ODM.models.User({
      _id: new mongoose.Types.ObjectId(),
      firstName: reqObj.firstName,
      lastName: reqObj.lastName,
      email: reqObj.email,
      password: hashedPassword,
      role: 'Student',
      subjects: reqObj.subjects,
   });

   await _account.save();
   console.log('Student Account created: ' + _account.email + ' ' + _account.firstName + '\n');

   return {
      success: true,
      message: 'Student created Successfully !',
      data: _account,
   };
};

export const assignSubjectToStudent = async (req) => {
   try {
      const desiredUser = await getUsers(req.student);
      if (desiredUser == [] || desiredUser === null) {
         return { success: false, message: 'User not found' };
      }

      const desiredSubject = await getSubjects(req.subject);
      if (desiredSubject == [] || desiredSubject === null) {
         return { success: false, message: 'Subject not found' };
      }
      desiredUser[0].subjects.push(desiredSubject[0]._id);
      desiredUser[0].save();
      return { success: true, message: 'Student assigned to subject' };
   } catch (e) {
      console.log('ERROR ASSIGNING SUBJECT TO STUDENT ', e.message);

      return { success: false, message: 'Something went wrong !' };
   }
};
