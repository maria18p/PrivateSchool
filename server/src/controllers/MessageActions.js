import mongoose from 'mongoose';
import { ODM } from '../middleware/commonModule.js';
import { ObjectId } from 'mongodb';

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

export const removeMessageFromPairing = async (req) => {
   try {
      // Find the chat by ID
      let chat = await ODM.models.Chat.findById(req.chat._id);
      // Convert req._id to ObjectId for comparison
      const objectIdToDelete = new ObjectId(req._id.toString());
      // Find the message to remove
      const messageToRemove = chat.messages.find((message) => message._id.equals(objectIdToDelete));
      console.log('Message to Remove:', messageToRemove.message);
      if (!messageToRemove) {
         return { success: false, message: 'Message not found' };
      }
      if (messageToRemove.sender.toString() !== req.user._id.toString()) {
         return { success: false, message: 'User is not authorized to remove this message' };
      }
      // Remove the message from the chat's messages array
      chat.messages = chat.messages.filter((message) => !message._id.equals(objectIdToDelete));
      // Save the updated chat
      await chat.save();
      return { success: true, data: chat, message: 'Message removed successfully' };
   } catch (error) {
      console.error('Error removing message:', error);
      return { success: false, message: 'Error removing message' };
   }
};
