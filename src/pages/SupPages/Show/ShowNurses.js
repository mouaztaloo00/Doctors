import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Avatar,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Pagination,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete'; 
import ShowMiniNavbar from '../../../components/minBar/ShowMiniNavbar';
import axios from 'axios';
import debounce from 'lodash.debounce'; 

const ShowNurses = () => {
  const apiBaseUrl = `${process.env.REACT_APP_API_BASE_URL}`;
  const nursesUrl = `${apiBaseUrl}/api/nurses?size=8`;

  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedNurse, setSelectedNurse] = useState(null);
  const [nurses, setNurses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false); 
  const [selectedNurseForDeletion, setSelectedNurseForDeletion] = useState(null); 

  // جلب التوكن من localStorage
  const token = `Bearer ${localStorage.getItem('token')}`;

  // إعداد التوكن في جميع طلبات axios
  axios.defaults.headers.common['Authorization'] = token;

  useEffect(() => {
    fetchNurses(currentPage);
  }, [currentPage]);

  const fetchNurses = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(`${nursesUrl}&page=${page}`);
      console.log('Fetched Nurses:', response.data); // سجل النتائج
      setNurses(response.data.data || []);
      setTotalPages(response.data.meta ? response.data.meta.last_page : 1);
    } catch (error) {
      console.error('Error fetching nurses:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNurseDetails = async (id) => {
    try {
      const response = await axios.get(`${apiBaseUrl}/api/nurses/id/${id}`);
      setSelectedNurse(response.data);
    } catch (error) {
      console.error('Error fetching nurse details:', error);
    }
  };

  const fetchSearchResults = useCallback(
    debounce(async (searchTerm) => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiBaseUrl}/api/nurses/search?s=${searchTerm}`);
        console.log('Search Results:', response.data); 
        setNurses(response.data || []); 
        setTotalPages(1); 
      } catch (error) {
        console.error('Error searching nurses:', error);
      } finally {
        setLoading(false);
      }
    }, 500), 
    []
  );

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (term.trim() !== '') {
      fetchSearchResults(term); 
      setCurrentPage(1); 
    } else {
      fetchNurses(1); 
      setCurrentPage(1); 
    }
  };

  const handleClick = (nurse) => {
    fetchNurseDetails(nurse.id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedNurse(null);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleConfirmDelete = () => {
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setSelectedNurseForDeletion(null);
  };

  const handleDelete = async () => {
    if (selectedNurse) {
      try {
        await axios.delete(`${apiBaseUrl}/api/nurses/id/${selectedNurse.id}`);
        setNurses(nurses.filter((nurse) => nurse.id !== selectedNurse.id));
        handleClose();
        handleCloseConfirmDialog();
      } catch (error) {
        console.error('Error deleting nurse:', error);
      }
    }
  };

  return (
    <Box sx={{ direction: i18n.dir(), p: 3 }}>
      <Typography variant="h4" gutterBottom align={i18n.dir() === 'rtl' ? 'right' : 'left'} sx={{ p: 3 }}>
        {t('show.title7')}
      </Typography>
      <ShowMiniNavbar />

      <Box sx={{ mt: 3, mb: 4, px: '16px', maxWidth: '100%' }}>
        <TextField
          variant="outlined"
          fullWidth
          placeholder={t('search.placeholder')}
          value={searchTerm}
          onChange={handleSearchChange}
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

      <Grid container spacing={3} justifyContent="center">
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
            <CircularProgress />
          </Box>
        ) : (
          nurses.length > 0 ? (
            nurses.map((nurse) => (
              <Grid item key={nurse.id} xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    borderRadius: '16px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 6px 30px rgba(0, 0, 0, 0.15)',
                    },
                    overflow: 'hidden',
                    height: '250px',
                    display: 'flex',
                    alignItems: 'center', 
                    justifyContent: 'center', 
                  }}
                >
                  <CardActionArea onClick={() => handleClick(nurse)}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
                      <Avatar
                        src={`${apiBaseUrl}/${nurse.profilePicture}`}
                        alt={nurse.name}
                        sx={{ width: 100, height: 100, mb: 2 }}
                      />
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                          {nurse.name}
                        </Typography>
                      </CardContent>
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          ) : (
            <Box sx={{ textAlign: 'center', width: '100%', mt: 5 }}>
              <Typography variant="h6" color="textSecondary">
                {t('search.noResults')}
              </Typography>
            </Box>
          )
        )}
      </Grid>

      {searchTerm.trim() === '' && (
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
      )}

      {selectedNurse && (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth sx={{ direction: i18n.dir() }}>
          <DialogTitle
            sx={{
              textAlign: 'center',
              p: 3,
              bgcolor: 'linear-gradient(45deg, #6abf69 30%, #3b8b41 90%)',
              color: 'white',
              borderBottom: '1px solid #ddd',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            }}
          >
            {selectedNurse.name}
          </DialogTitle>
          <DialogContent>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: 3,
                textAlign: 'center',
              }}
            >
              <Avatar
                src={`${apiBaseUrl}/${selectedNurse.profilePicture}`}
                alt={selectedNurse.name}
                sx={{
                  width: 130,
                  height: 130,
                  mb: 2,
                  border: '4px solid #ffffff',
                  boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
                  borderRadius: '50%',
                }}
              />
              <Typography variant="h4" sx={{ fontWeight: '700', mb: 1, color: '#333' }}>
                {selectedNurse.name}
              </Typography>
              <Typography variant="body1" color="text.primary" sx={{ mb: 0.5 }}>
                <strong>Email:</strong> {selectedNurse.email}
              </Typography>
              <Typography variant="body1" color="text.primary" sx={{ mb: 0.5 }}>
                <strong>Phone:</strong> {selectedNurse.phoneNumber}
              </Typography>
              <Typography variant="body1" color="text.primary" sx={{ mb: 2 }}>
                <strong>Birth Date:</strong> {new Date(selectedNurse.birthDate).toLocaleDateString()}
              </Typography>
              <Typography
                variant="body1"
                color="text.primary"
                sx={{
                  textAlign: 'center',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '8px',
                  padding: '8px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                }}
              >
                <strong>Address:</strong> <br />
                {`${selectedNurse.address.street}, ${selectedNurse.address.buildingNumber}, ${selectedNurse.address.apartmentNumber}, ${selectedNurse.address.location.city}, ${selectedNurse.address.location.district}, ${selectedNurse.address.location.governorate}`}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions
            sx={{
              p: 2,
              bgcolor: 'background.default',
              borderBottomLeftRadius: 3,
              borderBottomRightRadius: 3,
            }}
          >
            <Button
              onClick={handleConfirmDelete}
              sx={{ color: 'red', marginRight: 'auto' }}
              startIcon={<DeleteIcon />}
            >
              {t('show.delete')}
            </Button>
            <Button onClick={handleClose} sx={{ color: 'red' }}>
              {t('show.close')}
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {selectedNurseForDeletion && (
        <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
          <DialogTitle>{t('confirm.deleteTitle')}</DialogTitle>
          <DialogContent>
            <Typography>{t('confirm.deleteMessage')}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmDialog} color="primary">
              {t('confirm.cancel')}
            </Button>
            <Button onClick={handleDelete} color="secondary">
              {t('confirm.confirm')}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default ShowNurses;
