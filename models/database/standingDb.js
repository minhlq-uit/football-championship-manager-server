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

const StandingSchema = new Schema(
  {
    rank: {type: Number},
    point: {type: Number},
    played: {type: Number},
    win: {type: Number},
    drawn: {type: Number},
    lose: {type: Number},
    goalsFor: {type: Number},
    goalsAgainst: {type: Number},
    goalDifference: {type: Number},
    season: {type: String},
    clubId: {type: Schema.Types.ObjectId, ref: 'club'}
  },
  {
    collection: 'standing',
  },
)
export default mongoose.model('standing', StandingSchema)
