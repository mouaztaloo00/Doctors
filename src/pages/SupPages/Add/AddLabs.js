import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import AddMiniNavbar from '../../../components/minBar/AddMiniNavbar';

const validationSchema = Yup.object({
  user_name: Yup.string().required('User name is required'),
  phone_number: Yup.string().required('Phone number is required'),
  password: Yup.string().required('Password is required'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  lab_name: Yup.string().required('Lab name is required'),
  contact_number: Yup.string().required('Contact number is required'),
});

const AddLabs = () => {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const labsUrl = `${apiBaseUrl}/api/register/lab`;
  const { t } = useTranslation();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const handleSubmit = async (values, { resetForm }) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await axios.post(labsUrl, values);
      
      console.log('Successful response:', response);

      if (response.status === 201) {  
        const successMessage = response.data.message || t('add.success');
        setSnackbarMessage(successMessage);
        setSnackbarSeverity('success');
        resetForm();
      }
    } catch (error) {
      let errorMessage = t('add.error');
      console.log('Error response:', error);

      if (error.response) {
        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.data && typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.statusText) {
          errorMessage = error.response.statusText;
        }
      } else if (error.request) {
        errorMessage = t('add.no_response');
      } else {
        errorMessage = t('add.error');
      }

      setSnackbarMessage(errorMessage);
      setSnackbarSeverity('error');
    } finally {
      setOpenSnackbar(true);
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        p: 2,
        maxWidth: '1200px',
        mx: 'auto',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ p: 3 }}>
        {t('add.title2')}
      </Typography>
      <AddMiniNavbar />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          minHeight: 'calc(100vh - 200px)',
          p: 3,
        }}
      >
        <Box
          className='Form'
          sx={{
            maxWidth: '600px', 
            width: '100%',
            bgcolor: 'background.paper',
            p: 3,
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Formik
            initialValues={{
              user_name: '',
              phone_number: '',
              password: '',
              password_confirmation: '',
              lab_name: '',
              contact_number: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              handleSubmit(values, actions);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  as={TextField}
                  name="user_name"
                  label={t('add.username')}
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  error={touched.user_name && Boolean(errors.user_name)}
                  helperText={touched.user_name && errors.user_name}
                />
                <Field
                  as={TextField}
                  name="phone_number"
                  label={t('add.phone_number')}
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  error={touched.phone_number && Boolean(errors.phone_number)}
                  helperText={touched.phone_number && errors.phone_number}
                />
                <Field
                  as={TextField}
                  name="lab_name"
                  label={t('add.lab_name')}
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  error={touched.lab_name && Boolean(errors.lab_name)}
                  helperText={touched.lab_name && errors.lab_name}
                />
                <Field
                  as={TextField}
                  name="contact_number"
                  label={t('add.contact_number')}
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  error={touched.contact_number && Boolean(errors.contact_number)}
                  helperText={touched.contact_number && errors.contact_number}
                />
                <Field
                  as={TextField}
                  name="password"
                  type="password"
                  label={t('add.password')}
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                <Field
                  as={TextField}
                  name="password_confirmation"
                  type="password"
                  label={t('add.password_confirmation')}
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  error={touched.password_confirmation && Boolean(errors.password_confirmation)}
                  helperText={touched.password_confirmation && errors.password_confirmation}
                />
                <Button type="submit" variant="contained" color="primary" style={{ width: '200px' }} disabled={isSubmitting}>
                  {t('add.submit')}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>

      <Snackbar open={openSnackbar}
       autoHideDuration={6000} 
       onClose={handleCloseSnackbar}
       anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}

       sx={{
        position: 'fixed',
        top: '80%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
       >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity} 
          sx={{ width: '100%'}}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddLabs;
