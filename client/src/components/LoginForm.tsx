import { FaGithub, FaGoogle } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import {
  Flex,
  Button,
  Divider,
  Input,
  Text,
  useToast,
  HStack,
} from "@chakra-ui/react";
import axios from "axios";

interface LoginFormProps {
  onRegisterClick: React.MouseEventHandler<HTMLButtonElement>;
}

export function LoginForm({ onRegisterClick }: LoginFormProps) {
  const [data, setData] = useState({ email: "", password: "" });
  const toast = useToast();
  const emailInputRef = useRef<HTMLInputElement>(null);
  
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Focus on the email input when the component mounts
    emailInputRef.current!.focus();
  }, []);

  


  const handleLogin = async () => {
    console.log("....");
    if (!data.email.trim() || !data.password.trim()) {
      console.log("got in");
      // Show a toast message if either email or password is empty
      toast({
        title: "Email and password are required",
        status: "error",
        duration: 3000, // duration in milliseconds
        isClosable: true,
      });
    } else {
      console.log("-----")
      // Perform your login logic
      setLoading(true);
    setError(null);

    try {
      // Define the API endpoint URL
      const apiUrl = 'http://localhost:3000/signin';
      const username = data.email;
      console.log(username);
      // Make a POST request to the API with the username
      const response = await axios.post(apiUrl, { "username":username });
      console.log(response);
      if (response.data.status === true) {
        // If successful, set the user details in the state
        setUserDetails(response.data.user);
        console.log(response.data.status);
        window.location.href = `/home?email=${encodeURIComponent(data.email)}`;
        console.log(userDetails);
      } else {
        setError('User not found.');
      }

      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred');
      setLoading(false);
    }
      
    }
  };
  const handleChange = ({
    currentTarget: input,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [input.name]: input.value });
    console.log(data);
  };
  return (
    <Flex
      bgColor="whiteAlpha"
      h="650px"
      flexDirection="column"
      align="center"
      justify="center"
      pl="30px"
      pr="20px"
      borderRadius="5px"
      //boxShadow="0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);"
    >
      <Text fontSize="30px" fontWeight="medium" mb="25px">
        Sign in to Your Account
      </Text>
      <Button
        type="submit"
        width="350px"
        height="40px"
        fontSize="15px"
        mb="10px"
        variant="outline"
        leftIcon={<FaGoogle />}
        color="gray.500"
        _hover={{
          bgGradient: "linear(to-r, #FBDCF7, #F0E0FD)",
        }}
      >
        Sign in with Google
      </Button>
      <Button
        type="submit"
        width="350px"
        height="40px"
        mt="10px"
        fontSize="15px"
        variant="outline"
        color="gray.500"
        leftIcon={<FaGithub />}
        _hover={{
          bgGradient: "linear(to-r, #FBDCF7, #F0E0FD)",
        }}
      >
        Sign in with Github
      </Button>
      <Flex align="center" justify="center" width="350px" mt="17px" mb="13px">
        <Divider borderColor="gray.300" />
        <Text fontSize="14px" color="gray.500" ml="8px" mr="8px">
          Or
        </Text>
        <Divider borderColor="gray.300" />
      </Flex>
      <Text color="gray.600" alignSelf="flex-start" mb="15px">
        Enter your email and password to get started
      </Text>
      <Text color="gray.600" alignSelf="flex-start">
        Email or username
      </Text>

      <Input
        placeholder="Your email address or username"
        name="email"
        ref={emailInputRef}
        _placeholder={{ opacity: 1, color: "gray.300" }}
        onChange={handleChange}
        value={data.email}
        required
        variant="outline"
        width="350px"
        height="40px"
        borderRadius="5px"
        focusBorderColor="gray.100"
        mt="5px"
        mb="10px"
        fontSize="15px"
      />
      <Text color="gray.600" alignSelf="flex-start" left="0">
        Password
      </Text>
      <Input
        type="password"
        placeholder="Your password"
        _placeholder={{ opacity: 1, color: "gray.300" }}
        name="password"
        onChange={handleChange}
        value={data.password}
        required
        variant="outline"
        width="350px"
        borderRadius="5px"
        focusBorderColor="gray.100"
        mt="5px"
        fontSize="15px"
        mb="20px"
      />
      <Button
        type="submit"
        onClick={handleLogin}
        width="350px"
        height="40px"
        margin="5px"
        fontSize="15px"
        bgColor="#A449F2"
        variant="solid"
        color="white"
        mb="25px"
        _hover={{ bgGradient: "linear(to-r, #D72ABF, #a648f6)" }}
      >
        Sign In
      </Button>
      <Divider borderColor="gray.300" mb="17px" ml="10px" mr="10px" />
      <HStack>
        <Text mb="10px">Lost your password?</Text>
        <Button
          type="submit"
          fontSize="15px"
          bgGradient="linear(to-l, #A449F2, #A449F2)"
          bgClip="text"
          variant="link"
          mb="10px"
          color="#A449F2"
          _hover={{
            bgGradient: "linear-gradient(to right, #D72ABF, #a648f6)",
            bgClip: "text",
            color: "transparent",
            textDecoration: "underline",
          }}
        >
          Reset here
        </Button>
      </HStack>
      <HStack>
        <Text>Don't have an account?</Text>
        <Button
          type="submit"
          onClick={onRegisterClick}
          fontSize="15px"
          variant="link"
          bgGradient="linear(to-l, #A449F2, #A449F2)"
          bgClip="text"
          color="#A449F2"
          _hover={{
            background: "linear-gradient(to right, #D72ABF, #a648f6)",
            backgroundClip: "text",
            color: "transparent",
            textDecoration: "underline",
          }}
        >
          Register here
        </Button>
      </HStack>
    </Flex>
  );
}
