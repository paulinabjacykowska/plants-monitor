import * as readingService from './services/readingsService';
import { ReadingInput } from './services/readingsService';
import mongoose from 'mongoose';
import queue from './queue';

(async () => {
  if (!process.env.IP_ADDRESS) {
    console.log('Pass IP_ADDRESS in .env');
    return;
  }

  mongoose
    .connect(`mongodb://${process.env.IP_ADDRESS}:27017`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      user: 'admin',
      pass: 'password',
      dbName: 'rsi-plants',
    })
    .then(() => console.log('Connected to the database'))
    .catch(console.error);

  await queue.connect();
  await queue.consume(async (message) => {
    const messageText = message?.content.toString();
    const readingData =
      (messageText && (JSON.parse(messageText) as ReadingInput)) || null;

    if (!readingData) return;
    const readingSaved = await readingService.addReading(readingData);
    console.log(
      readingSaved
        ? `Reading for device #${readingData.deviceNumber} passed`
        : `Reading for device #${readingData.deviceNumber} failed`
    );
  });
})();
