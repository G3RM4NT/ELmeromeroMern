import { Schema, model } from "mongoose";



const faqsSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
      maxLength: 100,
      minLength: 4,
      trim: true
    },

    answer: {
        type: String,
        required: true,
        maxLength: 100,
        minLength: 4,
        trim: true
    },

    level: {
      type: String,
      required: true,
      min: 1,
      max: 10,
      required: true
    },

    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("faqs", faqsSchema);

