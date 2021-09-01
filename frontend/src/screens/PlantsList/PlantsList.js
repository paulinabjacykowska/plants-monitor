import { makeStyles } from '@material-ui/core/styles';
import PlantsEditorForm from './PlantsEditorForm';
import AddIcon from '@material-ui/icons/Add';
import React, { useState, useEffect } from 'react';
import Fab from '@material-ui/core/Fab';
import PlantItem from './PlantItem';
import { useAuth } from '../../services/auth';
import NavigationBar from '../../components/NavigationBar';
import * as api from '../../api';

const PlantsList = () => {
  const styles = useStyles();
  const { logout } = useAuth();
  const [isFormVisible, setIsFormVisible] = useState(false);

  const [selectedPlant, setSelectedPlant] = useState(null);
  const [plants, setPlants] = useState([]);

  const updatePlants = () => api.getPlants().then(res => setPlants(res.data));
  useEffect(() => {
    updatePlants();
  }, []);

  return (
    <>
      <NavigationBar LeftTitle="Rośliny" />
      <div className={styles.root}>
        <PlantsEditorForm
          visible={isFormVisible}
          editMode={!!selectedPlant}
          plant={selectedPlant}
          onClose={() => {
            setIsFormVisible(false);
            setSelectedPlant(null);
          }}
          onCreateSubmit={async values => {
            await api.addPlant(values);
            await updatePlants();
          }}
          onEditSubmit={async values => {
            await api.editPlant(selectedPlant._id, values);
            await updatePlants();
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
          <h2 className={styles.text}>Lista Twoich roślin</h2>
          <p className={styles.text}>
            Poniżej znajduje się lista wszystkich zarejestrowanych przez Ciebie
            roślin
          </p>
        </div>

        <div className={styles.plantsList}>
          <div className={styles.whiteSquare}>
            {plants.map(plant => (
              <div key={plant.id} className={styles.listItem}>
                <PlantItem
                  plant={plant}
                  onEdit={() => {
                    setSelectedPlant(plant);
                    setIsFormVisible(true);
                  }}
                  onRemove={async () => {
                    await api.removePlant(plant._id);
                    await updatePlants();
                  }}
                />
              </div>
            ))}
            {!plants.length && <span>Brak dodanych roślin</span>}
          </div>
        </div>
      </div>
    </>
  );
};

const useStyles = makeStyles({
  root: {
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
  whiteSquare: {
    backgroundColor: '#ffffff',
    alignContent: 'center',
    borderRadius: 15,
    padding: 20,
    width: '50%',
  },
  plantsList: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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

export default PlantsList;
