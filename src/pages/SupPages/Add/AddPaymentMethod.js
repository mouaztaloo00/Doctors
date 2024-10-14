import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, TextField, Button, FormControlLabel, Checkbox, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AddMiniNavbar from '../../../components/minBar/AddMiniNavbar';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const validationSchema = Yup.object({
  method_name: Yup.string().required('Method name is required'),
  logo: Yup.mixed().required('Logo is required'),
});

const AddPaymentMethod = () => {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const paymentMethodUrl = `${apiBaseUrl}/api/register/payment-methods`;

  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const fileInputRef = useRef(null);

  const handleSubmit = async (values, { resetForm, setFieldValue, setErrors }) => {
    if (isSubmitting) return;
  
    setIsSubmitting(true);
  
    const formData = new FormData();
    formData.append('method_name', values.method_name);
    formData.append('status', values.isActive ? 1 : 0);
    formData.append('logo', values.logo);
  
    try {
      const response = await axios.post(paymentMethodUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 201) {
        resetForm();
        setFieldValue('logo', null); 
        if (fileInputRef.current) {
          fileInputRef.current.value = ''; 
        }
        setSnackbarMessage(t('add.success'));
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      }
    } catch (error) {
      let errorMessage = t('add.error');
  
      if (error.response) {
        const { data } = error.response;
  
        if (data && data.data) {
          const validationErrors = data.data;
          const formErrors = {};
  
          for (const key in validationErrors) {
            if (validationErrors.hasOwnProperty(key)) {
              formErrors[key] = validationErrors[key][0];
            }
          }
  
          setErrors(formErrors);
  
          errorMessage = data.message || t('add.error');
        } else if (typeof data === 'string') {
          errorMessage = data;
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
      setSnackbarOpen(true);
  
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ p: 2, maxWidth: '1200px', mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ p: 3 }}>
        {t('add.title6')}
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
            width: '50%',
            maxWidth: '500px',
            bgcolor: 'background.paper',
            p: 3,
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Formik
            initialValues={{
              method_name: '',
              logo: null,
              isActive: false,
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
                <br />
                <Box sx={{ mb: 2, display: 'block', alignItems: 'center' }}>
                  <Button
                    variant="contained"
                    component="label"
                    startIcon={<UploadFileIcon />}
                    sx={{
                      backgroundColor: 'primary',
                      color: 'primary',
                      '&:hover': {
                        backgroundColor: 'primary',
                      },
                      mt: 2,
                      mb: 2,
                    }}
                  >
                    {t('add.chooseLogo')}
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => setFieldValue('logo', e.currentTarget.files[0])}
                      ref={fileInputRef}
                    />
                  </Button>
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
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{
                      width: '40%',
                      maxWidth: '400px',
                      padding: '12px',
                      fontSize: '13px',
                    }}
                    disabled={isSubmitting}
                  >
                    {t('add.submit')}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddPaymentMethod;
