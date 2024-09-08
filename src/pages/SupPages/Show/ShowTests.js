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
  const { t } = useTranslation();

  return (
    <Box sx={{ p: 2, maxWidth: '1200px', mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{p: 3}}>{t('show.title4')}</Typography>
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
              flex: '1 1 calc(50% - 20px)', 
              maxWidth: 'calc(50% - 20px)',
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="h6">{test.testname}</Typography>
                  <Typography variant="subtitle1" color="textSecondary">{test.category}</Typography>
                </Box>
                <Typography variant="body2">{test.description}</Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ShowTests;
