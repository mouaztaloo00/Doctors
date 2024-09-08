import React from 'react';
import { AppBar, Toolbar, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const FeedBackMiniNavbar = () => {
  const { t } = useTranslation();

  return (
    <AppBar position="static" color="primary" sx={{ maxWidth: '1200px', margin: 'auto', borderRadius: 2 }}>
      <Toolbar sx={{ justifyContent: 'space-around' }}>
        <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button component={Link} to="#" color="inherit" sx={{ mx: 2 }}>
            {t('navbar.Doctors')}
          </Button>
          <Button component={Link} to="#" color="inherit" sx={{ mx: 2 }}>
            {t('navbar.labs')}
          </Button>
          <Button component={Link} to="#" color="inherit" sx={{ mx: 2 }}>
            {t('navbar.nurses')}
          </Button>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default FeedBackMiniNavbar;
