import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, useTheme, Divider, IconButton, CircularProgress } from '@mui/material';
import { FirstPage, LastPage, ChevronLeft, ChevronRight } from '@mui/icons-material';
import ShowMiniNavbar from '../../../components/minBar/ShowMiniNavbar';

const ShowLocation = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, lastPage: 1, firstPage: 1, lastPageUrl: '', prevUrl: '', nextUrl: '' });
  const [loading, setLoading] = useState(true);

  const { t, i18n } = useTranslation();
  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr'; 
  const theme = useTheme();

  const fetchData = async (url) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(result.data);
      setPagination({
        currentPage: result.meta.current_page,
        lastPage: result.meta.last_page,
        firstPage: result.links.first ? new URL(result.links.first).searchParams.get('page') : 1,
        lastPageUrl: result.links.last,
        prevUrl: result.links.prev,
        nextUrl: result.links.next
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(`${process.env.REACT_APP_API_BASE_URL}/api/locations/10?page=1`);
  }, []);

  const handlePageChange = (url) => {
    if (url) {
      fetchData(url);
    }
  };

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
                  borderBottom: `2px solid`,
                  bgcolor: theme.palette.primary.light
                }}>
                  <Typography variant="h6">{t('table.governorate')}</Typography>
                </TableCell>
                <TableCell sx={{ 
                  textAlign: 'center', 
                  fontWeight: 'bold', 
                  borderBottom: `2px solid`,
                  bgcolor: theme.palette.primary.light
                }}>
                  <Typography variant="h6">{t('table.district')}</Typography>
                </TableCell>
                <TableCell sx={{ 
                 textAlign: 'center', 
                 fontWeight: 'bold', 
                 borderBottom: `2px solid`,
                 bgcolor: theme.palette.primary.light
                }}>
                  <Typography variant="h6">{t('table.city')}</Typography>
                </TableCell>
                <TableCell sx={{ 
                  textAlign: 'center', 
                  fontWeight: 'bold', 
                  borderBottom: `2px solid`,
                  bgcolor: theme.palette.primary.light
                }}>
                  <Typography variant="h6">{t('table.area')}</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} sx={{ textAlign: 'center', p: 2 }}>
                    <CircularProgress />
                    <Typography variant="h6" sx={{ mt: 2 }}>{t('loading')}</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row) => (
                  <TableRow key={row.id} sx={{ '&:nth-of-type(odd)': { bgcolor: theme.palette.action.hover } }}>
                    <TableCell sx={{ textAlign: 'center' }}>{row.governorate}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{row.district}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{row.city}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{row.area}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        mt: 3,
        flexDirection: direction === 'rtl' ? 'row-reverse' : 'row' 
      }}>
        <IconButton
          onClick={() => handlePageChange(pagination.firstPage ? `${process.env.REACT_APP_API_BASE_URL}/api/locations/10?page=${pagination.firstPage}` : '')}
          disabled={!pagination.firstPage}
          sx={{ mr: direction === 'rtl' ? 0 : 1, ml: direction === 'rtl' ? 1 : 0 }} 
        >
          <FirstPage />
        </IconButton>
        <IconButton
          onClick={() => handlePageChange(pagination.prevUrl)}
          disabled={!pagination.prevUrl}
          sx={{ mr: direction === 'rtl' ? 0 : 1, ml: direction === 'rtl' ? 1 : 0 }} 
        >
          <ChevronLeft />
        </IconButton>
        <Typography sx={{ mx: 2, minWidth: 60, textAlign: 'center' }}>{`${pagination.currentPage} / ${pagination.lastPage}`}</Typography>
        <IconButton
          onClick={() => handlePageChange(pagination.nextUrl)}
          disabled={!pagination.nextUrl}
          sx={{ ml: direction === 'rtl' ? 0 : 1, mr: direction === 'rtl' ? 1 : 0 }} 
        >
          <ChevronRight />
        </IconButton>
        <IconButton
          onClick={() => handlePageChange(pagination.lastPageUrl)}
          disabled={!pagination.lastPageUrl}
          sx={{ ml: direction === 'rtl' ? 0 : 1, mr: direction === 'rtl' ? 1 : 0 }} 
        >
          <LastPage />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ShowLocation;
