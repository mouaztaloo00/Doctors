import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Avatar,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  Rating
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import FeedBackMiniNavbar from '../../../components/minBar/FeedBackMiniNavbar';

const FeedbackNurses = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  // Adding a random rating between 1 and 10
  const generateRandomRating = () => Math.floor(Math.random() * 10) + 1;

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

  const handleClick = (id) => {
    navigate(`#`);
  };

  return (
    <Box sx={{ direction: i18n.dir(), p: 3 }}>
      <Typography variant="h4" gutterBottom align={i18n.dir() === 'rtl' ? 'right' : 'left'} sx={{p: 3}}>
        {t('Feedback.title3')}
      </Typography>
      <FeedBackMiniNavbar />

      <Box
        sx={{
          mb: 4,
          px: '56px', // padding-left and padding-right
          mx: 'auto', // center horizontally
          maxWidth: 'calc(100% - 112px)', // account for padding-left and padding-right
          margin: '40px',
        }}
      >
        <TextField
          variant="outlined"
          fullWidth
          placeholder={t('search.placeholder')}
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{
            '& .MuiInputBase-input': {
              py: 1.5, // reduce vertical padding
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

      <Stack
        direction="row"
        spacing={2}
        flexWrap="wrap"
        justifyContent="center"
      >
        {filteredNurses.map((nurse) => (
          <Box
            key={nurse.id}
            sx={{
              width: { xs: '100%', sm: '48%', md: '30%' },
              mb: 4,
              p: 2,
              display: 'flex',
              marginLeft:'16px !important',
              justifyContent: 'center'
            }}
          >
            <Card 
              sx={{
                width: '100%',
                maxWidth: 345,
                borderRadius: 2,
                boxShadow: 3,
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 6,
                },
              }}
            >
              <CardActionArea onClick={() => handleClick(nurse.id)}>
                <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
                  <Avatar
                    src={nurse.image}
                    alt={nurse.name}
                    sx={{ width: 80, height: 80, marginRight: 2 }}
                  />
                  <CardContent sx={{ flex: 1 }}>
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
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default FeedbackNurses;
