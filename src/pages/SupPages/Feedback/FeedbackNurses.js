import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Grid, Typography, TextField, InputAdornment, IconButton, Card, CardActionArea, Avatar, CardContent, Rating, Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import FeedBackMiniNavbar from '../../../components/minBar/FeedBackMiniNavbar'; 

const FeedbackNurses = () => {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL; 
  const nursesUrl = `${apiBaseUrl}/api/feedbacks/nurses`;
  const reviewsUrl = `${apiBaseUrl}/api/feedbacks/nurses/id`;

  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNurse, setSelectedNurse] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [nurses, setNurses] = useState([]);
  const [selectedNurseReviews, setSelectedNurseReviews] = useState([]);

  useEffect(() => {
    const fetchNurses = async () => {
      try {
        const response = await axios.get(nursesUrl);
        setNurses(response.data);
      } catch (error) {
        console.error('Error fetching nurses:', error);
      }
    };

    fetchNurses();
  }, [nursesUrl]);

  const fetchNurseReviews = async (nurseId) => {
    try {
      const response = await axios.get(`${reviewsUrl}/${nurseId}`);
      setSelectedNurseReviews(response.data);
    } catch (error) {
      console.error('Error fetching nurse reviews:', error);
    }
  };

  const filteredNurses = nurses.filter((nurse) =>
    nurse.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClick = (nurse) => {
    setSelectedNurse(nurse);
    setOpenDialog(true);
    fetchNurseReviews(nurse.id);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedNurse(null);
    setSelectedNurseReviews([]);
  };

  return (
    <Box sx={{ direction: i18n.dir(), p: 3 }}>
      <Typography variant="h4" gutterBottom align={i18n.dir() === 'rtl' ? 'right' : 'left'} sx={{ p: 3 }}>
        {t('Feedback.title3')}
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

      <Grid container spacing={3} justifyContent="center">
        {filteredNurses.map((nurse) => (
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
              }}
            >
              <CardActionArea onClick={() => handleClick(nurse)}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
                  <Avatar
                    src={nurse.picture ? `${apiBaseUrl}/${nurse.picture}` : undefined}
                    alt={nurse.name}
                    sx={{ width: 100, height: 100, mb: 2 }}
                  />
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                      {nurse.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {nurse.total} Feedbacks
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2" color="text.primary">
                        Rating:
                      </Typography>
                      <Rating
                        name={`rating-${nurse.id}`}
                        value={nurse.average_rating}
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

      {selectedNurse && (
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
          sx={{ direction: i18n.dir() }}
        >
          <DialogTitle sx={{ textAlign: 'center' }}>
            {selectedNurse.name}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
              <Avatar
                src={selectedNurse.picture ? `${apiBaseUrl}/${selectedNurse.picture}` : undefined}
                alt={selectedNurse.name}
                sx={{ width: 100, height: 100, mb: 2 }}
              />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {selectedNurse.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedNurse.total} Feedbacks
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2" color="text.primary">
                  Rating:
                </Typography>
                <Rating
                  name={`rating-${selectedNurse.id}`}
                  value={selectedNurse.average_rating}
                  readOnly
                  precision={0.1}
                  sx={{ mt: 0.5 }}
                />
              </Box>
            </Box>
            <List>
              {selectedNurseReviews.map((review) => (
                <ListItem key={review.id} alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar src={review.user_picture ? `${apiBaseUrl}/${review.user_picture}` : undefined} alt={review.user_name} />
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

export default FeedbackNurses;
