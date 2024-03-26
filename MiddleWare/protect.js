const jwt = require('jsonwebtoken')
const ModelAgentAdmin = require('../Models/AgentAdmin')

module.exports = {
  protect: async (req, res, next) => {
    let token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      return res.status(201).json('token expired')
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      if (!decoded?.id) {
        return res.status(201).json('token expired')
      }

      ModelAgentAdmin.findById(decoded.id)
      .then((user) => {
        if (user) {
          req.user = user
          next()
        } else {
          done(null, user)
        }
      })
      .catch(function (err) {
        return res.status(201).json('token expired')
      })
    } catch (error) {
      return res.status(201).json('token expired')
    }
  },
}
