import express from 'express';
import conversationMessageController from '../controllers/conversationMessageController.js';
import authController from '../controllers/authController.js';
import { checkUserIsInConversation } from '../middlewares/userModelMiddlewares.js';

const conversationRouter = express.Router();
conversationRouter.use(authController.protect);

conversationRouter
  .route('/:conversationId/messages')
  .get(
    checkUserIsInConversation,
    conversationMessageController.getAllMessagesByConversation
  )
  .post(
    checkUserIsInConversation,
    conversationMessageController.createConversationMessage
  );

export default conversationRouter;
