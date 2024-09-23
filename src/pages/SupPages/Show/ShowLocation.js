import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TextField,
  InputAdornment,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
  Divider,
  IconButton,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import ShowMiniNavbar from '../../../components/minBar/ShowMiniNavbar';
import SearchIcon from '@mui/icons-material/Search';
import debounce from 'lodash.debounce';

const ShowLocation = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [sortParams, setSortParams] = useState({
    governorate: '',
    district: '',
    city: '',
    area: ''
  });

  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const token = `Bearer ${localStorage.getItem('token')}`;

  const fetchData = async (url) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: token,
        },
      });
      const result = await response.json();
      setData(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(`${process.env.REACT_APP_API_BASE_URL}/api/locations?size=10&page=1`);
  }, []);

  const fetchSearchResults = useCallback(
    debounce(async (searchTerm) => {
      if (searchTerm.trim()) {
        await fetchData(`${process.env.REACT_APP_API_BASE_URL}/api/locations/search?s=${searchTerm}`);
      } else {
        fetchData(`${process.env.REACT_APP_API_BASE_URL}/api/locations?size=10&page=1`);
      }
    }, 500),
    []
  );

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    fetchSearchResults(term);
  };

  const handleSort = async () => {
    const { governorate, district, city, area } = sortParams;
    const queryParams = {};
    if (governorate) queryParams.governorate = governorate;
    if (district) queryParams.district = district;
    if (city) queryParams.city = city;
    if (area) queryParams.area = area;
    const queryString = new URLSearchParams(queryParams).toString();
    if (queryString) {
      await fetchData(`${process.env.REACT_APP_API_BASE_URL}/api/locations/sort?${queryString}`);
    } else {
      fetchData(`${process.env.REACT_APP_API_BASE_URL}/api/locations?size=10&page=1`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSortParams(prev => ({ ...prev, [name]: value }));
  };

  const handleOpenDialog = (id) => {
    setSelectedItemId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItemId(null);
  };

  const handleDelete = async () => {
    if (selectedItemId) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/locations/id/${selectedItemId}`, {
          method: 'DELETE',
          headers: {
            Authorization: token,
          },
        });
        if (response.ok) {
          fetchData(`${process.env.REACT_APP_API_BASE_URL}/api/locations?size=10&page=1`);
        } else {
          console.error('Failed to delete');
        }
      } catch (error) {
        console.error('Error deleting data:', error);
      } finally {
        handleCloseDialog();
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom align={i18n.dir() === 'rtl' ? 'right' : 'left'}>
        {t('show.title3')}
      </Typography>
      <ShowMiniNavbar />
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ mt: 3, mb: 4 }}>
        <TextField
          variant="outlined"
          fullWidth
          placeholder={t('search.placeholder')}
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ borderRadius: 1 }}
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

      <Box sx={{ mb: 4, p: 2, bgcolor: '#f9f9f9', borderRadius: 2 }}>
        <Grid container spacing={2}>
          {['governorate', 'district', 'city', 'area'].map((field) => (
            <Grid item xs={12} sm={6} md={3} key={field}>
              <TextField
                name={field}
                variant="outlined"
                placeholder={t(`table.${field}`)}
                value={sortParams[field]}
                onChange={handleInputChange}
                fullWidth
                sx={{
                  '& .MuiInputBase-input': { height: '24px' },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '& fieldset': {
                      borderColor: '#ccc',
                    },
                    '&:hover fieldset': {
                      borderColor: '#888',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3f51b5',
                    },
                  },
                }}
              />
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={3}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleSort} 
              fullWidth 
              sx={{
                height: '35px',
                borderRadius: '8px',
                '&:hover': {
                  transform: 'scale(1.05)',
                  transition: 'transform 0.2s',
                },
              }}
            >
              {t('sort.button')}
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ maxWidth: '100%', overflowX: 'auto' }}>
        <TableContainer component={Paper} sx={{ width: '100%', borderRadius: 2, boxShadow: theme.shadows[2] }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', bgcolor: theme.palette.primary.light }}>
                  {t('table.governorate')}
                </TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', bgcolor: theme.palette.primary.light }}>
                  {t('table.district')}
                </TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', bgcolor: theme.palette.primary.light }}>
                  {t('table.city')}
                </TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', bgcolor: theme.palette.primary.light }}>
                  {t('table.area')}
                </TableCell>
                <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', bgcolor: theme.palette.primary.light }}>
                  {t('table.delete')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} sx={{ textAlign: 'center', p: 2 }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row) => (
                  <TableRow key={row.id} sx={{ '&:nth-of-type(odd)': { bgcolor: theme.palette.action.hover } }}>
                    <TableCell sx={{ textAlign: 'center' }}>{row.governorate}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{row.district}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{row.city}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{row.area}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <IconButton onClick={() => handleOpenDialog(row.id)} color="error">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{t('show.delete')}</DialogTitle>
        <DialogContent>
          <Typography>{t('show.message')}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>{t('show.close')}</Button>
          <Button onClick={handleDelete} color="error">{t('show.delete')}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ShowLocation;
