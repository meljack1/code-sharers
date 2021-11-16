const jwt = require('jsonwebtoken');

const secret = "codesharerssecret";

const expiration = "2h"; 


module.exports = {
    authMiddleware: function ({ req }) {
      // allows token to be sent via req.body, req.query, or headers

      let token = req.body.token || req.query.token || req.headers.authorization;

      // We split the token string into an array and return actual token
    if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
      }
    }
    
}
