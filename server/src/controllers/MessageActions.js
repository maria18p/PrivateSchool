import mongoose from 'mongoose';
import { ODM } from '../middleware/commonModule.js';

export const createChat = async (users) => {
   try {
      const result = await ODM.models.Chat.create({
         _id: new mongoose.Types.ObjectId(),
         users: users,
      });
      result.save();
      return { success: true, data: result };
   } catch (err) {
      console.log('ERROR CREATING CHAT');
      console.log('err', err);
      return { success: false, message: 'SOMETHING WENT WRONG' };
   }
};

export const addMessage = async (req) => {
   try {
      let chat = await ODM.models.Chat.findOne({
         _id: req.chat._id,
      });
      if (!chat) return { success: false, message: 'CHAT NOT FOUND' };
      let messageObj = {
         sender: req.user._id,
         message: req.message,
      };
      chat.messages.push(messageObj);
      chat.save();
      chat = await ODM.models.Chat.findOne({
         _id: req.chat._id,
      });
      return { success: true, message: 'message sent' };
   } catch (e) {
      return { success: false, message: 'message not sent' };
   }
};

export const getMessages = async (filter) => {
   return await ODM.models.Message.find();
};

export const getMessagesByKeys = async (keys) => {
   let result = [];
   const allMessages = await getMessages();
   allMessages.forEach((message) => {
      if (keys.data.includes(message._id)) {
         result.push(message);
      }
   });
   return { success: true, data: result };
};
