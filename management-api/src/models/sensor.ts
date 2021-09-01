import { Schema, model, Model, Document } from "mongoose";
import { IUser } from "./user";
import { IPlant } from "./plant";

export interface ISensor extends Document {
  plant: IPlant["_id"];
  user: IUser["_id"];
  name: string;
  deviceNumber: string;
}

const SensorSchema: Schema = new Schema({
  plant: {
    type: Schema.Types.ObjectId,
    ref: "Plant",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  deviceNumber: {
    type: String,
    required: true,
    unique: true,
  },
});

const Sensor: Model<ISensor> = model("Sensor", SensorSchema);

export default Sensor;
