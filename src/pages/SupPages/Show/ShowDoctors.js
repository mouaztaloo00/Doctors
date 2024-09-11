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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import ShowMiniNavbar from '../../../components/minBar/ShowMiniNavbar';
import SearchIcon from '@mui/icons-material/Search';

const ShowDoctors = () => {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

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
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDoctor(null);
  };


  return (
    <Box sx={{ direction: i18n.dir(), p: 3 }}>
      <Typography variant="h4" gutterBottom align={i18n.dir() === 'rtl' ? 'right' : 'left'} sx={{p: 3}}>
        {t('show.title1')}
      </Typography>
      <ShowMiniNavbar />

      <Box
        sx={{
          mb: 4,
          px: '56px',
          mx: 'auto', 
          maxWidth: 'calc(100% - 112px)', 
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

      <Stack
        direction="row"
        spacing={2}
        flexWrap="wrap"
        justifyContent="center"
      >
        {filteredDoctors.map((doctor) => (
          <Box
            key={doctor.id}
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
              <CardActionArea onClick={() => handleClick(doctor)}>
                <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
                  <Avatar
                    src={doctor.image}
                    alt={doctor.name}
                    sx={{ width: 80, height: 80, marginRight: 2 }}
                  />
                  <CardContent sx={{ flex: 1 }}>
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
          </Box>
        ))}
      </Stack>

      {selectedDoctor && (
        <Dialog 
          open={open} 
          onClose={handleClose} 
          maxWidth="sm" 
          fullWidth
          sx={{ direction: i18n.dir() }}
        >
          <DialogTitle sx={{ textAlign: i18n.dir() === 'rtl' ? 'right' : 'left'  , p:2}}>
            {selectedDoctor.name}
          </DialogTitle>
          <DialogContent sx={{ textAlign: i18n.dir() === 'rtl' ? 'right' : 'left' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
              <Avatar
                src={selectedDoctor.image}
                alt={selectedDoctor.name}
                sx={{ width: 100, height: 100, marginRight: 2 }}
              />
              <Box>
                <Typography variant="h6" sx={{p:1}}>{selectedDoctor.specialty}</Typography>
                <Typography variant="body2" sx={{p:1}} color="text.secondary">
                  {selectedDoctor.bio}
                </Typography>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: i18n.dir() === 'lrt' ? 'flex-start' : 'flex-end' }}>
            <Button onClick={handleClose} color="primary">
              {t('show.close')}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default ShowDoctors;
