import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import ShowMiniNavbar from '../components/minBar/ShowMiniNavbar';
const Show = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">{t('show.title')}</Typography>
      <ShowMiniNavbar/>
    </Box>
  );
};

export default Show;
