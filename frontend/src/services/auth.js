import jwt from 'jsonwebtoken';

const isAuthenticated = () => {
  const token = localStorage.getItem("token");

  if (token) {
    const decoded = jwt.decode(token);
    if (decoded) {
      if ('id' in decoded) return true;
    }
  }

  return false;
}

export default isAuthenticated;