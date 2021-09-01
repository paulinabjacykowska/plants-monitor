import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import SensorEditorForm from '../SensorEditorForm';
import AddIcon from '@material-ui/icons/Add';
import { useAuth } from '../../services/auth';
import Fab from '@material-ui/core/Fab';
import SensorItem from './SensorItem';
import * as api from '../../api';
import NavigationBar from '../../components/NavigationBar';

export default function SensorsList() {
  const styles = useStyles();
  const { logout } = useAuth();
  const [isFormVisible, setIsFormVisible] = useState(false);

  const [selectedSensor, setSelectedSensor] = useState(null);
  const [sensors, setSensors] = useState([]);
  const updateSensors = () =>
    api.getSensors().then(res => setSensors(res.data));
  useEffect(() => {
    updateSensors();
  }, []);

  const [plants, setPlants] = useState([]);
  useEffect(() => {
    api.getPlants().then(res => setPlants(res.data));
  }, []);

  return (
    <>
      <NavigationBar LeftTitle="Czujniki" />
      <div className={styles.main}>
        <SensorEditorForm
          visible={isFormVisible}
          editMode={!!selectedSensor}
          sensor={selectedSensor}
          onClose={() => {
            setIsFormVisible(false);
            setSelectedSensor(null);
          }}
          plants={plants}
          onCreateSubmit={async values => {
            await api.addSensor(values);
            await updateSensors();
          }}
          onEditSubmit={async values => {
            await api.editSensor(selectedSensor._id, values);
            await updateSensors();
          }}
        />

        <Fab
          className={styles.addButton}
          color="primary"
          onClick={() => setIsFormVisible(true)}
        >
          <AddIcon />
        </Fab>

        <div className={styles.title}>
          <h2 className={styles.text}>Lista Twoich aktywnych czujników</h2>
          <p className={styles.text}>
            Poniżej znajduje się lista wszystkich zarejestrowanych przez Ciebie
            czujników
          </p>
        </div>
        <div className={styles.sensorsList}>
          <div className={styles.whiteSquare}>
            {sensors.map(sensor => (
              <div key={sensor.id} className={styles.listItem}>
                <SensorItem
                  sensor={sensor}
                  onEdit={() => {
                    setSelectedSensor(sensor);
                    setIsFormVisible(true);
                  }}
                  onRemove={async () => {
                    await api.removeSensor(sensor._id);
                    await updateSensors();
                  }}
                />
              </div>
            ))}
            {!sensors.length && <span>Brak dodanych czujników</span>}
          </div>
        </div>
      </div>
    </>
  );
}

const useStyles = makeStyles({
  main: {
    padding: '40px 0',
    minHeight: '100vh',
    backgroundColor: '#79B877',
  },
  title: {
    padding: '20px 0',
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  sensorsList: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteSquare: {
    backgroundColor: '#ffffff',
    alignContent: 'center',
    borderRadius: 15,
    padding: 20,
    width: '50%',
  },
  listItem: {
    paddingBottom: 10,
    paddingTop: 10,
  },

  addButton: {
    position: 'absolute',
    bottom: 60,
    right: 60,
  },
});
