// RegistrationForm.js
import React, { useEffect, useRef, useState } from "react";
import { Flex, Button, Input, Text, useToast } from "@chakra-ui/react";
import axios from "axios";

interface RegistrationFormProps {
  onClose: () => void;
}

export function RegistrationForm({ onClose }: RegistrationFormProps) {
  const [data, setData] = useState({ email: "", password: "" });
  const toast = useToast();

  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");



  const handleRegister = async () => {
    if (!data.email.trim() || !data.password.trim()) {
      // Show a toast message if either email or password is empty
      console.log(!data.email.trim() || !data.password.trim());
      toast({
        title: "Email and password are required",
        status: "error",
        duration: 3000, // duration in milliseconds
        isClosable: true,
      });
    } else {
      // Perform your login logic
      onClose();
      setLoading(true);
    setError("");
    const username = data.email;
    const pass = data.password;
    try {
      // Define the API endpoint URL
      const apiUrl = 'http://localhost:3000/signup';

      // Make a POST request to the API with the username and password
      const response = await axios.post(apiUrl, {
        "username":username,
        "password":pass,
      });

      if (response.status === 201) {
        setMessage('User registered successfully.');
        window.location.href = `/home?email=${encodeURIComponent(data.email)}`;
      } else if (response.status === 409) {
        setError("Username already exists.");
      } else {
        setError('Failed to register user.');
      }

      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred');
      setLoading(false);
    }
      
    }
    // Perform registration logic here
    // You can make an API call or any other logic
    // Close the registration modal after registration
  };

  const handleChange = ({
    currentTarget: input,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [input.name]: input.value });
    console.log(data);
  };

  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus on the email input when the component mounts
    emailInputRef.current!.focus();
  }, []);

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
    >
      <Text fontSize="30px" fontWeight="medium" mb="25px">
        Sign up for an Account
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
        onClick={handleRegister}
        width="350px"
        height="40px"
        margin="5px"
        fontSize="15px"
        bgColor="#A449F2"
        variant="solid"
        color="white"
        mb="25px"
      >
        Register
      </Button>
    </Flex>
  );
}
