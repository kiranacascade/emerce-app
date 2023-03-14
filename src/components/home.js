import axios from "axios";
import { Box, Image, VStack, Button, CardBody, Stack, Heading, Text, Card, Wrap
 } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
// import { products } from "./Cart/products";
import { addProduct } from "../features/productSlice";
import { useState, useEffect} from "react";
import productList from "./products.json";



function Home() {
    // const axios = require('axios')

    // axios.get("http://localhost:2000/products")
    // .then((response) => {
    //     console.log(response)
    // })
    // .catch((err) => {
    //     console.error(err);
    // })

    const dispatch = useDispatch();

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:2000/products")
        .then(res => {
            console.log(res.data);
            setProducts(res.data);
        })
        .catch(err => {
            console.error(err)
            setProducts(productList.products);
        })
    }, [])

    console.log(products)

    const homeComponent = {
        imageURL: "https://images.tokopedia.net/img/cache/1208/NsjrJu/2023/3/11/52323936-825a-421d-93ff-ca0fb92d04cf.jpg.webp?ect=4g"
    };

    const productsCard = products.map((product) => {
        return (
            <Card pos={'static'} maxW='xs'>
                <CardBody mb={0}>
                    <Image src={product.imageURL} borderRadius='lg'/>
                    <Stack mt='6' spacing='3'>
                        <Heading size='md'>{product.name}</Heading>
                        <Text as={'b'} color='green' fontSize='lg'>
                            {product.price.toLocaleString("id-ID", {style:"currency", currency:"IDR"})}
                        </Text>
                        <Button onClick={() => dispatch(addProduct(product))} variant='solid' colorScheme='green' pos={'static'}>
                        Beli
                        </Button>
                    </Stack>
                </CardBody>
            </Card>
        )
    })

    return(
        <Box justifyContent={'center'} >
            <VStack alignItems={'center'} align={'center'} spacing={5} p='30px'>
                
                <Box maxW={'1080px'}>
                    <Image  src={homeComponent.imageURL} borderRadius={6}></Image>
                </Box>
                <Wrap justify={'center'} spacing='6'>
                    {productsCard}
                </Wrap>
                
            </VStack>
        </Box>
    )
}

export default Home;