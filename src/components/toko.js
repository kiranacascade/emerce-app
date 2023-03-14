import React from "react";
import { Button, FormErrorMessage, FormControl, FormLabel, Input, Container, Heading, NumberInputField, NumberInput } from "@chakra-ui/react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup"

function Toko() {

    const addProductSchema = Yup.object().shape({
        name: Yup.string()
            .min(4, "Product name must be 4 characters at minimum")
            .required("Product name is required"),
        imageURL: Yup.string()
            .url("Input must be a URL")
            .required("Product image URL is required"),
        price: Yup.number()
            .integer("Price must be a number")
            .positive("Price must be a positive number")
            .required("Price is required")
    });

    return (
        <Container centerContent mt='10'>
            <Heading as='h3' size='lg'> Add New Product </Heading>
            <Formik
            initialValues={{name:"", imageURL:"https://cf.shopee.co.id/file/3eebac2a8c1f1b1956498ee0d74d7adf", price:""}}
            validationSchema={addProductSchema}
            onSubmit={(values) => {
                console.log(values);
                axios.post("http://localhost:2000/products", values)
                    .then((response) => {
                        console.log(response.data)
                    })
                    .catch((err) => {
                        console.error(err)
                    })

            }}
            >
                {(props) => {
                    console.log(props)
                    return (
                        <Container maxW={'lg'} m='5' p='5' borderWidth='1px' borderRadius='lg'>
                            <Form>
                                <Field name='name' validate={addProductSchema}>
                                    {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.name && form.touched.name} mb='5'>
                                        <FormLabel>Product Name</FormLabel>
                                        <Input {...field} placeholder='Insert product name here'/>
                                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                    </FormControl>
                                    )}
                                </Field>

                                <Field name='imageURL' validate={addProductSchema}>
                                    {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.imageURL && form.touched.imageURL} mb='5'>
                                        <FormLabel>Image URL</FormLabel>
                                        <Input {...field} placeholder='Insert image URL here' />
                                        <FormErrorMessage>{form.errors.imageURL}</FormErrorMessage>
                                    </FormControl>
                                    )}
                                </Field>

                                <Field type='number' name='price' validate={addProductSchema}>
                                    {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.price && form.touched.price} mb='5'>
                                        <FormLabel>Product Price</FormLabel>
                                        <Input type={'number'} {...field} placeholder='Insert product price here' />
                                        <FormErrorMessage>{form.errors.price}</FormErrorMessage>
                                    </FormControl>
                                    )}
                                </Field>
                                <Button
                                    mt={4}
                                    colorScheme='green'
                                    type='submit'
                                >
                                    Submit
                                </Button>
                            </Form>
                        </Container>
                        
                    )
                }}
            </Formik>
        </Container>
    )
}

export default Toko;