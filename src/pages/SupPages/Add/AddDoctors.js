import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, TextField, Button, Snackbar, Alert, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import AddMiniNavbar from '../../../components/minBar/AddMiniNavbar';

const validationSchema = Yup.object({
  name: Yup.string().required('Doctor name is required'),
  phone_number: Yup.string().required('Phone number is required'),
  password: Yup.string().required('Password is required'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  consultation_fee: Yup.number().required('Consultation fee is required'),
  specialization: Yup.string().required('Specialization is required'),
});

const AddDoctors = () => {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const doctorsUrl = `${apiBaseUrl}/api/register/doctor`;
  const specializationsUrl = `${apiBaseUrl}/api/doctors/specializations`;
  
  const { t } = useTranslation();
  const [specializations, setSpecializations] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isSubmitting, setIsSubmitting] = useState(false); 

    
  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const response = await axios.get(specializationsUrl);
        setSpecializations(response.data.data);  
      } catch (error) {
        console.error('Error fetching specializations:', error);
      }
    };

    fetchSpecializations();
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await axios.post(doctorsUrl, values);
      
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
        {t('add.title1')}
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
              name: '',
              phone_number: '',
              password: '',
              password_confirmation: '',
              consultation_fee: '',
              specialization: '',
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
                  name="name"
                  label={t('add.name')}
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
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
                  name="consultation_fee"
                  label={t('add.consultation_fee')}
                  type="number"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  error={touched.consultation_fee && Boolean(errors.consultation_fee)}
                  helperText={touched.consultation_fee && errors.consultation_fee}
                />
                <FormControl fullWidth sx={{ mb: 2 }} error={touched.specialization && Boolean(errors.specialization)}>
                  <InputLabel>{t('add.specialization')}</InputLabel>
                  <Field as={Select} name="specialization" label={t('add.specialization')}>
                    {specializations.map(spec => (
                      <MenuItem key={spec.id} value={spec.id}>{spec.name}</MenuItem>
                    ))}
                  </Field>
                </FormControl>
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
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Button type="submit" variant="contained" color="primary"
                 style={{  
                 width: '50%',
                 maxWidth: '400px',
                 padding: '14px',
                 fontSize: '14px'
                  }} 
                  disabled={isSubmitting}>
                  {t('add.submit')}
                </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>

      <Snackbar 
      open={openSnackbar} 
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

export default AddDoctors;
