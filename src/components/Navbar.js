import { ReactNode, useEffect } from 'react';
import { logoutUser, getInitialize } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';

import { HamburgerIcon, CloseIcon, ArrowForwardIcon, SmallAddIcon, } from '@chakra-ui/icons';







const NavLink = ({ children }: { children: ReactNode }) => (
  <Link

    href={'#'}>
    {children}
  </Link>
);

export default function Simple() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLogin, currentUser } = useSelector((state) => state.user);

  const notify = () => toast.success("Sesión finalizada");
  const dispatch = useDispatch();

  const gotoHome = () => {
    navigate('/')
  }

  const gotoDashboard = () => {
    navigate('/dashboard')
  }
  const loginUser = () => {
    navigate('/login')
  }

  const createUser = () => {
    navigate('/register')
  }

  const GotoProfile = () => {
    navigate('/profile')
  }

  const logoutUserBtn = () => {
    notify();
    dispatch(logoutUser());
  }

  
  useEffect( () => {
    if (!currentUser?.user?.email){
      dispatch(getInitialize());
    }
  }, [dispatch,])


  return (
    <>
      <Box bg={useColorModeValue('white.100', 'white.900')} px={6} pt={14} pb={4}  >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>
            <Link>
            <Image  px={2} pb={10} onClick={gotoHome} src="/assets/image/logo2.png" _hover="{}"/>
            </Link>
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
             
                <NavLink > 
<Link href='/estudios'color="blue.800" fontSize='17px' px={2} py={1} rounded={'md'}_hover={{textDecoration: 'none',
      bg: useColorModeValue('blue.100', 'blue.700'), }} >Estudios</Link>
<Link href='/about_us'color="blue.800" fontSize='17px'  px={2} py={1} rounded={'md'}_hover={{textDecoration: 'none',
      bg: useColorModeValue('blue.100', 'blue.700'),}}> Acerca de Nosotros </Link>



                   </NavLink>
            </HStack>


          </HStack>
          <Flex alignItems={'center'}>
            {!isLogin &&
            <Stack direction='row' spacing={4}>
            <Button colorScheme='teal' size='sm' onClick={loginUser}>  Iniciar Sesión <ArrowForwardIcon/> </Button>
            <Button colorScheme='teal' size='sm' variant='outline' onClick={createUser}>  Crear cuenta <SmallAddIcon/></Button>
            </Stack>
            }
            {(isLogin && currentUser) &&
            <Menu>
              <Box mr={"30px"} color="blue.900"> {currentUser?.user?.username} </Box>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0} 
                pb={7}>
                <Avatar
                  size={'md'}
                  src={
                    'http://localhost:8000/media/'+currentUser?.image_profile}
                />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={gotoDashboard}>Dashboard</MenuItem>
                <MenuDivider />
                <MenuItem onClick={GotoProfile}>Ir a perfil</MenuItem>
                
                <MenuItem onClick={logoutUserBtn}>Cerrar sesión</MenuItem>
              </MenuList>
            </Menu>
            }
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
            <Link href='https://localhost:3000/estudios'color="blue.800" fontSize='17px' px={2} py={1} rounded={'md'}> Estudios</Link>
<Link href='https://localhost:3000/about_us'color="blue.800" fontSize='17px'  px={2} py={1} rounded={'md'}> Acerca de Nosotros </Link>
            </Stack>
          </Box>
        ) : null}
      </Box>

    </>
  );
}