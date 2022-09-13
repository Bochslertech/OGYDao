import React, { useEffect } from "react";
import {
  chakra,
  HStack,
  Link,
  Flex,
  IconButton,
  useColorModeValue,
  Button,
  useColorMode,
  useDisclosure,
  Spacer, Icon
} from "@chakra-ui/react";
import { useViewportScroll } from "framer-motion";
import {FaWallet} from "react-icons/fa";
import { FaMoon, FaSun } from "react-icons/fa";
import ConnectModal from "./ConnectModal";
// @ts-ignore
import { HashLink as RouterLink } from 'react-router-hash-link';
import { AuthClient } from "@dfinity/auth-client";
import { useAtom } from "jotai";
import { connectWalletTypeAtom, useWalletConnect } from "../hooks/useWalletConnect";
import { loginLoadingAtom } from "../state/auth";
import { getConfig } from "../config/config";

export default function Header() {
  const { toggleColorMode: toggleMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const bg = useColorModeValue("white", "gray.800");
  const ref = React.useRef();
  const [y, setY] = React.useState(0);

  const { scrollY } = useViewportScroll();
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [connectWT,setConnectWT] = useAtom(connectWalletTypeAtom)
  const [_,setLoginLoading] = useAtom(loginLoadingAtom)
  const {principal,handleIIAuthenticated,handlePLUGAuthenticated} = useWalletConnect()
  const {IC_HOST,MODCLUB_CANISTER_ID} = getConfig()
  useEffect(()=> {
    (async ()=> {
      // II 登录
      switch (connectWT.wallet_type) {
        case "II":
          setLoginLoading(true)
          const authClient = await AuthClient.create();
          if (await authClient.isAuthenticated()) {
            handleIIAuthenticated(authClient)
          }
          setLoginLoading(false)
          break;
        case "PLUG":
          setLoginLoading(true)
          await handlePLUGAuthenticated([
            MODCLUB_CANISTER_ID,
          ])
          setLoginLoading(false)
          break
      }
    })();
  },[])

  return (
    <React.Fragment>
      <ConnectModal isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
      <chakra.header
        transition="box-shadow 0.2s"
        bg={bg}
        borderTopColor="brand.400"
        w="full"
        overflowY="hidden"
        h="4.5rem"
        borderBottom={"2px solid purple"}
      >
        <chakra.div h="4.5rem"  mx="auto" maxW="1200px">
          <chakra.div
            display={"flex"}
            w="full"
            h="full"
            alignItems="center"
          >
            <Flex>
              <HStack spacing="5" display={{ base: "none", md: "flex" }}>

          <Link  as={RouterLink}  _focus={{ boxShadow: "none",textDecoration:"none",border:'none' }}
                 style={{ textDecoration: 'none',outline:'none' }}
                 _hover={{  boxShadow: "none",textDecoration:"none",border:'none',color: "purple.600" }}
                 to={{pathname:"/"}}>
                <Button
                  bg={bg}
                  color="gray.500"
                  display="inline-flex"
                  alignItems="center"
                  fontSize="md"
                  _focus={{ boxShadow: "none",textDecoration:"none",border:'none' }}
                  _hover={{  boxShadow: "none",textDecoration:"none",border:'none',color: "purple.600" }}
                >
                  Home
                </Button>
          </Link>

                <Link  as={RouterLink}  _focus={{ boxShadow: "none",textDecoration:"none",border:'none' }}
                       style={{ textDecoration: 'none',outline:'none' }}
                       _hover={{  boxShadow: "none",textDecoration:"none",border:'none',color: "purple.600" }}
                       to={{pathname:"snapshot"}}>
                  <Button
                    bg={bg}
                    color="gray.500"
                    display="inline-flex"
                    alignItems="center"
                    fontSize="md"
                    _focus={{ boxShadow: "none",textDecoration:"none",border:'none' }}
                    _hover={{  boxShadow: "none",textDecoration:"none",border:'none',color: "purple.600" }}
                  >
                    Snapshot NFT
                  </Button>
                </Link>

                <Link  as={RouterLink}  _focus={{ boxShadow: "none",textDecoration:"none",border:'none' }}
                       style={{ textDecoration: 'none',outline:'none' }}
                       _hover={{  boxShadow: "none",textDecoration:"none",border:'none',color: "purple.600" }}
                       to={{pathname:"allowance"}}>
                  <Button
                    bg={bg}
                    color="gray.500"
                    display="inline-flex"
                    alignItems="center"
                    fontSize="md"
                    _focus={{ boxShadow: "none",textDecoration:"none",border:'none' }}
                    _hover={{  boxShadow: "none",textDecoration:"none",border:'none',color: "purple.600" }}
                  >
                    Allowance
                  </Button>
                </Link>

                <Link  as={RouterLink}  _focus={{ boxShadow: "none",textDecoration:"none",border:'none' }}
                       style={{ textDecoration: 'none',outline:'none' }}
                       _hover={{  boxShadow: "none",textDecoration:"none",border:'none',color: "purple.600" }}
                       to={{pathname:"check_asset"}}>
                  <Button
                    bg={bg}
                    color="gray.500"
                    display="inline-flex"
                    alignItems="center"
                    fontSize="md"
                    _focus={{ boxShadow: "none",textDecoration:"none",border:'none' }}
                    _hover={{  boxShadow: "none",textDecoration:"none",border:'none',color: "purple.600" }}
                  >
                    Check Asset
                  </Button>
                </Link>

                <Link  as={RouterLink}  _focus={{ boxShadow: "none",textDecoration:"none",border:'none' }}
                       style={{ textDecoration: 'none',outline:'none' }}
                       _hover={{  boxShadow: "none",textDecoration:"none",border:'none',color: "purple.600" }}
                       to={{pathname:"claim_cycles"}}>
                  <Button
                    bg={bg}
                    color="gray.500"
                    display="inline-flex"
                    alignItems="center"
                    fontSize="md"
                    _focus={{ boxShadow: "none",textDecoration:"none",border:'none' }}
                    _hover={{  boxShadow: "none",textDecoration:"none",border:'none',color: "purple.600" }}
                  >
                    Claim Cycles
                  </Button>
                </Link>
                <Link  as={RouterLink}  _focus={{ boxShadow: "none",textDecoration:"none",border:'none' }}
                       style={{ textDecoration: 'none',outline:'none' }}
                       _hover={{  boxShadow: "none",textDecoration:"none",border:'none',color: "purple.600" }}
                       to={{pathname:"claim_canister"}}>
                  <Button
                    bg={bg}
                    color="gray.500"
                    display="inline-flex"
                    alignItems="center"
                    fontSize="md"
                    _focus={{ boxShadow: "none",textDecoration:"none",border:'none' }}
                    _hover={{  boxShadow: "none",textDecoration:"none",border:'none',color: "purple.600" }}
                  >
                    Claim Canister
                  </Button>
                </Link>
                <Link  to={{pathname:"modclub_verify"}} as={RouterLink}
                       _focus={{ boxShadow: "none",textDecoration:"none",border:'none' }}
                       style={{ textDecoration: 'none',outline:'none' }}
                       _hover={{  boxShadow: "none",textDecoration:"none",border:'none',color: "purple.600" }}
                >
                  <Button
                    bg={bg}
                    color="gray.500"
                    display="inline-flex"
                    alignItems="center"
                    fontSize="md"
                    _hover={{ color: "purple.600" }}
                    _focus={{ boxShadow: "none" }}
                  >
                    ModClub Verify
                  </Button>
                </Link>

                <Link  to={{pathname:"create_proposal"}} as={RouterLink}
                       _focus={{ boxShadow: "none",textDecoration:"none",border:'none' }}
                       style={{ textDecoration: 'none',outline:'none' }}
                       _hover={{  boxShadow: "none",textDecoration:"none",border:'none',color: "purple.600" }}
                       >
                <Button
                  disabled={true}
                  bg={bg}
                  color="gray.500"
                  display="inline-flex"
                  alignItems="center"
                  fontSize="md"
                  _hover={{ color: "purple.600" }}
                  _focus={{ boxShadow: "none" }}
                >
                  Create Proposal
                </Button>
                </Link>




                <Link  _focus={{ boxShadow: "none",textDecoration:"none",border:'none' }}
                       style={{ textDecoration: 'none',outline:'none' }}
                       _hover={{  boxShadow: "none",textDecoration:"none",border:'none',color: "purple.600" }}
                       href={"https://7tcwa-gqaaa-aaaad-qbs2a-cai.raw.ic0.app/"} isExternal={true}>
                <Button
                  disabled={true}
                  bg={bg}
                  color="gray.500"
                  display="inline-flex"
                  alignItems="center"
                  fontSize="md"
                  _focus={{ boxShadow: "none",textDecoration:"none",border:'none' }}
                  style={{ textDecoration: 'none',outline:'none' }}
                  _hover={{  boxShadow: "none",textDecoration:"none",border:'none',color: "purple.600" }}
                >
                  Fake ICP
                </Button>
                </Link>
              </HStack>
            </Flex>
            <Spacer />
            <Icon w={"6"} h={"6"}  onClick={onOpen}  as={FaWallet}/>
          </chakra.div>
        </chakra.div>
      </chakra.header>
    </React.Fragment>
  );
}