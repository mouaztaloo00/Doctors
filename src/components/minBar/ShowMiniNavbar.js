import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const ShowMiniNavbar = () => {
  const { t } = useTranslation();
  const role = localStorage.getItem('role');

  return (
    <AppBar position="static" color="primary" sx={{ maxWidth: '1200px', margin: 'auto', borderRadius: 2 }}>
      <Toolbar
        sx={{
          display: 'flex',
          overflowX: 'auto',
          padding: 1,
          alignItems: 'center', 
          scrollbarWidth: 'thin', 
          '&::-webkit-scrollbar': {
            height: 8, 
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: 4,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#e0e0e0',
            borderRadius: 4,
          },
        }}
      >
        <Box sx={{ display: 'flex', gap: 9, justifyContent: 'center', flexGrow: 1 }}>
        {role === 'Admin' && (
            <>
          <Button 
            component={Link} 
            to="/show/show_doctors" 
            color="inherit" 
            sx={{ fontSize: '1rem', textTransform: 'capitalize', py: 1, px: 2 }}
          >
            {t('navbar.Doctors')}
          </Button>
          <Button 
            component={Link} 
            to="/show/show_labs" 
            color="inherit" 
            sx={{ fontSize: '1rem', textTransform: 'capitalize', py: 1, px: 2 }}
          >
            {t('navbar.labs')}
          </Button>
          <Button 
            component={Link} 
            to="/show/show_location" 
            color="inherit" 
            sx={{ fontSize: '1rem', textTransform: 'capitalize', py: 1, px: 2 }}
          >
            {t('navbar.location')}
          </Button>
          <Button 
            component={Link} 
            to="/show/show_tests" 
            color="inherit" 
            sx={{ fontSize: '1rem', textTransform: 'capitalize', py: 1, px: 2 }}
          >
            {t('navbar.tests')}
          </Button>
          <Button 
            component={Link} 
            to="/show/show_testcategory" 
            color="inherit" 
            sx={{ fontSize: '1rem', textTransform: 'capitalize', py: 1, px: 2 }}
          >
            {t('navbar.testcategory')}
          </Button>
          <Button 
            component={Link} 
            to="/show/show_paymentMethod" 
            color="inherit" 
            sx={{ fontSize: '1rem', textTransform: 'capitalize', py: 1, px: 2 }}
          >
            {t('navbar.paymentMethod')}
          </Button>
          <Button 
            component={Link} 
            to="/show/show_nurses" 
            color="inherit" 
            sx={{ fontSize: '1rem', textTransform: 'capitalize', py: 1, px: 2 }}
          >
            {t('navbar.nurses')}
          </Button>
          </>
        )}
        </Box> 
      </Toolbar>
    </AppBar>
  );
};

export default ShowMiniNavbar;
