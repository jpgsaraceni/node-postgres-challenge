import { loginRequest } from '../services/login.js';

export const login = (req, res) => {
  loginRequest(req, res);
}