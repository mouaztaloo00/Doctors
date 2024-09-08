import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import FeedBackMiniNavbar from '../components/minBar/FeedBackMiniNavbar';
const Feedback = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">{t('feedback.title')}</Typography>
      <FeedBackMiniNavbar/>
    </Box>
  );
};

export default Feedback;
