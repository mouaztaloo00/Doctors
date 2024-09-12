import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Card, CardContent, Grid, CircularProgress } from '@mui/material';
import ShowMiniNavbar from '../../../components/minBar/ShowMiniNavbar';

const ShowTestCategory = () => {
  const { t, i18n } = useTranslation();
  const [testData, setTestData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const url = `${process.env.REACT_APP_API_BASE_URL}/api/test-categories`;

  useEffect(() => {
    const fetchTestCategories = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch test categories. Status: ${response.status}`);
        }
        const data = await response.json();
        setTestData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTestCategories();
  }, [url]);

  if (loading) {
    return (
      <Box sx={{ direction: i18n.dir(), p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ direction: i18n.dir(), p: 3 }}>
        <Typography variant="h6" color="error">{t('show.error', { error })}</Typography>
      </Box>
    );
  }

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
