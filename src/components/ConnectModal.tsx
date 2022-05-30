import React, {useEffect} from "react";
import {
    Select,
    chakra,
    Text, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerBody
} from '@chakra-ui/react'
import {useWalletConnect} from "../hooks/useWalletConnect";
import {useAtom} from "jotai";
import { loginLoadingAtom, selectCanisterIDAtom } from "../state/auth";
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
    const [selectCanisterID,setSelectCanisterID] = useAtom(selectCanisterIDAtom)
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
                            <Text fontSize={"xl"}>Wallet</Text>
                            <chakra.div mt={3}>
                                <Text>Select Canister</Text>
                                <Select value={selectCanisterID} onChange={(event) => {setSelectCanisterID(event.target.value)}}>
                                    <option  value={"r7inp-6aaaa-aaaaa-aaabq-cai"}>OGY</option>
                                    <option  value={"rrkah-fqaaa-aaaaa-aaaaq-cai"}>Management</option>
                                </Select>
                                <Text color={"purple.700"} fontWeight={"bold"}>Current Canister:{selectCanisterID}</Text>
                            </chakra.div>
                            {loginLoading ? <LoadingSpinner/>:""}

                            {!loginLoading && !principal?
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
                            </chakra.div>:""}

                            {principal?<chakra.div mt={5}>
                                Principal: <Text>{principal}</Text>
                                <chakra.div mt={3}
                                onClick={async ()=>{
                                await handleLogout()
                                onClose()
                            }}
                                bg={"purple.100"}
                                borderRadius={"0.375rem"}
                                cursor={"pointer"} mb={3} display={"flex"} alignItems={"center"}
                                flexDirection={"row"} w={"full"} h={"60px"} p={3} _hover={{bg:"purple.200"}}>
                                <Text ml={5} fontSize={"xl"} >Logout</Text>
                                </chakra.div>
                                </chakra.div>:""}
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
        </>
    )
}

export default ConnectModal