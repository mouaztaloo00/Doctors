import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import AddMiniNavbar from '../../../components/minBar/AddMiniNavbar';

const validationSchema = Yup.object({
  category: Yup.string().required('Category is required'),
});

const AddTestcategory = () => {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const testCategoryUrl = `${apiBaseUrl}/api/register/test-categories`;
  const { t } = useTranslation();
  
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  const handleSubmit = async (values, { resetForm, setSubmitting, setErrors }) => {
    if (setSubmitting) {
      setSubmitting(true);
    }
  
    try {
      const response = await axios.post(testCategoryUrl, values);
  
      if (response.status === 201 && response.data.message) {
        resetForm();
        
        setSnackbarMessage(response.data.message || t('add.success'));
        setSnackbarOpen(true);
      } else {
        throw new Error(t('add.incomplete_data'));
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
      }
      } finally {
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };
  
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  
  return (
    <Box sx={{ p: 2, maxWidth: '1200px', mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ p: 3 }}>
        {t('add.title5')}
      </Typography>
      <AddMiniNavbar />
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
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
            initialValues={{ category: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <Field
                  as={TextField}
                  name="category"
                  label={t('add.category')}
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  error={touched.category && Boolean(errors.category)}
                  helperText={touched.category && errors.category}
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
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddTestcategory;
