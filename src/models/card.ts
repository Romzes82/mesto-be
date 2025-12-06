import { model, Schema } from 'mongoose';

interface ICard {
  name: string;
  link: string;
  owner: string; // Schema.Types.ObjectId
  likes: Schema.Types.ObjectId[];
  createdAt: Date;
}

const cardSchema = new Schema<ICard>(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    link: {
      type: String,
      required: true,
    },
    owner: {
      type: String, // Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: [{
      type: Schema.Types.ObjectId,
      required: true,
      default: [],
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

export default model<ICard>('card', cardSchema);
