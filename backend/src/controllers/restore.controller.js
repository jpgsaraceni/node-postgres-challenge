import restoreRequest from "../services/restore.js";

export const restore = (req, res) => {
  const { category } = req.params;
  restoreRequest(req, res, category);
}