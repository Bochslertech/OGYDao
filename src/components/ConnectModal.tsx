import React, {useEffect} from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    chakra,
    ModalBody,
    ModalCloseButton,
    Text, Image, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerBody, Divider, Icon,
} from '@chakra-ui/react'
import {useWalletConnect} from "../hooks/useWalletConnect";
import {FaWallet} from "react-icons/fa";
import {AiOutlineLogout} from "react-icons/ai";
import {useAtom} from "jotai";
import {loginLoadingAtom} from "../state/auth";
import LoadingSpinner from "./LoadingSpinner";

const ConnectModal = ({isOpen,onOpen,onClose}:{
    isOpen:boolean
    onOpen:()=>void
    onClose:()=>void
}) => {

    const {handleLogin,handleLogout,principal} = useWalletConnect()
    const onLogin = (walletType:string) => {
        if (!principal) {
            if (walletType === "II") {
                handleLogin("II")
            }else {
                handleLogin("PLUG")
            }
        }
    }
    useEffect(()=> {
        if (principal) {
            onClose()
        }
    },[principal])
    const [loginLoading] = useAtom(loginLoadingAtom)
    return (
        <>
                <Drawer
                    isOpen={isOpen}
                    placement='right'
                    onClose={onClose}
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerBody mt={10}>
                            <Text fontSize={"xl"}>Choose You wallet</Text>
                            {loginLoading ? <LoadingSpinner/>:""}
                            {!principal?
                            <chakra.div mt={10} borderRadius={"0.5rem"} display={"flex"}
                                        alignContent={"center"} justifyContent={"center"} flexDirection={"column"}>
                                <chakra.div  bg={"purple.100"}
                                             onClick={()=>{onLogin("PLUG")}}
                                            cursor={"pointer"} mb={3} display={"flex"}
                                            alignItems={"center"}
                                             borderRadius={"0.375rem"}
                                            flexDirection={"row"}  w={"full"} h={"60px"}
                                             p={3} _hover={{bg:"purple.200"}}>

                                    <Text ml={5} fontSize={"xl"} >Plug Wallet</Text>
                                </chakra.div>
                                <chakra.div
                                    onClick={() => {onLogin("II")}}
                                    bg={"purple.100"}
                                    borderRadius={"0.375rem"}
                                    cursor={"pointer"} mb={3} display={"flex"} alignItems={"center"}
                                    flexDirection={"row"} w={"full"} h={"60px"} p={3} _hover={{bg:"purple.200"}}>

                                    <Text ml={5} fontSize={"xl"} >Internet Identity</Text>
                                </chakra.div>
                            </chakra.div>:<chakra.div mt={5}>
                                  Principal: <Text>{principal}</Text>
                              </chakra.div>}
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
        </>
    )
}

export default ConnectModal