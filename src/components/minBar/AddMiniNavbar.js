import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {jwtDecode} from 'jwt-decode'; 

const AddMiniNavbar = () => {
  const { t } = useTranslation();

  const token = localStorage.getItem('token');
  let isAdmin = false;
  let profileType = null;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      isAdmin = decodedToken.isAdmin;
      profileType = decodedToken.profileType;
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }

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
            height: 6,
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
          {/*(Admin) */}
          {isAdmin && profileType === null && (
            <>
              <Button
                component={Link}
                to="/add/add_doctors"
                color="inherit"
                sx={{ fontSize: '1rem', textTransform: 'capitalize', py: 1, px: 2 }}
              >
                {t('navbar.Doctors')}
              </Button>
              <Button
                component={Link}
                to="/add/add_labs"
                color="inherit"
                sx={{ fontSize: '1rem', textTransform: 'capitalize', py: 1, px: 2 }}
              >
                {t('navbar.labs')}
              </Button>
              <Button
                component={Link}
                to="/add/add_location"
                color="inherit"
                sx={{ fontSize: '1rem', textTransform: 'capitalize', py: 1, px: 2 }}
              >
                {t('navbar.location')}
              </Button>
              <Button
                component={Link}
                to="/add/add_tests"
                color="inherit"
                sx={{ fontSize: '1rem', textTransform: 'capitalize', py: 1, px: 2 }}
              >
                {t('navbar.tests')}
              </Button>
              <Button
                component={Link}
                to="/add/add_testcategory"
                color="inherit"
                sx={{ fontSize: '1rem', textTransform: 'capitalize', py: 1, px: 2 }}
              >
                {t('navbar.testcategory')}
              </Button>
              <Button
                component={Link}
                to="/add/add_paymentMethod"
                color="inherit"
                sx={{ fontSize: '1rem', textTransform: 'capitalize', py: 1, px: 2 }}
              >
                {t('navbar.paymentMethod')}
              </Button>
            </>
          )}
          
          {/*(not Admin)*/}
          {(!isAdmin || profileType !== null) && (
            <>
             <Button
                component={Link}
                to="/add/add_paymentMethod"
                color="inherit"
                sx={{ fontSize: '1rem', textTransform: 'capitalize', py: 1, px: 2 }}
              >
                {t('navbar.paymentMethod')}
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AddMiniNavbar;
