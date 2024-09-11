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

const ShowNurses = () => {

  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedNurse, setSelectedNurse] = useState(null);

  const nurses = [
    { id: 1, name: 'Nurse Alice Johnson', specialty: 'Pediatric Nurse', image: 'https://via.placeholder.com/150', description: 'Expert in child care and pediatric nursing.' },
    { id: 2, name: 'Nurse Bob Brown', specialty: 'Emergency Nurse', image: 'https://via.placeholder.com/150', description: 'Handles critical cases in the emergency room with expertise.' },
    { id: 3, name: 'Nurse Clara Davis', specialty: 'Surgical Nurse', image: 'https://via.placeholder.com/150', description: 'Assists in surgical procedures and post-operative care.' },
    { id: 4, name: 'Nurse Daniel Lee', specialty: 'Oncology Nurse', image: 'https://via.placeholder.com/150', description: 'Specializes in cancer care and chemotherapy administration.' },
    { id: 5, name: 'Nurse Eva Martinez', specialty: 'Geriatric Nurse', image: 'https://via.placeholder.com/150', description: 'Focuses on elderly care and chronic condition management.' },
    { id: 6, name: 'Nurse Frank Wilson', specialty: 'Cardiac Nurse', image: 'https://via.placeholder.com/150', description: 'Provides care for patients with heart conditions.' },
    { id: 7, name: 'Nurse Grace Kim', specialty: 'Neonatal Nurse', image: 'https://via.placeholder.com/150', description: 'Expert in neonatal intensive care and newborn health.' },
    { id: 8, name: 'Nurse Henry Scott', specialty: 'Orthopedic Nurse', image: 'https://via.placeholder.com/150', description: 'Specializes in bone and joint care.' },
    { id: 9, name: 'Nurse Iris Clark', specialty: 'Critical Care Nurse', image: 'https://via.placeholder.com/150', description: 'Expert in managing patients in intensive care units.' },
  ];

  const filteredNurses = nurses.filter((nurse) =>
    nurse.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClick = (nurse) => {
    setSelectedNurse(nurse);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedNurse(null);
  };

  return (
    <Box sx={{ direction: i18n.dir(), p: 3 }}>
      <Typography variant="h4" gutterBottom align={i18n.dir() === 'rtl' ? 'right' : 'left'} sx={{p: 3}}>
        {t('show.title7')}
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
              <CardActionArea onClick={() => handleClick(nurse)}>
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
                  </CardContent>
                </Box>
              </CardActionArea>
            </Card>
          </Box>
        ))}
      </Stack>

      {selectedNurse && (
        <Dialog 
          open={open} 
          onClose={handleClose} 
          maxWidth="sm" 
          fullWidth
          sx={{ direction: i18n.dir() }}
        >
          <DialogTitle sx={{ textAlign: i18n.dir() === 'rtl' ? 'right' : 'left', p: 2 }}>
            {selectedNurse.name}
          </DialogTitle>
          <DialogContent sx={{ textAlign: i18n.dir() === 'rtl' ? 'right' : 'left' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
              <Avatar
                src={selectedNurse.image}
                alt={selectedNurse.name}
                sx={{ width: 100, height: 100, marginRight: 2 }}
              />
              <Box>
                <Typography variant="h6" sx={{ p: 1 }}>{selectedNurse.specialty}</Typography>
                <Typography variant="body2" sx={{ p: 1 }} color="text.secondary">
                  {selectedNurse.description}
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

export default ShowNurses;
