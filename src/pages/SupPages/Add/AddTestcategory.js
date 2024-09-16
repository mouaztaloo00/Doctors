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
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    if (setSubmitting) {
      setSubmitting(true);
    }

    try {
      const response = await axios.post(testCategoryUrl, values);

      if (response.status === 201 && response.data.message) {
        setSnackbarMessage(response.data.message || t('add.success'));
        setSnackbarSeverity('success');
        resetForm();
      } else {
        throw new Error(t('add.incomplete_data'));
      }
    } catch (error) {
      let errorMessage = t('add.error');

      if (error.response) {
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
      if (setSubmitting) {
        setSubmitting(false);
      }
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
            width: '100%',
            maxWidth: '800px',
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
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ width: '200px' }}
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

export default AddTestcategory;
