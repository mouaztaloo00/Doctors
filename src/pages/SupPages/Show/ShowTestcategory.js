import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Card, CardContent } from '@mui/material';
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

const ShowTests = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ p: 2, maxWidth: '1200px', mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{p: 3}}>{t('show.title5')}</Typography>
      <ShowMiniNavbar/>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2, 
          mt: 5, 
        }}
      >
        {testData.map((test, index) => (
          <Box
            key={index}
            sx={{
              flex: '1 1 calc(25% - 20px)', 
              maxWidth: 'calc(25% - 20px)',
            }}
          >
            <Card sx={{ 
              boxShadow: 2,
              transition: 'transform 0.3s ease-in-out', 
              '&:hover': {
                transform: 'scale(1.05)',
              } 
            }}>
              <CardContent>
                  <Typography variant="h6" color="textSecondary">{test.category}</Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ShowTests;
