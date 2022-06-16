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

const GoalSchema = new Schema(
  {
    typeGoal: { type: String, maxlength: 255 },
    goalTime: { type: Number},
    playerId: { type: Schema.Types.ObjectId, ref: 'player'},
    matchId: { type: Schema.Types.ObjectId, ref: 'match'}
  },
  {
    collection: 'goal',
  },
)
export default mongoose.model('goal', GoalSchema)
