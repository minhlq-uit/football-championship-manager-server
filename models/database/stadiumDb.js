import mongoose from 'mongoose';

import url from '../../utils/connection.js';

const { Schema } = mongoose
// const { ObjectId } = Schema

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {})
  .catch((err) => {
    throw err
  })

const StadiumSchema = new Schema(
  {
    name: { type: String, maxlength: 255 },
    address: {type: String, maxlength: 255},
    capacity: {type: String, maxlength: 255},
    size: {type: String, maxlength: 20}
  },
  {
    collection: 'stadium',
  },
)
export default mongoose.model('stadium', StadiumSchema);