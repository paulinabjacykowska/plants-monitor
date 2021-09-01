import { Schema, model, Model, Document } from "mongoose";
import { ISensor } from "./sensor";

export interface IReading extends Document {
  deviceNumber: string;
  sensor: ISensor["_id"];
  airHumidity: number;
  soilMoisture: number;
  airTemperature: number;
  lightLuminosity: number;
  chlorophyllContent: number;
}

const ReadingSchema: Schema = new Schema(
  {
    deviceNumber: {
      type: String,
      required: true,
    },
    sensor: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    airHumidity: {
      type: Number,
    },
    soilMoisture: {
      type: Number,
    },
    airTemperature: {
      type: Number,
    },
    lightLuminosity: {
      type: Number,
    },
    chlorophyllContent: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Reading: Model<IReading> = model("Reading", ReadingSchema);

export default Reading;
