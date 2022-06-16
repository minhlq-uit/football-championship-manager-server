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

const MatchSchema = new Schema(
  {
    timeStart: { type: String },
    date: { type: Date},
    status: { type: String},
    matchName: {type: String},
    stadiumId: { type: Schema.Types.ObjectId, ref: 'stadium'}
  },
  {
    collection: 'match',
  },
)
export default mongoose.model('match', MatchSchema)

