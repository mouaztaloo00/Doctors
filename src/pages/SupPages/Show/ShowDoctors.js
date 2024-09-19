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

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${doctorsUrl}?size=9&page=${currentPage}`);
        setDoctors(response.data.data);
        setTotalPages(response.data.meta.last_page);
      } catch (error) {
        setError('Failed to fetch doctors.');
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [currentPage]);

  const fetchDoctorDetails = async (id) => {
    try {
      const response = await axios.get(`${doctorsUrl}/id/${id}`);
      setSelectedDoctor(response.data);
      setOpenDialog(true);
    } catch (error) {
      console.error('Error fetching doctor details:', error);
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
      }
    }
  };

  const handleConfirmDelete = () => {
    setOpenConfirmDialog(true); 
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClick = (doctor) => {
    fetchDoctorDetails(doctor.id);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDoctor(null);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (loading) {
    return (
      <Box sx={{ p: 3, direction: i18n.dir(), display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, direction: i18n.dir() }}>
        <Typography variant="h6" color="error">{t('show.error', { error })}</Typography>
      </Box>
    );
  }

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
        {filteredDoctors.map((doctor) => (
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
                    src={`${apiBaseUrl}/${doctor.profilePicture}`}
                    alt={doctor.name}
                    sx={{ width: 100, height: 100, mb: 2 }}
                  />
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                      {doctor.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {doctor.specialization}
                    </Typography>
                  </CardContent>
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

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
            {selectedDoctor.name}
          </DialogTitle>
          <DialogContent sx={{ direction: i18n.dir(), p: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <Avatar
                src={`${apiBaseUrl}/${selectedDoctor.profilePicture}`}
                alt={selectedDoctor.name}
                sx={{
                  width: 120,
                  height: 120,
                  mb: 2,
                  border: '5px solid #00695c',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                }}
              />
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: '#004d40' }}>
                {selectedDoctor.name}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
                {selectedDoctor.specialization}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<MailIcon sx={{ marginRight: '8px' ,marginLeft:'8px' }} />}
                  href={`mailto:${selectedDoctor.email}`}
                  sx={{ mr: 2, bgcolor: '#00796b', '&:hover': { bgcolor: '#004d40' } }}
                >
                  {t('show.email')}
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<PhoneIcon sx={{ marginRight: '8px',marginLeft:'8px' }} />}
                  href={`tel:${selectedDoctor.phoneNumber}`}
                  sx={{ bgcolor: '#00796b', '&:hover': { bgcolor: '#004d40' } }}
                >
                  {t('show.phone')}
                </Button>
              </Box>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 2,
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                  mb: 3,
                  maxWidth: '600px',
                  width: '100%',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {t('show.bio')}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                  {selectedDoctor.bio}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {t('show.consultationFee')}: {selectedDoctor.consultationFee} S.P
                </Typography>
              </Paper>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 2,
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                  mb: 3,
                  maxWidth: '600px',
                  width: '100%',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {t('show.clinicInfo')}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                  {t('show.clinicName')}: {selectedDoctor.clinic.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  {t('show.clinicNumber')}: {selectedDoctor.clinic.number}
                </Typography>
              </Paper>

              <Paper
                sx={{
                  p: 3,
                  borderRadius: 2,
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                  mb: 3,
                  maxWidth: '600px',
                  width: '100%',
                }}
              >
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>{t('show.day')}</TableCell>
                        <TableCell>{t('show.startTime')}</TableCell>
                        <TableCell>{t('show.endTime')}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(selectedDoctor.clinic.operatingHours).map(([day, hours]) => (
                        <TableRow key={day}>
                          <TableCell>{day}</TableCell>
                          <TableCell>{hours.start || 'Closed'}</TableCell>
                          <TableCell>{hours.end || 'Closed'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>

              <Paper
                sx={{
                  p: 3,
                  borderRadius: 2,
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                  maxWidth: '600px',
                  width: '100%',
                  mb: 3,
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  {t('show.phone')}: {selectedDoctor.phoneNumber}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {t('show.email')}: {selectedDoctor.email}
                </Typography>
              </Paper>

              <Paper
                sx={{
                  p: 3,
                  borderRadius: 2,
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                  maxWidth: '600px',
                  width: '100%',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {t('show.address')}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                  {selectedDoctor.address.street}, {selectedDoctor.address.buildingNumber} {selectedDoctor.address.apartmentNumber}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {selectedDoctor.address.location.governorate}, {selectedDoctor.address.location.district}, {selectedDoctor.address.location.city}, {selectedDoctor.address.location.area}
                </Typography>
              </Paper>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmDelete} sx={{ color: 'red', marginRight: 'auto' }} startIcon={<DeleteIcon />}>
              {t('show.delete')}
            </Button>
            <Button onClick={handleCloseDialog} sx={{ color: 'red' }}>
              {t('show.close')}
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
      >
        <DialogTitle>{t('confirm.deleteTitle')}</DialogTitle>
        <DialogContent>
          <Typography>{t('confirm.deleteMessage')}</Typography>
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
    </Box>
  );
};

export default ShowDoctors;