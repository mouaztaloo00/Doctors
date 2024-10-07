import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, TextField, Button, Snackbar, Alert, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import AddMiniNavbar from '../../../components/minBar/AddMiniNavbar';

const validationSchema = Yup.object({
  test_name: Yup.string().required('Test name is required'),
  test_category_id: Yup.string().required('Category is required'),
  description: Yup.string().required('Description is required'),
});

const AddTests = () => {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const testsUrl = `${apiBaseUrl}/api/register/test`;
  const categoriesUrl = `${apiBaseUrl}/api/test-categories`;

  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(categoriesUrl);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await axios.post(testsUrl, {
        test_category_id: values.test_category_id,
        test_name: values.test_name,
        description: values.description,
      });
      if (response.status === 201) {
        const successMessage = response.data.message || t('add.success');
        setSnackbarMessage(successMessage);
        setSnackbarSeverity('success');
        resetForm();
      }
    } catch (error) {
      let errorMessage = t('add.error');
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
    <Box sx={{ p: 2, maxWidth: '1200px', mx: 'auto', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" gutterBottom sx={{ p: 3 }}>
        {t('add.title4')}
      </Typography>
      <AddMiniNavbar />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', minHeight: 'calc(100vh - 200px)', p: 3 }}>
        <Box className='Form' sx={{ maxWidth: '600px', width: '100%', bgcolor: 'background.paper', p: 3, borderRadius: 2, boxShadow: 1 }}>
          <Formik
            initialValues={{ test_name: '', test_category_id: '', description: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => handleSubmit(values, actions)}
          >
            {({ errors, touched, setFieldValue, values }) => (
              <Form>
                <Field
                  as={TextField}
                  name="test_name"
                  label={t('add.name')}
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  error={touched.test_name && Boolean(errors.test_name)}
                  helperText={touched.test_name && errors.test_name}
                />
                <FormControl fullWidth sx={{ mb: 2 }} error={touched.test_category_id && Boolean(errors.test_category_id)}>
                  <InputLabel>{t('add.category')}</InputLabel>
                  <Field
                    name="test_category_id"
                    as={Select}
                    label={t('add.category')}
                    value={values.test_category_id}
                    onChange={(event) => setFieldValue("test_category_id", event.target.value)}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.category}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
                <Field
                  as={TextField}
                  name="description"
                  label={t('add.description')}
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  sx={{ mb: 2 }}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
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
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddTests;
