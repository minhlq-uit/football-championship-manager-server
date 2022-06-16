import UserDb from "../models/database/userDb.js";

const getAllUser = (req, res) => {
  UserDb.find().then(
    (data) => {
      res.send(data);
    },
    (err) => {
      res.status(400).send(err.message);
    }
  );
};

const getUserById = (req, res) => {
  let query = req.params;
  UserDb.findOne(query).then(
    (data) => {
      res.send(data);
    },
    (err) => {
      res.status(400).send(err.message);
    }
  );
};

const createNewUser = async (req, res) => {
  const data = await UserDb.find({ email: req.body.email });
  if (Object.keys(data).length == 0) {
    let user = new UserDb({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      gender: req.body.gender,
      dayOfBirth: req.body.dayOfBirth,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      type: req.body.type,
      identityCard: req.body.identityCard,
    });
    user.save().then(
      () => {
        res.send("sign up success");
      },
      (err) => {
        res.status(400).send(err.message);
      }
    );
  } else {
    res.send("email already exist");
  }
};
const checkUser = async (req, res) => {
  try {
    const data = await UserDb.find({
      email: req.body.email,
      password: req.body.password,
    });
    if (Object.keys(data).length == 0) {
      res.send("Login failed");
    } else {
      res.send("login success");
    }
  } catch (err) {
    res.send(err);
  }
};
const updateUser = (req, res) => {
  const query = req.params;
  UserDb.findOneAndUpdate(
    query,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      gender: req.body.gender,
      dayOfBirth: req.body.dayOfBirth,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      type: req.body.type,
      identityCard: req.body.identityCard,
    },
    (err, user) => {
      if (err) {
        res.send(err.message);
      }
      res.send(user);
    }
  );
};

const deleteUser = (req, res) => {
  const query = req.params;

  UserDb.findOneAndRemove(query, (err, user) => {
    if (err) {
      res.send("Remove successfully");
    }
    res.send(user);
  });
};

export {
  getAllUser,
  getUserById,
  createNewUser,
  updateUser,
  deleteUser,
  checkUser,
};
