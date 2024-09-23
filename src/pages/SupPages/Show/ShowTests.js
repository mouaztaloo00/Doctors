import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Card, TextField, IconButton, InputAdornment, CardContent, CircularProgress, Pagination } from '@mui/material';
import ShowMiniNavbar from '../../../components/minBar/ShowMiniNavbar';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';

const token = `Bearer ${localStorage.getItem('token')}`;
axios.defaults.headers.common['Authorization'] = token;

const ShowTests = () => {
  const apiBaseUrl = `${process.env.REACT_APP_API_BASE_URL}`;
  const [testData, setTestData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const { t, i18n } = useTranslation();

  const fetchData = async (query = '', page = 1) => {
    setLoading(true);
    try {
      const endpoint = query
        ? `${apiBaseUrl}/api/tests/search?s=${query}`
        : `${apiBaseUrl}/api/tests?size=10&page=${page}`;
      const response = await axios.get(endpoint);

      if (response.data.message === "") {
        setTestData([]); 
        setTotalPages(1);
      } else {
        setTestData(query ? response.data || [] : response.data.data || []);
        setTotalPages(query ? 1 : response.data.meta ? response.data.meta.last_page : 1);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setTestData([]); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData('', currentPage);
  }, [currentPage, apiBaseUrl]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    fetchData(searchQuery, page);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setCurrentPage(1); 
      fetchData(searchQuery);
    }
  };

  return (
    <Box sx={{ direction: i18n.dir(), p: 3 }}>
      <Typography variant="h4" gutterBottom align={i18n.dir() === 'rtl' ? 'right' : 'left'} sx={{ p: 3 }}>
        {t('show.title4')}
      </Typography>
      <ShowMiniNavbar />

      <Box sx={{ mt: 3, mb: 4, px: '16px', maxWidth: '100%' }}>
        <TextField
          variant="outlined"
          fullWidth
          placeholder={t('search.placeholder')}
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress} // إضافة مستمع الحدث لزر الإدخال
          sx={{ borderRadius: 1, '& .MuiInputBase-input': { py: 1.5 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

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
        ) : searchQuery ? (
          <Typography variant="body1" color="text.primary">
            {t('No Results')}
          </Typography>
        ) : (
          <Typography variant="body1" color="text.primary">
           {t('No Results')}
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
