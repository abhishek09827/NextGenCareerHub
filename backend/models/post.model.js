import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: String,
    desc: String,
    image: String,
    tags: String,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamp: true }
);

const Post = mongoose.model("Post", postSchema);

export { Post };
