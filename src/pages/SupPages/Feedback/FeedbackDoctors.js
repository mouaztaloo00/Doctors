  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import { Box, Typography, Grid, TextField, InputAdornment, IconButton, Card, CardActionArea, Avatar, CardContent, Rating, Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemAvatar, ListItemText, CircularProgress, Pagination } from '@mui/material';
  import SearchIcon from '@mui/icons-material/Search';
  import { useTranslation } from 'react-i18next';

  import FeedBackMiniNavbar from '../../../components/minBar/FeedBackMiniNavbar'; 

  const FeedbackDoctors = () => {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL; 
    const initialDoctorsUrl = `${apiBaseUrl}/api/feedbacks/doctors/8`;

    const { t, i18n } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctorReviews, setSelectedDoctorReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchDoctors = async (page = 1) => {
        setLoading(true);
        try {
          const response = await axios.get(`${initialDoctorsUrl}?page=${page}`);
          setDoctors(response.data.data || []);
          setTotalPages(response.data.meta.last_page || 1);
        } catch (error) {
          console.error('Error fetching doctors:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchDoctors(currentPage);
    }, [currentPage]);

    const fetchDoctorReviews = async (doctorId) => {
      try {
        const response = await axios.get(`${apiBaseUrl}/api/feedbacks/doctors/id/${doctorId}/10`);
        setSelectedDoctorReviews(response.data.data);
      } catch (error) {
        console.error('Error fetching doctor reviews:', error);
      }
    };

    const filteredDoctors = doctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };

    const handleClick = (doctor) => {
      setSelectedDoctor(doctor);
      setOpenDialog(true);
      fetchDoctorReviews(doctor.id); 
    };

    const handleCloseDialog = () => {
      setOpenDialog(false);
      setSelectedDoctor(null);
      setSelectedDoctorReviews([]); 
    };

    const handlePageChange = (event, value) => {
      setCurrentPage(value);
    };

    return (
      <Box sx={{ direction: i18n.dir(), p: 3 }}>
        <Typography variant="h4" gutterBottom align={i18n.dir() === 'rtl' ? 'right' : 'left'} sx={{ p: 3 }}>
          {t('Feedback.title1')}
        </Typography>

        <FeedBackMiniNavbar />

        <Box sx={{ mt: 3, mb: 4, px: '16px', maxWidth: '100%' }}>
          <TextField
            variant="outlined"
            fullWidth
            placeholder={t('search.placeholder')}
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{
              borderRadius: 1,
              '& .MuiInputBase-input': {
                py: 1.5,
              },
            }}
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
          <Grid container spacing={3} justifyContent="center">
            {filteredDoctors.map((doctor) => (
              <Grid item key={doctor.id} xs={12} sm={6} md={4} lg={3}>
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
                        src={`${apiBaseUrl}/${doctor.picture}`} 
                        alt={doctor.name}
                        sx={{ width: 100, height: 100, mb: 2 }}
                      />
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                          {doctor.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {doctor.total} Feedbacks
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          <Rating
                            name={`rating-${doctor.id}`}
                            value={doctor.average_rating}
                            readOnly
                            precision={0.1}
                            sx={{ mt: 0.5 }}
                          />
                        </Box>
                      </CardContent>
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            siblingCount={1} // Number of page buttons adjacent to the current page
            boundaryCount={1} // Number of page buttons at the beginning and end
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
              {selectedDoctor?.name}
            </DialogTitle>
            <DialogContent>
              <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', mb: 2 }}>
                <Avatar
                  src={`${apiBaseUrl}/${selectedDoctor?.picture}`}
                  alt={selectedDoctor?.name}
                  sx={{ width: 100, height: 100, mb: 2 }}
                />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {selectedDoctor?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedDoctor?.total} Feedbacks
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Rating
                    name={`rating-${selectedDoctor?.id}`}
                    value={selectedDoctor?.average_rating}
                    readOnly
                    precision={0.1}
                  />
                </Box>
              </Box>
              <List>
                {selectedDoctorReviews.map((review) => (
                  <ListItem key={review.id} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar src={`${apiBaseUrl}/${review.user_picture}`} alt={review.user_name} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={review.user_name}
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {review.comment}
                          </Typography>
                          <Box sx={{ mt: 1 }}>
                            <Rating
                              name={`rating-review-${review.id}`}
                              value={parseFloat(review.rate)}
                              readOnly
                              precision={0.1}
                            />
                          </Box>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
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

  export default FeedbackDoctors;
