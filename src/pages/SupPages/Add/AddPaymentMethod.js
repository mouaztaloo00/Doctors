import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, TextField, Button, FormControlLabel, Checkbox, FormLabel } from '@mui/material';
import AddMiniNavbar from '../../../components/minBar/AddMiniNavbar';

const AddPaymentMethod = () => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [isActive, setIsActive] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
     
    console.log({
      name,
      file,
      isActive
    });
  };

  return (
    <Box sx={{ p: 2, maxWidth: '1200px', mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ p: 3 }}>
        {t('add.title6')}
      </Typography>
      <AddMiniNavbar />
      <Box  sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 4,
      }}>
        <Box    sx={{
            width: '100%',
            maxWidth: '800px',
            bgcolor: 'background.paper',
            p: 3,
            borderRadius: 2,
            boxShadow: 1,
          }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 2 }}>
          <TextField
            label={t('add.name')}
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <FormLabel sx={{ mr: 2 }}>{t('add.logo')}</FormLabel>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ display: 'block' }}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
            }
            label={t('add.activate')}
          />
        </Box>
        <Button type="submit" variant="contained" color="primary" style={{ width: '150px' }}>
          {t('add.submit')}
        </Button>
      </form>
      </Box>
    </Box>
    </Box>
  );
};

export default AddPaymentMethod;
