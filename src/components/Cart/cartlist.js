// import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Divider, Heading, Card, Image, Stack, CardBody, CardFooter,  IconButton, Center
 } from "@chakra-ui/react";
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../../features/productSlice";

function CartItemsList() {

    const productList = useSelector((state) => state.product);
    const dispatch = useDispatch();

    // console.log(productList)

    const addedProduct = productList.map((product) => {
        return (
            <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            pos={'static'}
            mb='20px'
            >
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '185px' }}
                src={product.imageURL}
                alt={product.name}
            />

            <Stack>
                <CardBody>
                    <Heading size='md'>{product.name}</Heading>
                    <Heading size='sm' py={2} color={'green'}>{product.price.toLocaleString("id-ID", {style:"currency", currency:"IDR"})}</Heading>
                </CardBody>

                <CardFooter >
                    <IconButton onClick={() => dispatch(decrement(product))} bg='Background' color={'green'} icon={<FaMinusCircle/>} pos={'static'}/>
                    <Center p={2}>{product.qty}</Center>
                    <IconButton onClick={() => dispatch(increment(product))} bg='Background' color={'green'} icon={<FaPlusCircle/>} pos={'static'}/>
                    
                </CardFooter>
            </Stack>
            </Card>
        )
    })

    return (
        <Box minW='600px' minH='-webkit-fit-content' p='6' rounded='md' bg='white'>

            <Heading as='h3' size='lg'>
                Keranjang
            </Heading>
            <Divider mt='6' mb='6'/>

            {addedProduct}

        </Box>
    )
}

export default CartItemsList;