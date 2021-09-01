import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ChartSimpleBar from '../components/ChartSimpleBar';
import NavigationBar from '../components/NavigationBar';
import * as api from '../api';

export default function PlantDetails() {
  const styles = useStyles();
  const params = useParams();
  const [plant, setPlant] = useState(null);
  const [sensor, setSensor] = useState(null);

  useEffect(() => {
    api.getPlant(params.id).then(res => setPlant(res.data));
  }, []);

  useEffect(() => {
    api.getSensorByPlant(params.id).then(res => setSensor(res.data));
  }, []);

  if (plant === null || sensor === null) {
    return null;
  }

  return (
    <div className={styles.home}>
      <NavigationBar LeftTitle="Szczegóły" />

      <div className={styles.backgroundImage}>
        <h1 className={styles.centerTilte}>{plant.name}</h1>
      </div>

      <div className={styles.cultivationAndParameters}>
        <div className={styles.text}>
          <h2>Ustawione parametry idealne dla uprawy tej rośliny:</h2>
          <ul>
            <li>
              Wilgotność powietrza: {plant.minAirHumidity}% -{' '}
              {plant.maxAirHumidity}%
            </li>
            <li>
              Wilgotność gleby: {plant.minSoilMoisture}% -{' '}
              {plant.maxSoilMoisture}%
            </li>
            <li>
              Temperatura powietrza: {plant.minAirTemp}&deg;C -{' '}
              {plant.maxAirTemp}
              &deg;C
            </li>
            <li>
              Nasłonecznienie: {plant.minLightLuminosity}% -{' '}
              {plant.maxLightLuminosity}%
            </li>
            <li>
              Zawartość chlorofilu: {plant.minChlorophyllContent}% -{' '}
              {plant.maxChlorophyllContent}%
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.specificPlant}>
        <div className={styles.title}>
          <h2>Raport:</h2>
        </div>
        <div className={styles.chartsContainer}>
          <div className={styles.chart}>
            <ChartSimpleBar sensorId={sensor[0]._id} />
          </div>
        </div>
      </div>
    </div>
  );
}
const useStyles = makeStyles({
  home: { marginBottom: '250px' },
  backgroundImage: {
    backgroundImage: 'url(/backgroundImage.png)',
    width: '100%',
    height: 250,
    color: '#2B8505',
    backgroundSize: 'cover',
    verticalAlign: 'middle',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    float: 'right',
    display: 'flex',
    height: 15,
  },
  extraMargin: {
    marginRight: 10,
    marginTop: 10,
  },
  cultivationAndParameters: {
    display: 'flex',
    backgroundColor: 'white',
    padding: 20,
  },
  text: {
    width: '50%',
    padding: '50px 60px 0px 60px',
  },
  flower: {
    marginRight: '10px',
  },
  title: {
    width: '50%',
    padding: '50px 60px 0px 60px',
    color: 'gray',
  },
  chartsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  chart: {
    padding: '50px 60px 0px 60px',
  },
  advices: {
    width: '50%',
    padding: '50px 60px 0px 60px',
  },
});
