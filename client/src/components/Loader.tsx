import { Flex, Spinner } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Flex w="100%" minH="100vh" justify="center" align="center">
      <Spinner color="red" size="lg" />
    </Flex>
  );
};

export default Loader;
