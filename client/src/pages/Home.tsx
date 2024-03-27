import {
  Flex,
  Spacer,
  Button,
  Text,
  Box,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
  Grid,
  GridItem,
  ModalHeader,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';


interface Message {
  role: string;
  text: string;
}

export function Home() {
  const location = useLocation();
  const userEmail = new URLSearchParams(location.search).get("email");
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    address: "",
    profession: "",
  });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  // State for the modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Function to handle changes in user details
  const handleDetailChange = (field: string, value: string) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
    console.log(userDetails);
  };

  // Function to handle saving the changes to the backend (you can implement your logic here)
  const saveChanges = () => {
    // Assuming you have an API to save user details
    // Call the API with userDetails
    // Example:
    // api.saveUserDetails(userDetails)
    //   .then(response => {
    //     console.log("Details saved successfully", response);
    //   })
    //   .catch(error => {
    //     console.error("Error saving details", error);
    //   });
    onClose(); // Close the modal after saving changes
  };

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');


  const handleSendMessage = async () => {
    const userMessage: Message = { role: 'user', text: inputText };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const apiUrl = `http://localhost:3000/ask/${userEmail}`;
      const response = await axios.post(apiUrl, { "messages":messages });
      const botMessage: Message = { role: 'bot', text: response.data.response };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error fetching GPT response:', error);
    }

    setInputText('');
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const apiUrl = `http://localhost:3000/ask/${userEmail}`;
      const response = await axios.post(apiUrl, { messages });
      setResponse(response.data.response);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };
  
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
          <Button onClick={onOpen} borderRadius="100px" h="40px" w="50px">
            <Image
              src="/user.png"
              alt="Button Icon"
              width="30px"
              height="30px"
              objectFit="cover"
            />
          </Button>
        </Flex>
      </Flex>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
              <Text textAlign='center' fontSize="30px" fontWeight="medium" mb="15px" mt='15px'>
                User Details
              </Text>
              <Text textAlign='center' fontSize="20PX" fontWeight="medium" mb="15px">
                Email Or Username : {userEmail}
              </Text>
            
            {/* Display user details and allow editing */}
            <Box
              display="flex"
              alignContent="center"
              justifyContent="center"
            >
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <GridItem>
                  <Text color="gray.600" alignSelf="flex-start">
                    First Name
                  </Text>
                </GridItem>
                <GridItem>
                  <Input
                    value={userDetails.firstName}
                    onChange={(e) =>
                      handleDetailChange("firstName", e.target.value)
                    }
                    placeholder="First Name"
                  />
                </GridItem>
                <GridItem>
                  <Text color="gray.600" alignSelf="flex-start">
                    Last Name
                  </Text>
                </GridItem>
                <GridItem>
                  <Input
                    value={userDetails.lastName}
                    onChange={(e) =>
                      handleDetailChange("lastName", e.target.value)
                    }
                    placeholder="Last Name"
                  />
                </GridItem>
                <GridItem>
                  <Text color="gray.600" alignSelf="flex-start">
                    Age
                  </Text>
                </GridItem>
                <GridItem>
                  <Input
                    value={userDetails.age}
                    onChange={(e) => handleDetailChange("age", e.target.value)}
                    placeholder="Age"
                  />
                </GridItem>
                <GridItem>
                  <Text color="gray.600" alignSelf="flex-start">
                    Gender
                  </Text>
                </GridItem>
                <GridItem>
                  <Input
                    value={userDetails.gender}
                    onChange={(e) =>
                      handleDetailChange("gender", e.target.value)
                    }
                    placeholder="Gender"
                  />
                </GridItem>
                <GridItem>
                  <Text color="gray.600" alignSelf="flex-start">
                    Address
                  </Text>
                </GridItem>
                <GridItem>
                  <Input
                    value={userDetails.address}
                    onChange={(e) =>
                      handleDetailChange("address", e.target.value)
                    }
                    placeholder="Address"
                    w="300px"
                  />
                </GridItem>
                <GridItem>
                  <Text color="gray.600" alignSelf="flex-start">
                    Profession
                  </Text>
                </GridItem>
                <GridItem>
                  <Input
                    value={userDetails.profession}
                    onChange={(e) =>
                      handleDetailChange("profession", e.target.value)
                    }
                    placeholder="Profession"
                  />
                </GridItem>
              </Grid>
            </Box>
          </ModalBody>
          <ModalFooter mb="15px">
            <Button
              type="submit"
              fontSize="15px"
              bgColor="#A449F2"
              variant="solid"
              color="white"
              _hover={{ bgGradient: "linear(to-r, #D72ABF, #a648f6)" }}
              mr={3}
              onClick={saveChanges}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>




    <Box
      maxW="600px"
      mx="auto"
      mt="150px"
      p="20px"
      border="1px solid #ccc"
      borderRadius="8px"
      boxShadow="md"
      bg="#f8f8f8"
    >
      <Flex direction="column" h="300px" overflowY="auto">
        {messages.map((message, index) => (
          <Box
            key={index}
            alignSelf={message.role === 'user' ? 'flex-end' : 'flex-start'}
            bg={message.role === 'user' ? '#A449F2' : '#4CAF50'}
            color="white"
            p="10px"
            borderRadius="8px"
            mb="10px"
            maxW="70%"
          >
            {message.text}
          </Box>
        ))}
      </Flex>
      <Flex mt="10px">
        <Input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type a message..."
          mr="10px"
        />
        <Button colorScheme="purple" onClick={handleSendMessage}>
          Send
        </Button>
      </Flex>
    </Box>

    <Button
        type="submit"
        fontSize="15px"
        bgColor="#A449F2"
        variant="solid"
        color="white"
        _hover={{ bgGradient: "linear(to-r, #D72ABF, #a648f6)" }}
        mt="20px"
        onClick={handleSubmit}
        isLoading={loading}
      >
        Get Response
      </Button>

{/* Display the API response */}
{response && (
  <Modal isOpen={true} onClose={() => setResponse('')}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>API Response</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Text>{response}</Text>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" onClick={() => setResponse('')}>
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
)}
    </Box>
  );
}
