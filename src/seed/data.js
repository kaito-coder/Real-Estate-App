import mongoose from 'mongoose';

export const estateStatus = [
  {
    id: mongoose.Types.ObjectId(),
    name: 'available',
  },
  {
    id: mongoose.Types.ObjectId(),
    name: 'sold',
  },
  {
    id: mongoose.Types.ObjectId(),
    name: 'dealing',
  },
];

export const estateTypes = [
  {
    id: mongoose.Types.ObjectId(),
    name: 'house',
  },
  {
    id: mongoose.Types.ObjectId(),
    name: 'apartment',
  },
  {
    id: mongoose.Types.ObjectId(),
    name: 'building',
  },
];

export const orderStatus = [
  {
    id: mongoose.Types.ObjectId(),
    name: 'pending',
    estates: [],
  },
  {
    id: mongoose.Types.ObjectId(),
    name: 'confirmed',
    estates: [],
  },
  {
    id: mongoose.Types.ObjectId(),
    name: 'done',
    estates: [],
  },
];

export const roles = [
  {
    id: mongoose.Types.ObjectId(),
    name: 'ADMIN',
  },
  {
    id: mongoose.Types.ObjectId(),
    name: 'SALER & BUYER',
  },
];
