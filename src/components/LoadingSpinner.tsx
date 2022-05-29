import React, { useState } from "react";
import { Center,Spinner,chakra } from '@chakra-ui/react'
const LoadingSpinner = () => {

    return (
       <Center >
           <chakra.div>

                   <Spinner
                       thickness='4px'
                       speed='0.65s'
                       emptyColor='gray.200'
                       color='purple.500'
                       size='xl'
                   />


           </chakra.div>

       </Center>
    );
};
export default LoadingSpinner;
