import React from 'react';
import {
  CssVarsProvider,
  GlobalStyles,
  CssBaseline,
  Box,
  Button,
  Typography,
  Stack,
  IconButton,
} from '@mui/joy';
import {
  Twitter as TwitterIcon,
  YouTube as YouTubeIcon,
  Instagram as InstagramIcon,
  Settings as SettingsIcon,
  AccountCircle as AccountCircleIcon,
  Login as LoginIcon,
} from '@mui/icons-material';

const HomePage: React.FC = () => {
  const handleIconClick = (url: string) => {
    window.open(url, '_blank');
  };

  const handleSettingsClick = () => {
    window.location.href = '/settings';
  };

  const handleAccountClick = () => {
    window.location.href = '/account';
  };

  const handleLoginClick = () => {
    window.location.href = '/login';
  };

  const saveUsername = async () => {
    const username = (document.getElementById('username') as HTMLInputElement).value;
    if (window.electron && window.electron.setStoreValue) {
      await window.electron.setStoreValue('username', username);
      alert('Username saved!');
    } else {
      console.error('electronAPI is not available');
    }
  };

  const loadUsername = async () => {
    if (window.electron && window.electron.getStoreValue) {
      const username = await window.electron.getStoreValue('username');
      alert(`Loaded Username: ${username}`);
    } else {
      console.error('electronAPI is not available');
    }
  };

  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ':root': {
            '--Transition-duration': '0.4s',
          },
        }}
      />
      <Box
        sx={{
          position: 'relative',
          height: '100vh',
          background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2) no-repeat center center',
          backgroundSize: 'cover',
          display: 'flex',
          flexDirection: 'column',
          color: '#fff',
        }}
      >
        <Box
          component="header"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 2,
            backdropFilter: 'blur(12px)',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 1,
          }}
        >
          <Typography level="title-lg">AsykyLauncher</Typography>
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" sx={{ flex: 1 }}>
            <IconButton
              variant="outlined"
              color="primary"
              onClick={() => handleIconClick('https://twitter.com')}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              variant="outlined"
              color="primary"
              onClick={() => handleIconClick('https://instagram.com')}
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              variant="outlined"
              color="primary"
              onClick={() => handleIconClick('https://youtube.com')}
            >
              <YouTubeIcon />
            </IconButton>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton
              variant="outlined"
              color="primary"
              onClick={handleSettingsClick}
            >
              <SettingsIcon />
            </IconButton>
            <IconButton
              variant="outlined"
              color="primary"
              onClick={handleAccountClick}
            >
              <AccountCircleIcon />
            </IconButton>
            <IconButton
              variant="outlined"
              color="primary"
              onClick={handleLoginClick}
            >
              <LoginIcon />
            </IconButton>
          </Stack>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            padding: 4,
          }}
        >
          <Box
            sx={{
              textAlign: 'center',
              maxWidth: '60%',
            }}
          >
            <Typography level="h1" fontSize="3rem">
              Asyky Server
            </Typography>
            <Button
              sx={{
                mt: 2,
                px: 4,
                py: 1,
                fontSize: '1.5rem',
              }}
            >
              Play
            </Button>
            <Typography level="body-md" mt={2}>
              Players: 0/100 | Mojang Status: <span style={{ color: 'red' }}>Offline</span>
            </Typography>
            <Box sx={{ mt: 4 }}>
              <input id="username" type="text" placeholder="Username" style={{ padding: '10px', fontSize: '1rem' }} />
              <Button onClick={saveUsername} sx={{ ml: 2 }}>Save Username</Button>
              <Button onClick={loadUsername} sx={{ ml: 2 }}>Load Username</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
};

export default HomePage;
