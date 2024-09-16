import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import AddMiniNavbar from '../../../components/minBar/AddMiniNavbar';

// Validation schema with Yup
const validationSchema = Yup.object({
  governorate_en: Yup.string().required('Governorate in English is required'),
  district_en: Yup.string().required('District in English is required'),
  city_en: Yup.string().required('City in English is required'),
  area_en: Yup.string().required('Area in English is required'),
  latitude_y: Yup.number().required('Latitude Y is required').typeError('Latitude Y must be a number'),
  longitude_x: Yup.number().required('Longitude X is required').typeError('Longitude X must be a number'),
  governorate_ar: Yup.string().required('Governorate in Arabic is required'),
  district_ar: Yup.string().required('District in Arabic is required'),
  city_ar: Yup.string().required('City in Arabic is required'),
  area_ar: Yup.string().required('Area in Arabic is required'),
});

const AddLocation = () => {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const locationUrl = `${apiBaseUrl}/api/register/location`;
  const { t } = useTranslation();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values, { resetForm }) => {
    if (isSubmitting) {
      console.log('Submission is already in progress');
      return; // Prevent multiple submissions
    }

    setIsSubmitting(true);
    console.log('Submitting:', values); // Debug: Log submission values

    try {
      const response = await axios.post(locationUrl, values);
      console.log('Response:', response); // Debug: Log response

      // Check if the response status is 201 and if there is a success message
      if (response.status === 201 && response.data.message) {
        setSnackbarMessage(response.data.message || t('add.success'));
        setSnackbarSeverity('success');
        resetForm();
      } else {
        // Handle cases where the response is not as expected
        throw new Error(t('add.incomplete_data'));
      }
    } catch (error) {
      console.log('Error:', error); // Debug: Log error

      let errorMessage = t('add.error');

      if (error.response) {
        console.log('Error response:', error.response); // Debug: Log error response

        if (error.response.data) {
          if (typeof error.response.data === 'string') {
            errorMessage = error.response.data;
          } else if (error.response.data.message) {
            errorMessage = error.response.data.message;
          }
        } else if (error.response.statusText) {
          errorMessage = error.response.statusText;
        }
      } else if (error.request) {
        errorMessage = t('add.no_response');
      }

      setSnackbarMessage(errorMessage);
      setSnackbarSeverity('error');
    } finally {
      setOpenSnackbar(true);
      setIsSubmitting(false); // Reset isSubmitting after completion
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
        {t('add.title3')}
      </Typography>
      <AddMiniNavbar />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 4,
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '1200px',
            bgcolor: 'background.paper',
            p: 3,
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Formik
            initialValues={{
              governorate_en: '',
              district_en: '',
              city_en: '',
              area_en: '',
              latitude_y: '',
              longitude_x: '',
              governorate_ar: '',
              district_ar: '',
              city_ar: '',
              area_ar: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              handleSubmit(values, actions);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 2,
                  }}
                >
                  <Box sx={{ flex: '1 1 45%' }}>
                    <Field
                      as={TextField}
                      name="governorate_en"
                      label={t('add.governorate_en')}
                      variant="outlined"
                      fullWidth
                      sx={{ mb: 2 }}
                      error={touched.governorate_en && Boolean(errors.governorate_en)}
                      helperText={touched.governorate_en && errors.governorate_en}
                    />
                    <Field
                      as={TextField}
                      name="district_en"
                      label={t('add.district_en')}
                      variant="outlined"
                      fullWidth
                      sx={{ mb: 2 }}
                      error={touched.district_en && Boolean(errors.district_en)}
                      helperText={touched.district_en && errors.district_en}
                    />
                    <Field
                      as={TextField}
                      name="city_en"
                      label={t('add.city_en')}
                      variant="outlined"
                      fullWidth
                      sx={{ mb: 2 }}
                      error={touched.city_en && Boolean(errors.city_en)}
                      helperText={touched.city_en && errors.city_en}
                    />
                    <Field
                      as={TextField}
                      name="area_en"
                      label={t('add.area_en')}
                      variant="outlined"
                      fullWidth
                      sx={{ mb: 2 }}
                      error={touched.area_en && Boolean(errors.area_en)}
                      helperText={touched.area_en && errors.area_en}
                    />
                    <Field
                      as={TextField}
                      name="latitude_y"
                      label={t('add.latitude_y')}
                      variant="outlined"
                      fullWidth
                      sx={{ mb: 2 }}
                      error={touched.latitude_y && Boolean(errors.latitude_y)}
                      helperText={touched.latitude_y && errors.latitude_y}
                    />
                    <Field
                      as={TextField}
                      name="longitude_x"
                      label={t('add.longitude_x')}
                      variant="outlined"
                      fullWidth
                      sx={{ mb: 2 }}
                      error={touched.longitude_x && Boolean(errors.longitude_x)}
                      helperText={touched.longitude_x && errors.longitude_x}
                    />
                  </Box>
                  <Box sx={{ flex: '1 1 45%' }}>
                    <Field
                      as={TextField}
                      name="governorate_ar"
                      label={t('add.governorate_ar')}
                      variant="outlined"
                      fullWidth
                      sx={{ mb: 2 }}
                      error={touched.governorate_ar && Boolean(errors.governorate_ar)}
                      helperText={touched.governorate_ar && errors.governorate_ar}
                    />
                    <Field
                      as={TextField}
                      name="district_ar"
                      label={t('add.district_ar')}
                      variant="outlined"
                      fullWidth
                      sx={{ mb: 2 }}
                      error={touched.district_ar && Boolean(errors.district_ar)}
                      helperText={touched.district_ar && errors.district_ar}
                    />
                    <Field
                      as={TextField}
                      name="city_ar"
                      label={t('add.city_ar')}
                      variant="outlined"
                      fullWidth
                      sx={{ mb: 2 }}
                      error={touched.city_ar && Boolean(errors.city_ar)}
                      helperText={touched.city_ar && errors.city_ar}
                    />
                    <Field
                      as={TextField}
                      name="area_ar"
                      label={t('add.area_ar')}
                      variant="outlined"
                      fullWidth
                      sx={{ mb: 2 }}
                      error={touched.area_ar && Boolean(errors.area_ar)}
                      helperText={touched.area_ar && errors.area_ar}
                    />
                  </Box>
                </Box>
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                  <Button type="submit" variant="contained" color="primary" style={{ width: '200px' }} disabled={isSubmitting}>
                    {t('add.submit')}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%', bgcolor: snackbarSeverity === 'success' ? 'success.main' : 'error.main' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddLocation;
