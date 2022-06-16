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

const PlayerSchema = new Schema(
  {
    playerName: { type: String, maxlength: 255 },
    playerRole: {type: String, maxlength: 255},
    dayOfBirth: { type: Date },
    nationality: { type: String},
    avatar: { type: String},
    totalGoal: { type: Number},
    clubId: { type: Schema.Types.ObjectId, ref: 'club'}
  },
  {
    collection: 'player',
  },
)
export default mongoose.model('player', PlayerSchema)
