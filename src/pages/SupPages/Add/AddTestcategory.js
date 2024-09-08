import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography} from '@mui/material';
import AddMiniNavbar from '../../../components/minBar/AddMiniNavbar';



const AddTestcategory = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ p: 2, maxWidth: '1200px', mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{p: 3}}>{t('Add.title5')}</Typography>
      <AddMiniNavbar/>
    </Box>
  );
};

export default AddTestcategory;
