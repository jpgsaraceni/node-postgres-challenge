import jwt from 'jsonwebtoken';

const isAuthenticated = () => {
  if (!document.cookie) return false;
  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('token='))
    .split('=')[1]
  if (!cookieValue) return false;
  const decoded = jwt.decode(cookieValue);
  return "id" in decoded ? true : false;
}

export default isAuthenticated;