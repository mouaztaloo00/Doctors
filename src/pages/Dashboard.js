import React from 'react';
import { Box, Grid, Paper, Typography, Divider, IconButton, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, BarChart, Bar, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { useTheme } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// بيانات جديدة للرسوم البيانية
const pieData = [
  { name: 'Sales', value: 400 },
  { name: 'Orders', value: 300 },
  { name: 'Customers', value: 300 },
  { name: 'Stock', value: 500 },
];

const lineChartData = [
  { name: 'Jan', Sales: 4000, Orders: 2400, Customers: 200 },
  { name: 'Feb', Sales: 3000, Orders: 1398, Customers: 240 },
  { name: 'Mar', Sales: 2000, Orders: 9800, Customers: 300 },
  { name: 'Apr', Sales: 2780, Orders: 3908, Customers: 350 },
  { name: 'May', Sales: 1890, Orders: 4800, Customers: 400 },
  { name: 'Jun', Sales: 2390, Orders: 3800, Customers: 450 },
  { name: 'Jul', Sales: 3490, Orders: 4300, Customers: 500 },
];

const radarData = [
  { subject: 'Product A', Sales: 120, Orders: 110, Stock: 130, fullMark: 150 },
  { subject: 'Product B', Sales: 98, Orders: 130, Stock: 120, fullMark: 150 },
  { subject: 'Product C', Sales: 86, Orders: 105, Stock: 115, fullMark: 150 },
  { subject: 'Product D', Sales: 99, Orders: 120, Stock: 108, fullMark: 150 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {t('dashboard.title')}
      </Typography>
      <Grid container spacing={4}>
        {/* أول كارت: المبيعات الكلية */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper 
            sx={{ 
              p: 3, 
              textAlign: 'center', 
              boxShadow: 6, 
              borderRadius: 3, 
              border: `1px solid ${theme.palette.divider}`, 
              bgcolor: theme.palette.background.paper 
            }}
          >
            <IconButton>
              <AttachMoneyIcon sx={{ fontSize: 50, color: theme.palette.primary.main }} />
            </IconButton>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
              {t('dashboard.TotalSales')}
            </Typography>
            <Typography variant="h4" sx={{ mb: 2 }}>$75,000</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2">
              Yearly sales overview across all categories.
            </Typography>
          </Paper>
        </Grid>

        {/* ثاني كارت: الأوامر الكلية */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper 
            sx={{ 
              p: 3, 
              textAlign: 'center', 
              boxShadow: 6, 
              borderRadius: 3, 
              border: `1px solid ${theme.palette.divider}`, 
              bgcolor: theme.palette.background.paper 
            }}
          >
            <IconButton>
              <TrendingUpIcon sx={{ fontSize: 50, color: theme.palette.secondary.main }} />
            </IconButton>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
              {t('dashboard.TotalOrders')}
            </Typography>
            <Typography variant="h4" sx={{ mb: 2 }}>200</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2">
            <br/>
              Total orders over the past year.
            </Typography>
          </Paper>
        </Grid>

        {/* كارت العملاء */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper 
            sx={{ 
              p: 3, 
              textAlign: 'center', 
              boxShadow: 6, 
              borderRadius: 3, 
              border: `1px solid ${theme.palette.divider}`, 
              bgcolor: theme.palette.background.paper 
            }}
          >
            <IconButton>
              <PeopleIcon sx={{ fontSize: 50, color: theme.palette.info.main }} />
            </IconButton>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
              {t('dashboard.TotalCustomers')}
            </Typography>
            <Typography variant="h4" sx={{ mb: 2 }}>350</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2">
              Total number of customers in the last year.
            </Typography>
          </Paper>
        </Grid>

        {/* كارت المخزون */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper 
            sx={{ 
              p: 3, 
              textAlign: 'center', 
              boxShadow: 6, 
              borderRadius: 3, 
              border: `1px solid ${theme.palette.divider}`, 
              bgcolor: theme.palette.background.paper 
            }}
          >
            <IconButton>
              <InventoryIcon sx={{ fontSize: 50, color: theme.palette.warning.main }} />
            </IconButton>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
              {t('dashboard.ProductsInStocks')}
            </Typography>
            <Typography variant="h4" sx={{ mb: 2 }}>800</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2">
            <br/>
              Current stock across all categories.
            </Typography>
          </Paper>
        </Grid>

        {/* الرسوم البيانية */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, boxShadow: 6, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              {t('dashboard.SalesAndOrdersOverTime')}
            </Typography>
            <LineChart width={500} height={300} data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              <Line type="monotone" dataKey="Sales" stroke={theme.palette.primary.main} />
              <Line type="monotone" dataKey="Orders" stroke={theme.palette.secondary.main} />
              <Line type="monotone" dataKey="Customers" stroke={theme.palette.info.main} />
            </LineChart>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Trends of sales, orders, and customers over the last 7 months.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, boxShadow: 6, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              {t('dashboard.StockRadarChart')}
            </Typography>
            <RadarChart cx={250} cy={150} outerRadius={120} width={500} height={300} data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar name="Sales" dataKey="Sales" stroke={theme.palette.primary.main} fill={theme.palette.primary.main} fillOpacity={0.6} />
              <Radar name="Orders" dataKey="Orders" stroke={theme.palette.secondary.main} fill={theme.palette.secondary.main} fillOpacity={0.6} />
              <Radar name="Stock" dataKey="Stock" stroke={theme.palette.warning.main} fill={theme.palette.warning.main} fillOpacity={0.6} />
              <Legend />
            </RadarChart>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Product performance in terms of sales, orders, and stock.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
