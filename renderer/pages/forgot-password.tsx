import React, { useState } from 'react';
import axios from 'axios';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import BadgeIcon from '@mui/icons-material/Badge';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/forgot-password', {
        email,
      });
      if (response.data.message === 'Password reset email sent') {
        setErrorMessage('');
        // Proceed with password reset
        console.log('Password reset email sent', response.data);
      } else {
        setErrorMessage('Failed to send password reset email');
      }
    } catch (error) {
      setErrorMessage('Failed to send password reset email');
      console.error('Error sending password reset email', error);
    }
  };

  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ':root': {
            '--Form-maxWidth': '800px',
            '--Transition-duration': '0.4s',
          },
        }}
      />
      <Box
        sx={{
          width: { xs: '100%', md: '50vw' },
          transition: 'width var(--Transition-duration)',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255 255 255 / 0.2)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100dvh',
            width: '100%',
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
              <IconButton variant="soft" color="primary" size="sm">
                <BadgeIcon />
              </IconButton>
              <Typography level="title-lg">TeamLeak</Typography>
            </Box>
            <ColorSchemeToggle />
          </Box>
          <Box
            component="main"
            sx={{
              my: 'auto',
              py: 2,
              pb: 5,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: 400,
              maxWidth: '100%',
              mx: 'auto',
              borderRadius: 'sm',
              '& form': {
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              },
            }}
          >
            <Stack gap={4} sx={{ mb: 2 }}>
              <Stack gap={1}>
                <Typography component="h1" level="h3">
                  Forgot Password
                </Typography>
                <Typography level="body-sm">
                  Remembered your password?{' '}
                  <Link href="/login" level="title-sm">
                    Sign in!
                  </Link>
                </Typography>
              </Stack>
            </Stack>
            {errorMessage && (
              <Typography level="body-sm" color="danger">
                {errorMessage}
              </Typography>
            )}
            <Stack gap={4} sx={{ mt: 2 }}>
              <form onSubmit={handleForgotPassword}>
                <FormControl required>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </FormControl>
                <Stack gap={4} sx={{ mt: 2 }}>
                  <Button type="submit" fullWidth>
                    Send reset email
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              © TeamLeak {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          height: '100%',
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: '50vw' },
          transition:
            'background-image var (--Transition-duration), left var(--Transition-duration) !important',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          backgroundColor: 'background.level1',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage:
            'url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)',
        }}
      />
    </CssVarsProvider>
  );
};

const ColorSchemeToggle = (props: IconButtonProps) => {
  const { onClick, ...other } = props;
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  return (
    <IconButton
      aria-label="toggle light/dark mode"
      size="sm"
      variant="outlined"
      disabled={!mounted}
      onClick={(event) => {
        setMode(mode === 'light' ? 'dark' : 'light');
        onClick?.(event);
      }}
      {...other}
    >
      {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
};

export default ForgotPassword;
