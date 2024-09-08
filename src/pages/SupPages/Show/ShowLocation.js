import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
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

  return (
    <Box sx={{ p: 3, direction }}>
      <Typography variant="h4" gutterBottom sx={{p: 3}}>{t('show.title3')}</Typography>
      <ShowMiniNavbar />

      <Box sx={{ 
        maxWidth: '90%', 
        mx: 'auto',
        p: 2, 
        mt:4
      }}>
        <TableContainer component={Paper} sx={{ width: '100%' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                  <Typography variant="h6">{t('table.governorate')}</Typography>
                </TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                  <Typography variant="h6">{t('table.district')}</Typography>
                </TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                  <Typography variant="h6">{t('table.city')}</Typography>
                </TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                  <Typography variant="h6">{t('table.area')}</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index}>
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