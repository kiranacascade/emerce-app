import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Button, FormControl, FormLabel, FormErrorMessage, Modal, ModalBody, ModalCloseButton, ModalOverlay, ModalContent, ModalHeader, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoggedIn } from "../../features/userSlice";




function Register() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const registerSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, "Name must be 2 characters at minimum")
            .required("Name is required"),
        email: Yup.string()
            .email("Invalid email address format")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be 6 characters at minimum") 
            .matches(/[a-z]/, "Password must contain at least lowercase") 
            .matches(/[A-Z]/, "Password must contain at least 1 uppercase") 
            .matches(/[0-9]/, "Password must contain at least 1 number") 
            .matches(/[!@#$%&?*]/, "Password must contain at least 1 symbol") 
    })

    return (
            
            <Formik
            initialValues={{name:"", imageURL:"https://cf.shopee.co.id/file/3eebac2a8c1f1b1956498ee0d74d7adf", price:""}}
            validationSchema={registerSchema}
            onSubmit={(values) => {
                // console.log(values);
                axios.post("http://localhost:2000/users", values)
                    .then((response) => {
                        console.log(response.data)
                        dispatch(setLoggedIn({
                            status: "success",
                            data: response.data
                          }));
                        navigate('/emerce-app')
                        alert("You have successfully registered and logged in")
                    })
                    .catch((err) => {
                        console.error(err)
                    })
            }}
            >
                {(props) => {
                    console.log(props)
                    return (

                    <>
                        <Button colorScheme={'green'} onClick={onOpen}>Daftar</Button>

                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                            <ModalHeader>Daftar Sekarang</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody mb='5'>
                            <Form>
                                <Field name='name' validate={registerSchema}>
                                    {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.name && form.touched.name} mb='5'>
                                        <FormLabel>Name</FormLabel>
                                        <Input {...field} placeholder='Insert your name here'/>
                                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                    </FormControl>
                                    )}
                                </Field>

                                <Field name='email' validate={registerSchema}>
                                    {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.email && form.touched.email} mb='5'>
                                        <FormLabel>Email</FormLabel>
                                        <Input type={'email'} {...field} placeholder='Insert your email here' />
                                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                    </FormControl>
                                    )}
                                </Field>

                                <Field name='password' validate={registerSchema}>
                                    {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.password && form.touched.password} mb='5'>
                                        <FormLabel>Password</FormLabel>
                                        <Input type={'password'} {...field} placeholder='Type your password here' />
                                        <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                    </FormControl>
                                    )}
                                </Field>

                                <Button
                                    mt={4}
                                    colorScheme='green'
                                    type='submit'  
                                >
                                    Daftar
                                </Button>
                            </Form>
                            </ModalBody>

                            </ModalContent>
                        </Modal>
                        </>                          
                    )
                }}
            </Formik>
    )
}

export default Register;