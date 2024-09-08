import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography} from '@mui/material';
import FeedBackMiniNavbar from '../../../components/minBar/FeedBackMiniNavbar';



const FeedbackDoctors = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ p: 2, maxWidth: '1200px', mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{p: 3}}>{t('Feedback.title1')}</Typography>
      <FeedBackMiniNavbar/>
    </Box>
  );
};

export default FeedbackDoctors;
