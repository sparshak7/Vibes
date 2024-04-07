import {
  Avatar,
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
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { EditIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../types/authSchema";
import mainBG from "../assets/main_bg.jpg";
import {IoCameraOutline} from "react-icons/io5"
import {useFileHandler} from "6pp"

const Register = () => {
  type FormType = z.infer<typeof signUpSchema>;
  const [show, setShow] = useState(false);

  const {
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormType>({
    resolver: zodResolver(signUpSchema),
  });

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setShow(!show);
  };

  const avatar = useFileHandler("single");

  return (
    <Box w="100%" minH="100vh">
      <Grid templateColumns={{ base: "repeat(1fr)", md: "repeat(2, 1fr)" }}>
        <GridItem>
          <Container maxW="container.xl" bg="#333">
            <Flex
              justify="center"
              align="center"
              direction="column"
              minH="100vh"
              gap="6"
            >
              <Heading color="#fff" fontFamily="Inter" letterSpacing="1px">
                Register
              </Heading>
              <Avatar
                size="xl"
                position="relative"
                src={avatar?.preview ? avatar.preview : ""}
                _hover={{
                  "& .icon": {
                    opacity: 1,
                    cursor: "pointer",
                  },
                }}
              >
                <label htmlFor="avatar-upload">
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={avatar.changeHandler}
                  />
                  <Box
                    className="icon"
                    position="absolute"
                    top="0"
                    left="0"
                    bg="linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7))"
                    w="100%"
                    h="100%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    borderRadius="50%"
                    opacity={{ base: 1, md: 0 }}
                    transition="opacity 0.3s ease"
                  >
                    {avatar?.preview ? (
                      <EditIcon fontSize='24px' />
                    ) : (
                      <IoCameraOutline style={{ color: "#fff" }} />
                    )}
                  </Box>
                </label>
              </Avatar>
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
                  <FormControl>
                    <FormLabel>Confirm Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={show ? "text" : "password"}
                        placeholder="Enter password again"
                        id="password"
                        size="lg"
                        {...register("confirmPassword")}
                      />
                    </InputGroup>
                    <FormHelperText color="yellow.200" fontSize="sm">
                      {errors.confirmPassword &&
                        `${errors.confirmPassword.message}`}
                    </FormHelperText>
                  </FormControl>
                  <Button
                    colorScheme="gray"
                    type="submit"
                    mt="2"
                    isLoading={isSubmitting}
                  >
                    Register
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
                <Text fontFamily="Inter">Already have an account?</Text>
                <Link to="/login">
                  <Text color="red" fontWeight="bold" fontFamily="Inter">
                    Login.
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

export default Register;
