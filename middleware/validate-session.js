const jwt = require('jsonwebtoken');
const User = require('../db').import('../models/user');

const validateSession = (req, res, next) => {
    if (req.method==='OPTIONS') return next()
      const token = req.headers.authorization;

      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
          if(!err && decodedToken) {
              User.findOne({ where : { id : decodedToken.id}})
              .then(user => {
                  if(!user) throw 'err';

                  req.user = user;
                  return next();
              })
              .catch(err => res.status(501).json({ error : err}))
          } else {
              return res.status(500).json({ error : 'Please login or sign up to continue.'})
          }
      });
}

module.exports = validateSession;