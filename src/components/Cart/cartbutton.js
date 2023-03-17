import { 
    Image,HStack, IconButton, Popover, PopoverBody, Button, PopoverHeader,PopoverTrigger, Portal, PopoverContent, PopoverArrow, Text, Spacer,  Heading, Stack, Divider
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";



function CartButton(props) {

    const miniCart = props.productList.map((product) => {
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
        <Popover >
            <PopoverTrigger >
                <IconButton colorScheme={'green'} variant='outline' aria-label='Open Cart' icon={<FaCartPlus />} />
            </PopoverTrigger>
            <Portal >
                <PopoverContent >
                <PopoverArrow />
                <PopoverHeader>
                    <HStack>
                        <Heading as='h6' size='sm'>Keranjang ({props.productList.length})</Heading>
                        <Spacer />
                        <Link to='/emerce-app/cart'>
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
    )
}

export default CartButton;