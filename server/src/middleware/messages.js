import { addMessage, createChat, removeMessageFromPairing } from '../controllers/MessageActions.js';
import { getUserChats, getUsers } from '../controllers/UserActions.js';
import { requestFailure, requestSuccess, userLoggedIn } from './commonModule.js';

export const postCreateMessage = async (req) => {
   const isLoggedIn = await userLoggedIn(req.user);
   if (!isLoggedIn.success) return isLoggedIn;
   let user = await getUsers(req.user);
   req.user = user[0];
   if (!req.chat) {
      let user_ids = [];
      for (let i = 0; i < req.users.length; i++) {
         let userFound = await getUsers(req.users[i]);
         if (!userFound) return requestFailure({ message: 'USER NOT FOUND' });
         else user_ids.push(userFound[0]._id);
      }
      const createChatRequest = await createChat(user_ids);
      if (createChatRequest.success) req.chat = createChatRequest.data;
      else return requestFailure({ message: createChatRequest.message });
   }
   const queryResult = await addMessage(req);
   return queryResult.success
      ? requestSuccess({ message: queryResult.message })
      : requestFailure({ message: queryResult.message });
};

export const getRequestUserChat = async (req) => {
   req.user = (await getUsers(req.user))[0];
   const queryResult = await getUserChats(req);
   return queryResult.success
      ? requestSuccess({ data: queryResult.data })
      : requestFailure({ message: queryResult.message });
};

export const postRemoveChatMessage = async (req) => {
   const queryResult = await removeMessageFromPairing(req);
   return queryResult.success
      ? requestSuccess({ data: queryResult.data, message: queryResult.message })
      : requestFailure({ message: queryResult.message });
};
