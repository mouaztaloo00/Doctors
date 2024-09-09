import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, TextField, Button } from '@mui/material';
import AddMiniNavbar from '../../../components/minBar/AddMiniNavbar';

const AddLocation = () => {
  const { t } = useTranslation();


  return (
    <Box sx={{ p: 2, maxWidth: '1200px', mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ p: 3 }}>
        {t('add.title3')}
      </Typography>
      <AddMiniNavbar />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 2,
          mt: 4,
        }}
      >
        
        <Box
          sx={{
            flex: 1,
            maxWidth: '48%',
            bgcolor: 'background.paper',
            p: 3,
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Location in English
          </Typography>
          <TextField
            label='Governorate'
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label='District'
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label='City'
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label='Area'
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label='Coordinate X'
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label='Coordinate Y'
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
        </Box>

      
        <Box
          sx={{
            flex: 1,
            maxWidth: '48%',
            bgcolor: 'background.paper',
            p: 3,
            borderRadius: 2,
            boxShadow: 1,
            direction: 'rtl', 
            textAlign: 'right', 
          }}
        >
          <Typography variant="h6" gutterBottom>
            الموقع بالعربية
          </Typography>
          <TextField
            label='المحافظة'
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label='المنطقة'
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label='المدينة'
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label='الحي'
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label='الإحداثيات X'
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label='الإحداثيات Y'
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
        </Box>
      </Box>

    
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button variant="contained" color="primary" style={{ width: '400px' }}>
          {t('add.submit')}
        </Button>
      </Box>
    </Box>
  );
};

export default AddLocation;
