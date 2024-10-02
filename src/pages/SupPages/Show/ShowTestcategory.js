import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Card, CardContent, Grid, CircularProgress } from '@mui/material';
import ShowMiniNavbar from '../../../components/minBar/ShowMiniNavbar';
import axios from 'axios';

const token = `Bearer ${localStorage.getItem('token')}`;
axios.defaults.headers.common['Authorization'] = token;

const ShowTestCategory = () => {
  const { t, i18n } = useTranslation();
  const [testData, setTestData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = `${process.env.REACT_APP_API_BASE_URL}/api/test-categories`;

  useEffect(() => {
    const fetchTestCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url);
        setTestData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTestCategories();
  }, [url]);

  return (
    <Box sx={{ direction: i18n.dir(), p: 3 }}>
      <Typography variant="h4" gutterBottom align={i18n.dir() === 'rtl' ? 'right' : 'left'} sx={{ p: 3 }}>
        {t('show.title5')}
      </Typography>
      <ShowMiniNavbar />
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {testData.length === 0 ? ( 
            <Typography variant="h6" align="center" sx={{ mt: 4 }}>
              {t('No results')}
            </Typography>
          ) : (
            <Grid container spacing={3} mt={5} maxWidth={'90%'}>
              {testData.map((test, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Card sx={{
                    borderRadius: '10px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 6px 30px rgba(0, 0, 0, 0.15)',
                    },
                    overflow: 'hidden',
                    height: '100px',
                    display: 'flex',
                    alignItems: 'center', 
                    justifyContent: 'center',  
                  }}>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" color="text.primary">{test.category}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  );
};

export default ShowTestCategory;
