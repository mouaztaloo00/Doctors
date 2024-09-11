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

const FeedbackDoctors = () => {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const generateRandomRating = () => Math.floor(Math.random() * 5) + 1;

  const doctors = [
    { id: 1, name: 'Dr. Ahmed Ali', specialty: 'Cardiologist', image: 'https://via.placeholder.com/150', rating: generateRandomRating() },
    { id: 2, name: 'Dr. Mona Hassan', specialty: 'Dermatologist', image: 'https://via.placeholder.com/150', rating: generateRandomRating() },
    { id: 3, name: 'Dr. Youssef Karim', specialty: 'Neurologist', image: 'https://via.placeholder.com/150', rating: generateRandomRating() },
    { id: 4, name: 'Dr. Huda Mahmoud', specialty: 'Pediatrician', image: 'https://via.placeholder.com/150', rating: generateRandomRating() },
    { id: 5, name: 'Dr. Omar Nasr', specialty: 'Orthopedic Surgeon', image: 'https://via.placeholder.com/150', rating: generateRandomRating() },
    { id: 6, name: 'Dr. Layla Amr', specialty: 'Oncologist', image: 'https://via.placeholder.com/150', rating: generateRandomRating() },
    { id: 7, name: 'Dr. Tariq Zaki', specialty: 'Psychiatrist', image: 'https://via.placeholder.com/150', rating: generateRandomRating() },
    { id: 8, name: 'Dr. Sara Younis', specialty: 'Gynecologist', image: 'https://via.placeholder.com/150', rating: generateRandomRating() },
    { id: 9, name: 'Dr. Amr Fathy', specialty: 'Urologist', image: 'https://via.placeholder.com/150', rating: generateRandomRating() },
  ];

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
                    src={doctor.image}
                    alt={doctor.name}
                    sx={{ width: 100, height: 100, mb: 2 }}
                  />
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                      {doctor.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {doctor.specialty}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <Rating
                        name={`rating-${doctor.id}`}
                        value={doctor.rating}
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
          {selectedDoctor?.name}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', mb: 2 }}>
            <Avatar
              src={selectedDoctor?.image}
              alt={selectedDoctor?.name}
              sx={{ width: 100, height: 100, mb: 2 }}
            />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {selectedDoctor?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {selectedDoctor?.specialty}
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Rating
                name={`rating-${selectedDoctor?.id}`}
                value={selectedDoctor?.rating}
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

export default FeedbackDoctors;
