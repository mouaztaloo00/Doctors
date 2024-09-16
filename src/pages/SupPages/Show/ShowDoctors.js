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
  Pagination
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShowMiniNavbar from '../../../components/minBar/ShowMiniNavbar';
import axios from 'axios';

const ShowDoctors = () => {
  const apiBaseUrl = `${process.env.REACT_APP_API_BASE_URL}`;
  const doctorsUrl = `${apiBaseUrl}/api/doctors/9`;

  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${doctorsUrl}?page=${currentPage}`);
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
  }, [doctorsUrl, currentPage]);

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClick = (doctor) => {
    setSelectedDoctor(doctor);
    setOpenDialog(true);
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

      {/* Pagination */}
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
          maxWidth="sm"
          fullWidth
          sx={{ direction: i18n.dir() }}
        >
          <DialogTitle sx={{ textAlign: 'center' }}>
            {selectedDoctor.name}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
              <Avatar
                src={`${apiBaseUrl}/${selectedDoctor.profilePicture}`}
                alt={selectedDoctor.name}
                sx={{ width: 100, height: 100, mb: 2 }}
              />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {selectedDoctor.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedDoctor.specialization}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} sx={{ color: 'red' }}>
              {t('show.close')}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default ShowDoctors;
