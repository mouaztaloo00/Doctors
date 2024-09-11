import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import ShowMiniNavbar from '../../../components/minBar/ShowMiniNavbar';

const testData = [
  { category: 'Category 1' },
  { category: 'Category 2' },
  { category: 'Category 3' },
  { category: 'Category 4' },
  { category: 'Category 5' },
  { category: 'Category 6' },
  { category: 'Category 7' },
  { category: 'Category 8' },
];

const ShowTestCategory = () => {
  const { t , i18n} = useTranslation();

  return (
    <Box sx={{ direction: i18n.dir(), p: 3 }}>
      <Typography variant="h4" gutterBottom align={i18n.dir() === 'rtl' ? 'right' : 'left'} sx={{ p: 3 }}>
      {t('show.title5')}
      </Typography>
      <ShowMiniNavbar />
      <Grid container spacing={2} mt={5}>
        {testData.map((test, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card sx={{
              boxShadow: 3,
              borderRadius: 2,
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6" color="text.primary">{test.category}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ShowTestCategory;
