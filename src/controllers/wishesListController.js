import wishesListModel from '../models/wishesList.js';
import factory from './handleFactory.js';

const getAllWishesList = factory.getAll(wishesListModel);
const getWishesList = factory.getOne(wishesListModel);
const createWishesList = factory.createOne(wishesListModel);
const updateWishesList = factory.updateOne(wishesListModel);
const deleteWishesList = factory.deleteOne(wishesListModel);

const wishesListController = {
  getAllWishesList,
  getWishesList,
  createWishesList,
  updateWishesList,
  deleteWishesList,
};
export default wishesListController;
