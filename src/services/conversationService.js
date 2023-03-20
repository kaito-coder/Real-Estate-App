import ConversationModel from '../models/conversation.js';

const findConversationsByUserId = async (userId) => {
  try {
    const conversations = await ConversationModel.find({
      $or: [{ buyer: userId }, { seller: userId }],
    });
    return conversations;
  } catch (error) {
    throw new Error(error.message);
  }
};

const conversationService = { findConversationsByUserId };
export default conversationService;
