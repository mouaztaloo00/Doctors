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
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShowMiniNavbar from '../../../components/minBar/ShowMiniNavbar';
import axios from 'axios';

const ShowLabs = () => {
  const apiBaseUrl = `${process.env.REACT_APP_API_BASE_URL}`;
  const labsUrl = `${apiBaseUrl}/api/labs?size=9`;

  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedLab, setSelectedLab] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // جلب التوكن من localStorage وإضافته إلى الـ headers
  const token = `Bearer ${localStorage.getItem('token')}`;

  useEffect(() => {
    const fetchLabs = async (page = 1) => {
      setLoading(true);
      try {
        const response = await axios.get(`${labsUrl}&page=${page}`, {
          headers: {
            Authorization: token,
          },
        });
        setLabs(response.data.data || []);
        setTotalPages(response.data.meta.last_page || 1);
      } catch (error) {
        console.error('Failed to fetch labs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLabs(currentPage);
  }, [currentPage, token]);

  const filteredLabs = labs.filter((lab) =>
    lab.labName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClick = async (lab) => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiBaseUrl}/api/labs/id/${lab.id}`, {
        headers: {
          Authorization: token,
        },
      });
      setSelectedLab(response.data);
      setOpen(true);
    } catch (error) {
      console.error('Failed to fetch lab details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedLab(null);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <Box sx={{ direction: i18n.dir(), p: 3 }}>
      <Typography variant="h4" gutterBottom align={i18n.dir() === 'rtl' ? 'right' : 'left'} sx={{ p: 3 }}>
        {t('show.title2')}
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

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {filteredLabs.map((lab) => (
            <Grid item key={lab.id} xs={12} sm={6} md={4} lg={4}>
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
                <CardActionArea onClick={() => handleClick(lab)}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
                    <Avatar
                      src={`${apiBaseUrl}/${lab.labPicture}`} 
                      alt={lab.labName}
                      sx={{ width: 100, height: 100, mb: 2 }}
                    />
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                        {lab.labName}
                      </Typography>
                    </CardContent>
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      {selectedLab && (
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="md"
          fullWidth
          sx={{
            direction: i18n.dir(),
            borderRadius: 3,
            boxShadow: 24,
          }}
        >
          <DialogTitle
            sx={{
              textAlign: 'center',
              p: 3,
              bgcolor: 'primary.main',
              color: 'white',
              borderBottom: '1px solid',
              borderColor: 'divider',
              borderTopLeftRadius: 3,
              borderTopRightRadius: 3,
              fontSize: '1.5rem',
              fontWeight: 'bold',
            }}
          >
            {selectedLab.labName}
          </DialogTitle>
          <DialogContent>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: 3,
                p: 2,
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 2,
              }}
            >
              <Avatar
                src={`${apiBaseUrl}/${selectedLab.picture}`}
                alt={selectedLab.labName}
                sx={{
                  width: 120,
                  height: 120,
                  mb: 2,
                  border: '4px solid',
                  borderColor: 'primary.light',
                  boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
                }}
              />
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: 'bold', mb: 1 }}
              >
                {selectedLab.managerName}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, textAlign: 'center' }}>
                {selectedLab.labContactNumber}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, textAlign: 'center' }}>
                {`${selectedLab.address.street}, ${selectedLab.address.buildingNumber}, ${selectedLab.address.apartmentNumber}`}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
                {`${selectedLab.address.location.governorate}, ${selectedLab.address.location.district}, ${selectedLab.address.location.city}, ${selectedLab.address.location.area}`}
              </Typography>

              <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold', bgcolor: 'grey.100' }}>Day</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', bgcolor: 'grey.100' }}>Start</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', bgcolor: 'grey.100' }}>End</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.keys(selectedLab.operatingHours).map((day) => (
                      <TableRow key={day}>
                        <TableCell>{day}</TableCell>
                        <TableCell>{selectedLab.operatingHours[day].start || 'Closed'}</TableCell>
                        <TableCell>{selectedLab.operatingHours[day].end || 'Closed'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </DialogContent>
          <DialogActions
            sx={{
              p: 2,
              bgcolor: 'background.default',
              borderBottomLeftRadius: 3,
              borderBottomRightRadius: 3,
            }}
          >
            <Button onClick={handleClose} sx={{ color: 'red' }}>
              {t('show.close')}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default ShowLabs;
