import {
  Button, Alert, AlertIcon, Container, FormControl, Select, FormLabel,
  NumberInputStepper, NumberDecrementStepper, NumberIncrementStepper,
  Input, Textarea, NumberInput, NumberInputField, useToast
} from "@chakra-ui/react";
import {useState, ChangeEvent, useEffect} from "react";
import {Principal} from "@dfinity/principal";
import {toBigNumber} from "../utils/format";
import { useWalletConnect } from "../hooks/useWalletConnect";
import { useMutation } from "react-query";
import { useAddMember } from "../hooks/useAddMember";
import { useRemoveMember } from "../hooks/useRemoveMember";

export default function SubmitProposals() {
  const {principal} = useWalletConnect()
  const [content,setContent] = useState<string|null>(null)
  const [amount,setAmount] = useState<string|null>(null)
  const [proposalPid,setProposalPid] = useState<string|null>(null)
  const changeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value) {
      setContent(event.target.value)
    }
  }

  const changeAmount = (amount:string) => {
    setAmount(amount)
  }

  const changePrincipal = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setProposalPid(event.target.value)
    }
  }

  const [sumbitLoading,setSubmitLoading] = useState<boolean>(false)
  const [selectCommand, setSelectCommand] = useState<string>("admin");
  const [subCommand, setSubCommand] = useState<string>("Remove Member");
  
  const [subCommandList, setSubCommandList] = useState<string[]|null>(null);
  const commands = [
    ["Remove Member","Add Member"],
    ["Transfer Token"],
  ];

  useEffect(()=>{
    if (selectCommand === "admin") {
      setSubCommandList(commands[0])
      setSubCommand("Remove Member")
    }else {
      setSubCommandList(commands[1])
      setSubCommand("Transfer Token")
    }
  },[selectCommand])

  const {mutationAddMember} = useAddMember("")
  const {mutationRemoveMember} = useRemoveMember("")
  const toast = useToast()
  const submitProposal = () => {
    console.log(principal)
    if (!principal) {
      return;
    }
    console.log("21312321",principal,selectCommand,subCommand)
    switch (selectCommand) {
      case "admin":
        if (content === "" || !content) {
          toast({
            title: 'Token command',
            description: "Content cannot be empty",
            status: 'error',
            duration: 3000,
            position: 'top',
            isClosable: true,
          })
          return;
        }
        if (proposalPid === "" || !proposalPid) {
          toast({
            title: 'Token command',
            description: "principal cannot be empty",
            status: 'error',
            duration: 3000,
            position: 'top',
            isClosable: true,
          })
          return
        }
        console.log(content,proposalPid,subCommand)
        switch (subCommand) {
          case "Remove Member":
            mutationAddMember.mutate({
              principal:Principal.fromText(proposalPid),
              content:content
            })
            toast({
              title: 'Admin command',
              description: "Remove Member success",
              status: 'success',
              duration: 3000,
              position: 'top',
              isClosable: true,
            })
            return;
          case "Add Member":
            mutationRemoveMember.mutate({
              principal:Principal.fromText(proposalPid),
              content:content
            })
            toast({
              title: 'Admin command',
              description: "Remove Member success",
              status: 'success',
              duration: 3000,
              position: 'top',
              isClosable: true,
            })
            return;
        }
        return;
      case "token":
        if (content === "" || !content) {
          toast({
            title: 'Token command',
            description: "Content cannot be empty",
            status: 'error',
            duration: 3000,
            position: 'top',
            isClosable: true,
          })
          return;
        }
        if (proposalPid === "" || !proposalPid) {
          toast({
            title: 'Token command',
            description: "principal cannot be empty",
            status: 'error',
            duration: 3000,
            position: 'top',
            isClosable: true,
          })
          return;
        }

        if (amount === "" || !amount) {
          toast({
            title: 'Token command',
            description: "amount cannot be empty",
            status: 'error',
            duration: 3000,
            position: 'top',
            isClosable: true,
          })
          return;
        }
        // const amountIn = parseFloat(amount)

        return;
    }
  }
  return (
    <Container>
      <FormControl isRequired>
        <FormLabel htmlFor='Proposal content'>Select Proposal Type</FormLabel>
        <Select onChange={(event)=>{setSelectCommand(event.target.value)}}>
          <option value={"admin"}>Admin Command</option>
          <option value={"token"}>Token Command</option>
        </Select>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor='Proposal content'>Command</FormLabel>
        <Select onChange={(event)=> {setSubCommand(event.target.value)}}>
          {subCommandList?.map((v,k) => {
            return (
              <option key={k} value={v}>{v}</option>
            )
          })}
        </Select>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor='Proposal content'>Proposal content</FormLabel>
        <Textarea onChange={(event)=>{changeContent(event)}} id='proposal' placeholder='Proposal content' />
      </FormControl>

      {selectCommand === "token" && subCommand === "Transfer Token"?
      <FormControl isRequired>
        <FormLabel htmlFor='Amount'>Transfer Token Amount</FormLabel>
        <NumberInput onChange={(amount)=> {changeAmount(amount)}} defaultValue={0} min={1} >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>:""}


      <FormControl isRequired>
        <FormLabel htmlFor='Principal'>
          Principal
        </FormLabel>
        <Input
          onChange={(event) =>
          {changePrincipal(event)}} id='principal' placeholder='principal' />
      </FormControl>
      <Button
        mt={4}
        colorScheme='teal'
        type='submit'
        isLoading={sumbitLoading}
        bg={"purple.500"}
        _hover={{bg:"purple.300"}}
        onClick={submitProposal}
        disabled={!principal}
      >
        Submit
      </Button>
    </Container>
  )
}