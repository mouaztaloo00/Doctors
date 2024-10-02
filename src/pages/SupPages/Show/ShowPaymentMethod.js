import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Grid,
  CircularProgress,
} from '@mui/material';
import ShowMiniNavbar from '../../../components/minBar/ShowMiniNavbar';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';

const token = `Bearer ${localStorage.getItem('token')}`;
axios.defaults.headers.common['Authorization'] = token;

const ShowPaymentMethod = () => {
  const apiBaseUrl = `${process.env.REACT_APP_API_BASE_URL}`;
  const paymentMethodsUrl = `${apiBaseUrl}/api/payment-methods`;

  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      setLoading(true);
      try {
        const response = await axios.get(paymentMethodsUrl);
        setPaymentMethods(response.data);
      } catch (error) {
        console.error('Error fetching payment methods:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentMethods();
  }, [paymentMethodsUrl]);

  return (
    <Box 
      sx={{ direction: i18n.dir(), p: 3 }}
    >
      <Typography variant="h4" gutterBottom sx={{ p: 3 }}>
        {t('show.title6')}
      </Typography>
      <ShowMiniNavbar />

      <Box sx={{ mt: 3, mb: 4, px: '16px', maxWidth: '100%' }}>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}  justifyContent="center">
            {paymentMethods.length === 0 ? (
              <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                {t('No results')}
              </Typography>
            ) : (
              paymentMethods.map((method) => (
                <Grid item xs={12} sm={6} md={4} key={method.id}>
                  <Card
                    sx={{
                      position: 'relative',
                      boxShadow: 3,
                      borderRadius: 2,
                      overflow: 'hidden',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'scale(1.03)',
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={`${apiBaseUrl}/${method.logo}`}
                      alt={`${method.methodName} Logo`}
                    />
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" component="div">
                        {method.methodName}
                      </Typography>
                    </CardContent>
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        backgroundColor: method.status === 'فعالة' || method.status === 'Active' ? 'success.main' : 'error.main',
                        color: 'white',
                        borderRadius: '50%',
                        width: 40,
                        height: 40,
                        boxShadow: 3,
                        '&:hover': {
                          backgroundColor: method.status === 'فعالة' || method.status === 'Active' ? 'success.dark' : 'error.dark',
                          boxShadow: 6,
                        },
                        transition: 'background-color 0.3s, box-shadow 0.3s',
                      }}
                    >
                      {method.status === 'فعالة' || method.status === 'Active' ? <CheckIcon /> : <CancelIcon />}
                    </IconButton>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default ShowPaymentMethod;
