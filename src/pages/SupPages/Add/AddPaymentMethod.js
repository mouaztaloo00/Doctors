import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, TextField, Button, Snackbar, Alert, FormControlLabel, Checkbox, FormLabel } from '@mui/material';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AddMiniNavbar from '../../../components/minBar/AddMiniNavbar';

// Validation schema with Yup
const validationSchema = Yup.object({
  method_name: Yup.string().required('Method name is required'),
  logo: Yup.mixed().required('Logo is required')
});

const AddPaymentMethod = () => {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const paymentMethodUrl = `${apiBaseUrl}/api/register/payment-methods`;

  const { t } = useTranslation();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Use ref to control file input
  const fileInputRef = useRef(null);

  const handleSubmit = async (values, { resetForm, setFieldValue }) => {
    // Prevent multiple submissions
    if (isSubmitting) return;

    setIsSubmitting(true);

    // Prepare form data
    const formData = new FormData();
    formData.append('method_name', values.method_name);
    formData.append('status', values.isActive ? 1 : 0);
    formData.append('logo', values.logo);

    try {
      // Make the API request
      const response = await axios.post(paymentMethodUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Successful response:', response);

      if (response.status === 201) {
        const successMessage = response.data.message || t('add.success');
        setSnackbarMessage(successMessage);
        setSnackbarSeverity('success');
        
        // Clear form fields including logo
        resetForm(); // Clears all fields
        setFieldValue('logo', null); // Specifically clear the logo field
        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // Reset file input manually
        }
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
    <Box sx={{ p: 2, maxWidth: '1200px', mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ p: 3 }}>
        {t('add.title6')}
      </Typography>
      <AddMiniNavbar />
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 4,
      }}>
        <Box sx={{
          width: '100%',
          maxWidth: '800px',
          bgcolor: 'background.paper',
          p: 3,
          borderRadius: 2,
          boxShadow: 1,
        }}>
          <Formik
            initialValues={{
              method_name: '',
              logo: null,
              isActive: false
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, errors, touched, values }) => (
              <Form>
                <Box sx={{ mb: 2 }}>
                  <Field
                    as={TextField}
                    name="method_name"
                    label={t('add.name')}
                    variant="outlined"
                    fullWidth
                    error={touched.method_name && Boolean(errors.method_name)}
                    helperText={touched.method_name && errors.method_name}
                  />
                </Box>
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                  <FormLabel sx={{ mr: 2 }}>{t('add.logo')}</FormLabel>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFieldValue('logo', e.currentTarget.files[0])}
                    ref={fileInputRef} // Set ref for file input
                    style={{ display: 'block' }}
                  />
                  {touched.logo && errors.logo && (
                    <div style={{ color: 'red' }}>{errors.logo}</div>
                  )}
                </Box>
                <Box sx={{ mb: 2 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.isActive}
                        onChange={(e) => setFieldValue('isActive', e.target.checked)}
                      />
                    }
                    label={t('add.activate')}
                  />
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ width: '150px' }}
                  disabled={isSubmitting}
                >
                  {t('add.submit')}
                </Button>
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

export default AddPaymentMethod;
