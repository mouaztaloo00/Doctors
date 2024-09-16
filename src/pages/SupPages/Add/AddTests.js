import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import AddMiniNavbar from '../../../components/minBar/AddMiniNavbar';

const AddTests = () => {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const locationUrl = `${apiBaseUrl}/api/register/test`;
  const { t } = useTranslation();

  return (
    <Box sx={{ p: 2, maxWidth: '1200px', mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ p: 3 }}>
        {t('add.title4')}
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
            maxWidth: '800px',
            bgcolor: 'background.paper',
            p: 3,
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Grid container spacing={2}>
       
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>{t('add.category')}</InputLabel>
                <Select
                  defaultValue=""
                  label={t('add.category')}
                >
                  <MenuItem value="category1">{t('category1')}</MenuItem>
                  <MenuItem value="category2">{t('category2')}</MenuItem>
                  <MenuItem value="category3">{t('category3')}</MenuItem>
                  
                </Select>
              </FormControl>
            </Grid>

           
            <Grid item xs={12} sm={6}>
              <TextField
                label={t('add.name')}
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>

          
          <TextField
            label={t('add.description')}
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            sx={{ mt: 2 }}
          />

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button variant="contained" color="primary" style={{ width: '200px' }}>
              {t('add.submit')}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddTests;
