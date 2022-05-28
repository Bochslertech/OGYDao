import { useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import { Center, chakra, Grid, GridItem, Text } from "@chakra-ui/react";

export default function Panel() {
  return (
    <>
      <Grid p={10} templateColumns='repeat(2, 1fr)' gap={6}>
        <chakra.div borderRadius={"0.5rem"} as={GridItem} bg={"purple.50"} minH={"100px"}>
          <chakra.div px={10} mt={2} display={"flex"} flexDirection={"column"} >
            <chakra.div>
              <Text>Principal:</Text>
            </chakra.div>
            <chakra.div>
              <Text>Principal:</Text>
            </chakra.div>
            <chakra.div>
              <Text>Principal:</Text>
            </chakra.div>
          </chakra.div>
        </chakra.div>
        <chakra.div borderRadius={"0.5rem"} as={GridItem} bg={"purple.50"} minH={"100px"}>
          <chakra.div px={10} mt={2}  display={"flex"} flexDirection={"column"} >
            <chakra.div>
              <Text>System:</Text>
            </chakra.div>
            <chakra.div>
              <Text>Principal:</Text>
            </chakra.div>
            <chakra.div>
              <Text>Principal:</Text>
            </chakra.div>
          </chakra.div>
        </chakra.div>
      </Grid>
    </>
  );
}