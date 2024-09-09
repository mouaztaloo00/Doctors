import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, TextField, Button} from '@mui/material';
import AddMiniNavbar from '../../../components/minBar/AddMiniNavbar';



const AddTestcategory = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ p: 2, maxWidth: '1200px', mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{p: 3}}>{t('add.title5')}</Typography>
      <AddMiniNavbar/>
      <Box
      sx={{
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
         <TextField
                label={t('add.category')}
                variant="outlined"
                fullWidth
              />
          <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button variant="contained" color="primary" style={{ width: '200px' }} >
                {t('add.submit')}
              </Button>
           </Box>
          </Box>
        </Box>
    </Box>
  );
};

export default AddTestcategory;
