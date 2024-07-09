import React, {useState, useEffect} from 'react';
import {
    Box,
    Flex,
    Text,
    Image,
    IconButton,
    Tooltip,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Portal,
    Spinner,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react';
import {AddIcon, CheckIcon, CloseIcon} from '@chakra-ui/icons';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {motion} from 'framer-motion';
import {useUser} from '../context/UserContext';

const SelectPlayer: React.FC = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {user, isLoading} = useUser();
    const [contextMenu, setContextMenu] = useState<{
        playerId: number | null;
        playerElement: HTMLElement | null
    }>({playerId: null, playerElement: null});
    const [loading, setLoading] = useState<boolean>(false);
    const [status, setStatus] = useState<'success' | 'error' | null>(null);
    const [, setAttemptCount] = useState<number>(0);

    useEffect(() => {
        if (!isLoading && !user.name) {
            navigate('/login');
        }
    }, [isLoading, user, navigate]);

    useEffect(() => {
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';

        return () => {
            document.documentElement.style.overflow = 'auto';
            document.body.style.overflow = 'auto';
        };
    }, []);

    const players = [
        {id: 1, name: t('Player 1'), avatar: 'https://via.placeholder.com/100'},
        {id: 2, name: t('Player 2'), avatar: 'https://via.placeholder.com/100'},
        {id: 3, name: t('Player 3'), avatar: 'https://via.placeholder.com/100'},
        {id: 4, name: t('Player 4'), avatar: 'https://via.placeholder.com/100'},
        {id: 5, name: t('Player 5'), avatar: 'https://via.placeholder.com/100'},
    ];

    const handleContextMenu = (event: React.MouseEvent, playerId: number) => {
        event.preventDefault();
        setContextMenu({playerId, playerElement: event.currentTarget as HTMLElement});
    };

    const handleClose = () => {
        setContextMenu({playerId: null, playerElement: null});
    };

    const handlePlayerClick = async () => {
        setLoading(true);
        setStatus(null);
        onOpen();

        setAttemptCount(prevCount => prevCount + 1);

        const response = await simulateServerRequest();

        setLoading(false);
        if (response === 'success') {
            setStatus('success');
            setTimeout(() => {
                onClose();
                setTimeout(() => navigate('/'), 500);
            }, 500);
        } else {
            setStatus('error');
            setTimeout(() => {
                onClose();
                setTimeout(() => navigate('/login'), 500);
            }, 500);
        }
    };

    const simulateServerRequest = () => {
        return new Promise<string>((resolve) => {
            setTimeout(() => {
                const responses = ['403', '502', 'relogin'];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                resolve(randomResponse);
            }, 2000);
        });
    };

    const renderPlayers = (startIndex: number, endIndex: number) => (
        <Flex justify="center" mt={10}>
            {players.slice(startIndex, endIndex).map(player => (
                <Box key={player.id} mx={4} textAlign="center" position="relative" role="group"
                     onContextMenu={(event) => handleContextMenu(event, player.id)}>
                    <Image
                        src={player.avatar}
                        alt={player.name}
                        boxSize="100px"
                        borderRadius="full"
                        mb={2}
                        onClick={handlePlayerClick}
                        cursor="pointer"
                    />
                    <Box
                        className="player-name"
                        position="absolute"
                        top="110px"
                        left="50%"
                        transform="translateX(-50%)"
                        backgroundColor="rgba(0, 0, 0, 0.7)"
                        color="white"
                        px={4}
                        py={1}
                        borderRadius="md"
                        opacity={0}
                        _groupHover={{opacity: 1}}
                        transition="opacity 0.2s"
                        zIndex={1}
                        whiteSpace="nowrap"
                    >
                        <Text fontWeight="bold">{player.name}</Text>
                    </Box>
                </Box>
            ))}
            {players.length < endIndex && (
                <Box mx={4} textAlign="center">
                    <Tooltip label={t('addPlayer')} aria-label={t('addPlayer')}>
                        <IconButton
                            aria-label="Add player"
                            icon={<AddIcon/>}
                            boxSize="100px"
                            borderRadius="full"
                            variant="outline"
                            fontSize="2xl"
                        />
                    </Tooltip>
                </Box>
            )}
        </Flex>
    );

    if (isLoading) {
        return <Spinner size="xl"/>;
    }

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >
            <Flex direction="column" align="center" justify="center" height="100vh" position="relative" overflow="hidden">
                <Text fontSize="2xl" mb={8} fontWeight="bold">
                    {t('whoIsPlaying')}
                </Text>
                {renderPlayers(0, 3)}
                {renderPlayers(3, 6)}
                {players.length >= 6 && (
                    <Box textAlign="center" mt={8}>
                        <Tooltip label={t('addPlayer')} aria-label={t('addPlayer')}>
                            <IconButton
                                aria-label="Add player"
                                icon={<AddIcon/>}
                                boxSize="100px"
                                borderRadius="full"
                                variant="outline"
                                fontSize="2xl"
                            />
                        </Tooltip>
                    </Box>
                )}
                {contextMenu.playerId !== null && contextMenu.playerElement && (
                    <Portal>
                        <Box
                            position="absolute"
                            top={`${contextMenu.playerElement.getBoundingClientRect().bottom + window.scrollY}px`}
                            left={`${contextMenu.playerElement.getBoundingClientRect().left + window.scrollX}px`}
                            zIndex={2}
                        >
                            <Menu isOpen onClose={handleClose}>
                                <MenuButton/>
                                <MenuList>
                                    <MenuItem
                                        onClick={() => alert(`Open player ${contextMenu.playerId}`)}>{t('open')}</MenuItem>
                                    <MenuItem color="red"
                                              onClick={() => alert(`Logout player ${contextMenu.playerId}`)}>{t('logout')}</MenuItem>
                                </MenuList>
                            </Menu>
                        </Box>
                    </Portal>
                )}
                <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay/>
                    <ModalContent height="300px">
                        <ModalHeader>{t('loggingIn')}</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                            {loading && <Spinner size="xl"/>}
                            {!loading && status === 'success' && (
                                <Box textAlign="center" color="green.500">
                                    <CheckIcon boxSize="50px"/>
                                </Box>
                            )}
                            {!loading && status === 'error' && (
                                <Box textAlign="center" color="red.500">
                                    <CloseIcon boxSize="50px"/>
                                </Box>
                            )}
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Flex>
        </motion.div>
    );
};

export default SelectPlayer;
