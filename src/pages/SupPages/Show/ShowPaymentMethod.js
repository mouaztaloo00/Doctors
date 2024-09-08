import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Stack
} from '@mui/material';
import ShowMiniNavbar from '../../../components/minBar/ShowMiniNavbar';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';

const ShowPaymentMethod = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  return (
    <Box sx={{ 
      p: 3, 
      display: 'flex', 
      flexDirection: 'column', 
      direction: isRtl ? 'rtl' : 'ltr', // Apply text direction based on language
    }}>
      <Typography variant="h4" gutterBottom sx={{p: 3}}>
        {t('show.title6')}
      </Typography>
      <ShowMiniNavbar />

      <Box sx={{ mt: 4 }}> {/* Add margin-top to create space above the cards */}
        <Stack
          direction="row"
          spacing={4} // Increase spacing between cards
          flexWrap="wrap"
          justifyContent="center" // Center the cards horizontally
          sx={{
            // Adjust direction of layout based on text direction
            flexDirection: isRtl ? 'row-reverse' : 'row',
          }}
        >
          {/* Card for Syriatel */}
          <Card
            sx={{
              width: 300,
              mb: 4,
              position: 'relative',
              boxShadow: 3,
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
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
            <CardContent>
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
                '&:hover': {
                  backgroundColor: 'success.dark',
                },
              }}
            >
              <CheckIcon />
            </IconButton>
          </Card>

          {/* Card for MTN */}
          <Card
            sx={{
              width: 300,
              mb: 4,
              position: 'relative',
              boxShadow: 3,
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
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
            <CardContent>
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
                '&:hover': {
                  backgroundColor: 'error.dark',
                },
              }}
            >
              <CancelIcon />
            </IconButton>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
};

export default ShowPaymentMethod;
