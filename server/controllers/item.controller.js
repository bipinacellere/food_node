// const Item = require("../models/item.model.js");
const sql = require("./../config/db.js");

// Create and Save a new Item
exports.create = async (req, res) => {
  const { name, arrival_date } = req.body;

  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  await sql.query(
    'INSERT INTO truck_details (name, arrival_date, created_dt, updated_dt) VALUES ($1, $2, now(), now())',
    [name, new Date(arrival_date).toLocaleDateString()],
  );

  res.status(201).send({
    message: 'Item added successfully!'
  });
};

// Retrieve all Items from the database (with condition).
exports.findAll = async (req, res) => {
  let where='';
  if(req.query.today === 'true')
  {
    where = ' WHERE arrival_date=CURRENT_DATE';
  }
  const response = await sql.query(
    `SELECT id, name, TO_CHAR(arrival_date, 'YYYY-MM-DD') as arrival_date FROM truck_details ${where} ORDER BY id DESC`,
  );
  res.status(200).send(response.rows);
};

// Find a single Item by Id
exports.findOne = async (req, res) => {
  const itemId = parseInt(req.params.id);
  const response = await sql.query(
    `SELECT id, name, TO_CHAR(arrival_date, 'YYYY-MM-DD') as arrival_date FROM truck_details where id=$1`, [itemId]
  );
  res.status(200).send(response.rows[0]);
};

// Update a Item identified by the id in the request
exports.update = async (req, res) => {
  const itemId = parseInt(req.params.id);
  const { name, arrival_date } = req.body;

  await sql.query(
    'UPDATE truck_details SET name = $2, arrival_date = $3, updated_dt=now() WHERE id = $1',
    [itemId, name, new Date(arrival_date).toLocaleDateString()],
  );

  res.status(200).send({ message: 'Item Updated Successfully!' });
};

// Delete a Item with the specified id in the request
exports.delete = async (req, res) => {
  const itemId = parseInt(req.params.id);

  await sql.query(
    'DELETE FROM truck_details WHERE id = $1',
    [itemId],
  );

  res.status(200).send({ message: 'Item deleted successfully!' });
};