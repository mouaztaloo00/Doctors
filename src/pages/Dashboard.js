import React from 'react';
import { Box, Grid, Paper, Typography, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

// بيانات للرسوم البيانية
const pieData = [
  { name: 'Sales', value: 400 },
  { name: 'Orders', value: 300 },
  { name: 'Customers', value: 300 },
  { name: 'Stock', value: 500 },
];

const lineChartData = [
  { name: 'Jan', Sales: 4000, Orders: 2400 },
  { name: 'Feb', Sales: 3000, Orders: 1398 },
  { name: 'Mar', Sales: 2000, Orders: 9800 },
  { name: 'Apr', Sales: 2780, Orders: 3908 },
  { name: 'May', Sales: 1890, Orders: 4800 },
  { name: 'Jun', Sales: 2390, Orders: 3800 },
  { name: 'Jul', Sales: 3490, Orders: 4300 },
];

const barChartData = [
  { name: 'Product A', Sales: 4000 },
  { name: 'Product B', Sales: 3000 },
  { name: 'Product C', Sales: 2000 },
  { name: 'Product D', Sales: 2780 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {t('dashboard.title')}
      </Typography>
      <Grid container spacing={4}>
        {/* كروت المعلومات */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center', boxShadow: 6, borderRadius: 3, minHeight: 350, border: '1px solid #ddd', bgcolor: '#f9f9f9' }}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>{t('dashboard.TotalSales')}</Typography>
            <Typography variant="h4" sx={{ mb: 2 }}>$50,000</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Total Sales in the past year</Typography>
            <PieChart width={150} height={150} style={{ margin: '0 auto' }}>
              <Pie data={pieData} dataKey="value" outerRadius={60} fill="#8884d8">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Breakdown of sales by product categories.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center', boxShadow: 6, borderRadius: 3, minHeight: 350, border: '1px solid #ddd', bgcolor: '#f9f9f9' }}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>{t('dashboard.TotalOrders')}</Typography>
            <Typography variant="h4" sx={{ mb: 2 }}>120</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Orders Over Time</Typography>
            <LineChart width={300} height={200} data={lineChartData} style={{ margin: '0 auto' }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Sales" stroke="#8884d8" />
              <Line type="monotone" dataKey="Orders" stroke="#82ca9d" />
            </LineChart>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Visualization of orders and sales trends over the past 7 months.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center', boxShadow: 6, borderRadius: 3, minHeight: 350, border: '1px solid #ddd', bgcolor: '#f9f9f9' }}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>{t('dashboard.TotalCustomers')}</Typography>
            <Typography variant="h4" sx={{ mb: 2 }}>200</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Customer Distribution</Typography>
            <BarChart width={300} height={200} data={barChartData} style={{ margin: '0 auto' }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Sales" fill="#8884d8" />
            </BarChart>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Distribution of sales across different products.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center', boxShadow: 6, borderRadius: 3, minHeight: 350, border: '1px solid #ddd', bgcolor: '#f9f9f9' }}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>{t('dashboard.ProductsInStocks')}</Typography>
            <Typography variant="h4" sx={{ mb: 2 }}>500</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Stock Levels</Typography>
            <PieChart width={150} height={150} style={{ margin: '0 auto' }}>
              <Pie data={pieData} dataKey="value" outerRadius={60} fill="#ff8042">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Overview of stock levels by category.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
