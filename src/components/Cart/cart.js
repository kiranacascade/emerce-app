import { Box, HStack } from "@chakra-ui/react";
import CartItemsList from "./cartlist";
import ShoppingSummary from "./summary";


function Cart() {
    return (
        <Box >
            <HStack justifyContent='center' spacing='20px' p='30px' align={'top'}>
                
                <CartItemsList />
                <ShoppingSummary />
                
            </HStack>
        </Box>
    )
}

export default Cart;