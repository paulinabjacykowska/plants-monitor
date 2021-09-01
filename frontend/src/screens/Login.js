import { TextField } from 'formik-material-ui';
import { Field, Form, Formik } from 'formik';
import { Button } from '@material-ui/core';
import loginImg from '../images/login.png';
import { useAuth } from '../services/auth';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import React from 'react';
import '../App.css';
import NavigationBar from '../components/NavigationBar';

const LoginSchema = yup.object({
  email: yup
    .string('Podaj adres email')
    .email('Podaj poprawny adres email')
    .required('Adres email jest wymagany'),
  password: yup.string('Podaj hasło').required('Hasło jest wymagane'),
});

const initialValues = {
  email: '',
  password: '',
};

export default function Login() {
  const { login } = useAuth();
  const handleLoginSubmit = (values, formik) => {
    return login(values).catch(() => {
      formik.setFieldError('email', 'Nieprawidłowy adres email lub hasło');
    });
  };

  return (
    <>
      <NavigationBar LeftTitle="Logowanie" />
      <div className="App">
        <header className="App-header">
          <div className="white-square">
            <div className="row">
              <div className="column form-container">
                <div className="jakiesKurwaGowno">
                  <h1 className="titleLog">Zaloguj się</h1>
                  <h2 className="subtitle">
                    Nowy użytkownik? <Link to="/register">Przejdź tutaj</Link>
                  </h2>
                  <Formik
                    initialValues={initialValues}
                    onSubmit={handleLoginSubmit}
                    validationSchema={LoginSchema}
                  >
                    {({ submitForm, isSubmitting }) => (
                      <Form>
                        <Field
                          component={TextField}
                          label="Email"
                          name="email"
                          variant="outlined"
                          fullWidth
                        />
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
                          Zaloguj się
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
              <div className="column flower-container">
                <img src={loginImg} className="flower" alt="logo" />
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
