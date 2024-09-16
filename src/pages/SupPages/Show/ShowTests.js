import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Card, CardContent, CircularProgress, Pagination } from '@mui/material';
import ShowMiniNavbar from '../../../components/minBar/ShowMiniNavbar';

const ShowTests = () => {
  const apiBaseUrl = `${process.env.REACT_APP_API_BASE_URL}`;
  const [testData, setTestData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchData = async (page = 1) => {
      setLoading(true);
      try {
        const response = await fetch(`${apiBaseUrl}/api/tests/10?page=${page}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTestData(data.data || []);
        setTotalPages(data.meta ? data.meta.last_page : 1); 
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(currentPage);
  }, [currentPage, apiBaseUrl]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page); 
  };

  return (
    <Box sx={{ direction: i18n.dir(), p: 3 }}>
      <Typography variant="h4" gutterBottom align={i18n.dir() === 'rtl' ? 'right' : 'left'} sx={{ p: 3 }}>
        {t('show.title4')}
      </Typography>
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
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
            <CircularProgress />
          </Box>
        ) : testData.length > 0 ? (
          testData.map((test) => (
            <Card
              key={test.id}
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
                    {test.name}
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
          ))
        ) : (
          <Typography variant="body1" color="text.primary">
            {t('noData')}
          </Typography>
        )}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          siblingCount={1}
          boundaryCount={2}
        />
      </Box>
    </Box>
  );
};

export default ShowTests;
