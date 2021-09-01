import { TextField } from 'formik-material-ui';
import { Field, Form, Formik } from 'formik';
import { useAuth } from '../services/auth';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import React from 'react';
import '../App.css';
import NavigationBar from '../components/NavigationBar';

const RegisterSchema = yup.object({
  email: yup
    .string('Podaj adres email')
    .email('Podaj poprawny adres email')
    .required('Adres email jest wymagany'),
  password: yup
    .string('Podaj hasło')
    .min(8, 'Hasło musi posiadać minimum 8 znaków')
    .max(32, 'Hasło musi posiadać maksymalnie 32 znaki')
    .required('Hasło jest wymagane'),
  name: yup
    .string('Podaj nazwę użytkownika')
    .min(3, 'Nazwa użytkownika musi mieć minimum 3 znaki długości')
    .max(16, 'Nazwa użytkownika musi posiadać maksymalnie 16 znaków')
    .required('Hasło jest wymagane'),
});

const initialValues = {
  name: '',
  email: '',
  password: '',
};

export default function Register() {
  const { register } = useAuth();
  const handleRegisterSubmit = (values, formik) => {
    return register(values).catch(error => {
      if (
        error.response.data.message ===
        'user/USER_WITH_THIS_EMAIL_ALREADY_EXISTS'
      ) {
        formik.setFieldError('email', 'Podany adres email został już użyty');
      }
    });
  };

  return (
    <>
      <NavigationBar LeftTitle="Rejestracja" />
      <div className="App">
        <header className="App-header">
          <div className="white-square">
            <div className="row">
              <div
                className="column form-container"
                style={{ maxWidth: '45%' }}
              >
                <div className="jakiesKurwaGowno">
                  <h1 className="titleLog">Zarejestruj się</h1>
                  <h2 className="subtitle">
                    Masz już konto? <Link to="/login">Przejdź tutaj</Link>
                  </h2>
                  <Formik
                    initialValues={initialValues}
                    onSubmit={handleRegisterSubmit}
                    validationSchema={RegisterSchema}
                  >
                    {({ submitForm, isSubmitting }) => (
                      <Form>
                        <div style={{ display: 'flex', marginTop: 18 }}>
                          <Field
                            component={TextField}
                            label="Nazwa użytkownika"
                            name="name"
                            variant="outlined"
                            fullWidth
                            style={{ marginRight: 18 }}
                          />
                          <Field
                            component={TextField}
                            label="Email"
                            name="email"
                            variant="outlined"
                            fullWidth
                          />
                        </div>
                        <Field
                          component={TextField}
                          label="Hasło"
                          name="password"
                          type="password"
                          variant="outlined"
                          fullWidth
                          style={{ marginTop: 18 }}
                        />

                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          fullWidth
                          style={{ padding: 12, marginTop: 26 }}
                          onSubmit={submitForm}
                          disabled={isSubmitting}
                        >
                          Zarejestruj się
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
