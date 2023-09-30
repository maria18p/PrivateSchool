import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { ODM, requestFailure, requestSuccess } from '../middleware/commonModule.js';
import nodemailer from 'nodemailer';
import colors from 'colors';

export const addAdmin = async () => {
   try {
      // const hashedPassword = await argon2.hash('admin');
      const hashedPassword = await bcryptjs.hash('admin', 8);
      const admin = await ODM.models.User({
         _id: new mongoose.Types.ObjectId(),
         firstName: 'Admin',
         lastName: 'Admin',
         email: 'admin',
         password: hashedPassword,
         role: 'Admin',
         phoneNumber: '',
      });
      admin.save();
   } catch (e) {
      console.log('Error creating admin -> UserActions', e);
   }
};

export const login = async (req) => {
   try {
      const account = await ODM.models.User.findOne({ email: req.email });
      if (!account) {
         return {
            user: null,
            message: 'Account with the entered email does not exist',
         };
      }

      const isMatch = await argon2.verify(account.password, req.password);
      // const isMatch = await argon2.verify(req.password, account.storedPassword);

      if (!isMatch) return { user: null, message: 'Password does not match' };
      if (!account.isActive) return { user: null, message: 'Your account is not active' };
      //Generate JWT token
      const tokenizationData = {
         _id: account._id,
         name: account.firstName + ' ' + account.lastName,
         email: account.email,
      };
      const token = jwt.sign({ dataToken: tokenizationData }, process.env.JWT_KEY, {
         expiresIn: '30d',
      });
      await updateToken(account, token);
      await account.save();
      console.log(`[LOGGED IN] ${account.email} [ROLE] ${account.role}`);
      return {
         user: {
            _id: account._id,
            name: account.firstName,
            email: account.email,
            role: account.role,
            token: token,
            firstName: account.firstName,
            lastName: account.lastName,
         },
      };
   } catch (e) {
      console.error('ERROR IN LOGIN', e.message);
      return { message: e.message };
   }
};

export const findUserByPhoneNumber = async (phoneNumber) => {
   try {
      const user = await ODM.models.User.findOne({ phoneNumber });
      return {
         data: {
            _id: user._id,
            password: user.password,
            storedPassword: user.storedPassword,
            email: user.email,
            phoneNumber: user.phoneNumber,
         },
         success: true,
         message: 'A user was found',
      };
   } catch (error) {
      console.error('Error finding user by phone number:', error);
      return { success: false, message: 'A user with this phone number was not found' };
   }
};

export const sendPassword = async (req) => {
   const generateRandomPassword = (length) => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let randPassword = '';
      for (let i = 0; i < length; i++) {
         const randomIndex = Math.floor(Math.random() * characters.length);
         randPassword += characters.charAt(randomIndex);
      }
      return randPassword;
   };
   const resetCode = generateRandomPassword(4);
   try {
      // Find the user by phone number
      const userByPhoneNumber = await findUserByPhoneNumber(req.phoneNumber);
      if (
         !userByPhoneNumber.success ||
         userByPhoneNumber.data._id.toString() !== req._id.toString()
      ) {
         return {
            success: false,
            message: "The provided user doesn't associated with the phone number.",
         };
      }
      // Check if the email matches the one associated with the phone number
      if (userByPhoneNumber.data.email !== req.email) {
         return {
            success: false,
            message: 'The provided email does not match the one associated with the phone number.',
         };
      }
      const transporter = nodemailer.createTransport({
         service: 'Gmail',
         auth: {
            user: process.env.AUTH_USER_TRANSPORTER_GOOGLE,
            pass: process.env.AUTH_PASS_TRANSPORTER_GOOGLE,
         },
      });
      const mailOptions = {
         from: 'tcbmaria2023@gmail.com',
         to: req.email, // email from the request
         subject: 'Reset code',
         text: `Your reset code: ${resetCode}`,
      };
      await transporter.sendMail(mailOptions); // Send the email
      const maskedEmail = `${userByPhoneNumber.data.email.slice(
         0,
         3,
      )}.....${userByPhoneNumber.data.email.slice(-2)}@gmail.com`;

      return {
         data: {
            resetCode: resetCode,
            password: userByPhoneNumber.data.password,
            email: userByPhoneNumber.data.email,
         },
         success: true,
         message: `Reset code was sent to email ${maskedEmail}.`,
      };
   } catch (error) {
      console.error('Error sending password:', error);
      return { success: false, message: 'Failed to request password reset' };
   }
};

const updateToken = async (account, token) => {
   await ODM.models.User.findOneAndUpdate({ _id: account._id }, { token: token });
};

export const checkUserLoggedIn = async (reqObj) => {
   const res = await ODM.models.User.findOne({
      email: reqObj.email,
      token: reqObj.token,
   });
   return res
      ? { success: true, message: 'User logged in' }
      : { success: false, message: 'User not logged in' };
};

