import catchAsync from '../utils/catchAsync.js';
import status from 'http-status';
import ConversationModel from '../models/conversation.js';
import { conversationError } from '../configs/conversationMessage.js';
import { findContactEstate } from '../services/estate.services.js';

const createConversation = catchAsync(async (req, res, next) => {
  //setEstateUserIds();
  const { user, estate } = req.body;
  const contactEstate = await findContactEstate(estate);
  const seller = contactEstate.owner;

  const conversation = await ConversationModel.initiateConversation(
    seller,
    user,
    estate
  );
  return res.status(status.CREATED).json({
    message: conversationError.success,
    data: {
      record: conversation,
    },
  });
});

const conversationController = { createConversation };

export default conversationController;
