import React from 'react';
import { Button, Box, Grid, GridItem } from "@chakra-ui/react";

const ExampleComponent = ({ handleAddButton }) => {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Grid templateColumns="repeat(auto-fit, minmax(240px, 1fr))" gap={4}>
        <GridItem>
          <Button
            h="44px"
            mb="10px"
            variant="solid"
            colorScheme="blue"
            onClick={handleAddButton}
          >
            Solid Button
          </Button>
        </GridItem>

        <GridItem>
          <Button
            h="44px"
            mb="10px"
            variant="outline"
            onClick={handleAddButton}
          >
            Outline Button
          </Button>
        </GridItem>

        <GridItem>
          <Button
            h="44px"
            mb="10px"
            variant="brand"
            onClick={handleAddButton}
          >
            Brand Button
          </Button>
        </GridItem>

        <GridItem>
          <Button
            h="44px"
            mb="10px"
            variant="darkBrand"
            onClick={handleAddButton}
          >
            Dark Brand Button
          </Button>
        </GridItem>

        <GridItem>
          <Button
            h="44px"
            mb="10px"
            variant="lightBrand"
            onClick={handleAddButton}
          >
            Light Brand Button
          </Button>
        </GridItem>

        <GridItem>
          <Button
            h="44px"
            mb="10px"
            variant="light"
            onClick={handleAddButton}
          >
            Light Button
          </Button>
        </GridItem>

        <GridItem>
          <Button
            h="44px"
            mb="10px"
            variant="action"
            onClick={handleAddButton}
          >
            Action Button
          </Button>
        </GridItem>

        <GridItem>
          <Button
            h="44px"
            mb="10px"
            variant="setup"
            onClick={handleAddButton}
          >
            Setup Button
          </Button>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default ExampleComponent;
