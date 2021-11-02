import { logoutRequest } from "../services/logout.js"

export const logout = (req, res) => {
  logoutRequest(req, res)
}