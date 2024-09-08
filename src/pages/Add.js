import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import AddMiniNavbar from '../components/minBar/AddMiniNavbar';

const Add = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">{t('add.title')}</Typography>
      <AddMiniNavbar/>
    </Box>
  );
};

export default Add;
