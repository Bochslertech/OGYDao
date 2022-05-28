import {Button,Alert,AlertIcon, Container,FormControl,Select, FormLabel,
  NumberInputStepper,NumberDecrementStepper,NumberIncrementStepper,
  Input,Textarea,NumberInput,NumberInputField } from "@chakra-ui/react";
import {useState, ChangeEvent, useEffect} from "react";
import {Principal} from "@dfinity/principal";
import {toBigNumber} from "../utils/format";

export default function SubmitProposals() {
  const [content,setContent] = useState<string|null>(null)
  const [amount,setAmount] = useState<string|null>(null)
  const [principal,setPrincipal] = useState<string|null>(null)
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
      setPrincipal(event.target.value)
    }
  }

  const [sumbitLoading,setSubmitLoading] = useState<boolean>(false)
  const [selectCommand, setSelectCommand] = useState<string>("admin");
  const [subCommand, setSubCommand] = useState<string>("Remove Member");

  console.log(selectCommand,subCommand)
  const [commandContent, setCommandContent] = useState<string[]|null>(null);
  const commands = [
    ["Remove Member","Add Member"],
    ["Transfer Token"],
  ];

  useEffect(()=>{
    if (selectCommand === "admin") {
      setCommandContent(commands[0])
      setSubCommand("Remove Member")
    }else {
      setCommandContent(commands[1])
      setSubCommand("Transfer Token")
    }
  },[selectCommand])

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
          {commandContent?.map((v,k) => {
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
      >
        Submit
      </Button>
    </Container>
  )
}