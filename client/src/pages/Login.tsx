/* eslint-disable no-mixed-spaces-and-tabs */
import { useState } from "react";
import {
  Box,
  Button,
  Spacer,
  Flex,
  Text,
  Modal,
  Image,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Center,
  VStack,
} from "@chakra-ui/react";
import { LoginForm } from "../components/LoginForm";

//import axios from 'axios';
import React from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { RegistrationForm } from "../components/RegistrationForm";
//import bg from "../assets/bg.png ";
export function Login() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
    setIsRegistrationModalOpen(false);
  };

  const handleOpenRegistrationModal = () => {
    setIsRegistrationModalOpen(true);
    handleCloseLoginModal(); // Close the login modal when opening registration
  };

  const handleCloseRegistrationModal = () => {
    setIsRegistrationModalOpen(false);
  };

  /*const [isLoggedIn, setIsLoggedIn] = useState(false);*/

  // const handleLogin = async (e: { preventDefault: () => void; }) => {
  // e.preventDefault();

  // try {
  // 	const requestData = {
  // 		email: data.email,
  // 		password: data.password,
  // 		};
  // 	console.log(requestData)
  // 	const response = await axios.post("http://127.0.0.1:5000/login", requestData);

  // 	console.log(response)
  // 	if (response.status === 200) {
  // 	console.log("Login successful");
  // 	window.location.href = "/home";
  // 	} else {
  // 	console.error("Login failed:", response.data.message);
  // 	}
  // } catch (error) {
  // 	console.error("Error occurred:", error);
  // }
  // };

  return (
    <Box>
      {/* Header */}
      <Flex
        as="header"
        align="center"
        justify="space-between"
        padding="20px"
        boxShadow="md"
        position="fixed"
        top="0"
        left="0"
        right="0"
        zIndex="sticky"
        bg="white"
      >
        <Flex style={{ userSelect: "none" }}>
          <Image
            src="/MentorAILogo.png"
            alt="Logo"
            w="40px"
            h="40px"
            mr="10px"
          />
          <Text
            fontSize="30px"
            fontWeight="bold"
            style={{ pointerEvents: "none" }}
            background="linear-gradient(to right, #D72ABF, #a648f6)"
            backgroundClip="text"
            opacity="0.8"
          >
            Mentor AI
          </Text>
        </Flex>
        <Spacer />
        <Flex align="center">
          <Text
            marginRight="10"
            fontWeight="bold"
            color="gray.500"
            _hover={{
              color: "#A449F2",
              cursor: "pointer",
            }}
            onClick={() => (window.location.href = "/")}
          >
            Home
          </Text>
          <Text
            marginRight="10"
            fontWeight="bold"
            color="gray.500"
            _hover={{
              color: "#A449F2",
              cursor: "pointer",
            }}
          >
            About
          </Text>
          <Text
            marginRight="10"
            fontWeight="bold"
            color="gray.500"
            _hover={{
              color: "#A449F2",
              cursor: "pointer",
            }}
          >
            Contact
          </Text>
          <Text
            marginRight="10"
            fontWeight="bold"
            color="gray.500"
            _hover={{
              color: "#A449F2",
              cursor: "pointer",
            }}
          >
            Pricing
          </Text>
          <Button
            bgColor="#A449F2"
            color="white"
            onClick={handleLoginClick}
            _hover={{ bgGradient: "linear(to-r, #D72ABF, #a648f6)" }}
          >
            Login
          </Button>
        </Flex>
      </Flex>

      {/* background wave lines */}
      <Box
        position="fixed"
        top="0"
        left="0"
        pt="50px"
        right="0"
        bottom="0"
        mr="-290px"
        opacity="0.2"
        pointerEvents="none"
        style={{ userSelect: "none" }}
      >
        <Image src="/WaveLine.svg" alt="Background" w="100%" h="100%" />
      </Box>

      {/* front panel */}
      <Box
        maxW="800px"
        mx="auto"
        p="40px"
        boxShadow="lg"
        bg="#FFFFFF"
        borderRadius="10px"
        opacity="0.9"
        mt="120px"
      >
        <Flex
          justify="center"
          align="center"
          flexDirection="column"
          style={{ userSelect: "none" }}
        >
          <Image src="/logo.png" alt="Logo" w="500px" mb="20px" />
          <Box>
            <Text
              textAlign="center"
              fontSize="30px"
              fontWeight="bold"
              mt="5px"
              color="#CC90FF"
              background="linear-gradient(to right, #D72ABF, #a648f6)"
              backgroundClip="text"
            >
              Unlock Your Potential : AI-Powered Mentoring, Personalized for
              You!
            </Text>
            <Text textAlign="center" mt="20px">
              Experience personalized guidance in our revolutionary Generative
              AI Mentoring app. Tailor your profile, explore interests, and
              receive advice that resonates uniquely with you. Navigate
              academia, career, and life with a meaningful connection. Your
              journey to success begins with us.
            </Text>
          </Box>
        </Flex>
      </Box>

      <Center>
        <Button
          bgColor="#A449F2"
          color="white"
          mt="15px"
          onClick={handleLoginClick}
          _hover={{ bgGradient: "linear(to-r, #D72ABF, #a648f6)" }}
          rightIcon={<ArrowForwardIcon />}
        >
          Get Started
        </Button>
      </Center>

      {/* second panel */}
      <Flex
        mx="auto"
        mb="30px"
        w="70%"
        p="40px"
        boxShadow="lg"
        bg="#FFFFFF"
        align="center"
        justify="center"
        borderRadius="10px"
        opacity="0.9"
      >
        <Box w="50%" display="flex" justifyContent="center">
          <Box w="85%">
            <Text
              fontWeight="bold"
              fontSize="29px"
              background="linear-gradient(to right, #D72ABF, #a648f6)"
              backgroundClip="text"
              mb="15px"
            >
              Why use our Mentor AI ?
            </Text>
            <Text mb="10px">
              Discover the transformative impact of Mentor AI, a revolutionary
              tool designed to empower users on their unique journeys. By
              leveraging state-of-the-art AI technology, our platform provides
              personalized guidance, tailored specifically to your profile,
              interests, and aspirations.
            </Text>
            <Text>
              Say goodbye to generic advice - Mentor AI ensures every
              interaction is meaningful, creating a valuable connection between
              your individuality and the insights you receive. Whether
              navigating academia, pursuing a career, or seeking guidance in
              various aspects of life, Mentor AI is your dedicated companion,
              offering a new dimension of tailored support for your personal and
              professional growth."
            </Text>
          </Box>
        </Box>

        <Flex
          justify="center"
          align="center"
          style={{ userSelect: "none" }}
          w="40%"
          background="linear-gradient(to right, #EB89CF, #CC90FF)"
          boxShadow="lg"
          borderRadius="10px"
        >
          <Image src="/model.png" alt="Background" h="400px" />
        </Flex>
      </Flex>

      {/* Footer */}
      <Flex
        as="footer"
        align="center"
        justify="space-between"
        pl="100px"
        pr="100px"
        boxShadow=""
        bottom="0"
        left="0"
        right="0"
        margin="30px"
        bgColor="white"
        opacity="0.9"
        fontWeight="bold"
        color="gray.500"
      >
        <VStack marginRight="4" color="gray.700">
          <Text>© 2023 MentorAI.</Text>
          <Text>All rights reserved.</Text>
        </VStack>
        <VStack marginRight="4">
          <Text
            _hover={{
              color: "#A449F2",
              cursor: "pointer",
            }}
          >
            About
          </Text>
          <Text
            _hover={{
              color: "#A449F2",
              cursor: "pointer",
            }}
          >
            Contact Us
          </Text>
          <Text
            _hover={{
              color: "#A449F2",
              cursor: "pointer",
            }}
          >
            Pricing
          </Text>
        </VStack>
        <VStack>
          <Text
            _hover={{
              color: "#A449F2",
              cursor: "pointer",
            }}
          >
            Sign In
          </Text>
          <Text
            _hover={{
              color: "#A449F2",
              cursor: "pointer",
            }}
          >
            Sign Up
          </Text>
        </VStack>
        <VStack marginRight="4">
          <Text
            _hover={{
              color: "#A449F2",
              cursor: "pointer",
            }}
          >
            FAQ
          </Text>
          <Text
            _hover={{
              color: "#A449F2",
              cursor: "pointer",
            }}
          >
            Privacy Policy
          </Text>
          <Text
            _hover={{
              color: "#A449F2",
              cursor: "pointer",
            }}
          >
            Terms & Conditions
          </Text>
        </VStack>
      </Flex>

      {/* Modal */}
      <Modal
        blockScrollOnMount={false}
        isOpen={isLoginModalOpen || isRegistrationModalOpen}
        onClose={handleCloseModal}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            {isLoginModalOpen && (
              <LoginForm onRegisterClick={handleOpenRegistrationModal} />
            )}
            {isRegistrationModalOpen && (
              <RegistrationForm onClose={handleCloseRegistrationModal} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
