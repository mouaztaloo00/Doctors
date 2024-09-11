import React, { useState } from 'react';
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
  Rating,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FeedBackMiniNavbar from '../../../components/minBar/FeedBackMiniNavbar';

const FeedbackNurses = () => {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNurse, setSelectedNurse] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const generateRandomRating = () => Math.floor(Math.random() * 5) + 1;

  const nurses = [
    { id: 1, name: 'Nurse Alice Johnson', specialty: 'Pediatric Nurse', image: 'https://via.placeholder.com/150', rating: generateRandomRating() },
    { id: 2, name: 'Nurse Bob Brown', specialty: 'Emergency Nurse', image: 'https://via.placeholder.com/150', rating: generateRandomRating() },
    { id: 3, name: 'Nurse Clara Davis', specialty: 'Surgical Nurse', image: 'https://via.placeholder.com/150', rating: generateRandomRating() },
    { id: 4, name: 'Nurse Daniel Lee', specialty: 'Oncology Nurse', image: 'https://via.placeholder.com/150', rating: generateRandomRating() },
    { id: 5, name: 'Nurse Eva Martinez', specialty: 'Geriatric Nurse', image: 'https://via.placeholder.com/150', rating: generateRandomRating() },
    { id: 6, name: 'Nurse Frank Wilson', specialty: 'Cardiac Nurse', image: 'https://via.placeholder.com/150', rating: generateRandomRating() },
    { id: 7, name: 'Nurse Grace Kim', specialty: 'Neonatal Nurse', image: 'https://via.placeholder.com/150', rating: generateRandomRating() },
    { id: 8, name: 'Nurse Henry Scott', specialty: 'Orthopedic Nurse', image: 'https://via.placeholder.com/150', rating: generateRandomRating() },
    { id: 9, name: 'Nurse Iris Clark', specialty: 'Critical Care Nurse', image: 'https://via.placeholder.com/150', rating: generateRandomRating() },
  ];

  const filteredNurses = nurses.filter((nurse) =>
    nurse.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClick = (nurse) => {
    setSelectedNurse(nurse);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedNurse(null);
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
                    src={nurse.image}
                    alt={nurse.name}
                    sx={{ width: 100, height: 100, mb: 2 }}
                  />
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                      {nurse.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {nurse.specialty}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2" color="text.primary">
                        Rating:
                      </Typography>
                      <Rating
                        name={`rating-${nurse.id}`}
                        value={nurse.rating}
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

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        sx={{ direction: i18n.dir() }}
      >
        <DialogTitle sx={{ textAlign: 'center' }}>
          {selectedNurse?.name}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
            <Avatar
              src={selectedNurse?.image}
              alt={selectedNurse?.name}
              sx={{ width: 100, height: 100, mb: 2 }}
            />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {selectedNurse?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {selectedNurse?.specialty}
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Typography variant="body2" color="text.primary">
                Rating:
              </Typography>
              <Rating
                name={`rating-${selectedNurse?.id}`}
                value={selectedNurse?.rating}
                readOnly
                precision={0.1}
                sx={{ mt: 0.5 }}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: 'red' }}>
            {t('show.close')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FeedbackNurses;
