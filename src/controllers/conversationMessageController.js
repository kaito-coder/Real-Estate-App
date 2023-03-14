import catchAsync from '../utils/catchAsync.js';
import status from 'http-status';
import ConversationMessageModel from '../models/conversationMessage.js';
import { conversationError } from '../configs/conversationMessage.js';
import APIFeatures from '../utils/APIFeatures.js';

const createConversationMessage = catchAsync(async (req, res, next) => {
  const newMessage = await ConversationMessageModel.create(req.body);
  const { conversation } = req.body;
  global.io.to(conversation).emit('newMessage', { message: newMessage });
  return res.status(status.CREATED).json({
    message: conversationError.success,
    data: newMessage,
  });
});
// get all message by ConversationId for user
const getAllMessagesByConversation = catchAsync(async (req, res, next) => {
  const { conversationId } = req.params;
  const messages = ConversationMessageModel.find({
    conversation: conversationId,
  });
  const features = new APIFeatures(messages, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const doc = await features.query;
  res.status(status.OK).json({
    messages: conversationError.OK,
    data: {
      records: doc,
      total: doc.length,
    },
  });
});

const conversationMessageController = {
  createConversationMessage,
  getAllMessagesByConversation,
};
export default conversationMessageController;
