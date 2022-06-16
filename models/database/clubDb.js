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

const ClubSchema = new Schema(
  {
    fullName: { type: String, maxlength: 255 },
    shortName: { type: String, maxlength: 255 },
    city: { type: String, maxlength: 255 },
    owner: { type: String, maxlength: 255 },
    logo: { type: String, maxlength: 255 },
    coachId: { type: Schema.Types.ObjectId, ref: 'player'},
    stadiumId: { type: Schema.Types.ObjectId, ref: 'stadium'}
  },
  {
    collection: 'club',
  },
)
export default mongoose.model('club', ClubSchema)
