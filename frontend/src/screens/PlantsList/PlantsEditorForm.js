import React, { useState } from 'react';
import { TextField } from 'formik-material-ui';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Slider,
} from '@material-ui/core';

const PlantSchema = yup.object({
  name: yup
    .string('Podaj własną nazwę dla rośliny')
    .min(3, 'Nazwa rośliny musi posiadać minimum 3 znaki')
    .max(26, 'Nazwa rośliny może posiadać maksymalnie 26 znaków')
    .required('Nazwa dla rośliny jest wymagana'),
  airHumidity: yup.array().of(yup.number().min(0).max(100)),
  soilMoisture: yup.array().of(yup.number().min(0).max(100)),
  airTemp: yup.array().of(yup.number().min(0).max(40)),
  lightLuminosity: yup.array().of(yup.number().min(0).max(100)),
  chlorophyllContent: yup.array().of(yup.number().min(0).max(100)),
});

const initialValues = {
  name: '',
  airHumidity: [60, 80],
  soilMoisture: [60, 80],
  airTemp: [20, 37],
  lightLuminosity: [60, 80],
  chlorophyllContent: [60, 80],
};

const PlantsEditorForm = ({
  visible,
  editMode,
  plant,
  onClose,
  onCreateSubmit,
  onEditSubmit,
}) => {
  const onSubmit = (values, formik) => {
    const submit = editMode ? onEditSubmit : onCreateSubmit;
    const preparedValues = {
      name: values.name,
      minAirHumidity: values.airHumidity[0],
      maxAirHumidity: values.airHumidity[1],
      minSoilMoisture: values.soilMoisture[0],
      maxSoilMoisture: values.soilMoisture[1],
      minAirTemp: values.airTemp[0],
      maxAirTemp: values.airTemp[1],
      minLightLuminosity: values.lightLuminosity[0],
      maxLightLuminosity: values.lightLuminosity[1],
      minChlorophyllContent: values.chlorophyllContent[0],
      maxChlorophyllContent: values.chlorophyllContent[1],
    };
    return submit(preparedValues)
      .then(onClose)
      .catch(error => {
        if (error.response.data.message === 'plant/PLANT_NAME_IN_USE') {
          formik.setFieldError(
            'name',
            'Podana nazwa rośliny jest już w użyciu'
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
            name: plant.name,
            airHumidity: [plant.minAirHumidity, plant.maxAirHumidity],
            soilMoisture: [plant.minSoilMoisture, plant.maxSoilMoisture],
            airTemp: [plant.minAirTemp, plant.maxAirTemp],
            lightLuminosity: [
              plant.minLightLuminosity,
              plant.maxLightLuminosity,
            ],
            chlorophyllContent: [
              plant.minChlorophyllContent,
              plant.maxChlorophyllContent,
            ],
          }),
        }}
        onSubmit={onSubmit}
        validationSchema={PlantSchema}
      >
        {({ submitForm, isSubmitting, values, setFieldValue, errors }) => (
          <Form>
            <DialogTitle>
              {editMode ? 'Edytuj roślinę' : 'Dodaj roślinę'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Field
                  component={TextField}
                  name="name"
                  label="Własna nazwa rośliny"
                  variant="outlined"
                  fullWidth
                />
                <Typography gutterBottom style={{ marginTop: 26 }}>
                  Wilgotność powietrza {errors.airHumidity}
                </Typography>
                <Slider
                  value={values.airHumidity}
                  onChange={(event, value) => {
                    setFieldValue('airHumidity', value);
                  }}
                  step={1}
                  max={100}
                  marks={percentageMarks}
                  valueLabelDisplay="auto"
                />

                <Typography gutterBottom style={{ marginTop: 26 }}>
                  Wilgotność gleby {errors.soilMoisture}
                </Typography>
                <Slider
                  value={values.soilMoisture}
                  onChange={(event, value) => {
                    setFieldValue('soilMoisture', value);
                  }}
                  step={1}
                  max={100}
                  marks={percentageMarks}
                  valueLabelDisplay="auto"
                />

                <Typography gutterBottom style={{ marginTop: 26 }}>
                  Temperatura powietrza {errors.airTemp}
                </Typography>
                <Slider
                  value={values.airTemp}
                  onChange={(event, value) => {
                    setFieldValue('airTemp', value);
                  }}
                  step={1}
                  max={40}
                  marks={tempMarks}
                  valueLabelDisplay="auto"
                />

                <Typography gutterBottom style={{ marginTop: 26 }}>
                  Nasłonecznienie {errors.lightLuminosity}
                </Typography>
                <Slider
                  value={values.lightLuminosity}
                  onChange={(event, value) => {
                    setFieldValue('lightLuminosity', value);
                  }}
                  step={1}
                  max={100}
                  marks={percentageMarks}
                  valueLabelDisplay="auto"
                />

                <Typography gutterBottom style={{ marginTop: 26 }}>
                  Zawartość chlorofilu {errors.chlorophyllContent}
                </Typography>
                <Slider
                  value={values.chlorophyllContent}
                  onChange={(event, value) => {
                    setFieldValue('chlorophyllContent', value);
                  }}
                  step={1}
                  max={100}
                  marks={percentageMarks}
                  valueLabelDisplay="auto"
                />
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

const tempMarks = [
  {
    value: 0,
    label: '0°C',
  },
  {
    value: 40,
    label: '40°C',
  },
];

const percentageMarks = [
  {
    value: 0,
    label: '0%',
  },
  {
    value: 100,
    label: '100%',
  },
];

export default PlantsEditorForm;
