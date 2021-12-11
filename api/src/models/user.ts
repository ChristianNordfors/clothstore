import mongoose, { Schema, model } from "mongoose";
import { Publication } from "./publication";
import { Shopping } from "./shopping";
import { Sales } from "./sales";
import { Address } from "./address";
import { Denunciation } from "./denunciation";

export interface User extends mongoose.Document {
  name: object;
  email: string;
  password: string;
  phone: string;
  publications: [Publication];
  shopping: [Shopping];
  sales: [Sales];
  photo: string;
  dni: string;
  userName: string;
  address: [Address];
  type: string;
  active: boolean;
  denunciations: [Denunciation];
}

const UserSchema = new Schema({
  name: {
    firstName: {
      type: String,
      required: [true, "falta first name"],
    },
    lastName: {
      type: String,
      required: [true, "falta first name"],
    },
  },
  email: {
    type: String,
    required: [true, "falta email"],
    _id: [true, "violacion de unicidad"],
  },
  password: {
    type: String,
    required: [true, "falta password"],
    min: [5, "password demaciado corta"],
  },
  phone: {
    type: String,
    validate: {
      validator: function (v: string) {
        return /\d{2}-\d{2}-\d{4}-\d{4}/.test(v);
      },
      message: (props: any) => `${props.value} is not a valid phone number!`,
    },
  },
  publications: {
    type: ["Publication"],
    ref: "Publication",
  },
  shopping: {
    type: ["Shopping"],
    ref: "Shopping",
  },
  sales: {
    type: ["Sales"],
    ref: "Sales",
  },
  active: {
    type: Boolean,
    default: true,
  },
  photo: {
    type: String,
  },
  //cambios en modelo
  dni: {
    type: String,
  },
  userName: {
    type: String,
  },
  address: {
    type: ["Address"],
    ref: "Address",
  },
  type: {
    type: String,
    required: [true, "necesita un type"],
    enum: ["normal", "admin", "employee"]

  },
  denunciations: {
    type: ["Denunciation"],
    ref: "Denunciation"
  }
});

export default model<User>("User", UserSchema);
