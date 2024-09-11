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
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShowMiniNavbar from '../../../components/minBar/ShowMiniNavbar';

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
      <Typography variant="h4" gutterBottom align={i18n.dir() === 'rtl' ? 'right' : 'left'} sx={{ p: 3 }}>
        {t('show.title7')}
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
                  </CardContent>
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedNurse && (
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="sm"
          fullWidth
          sx={{ direction: i18n.dir() }}
        >
          <DialogTitle sx={{ textAlign: 'center', p: 2 }}>
            {selectedNurse.name}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
              <Avatar
                src={selectedNurse.image}
                alt={selectedNurse.name}
                sx={{ width: 100, height: 100, mb: 2 }}
              />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {selectedNurse.specialty}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedNurse.description}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} sx={{ color: 'red' }}>
              {t('show.close')}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default ShowNurses;
