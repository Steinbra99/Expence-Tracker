// Users model
const User = require('../models/User');
// Login model
const Login = require('../models/Login');

const isEmailInUse = (email) => {
  User.find({ email: email })
  .then(user => {
    if (user || user[0] || user[0].email === email) {
      return true
    } else {
      console.log(user);
      return false
    }
  })
  .catch(console.log)
}

const registerUserInDB = (req, res, db, name, email, hash) => {

  const newUser = new User({
    name: name,
    email: email,
  });

  const newLogin = new Login({
    email: email,
    hash: hash
  });

  let session = null;

  return db.startSession()
  .then(_session => {
    session = _session;
    // start  a transaction
    session.startTransaction()
    newLogin.save()
  })
  .then(() => {
    return newUser.save()
      .then(user => res.json(user))
  })
  .then(() => {
    session.commitTransaction();
    session.endSession();
    return true
  })
  .catch(err => {
    console.log(err);
    session.abortTransaction();
    session.endSession();
    return res.status(400).json('Unable to register')
  });
}

const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json('incorrect form submission')
  } // else if (password.lenght < 8)

  var hash = bcrypt.hashSync(password);

  return isEmailInUse(email) ?
    res.status(400).json('email already in use')
    : registerUserInDB(req, res, db, name, email, hash);

}

module.exports = {
  handleRegister
}
