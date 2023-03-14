import express from 'express';
import conversationMessageController from '../controllers/conversationMessageController.js';
import authController from '../controllers/authController.js';
const conversationRouter = express.Router();

conversationRouter.use(authController.protect);

conversationRouter
  .route('/:conversationId/messages')
  .post(conversationMessageController.createConversationMessage)
  .get(conversationMessageController.getAllMessagesByConversation);

export default conversationRouter;
