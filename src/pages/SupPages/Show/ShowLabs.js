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
  Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import ShowMiniNavbar from '../../../components/minBar/ShowMiniNavbar';
import axios from 'axios';

const ShowLabs = () => {
  const apiBaseUrl = `${process.env.REACT_APP_API_BASE_URL}`;
  const labsUrl = `${apiBaseUrl}/api/labs?size=9`;
  const { t, i18n } = useTranslation();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedLab, setSelectedLab] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedLabForDeletion, setSelectedLabForDeletion] = useState(null);
  
  const getValueOrPlaceholder = (value, placeholder) => (value ? value : placeholder);

 
  useEffect(() => {
    const fetchLabs = async (page = 1) => {
      setLoading(true);
      try {
        const response = await axios.get(`${labsUrl}&page=${page}`);
        setLabs(response.data.data.data || []); 
        setTotalPages(response.data.data.meta.last_page || 1);
      } catch (error) {
        console.error('Failed to fetch labs:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLabs(currentPage);
  }, [currentPage]);

  const fetchData = async (query = '', page = 1) => {
    setLoading(true);
    try {
      const endpoint = query
        ? `${apiBaseUrl}/api/labs/search?s=${query}`
        : `${apiBaseUrl}/api/labs?size=9&page=${page}`;
      const response = await axios.get(endpoint);

      if (response.data.data === "") {
        setLabs([]); 
        setTotalPages(1);
      } else {
        setLabs(query ? response.data.data || [] : response.data.data.data || []);
        setTotalPages(query ? 1 : response.data.data.meta ? response.data.data.meta.last_page : 1); 
     }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setLabs([]); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(searchQuery, currentPage);
  }, [searchQuery, currentPage]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleConfirmDelete = (lab) => {
    setSelectedLabForDeletion(lab);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setSelectedLabForDeletion(null);
  };

  const handleDelete = async () => {
    if (selectedLabForDeletion) {
      try {
        await axios.delete(`${apiBaseUrl}/api/labs/id/${selectedLabForDeletion.id}`);
        setLabs(labs.filter((lab) => lab.id !== selectedLabForDeletion.id));
        handleCloseConfirmDialog();
        window.location.reload();
      } catch (error) {
        console.error('Error deleting lab:', error);
        alert('Failed to delete lab. Please try again.');
      }
    }
  };

  const handleClick = async (lab) => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiBaseUrl}/api/labs/id/${lab.id}`);
      if (response.data && response.data.success) { 
        setSelectedLab(response.data.data); 
        setOpen(true);
      }
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

  return (
    <Box sx={{ direction: i18n.dir(), p: 3}}>
      <Typography
        variant="h4"
        gutterBottom
        align={i18n.dir() === 'rtl' ? 'right' : 'left'}
        sx={{ p: 3 }}
      >
        {t('show.title2')}
      </Typography>
      <ShowMiniNavbar />

      <Box sx={{ mt: 3, mb: 4, px: '16px', maxWidth: '100%' }}>
        <TextField
          variant="outlined"
          fullWidth
          placeholder={t('search.placeholder')}
          value={searchQuery}
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
          <CircularProgress/>
        </Box>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {labs.length === 0 ? (
            <Typography variant="h6" align="center" sx={{ mt: 4 }}>
              {t('No results')}
            </Typography>
          ) : (
            labs.map((lab) => (
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
                    height: '250px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CardActionArea onClick={() => handleClick(lab)}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 2,
                      }}
                    >
                      <Avatar
                        src={`${apiBaseUrl}/${lab.labPicture}`}
                        alt={getValueOrPlaceholder(lab.labName, 'Lab Picture Not Available')}
                        sx={{ width: 100, height: 100, mb: 2 }}
                      />
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          sx={{ fontWeight: 'bold' }}
                        >
                          {getValueOrPlaceholder(lab.labName, 'Lab Name Not Available')}
                        </Typography>
                      </CardContent>
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          sx={{ display: searchQuery ? 'none' : 'flex' }}
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
            {getValueOrPlaceholder(selectedLab.labName, 'Lab Name Not Available')}
          </DialogTitle>
          <DialogContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 3,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Avatar
                src={`${apiBaseUrl}/${selectedLab.labPicture}`}
                alt={getValueOrPlaceholder(selectedLab.labName, 'Lab Picture Not Available')}
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
                {getValueOrPlaceholder(selectedLab.managerName, 'Manager Name Not Available')}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, textAlign: 'center' }}>
                {getValueOrPlaceholder(selectedLab.labContactNumber, 'Contact Number Not Available')}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, textAlign: 'center' }}>
                {getValueOrPlaceholder(selectedLab.address?.street, 'Street Not Available')}, {getValueOrPlaceholder(selectedLab.address?.buildingNumber, 'Building Number Not Available')}, {getValueOrPlaceholder(selectedLab.address?.apartmentNumber, 'Apartment Number Not Available')}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
                {`${getValueOrPlaceholder(selectedLab.address?.location?.governorate, 'Governorate Not Available')}, ${getValueOrPlaceholder(selectedLab.address?.location?.district, 'District Not Available')}, ${getValueOrPlaceholder(selectedLab.address?.location?.city, 'City Not Available')}, ${getValueOrPlaceholder(selectedLab.address?.location?.area, 'Area Not Available')}`}
              </Typography>

              <TableContainer
                component={Paper}
                sx={{ borderRadius: 2, boxShadow: 2 }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{ fontWeight: 'bold', bgcolor: 'grey.100' }}
                      >
                        Day
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: 'bold', bgcolor: 'grey.100' }}
                      >
                        Start
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: 'bold', bgcolor: 'grey.100' }}
                      >
                        End
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedLab.operatingHours && Object.keys(selectedLab.operatingHours).map((day) => (
                      <TableRow key={day}>
                        <TableCell>{day}</TableCell>
                        <TableCell>
                          {getValueOrPlaceholder(selectedLab.operatingHours[day].start, 'Closed')}
                        </TableCell>
                        <TableCell>
                          {getValueOrPlaceholder(selectedLab.operatingHours[day].end, 'Closed')}
                        </TableCell>
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
              justifyContent: 'space-between',
              width: '100%'
            }}
          >
            <Button
              onClick={() => handleConfirmDelete(selectedLab)}
              sx={{ color: 'red', marginRight: 'auto' }}
              startIcon={<DeleteIcon />}
            >
              {t('show.delete')}
            </Button>
            <Button onClick={handleClose} >
              {t('show.close')}
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{t('show.delete')}</DialogTitle>
        <DialogContent>
          <Typography>{t('show.message')}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog}>{t('show.close')}</Button>
          <Button onClick={handleDelete} color="error">
            {t('show.delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ShowLabs;
