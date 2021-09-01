import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import initRoutes from './routes';
import mongoose from 'mongoose';
import express from 'express';
import morgan from 'morgan';
import YAML from 'yamljs';
import cors from 'cors';

const swaggerDocument = YAML.load('./src/swagger.yaml');

(() => {
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

  const PORT = 5000;
  const app = express();
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(morgan('dev'));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.listen(PORT, () => console.log(`Example app listening at port ${PORT}`));

  initRoutes(app);
})();
