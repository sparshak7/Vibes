import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link} from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "../types/authSchema";
import mainBG from "../assets/main_bg.jpg"

const Login = () => {
  type FormType = z.infer<typeof signInSchema>;
  const [show, setShow] = useState(false);

  const {
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormType>({ resolver: zodResolver(signInSchema) });

 
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setShow(!show);
  };

  return (
    <Box
      w="100%"
      minH="100vh"
    >
      <Grid templateColumns={{ base: "repeat(1fr)", md: "repeat(2, 1fr)" }}>
        <GridItem>
          <Container
            maxW="container.xl"
            bg="#333"
          >
            <Flex
              justify="center"
              align="center"
              direction="column"
              minH="100vh"
              gap="4"
            >
              <Heading color='#fff' fontFamily='Inter' letterSpacing='1px'>
                Login
              </Heading>
              <form>
                <Flex
                  direction="column"
                  gap="6"
                  color="#fff"
                  fontFamily="Inter"
                >
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                      autoComplete="off"
                      id="email"
                      size="lg"
                      placeholder="Enter email"
                      {...register("email")}
                    />
                    <FormHelperText color="yellow.200" fontSize="sm">
                      {errors.email && `${errors.email.message}`}
                    </FormHelperText>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={show ? "text" : "password"}
                        placeholder="Enter password"
                        id="password"
                        size="lg"
                        {...register("password")}
                      />
                      <InputRightElement>
                        <Box as="button" onClick={handleClick}>
                          {!show ? <ViewOffIcon /> : <ViewIcon />}
                        </Box>
                      </InputRightElement>
                    </InputGroup>
                    <FormHelperText color="yellow.200" fontSize="sm">
                      {errors.password && `${errors.password.message}`}
                    </FormHelperText>
                  </FormControl>
                  <Button
                    colorScheme="gray"
                    type="submit"
                    mt="2"
                    isLoading={isSubmitting}
                  >
                    Login
                  </Button>
                </Flex>
              </form>
              {/* <Button
            colorScheme="red"
            mt="2"
            leftIcon={<FaGoogle />}
          >
            Continue with Google
          </Button> */}
              <Flex color="#fff" gap="1">
                <Text fontFamily="Inter">Don't have an account?</Text>
                <Link to="/register">
                  <Text color="red" fontWeight="bold" fontFamily="Inter">
                    Register.
                  </Text>
                </Link>
              </Flex>
            </Flex>
          </Container>
        </GridItem>
        <GridItem>
          <Box
            background={`linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${mainBG})`}
            bgRepeat="no-repeat"
            bgSize="cover"
            bgPosition="center"
            w="100%"
            minH="100vh"
          />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Login;
