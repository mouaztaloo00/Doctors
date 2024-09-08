import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
         {t('dashboard.title')}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 3, 
            '& > div': {
              flex: '1 1 calc(25% - 24px)', 
              minWidth: 200, 
            },
          }}
        >
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6"> {t('dashboard.TotalSales')}</Typography>
            <Typography variant="h4">$50,000</Typography>
          </Paper>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6"> {t('dashboard.TotalOrders')}</Typography>
            <Typography variant="h4">120</Typography>
          </Paper>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6"> {t('dashboard.TotalCustomers')}</Typography>
            <Typography variant="h4">200</Typography>
          </Paper>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6"> {t('dashboard.ProductsInStocks')}</Typography>
            <Typography variant="h4">500</Typography>
          </Paper>
        </Box>
      </Box>
      
    </div>
  );
};

export default Dashboard;
