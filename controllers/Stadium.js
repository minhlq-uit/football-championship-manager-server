import stadiumDb from "../models/database/stadiumDb.js";

const getAllStadium = (req, res) => {
  stadiumDb.find().then(
    (data) => {
      res.send(data);
    },
    (err) => {
      res.status(400).send(err.message);
    }
  );
};

const getStadiumById = async (req, res) => {
//   let query = { _id: req.params.stadiumId };
//   console.log("query", query);
  stadiumDb.findById(req.params.stadiumId).then(
    (data) => {
      res.send(data);
    },
    (err) => {
      res.status(400).send(err.message);
    }
  );
};

const createNewStadium = (req, res) => {
  let stadium = new stadiumDb({
    name: req.body.name,
    address: req.body.address,
    capacity: req.body.capacity,
    size: req.body.size,
  });

  stadium.save().then(
    (data) => {
      res.send(data);
    },
    (err) => {
      res.status(400).send(err.message);
    }
  );
};

const updateStadium = (req, res) => {
  // let query = req.params;
  let query = { _id: req.params.stadiumId };

  stadiumDb.findOneAndUpdate(
    query,
    {
      name: req.body.name,
      address: req.body.address,
      capacity: req.body.capacity,
      size: req.body.size,
    },
    (err, data) => {
      if (err) {
        res.send(err.message);
      }
      res.send(data);
    }
  );
};

const deleteStadium = (req, res) => {
  let query = req.params;

  stadiumDb.findOneAndDelete(query, (err, data) => {
    if (err) {
      res.send(err.message);
    }
    res.send(data);
  });
};

export {
  getAllStadium,
  getStadiumById,
  createNewStadium,
  updateStadium,
  deleteStadium,
};
