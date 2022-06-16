import mongoose from 'mongoose';

import url from '../../utils/connection.js  ';

const { Schema } = mongoose
// const { ObjectId } = Schema

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {})
  .catch((err) => {
    throw err
  })

const UserSchema = new Schema(
  {
    firstName: { type: String, maxlength: 255 },
    lastName: { type: String, maxlength: 255 },
    address: {type: String, maxlength: 255},
    gender: {type: Boolean},
    dayOfBirth: { type: Date },
    phone: { type: String },
    email: { type: String },
    password: { type: String },
    type: { type: String, default: 'admin'},
    identityCard: { type: String},
  },
  {
    collection: 'user',
  },
)
export default mongoose.model('user', UserSchema)
