import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSettings } from "./hooks.js";

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
  },
);

contactsSchema.post("save", handleSaveError);

contactsSchema.pre("findOneAndUpdate", setUpdateSettings);

contactsSchema.post("findOneAndUpdate", handleSaveError);

const Contact = model("contact", contactsSchema);

export default Contact;
