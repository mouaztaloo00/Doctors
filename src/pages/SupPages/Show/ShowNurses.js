import React, { useState, useEffect } from 'react';
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
  Button,
  CircularProgress,
  Pagination
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShowMiniNavbar from '../../../components/minBar/ShowMiniNavbar';
import axios from 'axios';

const ShowNurses = () => {
  const apiBaseUrl = `${process.env.REACT_APP_API_BASE_URL}`;
  const nursesUrl = `${apiBaseUrl}/api/nurses?size=8`; // تم تعديل الرابط

  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedNurse, setSelectedNurse] = useState(null);
  const [nurses, setNurses] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchNurses = async (page = 1) => {
      setLoading(true);
      try {
        const response = await axios.get(`${nursesUrl}&page=${page}`); // تحديث الرابط ليتضمن الصفحة الحالية
        setNurses(response.data.data || []);
        setTotalPages(response.data.meta ? response.data.meta.last_page : 1); // التعامل مع عدد الصفحات
      } catch (error) {
        console.error('Error fetching nurses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNurses(currentPage);
  }, [currentPage, nursesUrl]);

  // فلترة الممرضين بناءً على البحث
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

  const handlePageChange = (event, page) => {
    setCurrentPage(page); 
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
        {loading ? ( 
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
            <CircularProgress />
          </Box>
        ) : (
          filteredNurses.map((nurse) => (
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
                      src={`${apiBaseUrl}/${nurse.profilePicture}`}
                      alt={nurse.name}
                      sx={{ width: 100, height: 100, mb: 2 }}
                    />
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                        {nurse.name}
                      </Typography>
                    </CardContent>
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          siblingCount={1}
          boundaryCount={2}
        />
      </Box>

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
                src={`${apiBaseUrl}/${selectedNurse.profilePicture}`}
                alt={selectedNurse.name}
                sx={{ width: 100, height: 100, mb: 2 }}
              />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {selectedNurse.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t('show.noDescription')} 
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
