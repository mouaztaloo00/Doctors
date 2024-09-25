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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import DeleteIcon from '@mui/icons-material/Delete';
import ShowMiniNavbar from '../../../components/minBar/ShowMiniNavbar';
import axios from 'axios';

const ShowDoctors = () => {
  const apiBaseUrl = `${process.env.REACT_APP_API_BASE_URL}`;
  const doctorsUrl = `${apiBaseUrl}/api/doctors`;

  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const token = `Bearer ${localStorage.getItem('token')}`;
  axios.defaults.headers.common['Authorization'] = token;

  const fetchData = async (query = '', page = 1) => {
    setLoading(true);
    try {
      const endpoint = query
        ? `${apiBaseUrl}/api/doctors/search?s=${query}`
        : `${apiBaseUrl}/api/doctors?size=6&page=${page}`;

      const response = await axios.get(endpoint);
      if (response.data.message === "") {
        setDoctors([]); 
        setTotalPages(1);
      } else {
        setDoctors(query ? response.data || [] : response.data.data || []);
        setTotalPages(query ? 1 : response.data.meta ? response.data.meta.last_page : 1);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setDoctors([]); 
      setError('Failed to fetch data.');
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

  const fetchDoctorDetails = async (id) => {
    if (!id) return; 
    try {
      const response = await axios.get(`${doctorsUrl}/id/${id}`);
      if (response.data) {
        setSelectedDoctor(response.data);
        setOpenDialog(true);
      }
    } catch (error) {
      console.error('Error fetching doctor details:', error);
      setError('Failed to fetch doctor details.');
    }
  };

  const handleDelete = async () => {
    if (selectedDoctor) {
      try {
        await axios.delete(`${doctorsUrl}/id/${selectedDoctor.id}`);
        setDoctors(doctors.filter(doctor => doctor.id !== selectedDoctor.id));
        handleCloseDialog();
        handleCloseConfirmDialog();
      } catch (error) {
        console.error('Error deleting doctor:', error);
        setError('Failed to delete doctor.');
      }
    }
  };

  const handleConfirmDelete = () => {
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleClick = (doctor) => {
    fetchDoctorDetails(doctor.id);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDoctor(null);
  }; 

  return (
    <Box sx={{ direction: i18n.dir(), p: 3 }}>
      <Typography variant="h4" gutterBottom align={i18n.dir() === 'rtl' ? 'right' : 'left'} sx={{ p: 3 }}>
        {t('show.title1')}
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
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={3} justifyContent="center">
            {doctors.length > 0 ? (
              doctors.map((doctor) => (
                <Grid item key={doctor.id} xs={12} sm={6} md={4} lg={4}>
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
                    <CardActionArea onClick={() => handleClick(doctor)}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
                        <Avatar
                          src={doctor.profilePicture ? `${apiBaseUrl}/${doctor.profilePicture}` : ''}
                          alt={doctor.name || 'Unknown Doctor'}
                          sx={{ width: 100, height: 100, mb: 2 }}
                        />
                        <CardContent sx={{ textAlign: 'center' }}>
                          <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                            {doctor.name || 'Unknown Doctor'}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {doctor.specialization || 'N/A'}
                          </Typography>
                        </CardContent>
                      </Box>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="h6" color="text.secondary" align="center" sx={{ width: '100%' }}>
                {t('no.results')}
              </Typography>
            )}
          </Grid>
        </>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      {selectedDoctor && (
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
          sx={{ direction: i18n.dir() }}
        >
          <DialogTitle sx={{ textAlign: 'center' }}>
            {selectedDoctor.name || 'Unknown Doctor'}
          </DialogTitle>
          <DialogContent sx={{ direction: i18n.dir(), p: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <Avatar
                src={selectedDoctor.profilePicture ? `${apiBaseUrl}/${selectedDoctor.profilePicture}` : ''}
                alt={selectedDoctor.name || 'Unknown Doctor'}
                sx={{
                  width: 120,
                  height: 120,
                  mb: 2,
                  border: '5px solid ',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                }}
              />
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                {selectedDoctor.name || 'Unknown Doctor'}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                {selectedDoctor.specialization || 'N/A'}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {selectedDoctor.bio || 'No biography available.'}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Consultation Fee: {selectedDoctor.consultationFee || 'N/A'} <br />
                Date of Birth: {new Date(selectedDoctor.dateOfBirth).toLocaleDateString() || 'N/A'}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<MailIcon sx={{ marginRight: '8px', marginLeft: '8px' }} />}
                  href={`mailto:${selectedDoctor.email}`}
                  sx={{ mr: 2 }}
                >
                  {selectedDoctor.email || 'N/A'}
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<PhoneIcon sx={{ marginRight: '8px', marginLeft: '8px' }} />}
                  href={`tel:${selectedDoctor.phoneNumber}`}
                  sx={{ mr: 2 }}
                >
                  {selectedDoctor.phoneNumber || 'N/A'}
                </Button>
              </Box>
            </Box>
            <TableContainer component={Paper} sx={{ mt: 4 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t('table.day')}</TableCell>
                    <TableCell>{t('table.start')}</TableCell>
                    <TableCell>{t('table.end')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedDoctor.clinic?.operatingHours && Object.entries(selectedDoctor.clinic.operatingHours).map(([day, hours]) => (
                    <TableRow key={day}>
                      <TableCell>{day}</TableCell>
                      <TableCell>{hours.start || 'Closed'}</TableCell>
                      <TableCell>{hours.end || 'Closed'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'space-between', width: '100%' }}>
            <Button color="error" onClick={handleConfirmDelete} startIcon={<DeleteIcon />}>
              {t('show.delete')}
            </Button>
            <Button onClick={handleCloseDialog} color="primary">
              {t('show.close')}
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
      >
        <DialogTitle>{t('show.delete')}</DialogTitle>
        <DialogContent>{t('show.message')}</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">{t('cancel')}</Button>
          <Button onClick={handleDelete} color="error">{t('show.delete')}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ShowDoctors;
