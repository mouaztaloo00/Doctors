import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, TextField, Button } from '@mui/material';
import AddMiniNavbar from '../../../components/minBar/AddMiniNavbar';



const AddLabs = () => {
  const { t } = useTranslation();

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
         
          <TextField
            label={t('add.username')}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />

         
          <TextField
            label={t('add.phone_number')}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label={t('add.lab_name')}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label={t('add.contact_number')}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
         
          <TextField
            label={t('add.password')}
            type="password"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />

          
          <TextField
            label={t('add.confirmpassword')}
            type="password"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />

          <Button variant="contained" color="primary" style={{ width: '200px' }}>
            {t('add.submit')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddLabs;
