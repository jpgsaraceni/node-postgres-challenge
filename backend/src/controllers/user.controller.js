import { createRequest } from '../services/create.js';
import { readRequest } from '../services/read.js';
import { updateRequest } from '../services/update.js';
import { deleteRequest } from '../services/delete.js';

export const createUser = (req, res) => {
  createRequest(req, res, 'users');
};
export const readUsers = (req, res) => {
  readRequest(req, res, 'users');
};
export const updateUsers = (req, res) => {
  updateRequest(req, res, 'users');
};
export const deleteUsers = (req, res) => {
  deleteRequest(req, res, 'users');
};