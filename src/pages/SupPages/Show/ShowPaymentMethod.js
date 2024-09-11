import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Grid
} from '@mui/material';
import ShowMiniNavbar from '../../../components/minBar/ShowMiniNavbar';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';

const ShowPaymentMethod = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3 }, 
      display: 'flex', 
      flexDirection: 'column', 
      direction: isRtl ? 'rtl' : 'ltr', 
    }}>
      <Typography variant="h4" gutterBottom sx={{ p: { xs: 2, sm: 3 } }}>
        {t('show.title6')}
      </Typography>
      <ShowMiniNavbar />

      <Box sx={{ mt: 4 }}>
        <Grid
          container
          spacing={2}
          justifyContent="center"
        >
          <Grid item xs={11} sm={5} md={3}>
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
                image="https://via.placeholder.com/300x140?text=Syriatel+Logo"
                alt="Syriatel Logo"
              />
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6" component="div">
                  {t('PaymentMethod.Syriatel')}
                </Typography>
              </CardContent>
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: 'success.main',
                  color: 'white',
                  borderRadius: '50%',
                  width: 40,
                  height: 40,
                  boxShadow: 3,
                  '&:hover': {
                    backgroundColor: 'success.dark',
                    boxShadow: 6,
                  },
                  transition: 'background-color 0.3s, box-shadow 0.3s',
                }}
              >
                <CheckIcon />
              </IconButton>
            </Card>
          </Grid>

          <Grid item xs={11} sm={5} md={3}>
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
                image="https://via.placeholder.com/300x140?text=MTN+Logo"
                alt="MTN Logo"
              />
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6" component="div">
                  {t('PaymentMethod.MTN')}
                </Typography>
              </CardContent>
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: 'error.main',
                  color: 'white',
                  borderRadius: '50%',
                  width: 40,
                  height: 40,
                  boxShadow: 3,
                  '&:hover': {
                    backgroundColor: 'error.dark',
                    boxShadow: 6,
                  },
                  transition: 'background-color 0.3s, box-shadow 0.3s',
                }}
              >
                <CancelIcon />
              </IconButton>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ShowPaymentMethod;
