const { toLower, trim } = require('../utils/sanitizers');

module.exports = (fields) => (req, res, next) => {
  fields.forEach(field => {
    if (req.body[field]) {
      req.body[field] = toLower(trim(req.body[field]));
    }
  });
  next();
};