import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
    CssVarsProvider,
    GlobalStyles,
    CssBaseline,
    Box,
    Button,
    FormControl,
    FormLabel,
    Typography,
    Divider,
    Input,
    Avatar,
    Stack
} from '@mui/joy';

const ProfilePage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [profile, setProfile] = useState({
        username: '',
        email: '',
        avatar: '',
    });

    useEffect(() => {
        if (id) {
            (window as any).electronAPI.loadProfile(id as string).then((loadedProfile: any) => {
                setProfile(loadedProfile);
            });
        }
    }, [id]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfile((prevProfile) => ({
                    ...prevProfile,
                    avatar: e.target?.result as string,
                }));
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const handleSave = () => {
        (window as any).electronAPI.saveProfile(profile).then((success: boolean) => {
            if (success) {
                alert('Profile saved!');
            } else {
                alert('Error saving profile');
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
                sx={{
                    width: { xs: '100%', md: '50vw' },
                    transition: 'width var (--Transition-duration)',
                    transitionDelay: 'calc(var (--Transition-duration) + 0.1s)',
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
                            <Typography level="title-lg">Profile</Typography>
                            <Typography level="body-sm" ml={1}>
                                Manage your profile settings
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
                            <Stack alignItems="center">
                                <Avatar src={profile.avatar} sx={{ width: 100, height: 100 }} />
                                <Button component="label" sx={{ mt: 1 }}>
                                    Upload Avatar
                                    <input
                                        type="file"
                                        hidden
                                        onChange={handleFileChange}
                                    />
                                </Button>
                            </Stack>
                            <FormControl required>
                                <FormLabel>Username</FormLabel>
                                <Input
                                    type="text"
                                    name="username"
                                    value={profile.username}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <FormControl required>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type="email"
                                    name="email"
                                    value={profile.email}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <Stack gap={4} sx={{ mt: 2 }}>
                                <Button onClick={handleSave} fullWidth>
                                    Save Profile
                                </Button>
                            </Stack>
                        </form>
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
                        'background-image var (--Transition-duration), left var (--Transition-duration) !important',
                    transitionDelay: 'calc(var (--Transition-duration) + 0.1s)',
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

export default ProfilePage;
