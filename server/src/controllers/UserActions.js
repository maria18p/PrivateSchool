import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ODM, requestFailure, requestSuccess } from '../middleware/commonModule.js';
import colors from 'colors';

export const addAdmin = async () => {
  try {
    const hashedPassword = await bcryptjs.hash('admin', 8);
    const admin = await ODM.models.User({
      _id: new mongoose.Types.ObjectId(),
      firstName: 'Admin',
      lastName: 'Admin',
      email: 'admin',
      password: hashedPassword,
      role: 'Admin',
    });
    admin.save();
  } catch (e) {
    console.log('Error creating admin -> UserActions', e);
  }
};

//LOGIN
export const login = async (req) => {
  try {
    const account = await ODM.models.User.findOne({ email: req.email });
    if (!account)
      return {
        user: null,
        message: 'Account with the entered email does not exist',
      };
    const isMatch = await bcryptjs.compare(req.password, account.password);
    if (!isMatch) return { user: null, message: 'Password or email does not match' };

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
    console.log('[LOGGED IN]', account.email);

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
    console.log('ERROR IN LOGIN', e.message);
    return { message: e.message };
  }
};

const updateToken = async (account, token) => {
  await ODM.models.User.findOneAndUpdate({ _id: account.id }, { token: token });
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
    // updatedUser.save();
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

// export const getUserSchedule = async (user) => {
//   const userObj = await ODM.models.User.findOne({ email: user.email });
//   if (!userObj) return { success: false, message: 'USER NOT FOUND' };
//   return { success: true, data: userObj.weeklySchedule };
// };

// export const updateSchedule = async (req) => {
//   try {
//     const userObj = await ODM.models.User.findOne({ email: req.user.email });
//     if (!userObj) return { success: false, message: 'USER NOT FOUND' };
//     userObj.weeklySchedule = req.schedule;
//     userObj.save();
//     return { success: true, message: 'Updated successfully' };
//   } catch (e) {
//     console.log(e);
//     return { success: false, message: 'SOMETHING WENT WRONG' };
//   }
// };

//Remove

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
