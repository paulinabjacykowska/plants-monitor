import { Schema, model, Model, Document } from 'mongoose';
import { IUser } from './user';

export interface IPlant extends Document {
  user: IUser['_id'];
  name: string;
  minAirHumidity: number;
  maxAirHumidity: number;
  minSoilMoisture: number;
  maxSoilMoisture: number;
  minAirTemp: number;
  maxAirTemp: number;
  minLightLuminosity: number;
  maxLightLuminosity: number;
  minChlorophyllContent: number;
  maxChlorophyllContent: number;
}

const PlantSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  minAirHumidity: {
    type: Number,
    required: true,
  },
  maxAirHumidity: {
    type: Number,
    required: true,
  },
  minSoilMoisture: {
    type: Number,
    required: true,
  },
  maxSoilMoisture: {
    type: Number,
    required: true,
  },
  minAirTemp: {
    type: Number,
    required: true,
  },
  maxAirTemp: {
    type: Number,
    required: true,
  },
  minLightLuminosity: {
    type: Number,
    required: true,
  },
  maxLightLuminosity: {
    type: Number,
    required: true,
  },
  minChlorophyllContent: {
    type: Number,
    required: true,
  },
  maxChlorophyllContent: {
    type: Number,
    required: true,
  },
});

const Plant: Model<IPlant> = model('Plant', PlantSchema);

export default Plant;
