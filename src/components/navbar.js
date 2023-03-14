import { 
    Box, Flex, Image, InputGroup, InputLeftElement, Input, HStack, IconButton, Avatar, Popover, PopoverBody, Button, PopoverHeader,PopoverTrigger, Portal, PopoverContent, PopoverArrow, Text, Spacer,  Heading, Stack, Divider
} from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons';
import { Link } from "react-router-dom";
import { FaCartPlus, FaStore, FaStoreAltSlash } from "react-icons/fa";
import { useSelector } from "react-redux";


function Navbar() {
    const items = {
        imageURL : "https://www.freepnglogos.com/uploads/logo-tokopedia-png/tokopedia-oralgen-nupearl-advanced-teeth-whitening-system-with-11.png"
    }

    const productList = useSelector((state) => state.product);

    const miniCart = productList.map((product) => {
        return (
            <>
                <HStack my='10px' justify={'space-between'}>
                    <HStack>
                        <Image
                        objectFit='cover'
                        maxW={{ base: '100%', sm: '50px' }}
                        src={product.imageURL}
                        alt={product.name}
                        />
                        <Stack spacing='0'>
                            <Text as='b' fontSize={'sm'}>{product.name}</Text>
                            <Text fontSize={'xs'}>{product.qty} Barang</Text>
                        </Stack>
                    </HStack>
                    <Text as='b' color='green' fontSize='sm'
                    >{product.price.toLocaleString("id-ID", {style:"currency", currency:"IDR"})}</Text>     
                </HStack>
                <Divider />
            </>
        )
    })

    return (
        <Box pos='sticky' top='0' w='100%' bg='white' zIndex={2} boxShadow={'base'}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'} p={10}>
                <Link to='/'>
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
                <Popover >
                    <PopoverTrigger >
                        <IconButton colorScheme={'green'} variant='outline' aria-label='Open Cart' icon={<FaCartPlus />} />
                    </PopoverTrigger>
                    <Portal >
                        <PopoverContent >
                        <PopoverArrow />
                        <PopoverHeader>
                            <HStack>
                                <Heading as='h6' size='sm'>Keranjang ({productList.length})</Heading>
                                <Spacer />
                                <Link to='/cart'>
                                    <Button colorScheme='green' variant='link'>
                                        Lihat semua
                                    </Button>
                                </Link>
                            </HStack> 
                        </PopoverHeader>

                        <PopoverBody pt='0'>
                            
                            {miniCart}
                            
                        </PopoverBody>
                        </PopoverContent>
                    </Portal>
                </Popover>
                    <Link to='/toko'>
                        <Button leftIcon={<FaStore/>} colorScheme={'green'} variant='outline'>
                            Toko
                        </Button>
                    </Link>
                    <Avatar size={'sm'} src='https://bit.ly/broken-link' />
                </HStack>
            </Flex>
        </Box>
    )
}

export default Navbar;