var db = require('../db');

module.exports.index = function(req, res) {
  res.render('users/index', {
    users: db.get('users').value()
  });
};

module.exports.search = function(req, res) {
  var q = req.query.q;
  var data = db.get('users').value();
  var matchedUser = data.filter(value => {
    return value.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  })
  res.render('users/index', {
    users: matchedUser
  });
};

module.exports.create = function(req, res) {
  res.render('users/create');
};

module.exports.postCreate = function(req, res) {
  db.get('users').push(req.body).write();
  res.redirect('/users');
};