import bcrypt from 'bcrypt';

export const compare = (text, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(text, hash)
      .then(result => resolve(result))
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