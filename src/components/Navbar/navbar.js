import { 
    Box, Flex, Image, InputGroup, InputLeftElement, Input, HStack, Avatar, Button
} from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons';
import { Link } from "react-router-dom";
import { FaStore } from "react-icons/fa";
import { useSelector } from "react-redux";
import CartButton from "../Cart/cartbutton";
import Login from "./login";
import Register from "./register";


function Navbar() {
    const items = {
        imageURL : "https://www.freepnglogos.com/uploads/logo-tokopedia-png/tokopedia-oralgen-nupearl-advanced-teeth-whitening-system-with-11.png"
    }

    const productList = useSelector((state) => state.product);

    const loginData = useSelector((state) => state.user);

    const loginButton = () => {
        if (loginData.status !== 'success') {
            return (
                <Login />
            )
        }
    }

    const registerButton = () => {
        if (loginData.status !== 'success') {
            return (
                <Register />
            )
        }
    }

    const cartButton = () => {
        if (loginData.status === 'success') {
            return (
                <CartButton productList={productList} />
            )
        }
    }

    const storeButton = () => {
        if (loginData.status === 'success') {
            return (
                <Link to='/emerce-app/toko'>
                        <Button leftIcon={<FaStore/>} colorScheme={'green'} variant='outline'>
                            Toko
                        </Button>
                </Link>
            )
        }
    }

    return (
        <Box pos='sticky' top='0' w='100%' bg='white' zIndex={2} boxShadow={'base'}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'} p={10}>
                <Link to='/emerce-app/'>
                    <Image  src={items.imageURL} maxH={8}></Image>
                </Link>
                
                <InputGroup maxW={'500px'}>
                    <InputLeftElement
                    pointerEvents='none'
                    children={<SearchIcon color='gray.300' />}
                    />
                    <Input type='tel' placeholder='Cari barang disini' />
                </InputGroup>

                <HStack spacing={6}>
                    {loginButton()}
                    {registerButton()}
                    {cartButton()}
                    {storeButton()}
                    
                    {/* <Avatar size={'sm'} src='https://bit.ly/broken-link' /> */}
                </HStack>
            </Flex>
        </Box>
    )
}

export default Navbar;