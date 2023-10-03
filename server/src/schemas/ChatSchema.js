import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const chatSchema = new Schema({
   _id: mongoose.Schema.Types.ObjectId,
   users: {
      type: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
         },
      ],
      required: true,
   },

   messages: {
      default: [],
      type: [
         {
            sender: {
               type: mongoose.Schema.Types.ObjectId,
               ref: 'User',
            },
            message: String,
            createdAt: { type: Date, default: Date.now },
            updatedAt: { type: Date, default: Date.now },
         },
      ],
   },
   createdAt: { type: Date, default: Date.now },
   updatedAt: { type: Date, default: Date.now },
});

export const connectChatModel = async (ODM) => {
   await ODM.model('Chat', chatSchema);
};
