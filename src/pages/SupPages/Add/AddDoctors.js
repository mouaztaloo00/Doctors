import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, TextField, Select, MenuItem, Button, FormControl, InputLabel } from '@mui/material';
import AddMiniNavbar from '../../../components/minBar/AddMiniNavbar';

const AddDoctors = () => {
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
        
          <TextField
            label={t('add.name')}
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

          
          <TextField
            label={t('add.consultation_fee')}
            type="number"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />

      
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>{t('add.specialization')}</InputLabel>
            <Select
              defaultValue=""
              label={t('add.specialization')}
            >
              <MenuItem value="general">{t('specializations.general')}</MenuItem>
              <MenuItem value="cardiology">{t('specializations.cardiology')}</MenuItem>
              <MenuItem value="neurology">{t('specializations.neurology')}</MenuItem>
             
            </Select>
          </FormControl>

        
          <Button variant="contained" color="primary" style={{ width: '200px' }}>
            {t('add.submit')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddDoctors;
