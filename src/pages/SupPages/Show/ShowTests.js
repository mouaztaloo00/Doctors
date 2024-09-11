import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Card, CardContent } from '@mui/material';
import ShowMiniNavbar from '../../../components/minBar/ShowMiniNavbar';

const testData = [
  { testname: 'Test 1', category: 'Category 1', description: 'Description for test 1' },
  { testname: 'Test 2', category: 'Category 2', description: 'Description for test 2' },
  { testname: 'Test 3', category: 'Category 3', description: 'Description for test 3' },
  { testname: 'Test 4', category: 'Category 4', description: 'Description for test 4' },
  { testname: 'Test 5', category: 'Category 5', description: 'Description for test 5' },
  { testname: 'Test 6', category: 'Category 6', description: 'Description for test 6' },
  { testname: 'Test 7', category: 'Category 7', description: 'Description for test 7' },
  { testname: 'Test 8', category: 'Category 8', description: 'Description for test 8' },
];

const ShowTests = () => {
  const { t, i18n } = useTranslation();

  return (
    <Box sx={{ direction: i18n.dir(), p: 3 }}>
      <Typography variant="h4" gutterBottom align={i18n.dir() === 'rtl' ? 'right' : 'left'} sx={{ p: 3 }}>{t('show.title4')}</Typography>
      <ShowMiniNavbar />
      <Box
        sx={{
          display: 'grid',
          maxWidth: '1000px',
          gridTemplateColumns: { xs: '1fr', sm: '1fr', md: 'repeat(2, 1fr)' },
          gap: 3,
          mt: 5,
          mx: 'auto', 
          justifyContent: 'center', 
        }}
      >
        {testData.map((test, index) => (
          <Card
            key={index}
            sx={{
              boxShadow: 3,
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.03)',
              },
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <CardContent>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                  {test.testname}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  {test.category}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.primary">
                {test.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ShowTests;
