import React from "react";
// Chakra imports
import { Box, Spinner } from "@chakra-ui/react";

function index() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spinner
        thickness="3px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="md"
      />
    </Box>
  );
}

export default index;