export const getUsers = async (req) => {
   let filter = {};
   if (req._id) filter._id = req._id;
   if (req.email) filter.email = req.email;
   if (req.role) filter.role = req.role;

   try {
      const result = await ODM.models.User.find(filter);
      return result;
   } catch (e) {
      console.log('ERROR FETCHING USERS', e);
      return [];
   }
};

export const getAllUserSubjectKeys = async (req) => {
   let filter = {};
   if (req._id) filter._id = req._id;
   if (req.email) filter.email = req.email;

   try {
      const user = await ODM.models.User.findOne(filter);
      if (!user) {
         throw new Error('User not found');
      }
      return user.subjects;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

export const getUserPassword = async (req) => {
   try {
      const userData = await ODM.models.User.findOne({ _id: req.user._id });
      return (await bcryptjs.compare(req.password, userData.password))
         ? { success: true, message: 'Correct password' }
         : { success: false, message: 'Invalid password' };
   } catch (err) {
      throw err;
   }
};

export const updatePassword = async (req) => {
   try {
      const hashedPassword = await bcryptjs.hash(req.parameter, 8);
      const filter = { _id: req.user._id };
      const update = { password: hashedPassword };
      const updatedUser = await ODM.models.User.findOneAndUpdate(filter, update);
      return requestSuccess({ message: 'Password updated successfully' });
   } catch (e) {
      console.log('Error updating password -> UserActions', e);
   }
};

export const updateFirstName = async (req) => {
   try {
      const filter = { _id: req.user._id };
      const update = { firstName: req.parameter };
      let updatedUser = await ODM.models.User.findOneAndUpdate(filter, update);
      updatedUser = await ODM.models.User.findOne(filter);
      const dataObj = {
         firstName: updatedUser.firstName,
         lastName: updatedUser.lastName,
      };
      return requestSuccess({
         message: 'First Name updated successfully',
         data: dataObj,
      });
   } catch (e) {
      console.log('Error updating FirstName -> UserActions', e);
   }
};

export const updateLastName = async (req) => {
   try {
      const filter = { _id: req.user._id };
      const update = { lastName: req.parameter };
      let updatedUser = await ODM.models.User.findOneAndUpdate(filter, update);
      updatedUser = await ODM.models.User.findOne(filter);
      const dataObj = {
         firstName: updatedUser.firstName,
         lastName: updatedUser.lastName,
      };
      return requestSuccess({
         message: 'Last Name updated successfully',
         data: dataObj,
      });
   } catch (e) {
      console.log('Error updating LastName -> UserActions', e);
   }
};

export const removeUser = async (user) => {
   try {
      const result = await ODM.models.User.findOneAndRemove({
         email: user.email,
      });
      console.log('USER DELETE RESULT:', result);
      return result
         ? { success: true, message: 'User deleted' }
         : { success: false, message: 'User not deleted' };
   } catch (e) {
      console.log('ERROR DELETING USER', e);
      return { success: false, message: 'Something went wrong' };
   }
};

export const removeAllUsersByType = async (type) => {
   const result = await ODM.models.User.findByIdAndDelete({ role: type })
      .then((deletedUser) => {
         console.log('Account deleted: ' + deletedUser);
         return `USER WAS REMOVED`;
      })
      .catch((e) => {
         console.log(e.message);
      });

   return result;
};

export const getUserChats = async (req) => {
   try {
      let userChats = await ODM.models.Chat.find({
         users: { $in: req.user._id },
      }).populate('users');
      return { success: true, data: userChats };
   } catch (e) {
      console.log('e', e);
      return { success: false, message: 'USER NOT FOUND' };
   }
};

export const findSubjectTeachers = async (req) => {
   return await ODM.models.User.find({
      subjects: { $in: [req.subject] },
      $or: [{ role: 'Teacher' }, { role: 'Admin' }],
   });
};

export const removeUserSubject = async (req) => {
   const user = await ODM.models.User.findOne({ _id: req.user._id });
   let subjectIndex = user.subjects.indexOf(req.subject._id);
   user.subjects.splice(subjectIndex, 1);
   await user.save();
   return { success: true, message: 'Subject removed from your list' };
};

export const updateStudentActive = async (req) => {
   try {
      const filter = { _id: req.student._id };
      const update = { isActive: true };
      let user = await ODM.models.User.findOneAndUpdate(filter, update);
      user = await ODM.models.User.find(filter);
      return requestSuccess({ message: 'Student updated', data: user });
   } catch (e) {
      console.log(e);
      return requestFailure({ message: 'Something went wrong' });
   }
};

export const updateStudentInactive = async (req) => {
   try {
      const filter = { _id: req.student._id };
      const update = { isActive: false };
      let user = await ODM.models.User.findOneAndUpdate(filter, update);
      user = await ODM.models.User.find(filter);
      return requestSuccess({ message: 'Student updated', data: user });
   } catch (e) {
      console.log(e);
      return requestFailure({ message: 'Something went wrong' });
   }
};
