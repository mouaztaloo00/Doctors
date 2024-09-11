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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShowMiniNavbar from '../../../components/minBar/ShowMiniNavbar';

const ShowDoctors = () => {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const doctors = [
    { id: 1, name: 'Dr. John Doe', specialty: 'Cardiologist', image: 'https://via.placeholder.com/150', bio: 'Experienced in cardiology with 15 years of experience in treating heart-related conditions.' },
    { id: 2, name: 'Dr. Jane Smith', specialty: 'Neurologist', image: 'https://via.placeholder.com/150', bio: 'Specialized in neurology, focusing on the treatment of brain and nervous system disorders.' },
    { id: 3, name: 'Dr. Emily White', specialty: 'Dermatologist', image: 'https://via.placeholder.com/150', bio: 'Expert in skin conditions with a passion for dermatological research.' },
    { id: 4, name: 'Dr. Michael Brown', specialty: 'Pediatrician', image: 'https://via.placeholder.com/150', bio: 'Dedicated to providing comprehensive care for children of all ages.' },
    { id: 5, name: 'Dr. Lisa Green', specialty: 'Orthopedic Surgeon', image: 'https://via.placeholder.com/150', bio: 'Specializes in surgical procedures related to bones and joints, with a focus on patient rehabilitation.' },
    { id: 6, name: 'Dr. James Black', specialty: 'Gastroenterologist', image: 'https://via.placeholder.com/150', bio: 'Specializes in digestive system disorders, with extensive experience in endoscopic procedures.' },
    { id: 7, name: 'Dr. Susan Blue', specialty: 'Oncologist', image: 'https://via.placeholder.com/150', bio: 'Focuses on cancer treatment and research, providing compassionate care to patients.' },
    { id: 8, name: 'Dr. Robert Red', specialty: 'Ophthalmologist', image: 'https://via.placeholder.com/150', bio: 'Expert in eye care and vision-related treatments, with years of experience in surgery.' },
    { id: 9, name: 'Dr. Patricia Yellow', specialty: 'Endocrinologist', image: 'https://via.placeholder.com/150', bio: 'Specializes in hormone-related disorders, with a deep understanding of metabolic conditions.' },
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
                  </CardContent>
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

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
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', mb: 2 }}>
              <Avatar
                src={selectedDoctor.image}
                alt={selectedDoctor.name}
                sx={{ width: 100, height: 100, mb: 2 }}
              />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {selectedDoctor.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedDoctor.specialty}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                {selectedDoctor.bio}
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
