import { Box, Button, Divider, Flex, Heading, Spacer, Text } from "@chakra-ui/react"
import { ArrowForwardIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";

function ShoppingSummary() {
    const productList = useSelector((state) => state.product);
    
    const productsPrice = productList.map(el => [el.name, el.price * el.qty]);
    let totalPrice = 0;
    for (let p of productsPrice) {
        totalPrice += p[1];
    }
    let qtyItems = 0;
    for (let product of productList) {
        qtyItems += product.qty;
    }

    return(
        <Box w='-webkit-fit-content' h='-webkit-fit-content' boxShadow='base' p='24px' rounded='md' bg='white' >
            <Button leftIcon={<CheckCircleIcon />} rightIcon={<ArrowForwardIcon />} colorScheme='green' variant='outline' pos={'static'} fontSize={'sm'} w={'252px'}>
                Makin hemat pakai promo 
            </Button>
            <Divider pos={'static'} mb='20px' mt='22px' />

            <Heading as='h5' size='sm'>Ringkasan Belanja</Heading>
            <Flex mt={2} >
                <Text fontSize={'sm'} color={'gray'}>Total Harga ({qtyItems} Barang)</Text>
                <Spacer />
                <Text fontSize={'sm'} color={'gray'}>{totalPrice.toLocaleString("id-ID", {style:"currency", currency:"IDR"})}</Text>
            </Flex>

            <Divider mb='20px' mt='22px' />
            <Flex>
                <Heading as='h5' size='sm'>Total Harga</Heading>
                <Spacer />
                <Heading as='h5' size='sm'>{totalPrice.toLocaleString("id-ID", {style:"currency", currency:"IDR"})}</Heading>
            </Flex>

            <Button w={'252px'} colorScheme='green' variant='solid' pos={'static'} mt='24px'>
                Beli
            </Button>
        </Box>
    )
}

export default ShoppingSummary;