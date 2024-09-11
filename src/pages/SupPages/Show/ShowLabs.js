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

const ShowLabs = () => {
  
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedLab, setSelectedLab] = useState(null);

  const labs = [
    { id: 1, name: 'Lab Alpha', type: 'Diagnostic Lab', image: 'https://via.placeholder.com/150', description: 'A leading diagnostic lab providing a wide range of medical tests and services.' },
    { id: 2, name: 'Lab Beta', type: 'Pathology Lab', image: 'https://via.placeholder.com/150', description: 'Specializes in pathology services, offering accurate results and expert consultations.' },
    { id: 3, name: 'Lab Gamma', type: 'Radiology Lab', image: 'https://via.placeholder.com/150', description: 'Advanced radiology lab with state-of-the-art imaging technology.' },
    { id: 4, name: 'Lab Delta', type: 'Clinical Lab', image: 'https://via.placeholder.com/150', description: 'Provides comprehensive clinical lab services with a focus on quality and accuracy.' },
    { id: 5, name: 'Lab Epsilon', type: 'Research Lab', image: 'https://via.placeholder.com/150', description: 'A research-oriented lab dedicated to medical innovation and breakthroughs.' },
    { id: 6, name: 'Lab Zeta', type: 'Biochemical Lab', image: 'https://via.placeholder.com/150', description: 'Expert in biochemical analysis and diagnostics.' },
    { id: 7, name: 'Lab Eta', type: 'Genetics Lab', image: 'https://via.placeholder.com/150', description: 'Specializes in genetic testing and research, offering personalized insights.' },
    { id: 8, name: 'Lab Theta', type: 'Immunology Lab', image: 'https://via.placeholder.com/150', description: 'Focuses on immunological studies and testing with advanced methodologies.' },
    { id: 9, name: 'Lab Iota', type: 'Environmental Lab', image: 'https://via.placeholder.com/150', description: 'Dedicated to environmental testing and analysis, ensuring safety and compliance.' },
  ];

  const filteredLabs = labs.filter((lab) =>
    lab.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClick = (lab) => {
    setSelectedLab(lab);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedLab(null);
  };

  return (
    <Box sx={{ direction: i18n.dir(), p: 3 }}>
      <Typography variant="h4" gutterBottom align={i18n.dir() === 'rtl' ? 'right' : 'left'} sx={{p: 3}}>
        {t('show.title2')}
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
        {filteredLabs.map((lab) => (
          <Box
            key={lab.id}
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
              <CardActionArea onClick={() => handleClick(lab)}>
                <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
                  <Avatar
                    src={lab.image}
                    alt={lab.name}
                    sx={{ width: 80, height: 80, marginRight: 2 }}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                      {lab.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {lab.type}
                    </Typography>
                  </CardContent>
                </Box>
              </CardActionArea>
            </Card>
          </Box>
        ))}
      </Stack>

      {selectedLab && (
        <Dialog 
          open={open} 
          onClose={handleClose} 
          maxWidth="sm" 
          fullWidth
          sx={{ direction: i18n.dir() }}
        >
          <DialogTitle sx={{ textAlign: i18n.dir() === 'rtl' ? 'right' : 'left', p: 2 }}>
            {selectedLab.name}
          </DialogTitle>
          <DialogContent sx={{ textAlign: i18n.dir() === 'rtl' ? 'right' : 'left' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
              <Avatar
                src={selectedLab.image}
                alt={selectedLab.name}
                sx={{ width: 100, height: 100, marginRight: 2 }}
              />
              <Box>
                <Typography variant="h6" sx={{ p: 1 }}>{selectedLab.type}</Typography>
                <Typography variant="body2" sx={{ p: 1 }} color="text.secondary">
                  {selectedLab.description}
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

export default ShowLabs;
