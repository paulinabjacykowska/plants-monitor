import { TextField } from 'formik-material-ui';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import React from 'react';
import {
  DialogContentText,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Button,
  Dialog,
} from '@material-ui/core';

const SensorSchema = yup.object({
  name: yup
    .string('Podaj włąsną nazwę dla czujnika')
    .min(3, 'Nazwa czujnika musi posiadać minimum 3 znaki')
    .max(26, 'Nazwa czujnika może posiadać maksymalnie 26 znaków')
    .required('Nazwa dla czujnika jest wymagana'),
  deviceNumber: yup
    .string('Podaj identyfikator urządzenia')
    .length(8, 'Identyfikator urządzenia powinien mieć 8 znaków długości')
    .required('Identyfikator urządzenia jest wymagany'),
  plantId: yup.string('Wybierz roślinę').required('Wybierz roślinę'),
});

const initialValues = {
  name: '',
  deviceNumber: '',
  plantId: '',
};

const SensorEditorForm = ({
  visible,
  editMode,
  sensor,
  onClose,
  plants,
  onCreateSubmit,
  onEditSubmit,
}) => {
  const onSubmit = (values, formik) => {
    const submit = editMode ? onEditSubmit : onCreateSubmit;
    return submit(values)
      .then(onClose)
      .catch(error => {
        if (error.response.data.message === 'sensor/DEVICE_NUMBER_IN_USE') {
          formik.setFieldError(
            'deviceNumber',
            'Podany czujnik jest już w użyciu'
          );
        }
      });
  };
  return (
    <Dialog open={visible} onBackdropClick={onClose} maxWidth="xs" fullWidth>
      <Formik
        initialValues={{
          ...initialValues,
          ...(editMode && {
            name: sensor.name,
            deviceNumber: sensor.deviceNumber,
            plantId: sensor.plant._id,
          }),
        }}
        onSubmit={onSubmit}
        validationSchema={SensorSchema}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <DialogTitle>
              {editMode ? 'Edytuj czujnik' : 'Dodaj czujnik'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Field
                  component={TextField}
                  name="name"
                  label="Własna nazwa czujnika"
                  variant="outlined"
                  fullWidth
                />
                <Field
                  component={TextField}
                  name="deviceNumber"
                  label="Identyfikator urządzenia"
                  variant="outlined"
                  fullWidth
                  style={{ marginTop: 18 }}
                />
                <Field
                  component={TextField}
                  select
                  label="Roślina"
                  name="plantId"
                  helperText="Wybierz podpiętą roślinę"
                  variant="outlined"
                  fullWidth
                  style={{ marginTop: 18 }}
                >
                  {plants.map(plant => (
                    <MenuItem key={plant._id} value={plant._id}>
                      {plant.name}
                    </MenuItem>
                  ))}
                </Field>
              </DialogContentText>
            </DialogContent>

            <DialogActions>
              <Button onClick={onClose} disabled={isSubmitting}>
                Anuluj
              </Button>
              <Button
                type="submit"
                color="primary"
                disabled={isSubmitting}
                onSubmit={submitForm}
              >
                {editMode ? 'Edytuj' : 'Dodaj'}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default SensorEditorForm;
