import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Button, FormControl, FormLabel, FormErrorMessage, Center, Modal, ModalBody, ModalCloseButton, ModalOverlay, ModalContent, ModalHeader, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoggedIn } from "../../features/userSlice";

function Login() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const loginData = useSelector((state) => state.user);

    const loginSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email address format")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be 6 characters at minimum") 
            .matches(/[a-z]/, "Password must contain at least lowercase") 
            .matches(/[A-Z]/, "Password must contain at least 1 uppercase") 
            .matches(/[0-9]/, "Password must contain at least 1 number") 
            .matches(/[!@#$%&?*]/, "Password must contain at least 1 symbol")
            .required("Please fill in password")
    })

    return (            
            <Formik
            initialValues={{name:"", imageURL:"https://cf.shopee.co.id/file/3eebac2a8c1f1b1956498ee0d74d7adf", price:""}}
            validationSchema={loginSchema}
            onSubmit={(values) => {
                // console.log(values);
                const email = values.email;
                const password = values.password;
                axios.get(`http://localhost:2000/users?email=${email}&password=${password}`)
                    .then((response) => {
                        // console.log(response.data)
                        // jika response data ada isinya
                        if (response.data.length) {
                            dispatch(setLoggedIn({
                                status: "success",
                                data: response.data[0]
                            }));
                            navigate('/emerce-app')
                            alert("You have successfully logged in")
                        } else {
                            console.log("wrong email or password");
                            dispatch(setLoggedIn({
                                status: "fail",
                                data: null
                            }));
                            alert("Wrong email or password")
                        }
                        
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
                        <Button colorScheme={'green'} variant={'outline'} onClick={onOpen}>Masuk</Button>

                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                            <ModalHeader>Masuk ke Akun</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody mb='5'>
                            <Form>
                                <Field name='email' validate={loginSchema}>
                                    {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.email && form.touched.email} mb='5'>
                                        <FormLabel>Email</FormLabel>
                                        <Input type={'email'} {...field} placeholder='Enter email address' />
                                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                    </FormControl>
                                    )}
                                </Field>

                                <Field name='password' validate={loginSchema}>
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
                                    Masuk
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

export default Login;