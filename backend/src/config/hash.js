import bcrypt from 'bcrypt';
/**
 * Checks if text matches hash then calls next function
 * @param {string} text
 * @param {string} hash
 * @param {function} next callback function when compare returns true
 * @returns {Promise} return of callback function
 */
export const compare = (text, hash, next) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(text, hash)
      .then(() => resolve(next))
      .catch(err => reject(err));
  });
};

export const createHash = (text) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(text, 10, (err, hash) => {
      if (err) reject(err);
      if (hash) resolve(hash);
    });
  });
};