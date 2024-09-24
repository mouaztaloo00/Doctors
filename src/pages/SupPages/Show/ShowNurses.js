import React, { useState, useEffect } from 'react';
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

const ShowNurses = () => {
  const apiBaseUrl = `${process.env.REACT_APP_API_BASE_URL}`;
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

  const token = `Bearer ${localStorage.getItem('token')}`;
  axios.defaults.headers.common['Authorization'] = token;

  const fetchNurseDetails = async (id) => {
    try {
      const response = await axios.get(`${apiBaseUrl}/api/nurses/id/${id}`);
      setSelectedNurse(response.data);
    } catch (error) {
      console.error('Error fetching nurse details:', error);
    }
  };

  const fetchData = async (query = '', page = 1) => {
    setLoading(true);
    try {
      const endpoint = query
        ? `${apiBaseUrl}/api/nurses/search?s=${query}`
        : `${apiBaseUrl}/api/nurses?size=10&page=${page}`;
      
      const response = await axios.get(endpoint);
      
      if (response.data.message === "") {
        setNurses([]); 
        setTotalPages(1);
      } else {
        const data = query ? response.data || [] : response.data.data || [];
        setNurses(data);
        setTotalPages(query ? 1 : response.data.meta?.last_page || 1);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setNurses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData('', currentPage);
  }, [currentPage]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    fetchData(searchTerm, page);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setCurrentPage(1); 
      fetchData(searchTerm);
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

  const handleConfirmDelete = () => {
    setSelectedNurseForDeletion(selectedNurse?.id);
    setOpenConfirmDialog(true);

  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setSelectedNurseForDeletion(null);
  };

  const handleDelete = async () => {
    if (selectedNurseForDeletion) {
      try {
        await axios.delete(`${apiBaseUrl}/api/nurses/id/${selectedNurseForDeletion}`);
        setNurses((prevNurses) => prevNurses.filter((nurse) => nurse.id !== selectedNurseForDeletion));
        handleCloseConfirmDialog();
        window.location.reload();
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
          onKeyPress={handleKeyPress}
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
                      src={nurse.profilePicture ? `${apiBaseUrl}/${nurse.profilePicture}` : ''}
                      alt={nurse.name || 'Unknown Nurse'}
                      sx={{ width: 100, height: 100, mb: 2 }}
                    />
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                        {nurse.name || 'Unknown Nurse'}
                      </Typography>
                    </CardContent>
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        )}
        
        {nurses.length === 0 && !loading && (
          <Box sx={{ textAlign: 'center', width: '100%', mt: 5 }}>
            <Typography variant="h6" color="textSecondary">
              {t('No Results')}
            </Typography>
          </Box>
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
            {selectedNurse.name || 'Unknown Nurse'}
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
                src={selectedNurse.profilePicture ? `${apiBaseUrl}/${selectedNurse.profilePicture}` : ''}
                alt={selectedNurse.name || 'Unknown Nurse'}
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
                {selectedNurse.name || 'Unknown Nurse'}
              </Typography>
              <Typography variant="body1" color="text.primary" sx={{ mb: 0.5 }}>
                <strong>Email:</strong> {selectedNurse.email || 'N/A'}
              </Typography>
              <Typography variant="body1" color="text.primary" sx={{ mb: 0.5 }}>
                <strong>Phone:</strong> {selectedNurse.phoneNumber || 'N/A'}
              </Typography>
              <Typography variant="body1" color="text.primary" sx={{ mb: 2 }}>
                <strong>Birth Date:</strong> {selectedNurse.birthDate ? new Date(selectedNurse.birthDate).toLocaleDateString() : 'N/A'}
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
                {selectedNurse.address ? `${selectedNurse.address.street || ''}, ${selectedNurse.address.buildingNumber || ''}, ${selectedNurse.address.apartmentNumber || ''}, ${selectedNurse.address.location?.city || ''}, ${selectedNurse.address.location?.district || ''}, ${selectedNurse.address.location?.governorate || ''}` : 'N/A'}
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
            <Button onClick={handleClose} color="primary">
              {t('show.close')}
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {selectedNurseForDeletion && (
        <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
          <DialogTitle>{t('show.delete')}</DialogTitle>
          <DialogContent>
            <Typography>{t('show.message')}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmDialog} color="primary">
              {t('show.close')}
            </Button>
            <Button onClick={handleDelete} color="secondary">
              {t('show.delete')}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default ShowNurses;
