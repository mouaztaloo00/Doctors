import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Grid, Typography, TextField, InputAdornment, IconButton, Card, CardActionArea, Avatar, CardContent, Rating, Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemAvatar, ListItemText, CircularProgress, Pagination } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import FeedBackMiniNavbar from '../../../components/minBar/FeedBackMiniNavbar'; 

const FeedbackLabs = () => {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const initialLabsUrl = `${apiBaseUrl}/api/feedbacks/labs/?size=8`;

  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLab, setSelectedLab] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [labs, setLabs] = useState([]);
  const [selectedLabReviews, setSelectedLabReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const reviewsPageSize = 2; 
  const [reviewsPage, setReviewsPage] = useState(1); 

  useEffect(() => {
    const fetchLabs = async (page = 1) => {
      setLoading(true);
      try {
        const response = await axios.get(`${initialLabsUrl}&?page=${page}`);
        setLabs(response.data.data || []);
        setTotalPages(response.data.meta.last_page || 1);
      } catch (error) {
        console.error('Error fetching labs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLabs(currentPage);
  }, [currentPage]);

  const fetchLabReviews = async (labId) => {
    try {
      const response = await axios.get(`${apiBaseUrl}/api/feedbacks/labs/id/${labId}/?size=100`); 
      setSelectedLabReviews(response.data.data || []);
    } catch (error) {
      console.error('Error fetching lab reviews:', error);
    }
  };

  const filteredLabs = labs.filter((lab) =>
    lab.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClick = (lab) => {
    setSelectedLab(lab);
    setOpenDialog(true);
    fetchLabReviews(lab.id);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedLab(null);
    setSelectedLabReviews([]);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleReviewsPageChange = (event, value) => {
    setReviewsPage(value);
  };

  const reviewsTotalPages = Math.ceil(selectedLabReviews.length / reviewsPageSize);

  const reviewsToDisplay = selectedLabReviews.slice(
    (reviewsPage - 1) * reviewsPageSize,
    reviewsPage * reviewsPageSize
  );

  return (
    <Box sx={{ direction: i18n.dir(), p: 3 }}>
      <Typography variant="h4" gutterBottom align={i18n.dir() === 'rtl' ? 'right' : 'left'} sx={{ p: 3 }}>
        {t('Feedback.title2')}
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
          {filteredLabs.map((lab) => (
            <Grid item key={lab.id} xs={12} sm={6} md={4} lg={3}>
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
                <CardActionArea onClick={() => handleClick(lab)}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
                    <Avatar
                      src={`${apiBaseUrl}/${lab.picture}`}
                      alt={lab.name}
                      sx={{ width: 100, height: 100, mb: 2 }}
                    />
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                        {lab.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {lab.total} Feedbacks
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        <Rating
                          name={`rating-${lab.id}`}
                          value={lab.average_rating}
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
          siblingCount={1}
          boundaryCount={1}
        />
      </Box>

      {selectedLab && (
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
          sx={{ direction: i18n.dir() }}
        >
          <DialogTitle sx={{ textAlign: 'center' }}>
            {selectedLab?.name}
          </DialogTitle>
          <DialogContent sx={{ direction: i18n.dir() }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', mb: 2 }}>
              <Avatar
                src={`${apiBaseUrl}/${selectedLab?.picture}`}
                alt={selectedLab?.name}
                sx={{ width: 100, height: 100, mb: 2 }}
              />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {selectedLab?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedLab?.total} Feedbacks
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Rating
                  name={`rating-${selectedLab?.id}`}
                  value={selectedLab?.average_rating}
                  readOnly
                  precision={0.1}
                />
              </Box>
            </Box>
            <List>
              {reviewsToDisplay.map((review) => (
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
            {reviewsTotalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Pagination
                  count={reviewsTotalPages}
                  page={reviewsPage}
                  onChange={handleReviewsPageChange}
                  color="primary"
                  siblingCount={1}
                  boundaryCount={1}
                />
              </Box>
            )}
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

export default FeedbackLabs;
