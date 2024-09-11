import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, useTheme, Divider } from '@mui/material';
import ShowMiniNavbar from '../../../components/minBar/ShowMiniNavbar';

const tableData = [
  { governorate: 'Governorate A', district: 'District 1', city: 'City X', area: 'Area 1' },
  { governorate: 'Governorate B', district: 'District 2', city: 'City Y', area: 'Area 2' },
  { governorate: 'Governorate C', district: 'District 3', city: 'City Z', area: 'Area 3' },
  { governorate: 'Governorate D', district: 'District 4', city: 'City W', area: 'Area 4' },
  { governorate: 'Governorate E', district: 'District 5', city: 'City V', area: 'Area 5' },
];

const ShowLocation = () => {
  const { t, i18n } = useTranslation();
  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr'; 
  const theme = useTheme();

  return (
    <Box sx={{ p: 3, direction }}>
      <Typography variant="h4" gutterBottom align={i18n.dir() === 'rtl' ? 'right' : 'left'} sx={{ p: 3 }}>
        {t('show.title3')}
      </Typography>
      <ShowMiniNavbar />
      <Divider sx={{ mb: 2 }} />

      <Box sx={{ 
        maxWidth: '100%', 
        overflowX: 'auto',
        p: 4, 
        mt: 6, 
        bgcolor: theme.palette.background.paper,
        borderRadius: 2,
        boxShadow: theme.shadows[3]
      }}>
        <TableContainer component={Paper} sx={{ width: '100%', borderRadius: 2, boxShadow: theme.shadows[2] }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ 
                  textAlign: 'center', 
                  fontWeight: 'bold', 
                  borderBottom: `2px solid`
                }}>
                  <Typography variant="h6">{t('table.governorate')}</Typography>
                </TableCell>
                <TableCell sx={{ 
                  textAlign: 'center', 
                  fontWeight: 'bold', 
                  borderBottom: `2px solid`
                }}>
                  <Typography variant="h6">{t('table.district')}</Typography>
                </TableCell>
                <TableCell sx={{ 
                 textAlign: 'center', 
                 fontWeight: 'bold', 
                 borderBottom: `2px solid`
                }}>
                  <Typography variant="h6">{t('table.city')}</Typography>
                </TableCell>
                <TableCell sx={{ 
                  textAlign: 'center', 
                  fontWeight: 'bold', 
                  borderBottom: `2px solid`
                }}>
                  <Typography variant="h6">{t('table.area')}</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index} sx={{ '&:nth-of-type(odd)': { bgcolor: theme.palette.action.hover } }}>
                  <TableCell sx={{ textAlign: 'center' }}>{row.governorate}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.district}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.city}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.area}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ShowLocation;
