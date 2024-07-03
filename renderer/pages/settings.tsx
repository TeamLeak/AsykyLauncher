import React, { useState, useEffect } from 'react';
import {
  CssVarsProvider,
  GlobalStyles,
  CssBaseline,
  Box,
  Button,
  FormControl,
  FormLabel,
  Slider,
  Typography,
  Stack,
  Divider,
  Input,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabContext,
} from '@mui/joy';
import os from 'os';

const getTotalMemory = () => {
  return (os.totalmem() / (1024 ** 3)).toFixed(1);
};

const getFreeMemory = () => {
  return (os.freemem() / (1024 ** 3)).toFixed(1);
};

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState({
    maxRAM: 4,
    minRAM: 2,
    javaExecutable: '',
  });

  useEffect(() => {
    (window as any).electron.loadSettings().then((loadedSettings: any) => {
      setSettings(loadedSettings);
    });
  }, []);

  const handleSliderChange = (event: Event, newValue: number | number[], type: string) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [type]: newValue,
    }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  const handleSave = () => {
    (window as any).electron.saveSettings(settings).then((success: boolean) => {
      if (success) {
        alert('Settings saved!');
      } else {
        alert('Error saving settings');
      }
    });
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
        sx={(theme) => ({
          width: { xs: '100%', md: '50vw' },
          transition: 'width var(--Transition-duration)',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255 255 255 / 0.2)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundColor: 'rgba(19 19 24 / 0.4)',
          },
        })}
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
              <Typography level="title-lg">Java Settings</Typography>
              <Typography level="body-sm" ml={1}>
                Manage the Java configuration (advanced).
              </Typography>
            </Box>
          </Box>
          <Divider />
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
            <form>
              <FormControl required>
                <FormLabel>Maximum RAM (GB)</FormLabel>
                <Slider
                  value={settings.maxRAM}
                  min={1}
                  max={16}
                  step={1}
                  valueLabelDisplay="auto"
                  onChange={(e, val) => handleSliderChange(e as any, val, 'maxRAM')}
                />
              </FormControl>
              <FormControl required>
                <FormLabel>Minimum RAM (GB)</FormLabel>
                <Slider
                  value={settings.minRAM}
                  min={1}
                  max={16}
                  step={1}
                  valueLabelDisplay="auto"
                  onChange={(e, val) => handleSliderChange(e as any, val, 'minRAM')}
                />
              </FormControl>
              <Typography level="body-sm" mt={1}>
                The recommended minimum RAM is 3 gigabytes. Setting the minimum and maximum values to the same value may reduce lag.
              </Typography>
              <Divider />
              <FormControl required>
                <FormLabel>Java Executable</FormLabel>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Input
                    type="text"
                    name="javaExecutable"
                    value={settings.javaExecutable}
                    onChange={handleInputChange}
                    sx={{ flex: 1 }}
                  />
                  <Button component="label" sx={{ ml: 1 }}>
                    Choose File
                    <input
                      type="file"
                      hidden
                      onChange={(e) => {
                        if (e.target.files?.length) {
                          setSettings((prevSettings) => ({
                            ...prevSettings,
                            javaExecutable: e.target.files![0].path,
                          }));
                        }
                      }}
                    />
                  </Button>
                </Box>
              </FormControl>
              <Stack gap={4} sx={{ mt: 2 }}>
                <Button onClick={handleSave} fullWidth>
                  Save Settings
                </Button>
              </Stack>
            </form>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: '100%',
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: '50vw' },
          transition:
            'background-image var(--Transition-duration), left var(--Transition-duration) !important',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          backgroundColor: 'background.level1',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage:
            'url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundImage:
              'url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)',
          },
        })}
      />
    </CssVarsProvider>
  );
};

export default SettingsPage;
