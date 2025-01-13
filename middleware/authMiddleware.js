const jwt = require('jsonwebtoken');

exports.verifyRole = (roles) => {
  return (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).send('Acceso denegado');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!roles.includes(decoded.role)) {
        return res.status(403).send('Permisos insuficientes');
      }
      req.user = decoded;
      next();
    } catch (error) {
      res.status(400).send('Token inválido');
    }
  };
};