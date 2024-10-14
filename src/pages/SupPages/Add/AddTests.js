import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, TextField, Button, MenuItem, FormControl, InputLabel, Select, Snackbar, Alert } from '@mui/material';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState(''); 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(categoriesUrl);
        setCategories(response.data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (values, { resetForm, setErrors }) => {
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
        resetForm();

        setSnackbarMessage(successMessage);
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
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
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

export default AddTests;
