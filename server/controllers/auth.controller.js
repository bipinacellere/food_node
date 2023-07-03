var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const sql = require("./../config/db.js");
const authConfig = require("./../config/auth.config.js");


exports.signup = async (req, res) => {
  // Save User to Database
  let user = await sql.query(
    'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
    [
      req.body.username,
      req.body.email,
      bcrypt.hashSync(req.body.password, 8), "admin"]

  );
  if (user)
    res.send({ message: "User registered successfully!" });
  else {
    res.status(500).send({ message: err.message });
  }
};

exports.signin = async (req, res) => {
  const userRow = await sql.query(
    `SELECT * FROM users where username=$1`, [req.body.username]
  );

  if (!userRow) {
    return res.status(404).send({ message: "User Not found." });
  }
  let user = userRow.rows[0];
  var passwordIsValid = bcrypt.compareSync(
    req.body.password,
    user.password
  );

  if (!passwordIsValid) {
    return res.status(401).send({
      accessToken: null,
      message: "Invalid Password!"
    });
  }

  const token = jwt.sign({ id: user.id },
    authConfig.secret,
    {
      algorithm: 'HS256',
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });
  
    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: user.role,
      accessToken: token
    });
};