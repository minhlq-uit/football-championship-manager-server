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

const ParameterSchema = new Schema(
  {
    nameParameter: {type: String, maxlength: 255},
    value: {type: Number}
  },
  {
    collection: 'parameter',
  },
)
export default mongoose.model('parameter', ParameterSchema)
