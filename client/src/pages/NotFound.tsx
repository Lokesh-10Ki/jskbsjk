import { Heading } from "@chakra-ui/react";
import React from "react";

export function NotFound() {
  return (
    <Heading
      as="h1"
      fontSize={{ base: "2xl", sm: "4xl" }}
      fontWeight="bold"
      my={6}
      color="gray.900"
      textAlign="center"
    >
      404: Page not found
    </Heading>
  );
}
