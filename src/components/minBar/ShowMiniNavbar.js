import React from 'react';
import { AppBar, Toolbar, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const ShowMiniNavbar = () => {
  const { t } = useTranslation();

  return (
    <AppBar position="static" color="primary" sx={{ maxWidth: '1200px', margin: 'auto', borderRadius: 2 }}>
      <Toolbar sx={{ justifyContent: 'space-around' }}>
        <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button component={Link} to="/show/show_doctors" color="inherit" sx={{ mx: 2 }}>
            {t('navbar.Doctors')}
          </Button>
          <Button component={Link} to="/show/show_labs" color="inherit" sx={{ mx: 2 }}>
            {t('navbar.labs')}
          </Button>
          <Button component={Link} to="/show/show_location" color="inherit" sx={{ mx: 2 }}>
            {t('navbar.location')}
          </Button>
          <Button component={Link} to="/show/show_tests" color="inherit" sx={{ mx: 2 }}>
            {t('navbar.tests')}
          </Button>
          <Button component={Link} to="/show/show_testcategory" color="inherit" sx={{ mx: 2 }}>
            {t('navbar.testcategory')}
          </Button>
          <Button component={Link} to="/show/show_paymentMethod" color="inherit" sx={{ mx: 2 }}>
            {t('navbar.paymentMethod')}
          </Button>
          <Button component={Link} to="/show/show_nurses" color="inherit" sx={{ mx: 2 }}>
            {t('navbar.nurses')}
          </Button>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default ShowMiniNavbar;
