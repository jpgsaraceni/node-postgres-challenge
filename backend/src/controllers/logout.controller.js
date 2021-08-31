export const logout = (req, res) => {
  if (req.cookies.token) {
    res.clearCookie('token');
    res.sendStatus(200);
  } else {
    res.sendStatus(400)
  }
}