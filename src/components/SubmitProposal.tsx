import {
  Button, Container, FormControl, Select, FormLabel,
  NumberInputStepper, NumberDecrementStepper, NumberIncrementStepper,
  Input, Textarea, NumberInput, NumberInputField, useToast
} from "@chakra-ui/react";
import {useState, ChangeEvent, useEffect} from "react";
import {Principal} from "@dfinity/principal";
import { useWalletConnect } from "../hooks/useWalletConnect";
import { useAddMember } from "../hooks/useAddMember";
import { useRemoveMember } from "../hooks/useRemoveMember";
import { useAtom } from "jotai";
import { selectCanisterIDAtom } from "../state/auth";
import { useInstallCode } from "../hooks/useInstallCode";
import { init } from "../canister/ogy_dao/ogy_dao.did.js";
import { IDL} from "@dfinity/candid";

export default function SubmitProposals() {
  const {principal} = useWalletConnect()
  const [content,setContent] = useState<string|null>(null)
  const [amount,setAmount] = useState<string|null>(null)
  const [threshold,setThreshold] = useState<string|null>(null)
  const [proposalPid,setProposalPid] = useState<string|null>(null)
  const changeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value) {
      setContent(event.target.value)
    }
  }
  const [BasicDaoStableStorage] = init({IDL})

  const changeThreshold = (threshold:string) => {
    setThreshold(threshold)
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
  const [selectCommand, setSelectCommand] = useState<string>("Admin Command");
  const [subCommand, setSubCommand] = useState<string>("Remove Member");
  
  const [subCommandList, setSubCommandList] = useState<string[]|null>(null);

  const [commands,setCommands] = useState([
    "Admin Command",
    "Token Command",
  ]);

  useEffect(()=>{
    if (selectCommand === "Admin Command") {
      if (selectCanisterID ===  "r7inp-6aaaa-aaaaa-aaabq-cai" ) {
        setSubCommandList(  ["Remove Member","Add Member"])
      }else {
        setSubCommandList(  ["Remove Member","Add Member","Install Code"])
      }
      setSubCommand("Remove Member")
    }else {
      if (selectCanisterID ===  "r7inp-6aaaa-aaaaa-aaabq-cai" ) {
        setSubCommandList(  ["Transfer Token"])
        setSubCommand("Transfer Token")
      }else {
        setSubCommandList(  [])
      }
    }
  },[selectCommand])

  const [selectCanisterID] = useAtom(selectCanisterIDAtom)
  useEffect(()=>{
    if (selectCanisterID ===  "r7inp-6aaaa-aaaaa-aaabq-cai" ) {
      setCommands(  [
        "Admin Command",
        "Token Command",
      ])
    }else {
      setCommands(  [
        "Admin Command",
      ])
    }

    setSelectCommand("Admin Command")
    if (selectCanisterID ===  "r7inp-6aaaa-aaaaa-aaabq-cai" ) {
      setSubCommandList(  ["Remove Member","Add Member"])
    }else {
      setSubCommandList(  ["Remove Member","Add Member","Install Code"])
    }
    setSubCommand("Remove Member")


  },[selectCanisterID])

  // install code
  const [installCode,setInstallCode ] = useState<any>(null)
  const [voterStr,setVoterStr ] = useState<any>(null)


  const {mutationAddMember} = useAddMember()
  const {mutationRemoveMember} = useRemoveMember()
  const {mutationInstallCode} = useInstallCode()
  const toast = useToast()
  const submitProposal = () => {
    if (!principal) {
      return;
    }
    console.log(selectCommand,subCommand)
    switch (selectCommand) {
      case "Admin Command":

        switch (subCommand) {
          case "Remove Member":
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
            (async ()=>{
              setSubmitLoading(true)
              const data = await mutationRemoveMember.mutateAsync({
                principal:Principal.fromText(proposalPid),
                content:content
              })
              if ("err" in data) {
                toast({
                  title: 'Admin command',
                  description: data.err,
                  status: 'error',
                  duration: 3000,
                  position: 'top',
                  isClosable: true,
                })
              }else {
                toast({
                  title: 'Admin command',
                  description: "submit success",
                  status: 'success',
                  duration: 3000,
                  position: 'top',
                  isClosable: true,
                })
              }
              setSubmitLoading(false)
            })()
            return;
          case "Add Member":
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
            (async ()=>{
              setSubmitLoading(true)
              const data = await mutationAddMember.mutateAsync({
                principal:Principal.fromText(proposalPid),
                content:content
              })
              if ("err" in data) {
                toast({
                  title: 'Admin command',
                  description: data.err,
                  status: 'error',
                  duration: 3000,
                  position: 'top',
                  isClosable: true,
                })
              }else {
                toast({
                  title: 'Admin command',
                  description: "submit success",
                  status: 'success',
                  duration: 3000,
                  position: 'top',
                  isClosable: true,
                })
              }
              setSubmitLoading(false)
            })()
            return;
          case "Install Code":
            if (voterStr === "" ||!voterStr) {
              toast({
                title: 'Admin command',
                description: "voters cannot be empty",
                status: 'error',
                duration: 3000,
                position: 'top',
                isClosable: true,
              })
              return;
            }
            if (installCode === "" || !installCode) {
              toast({
                title: 'Admin command',
                description: "installCode cannot be empty",
                status: 'error',
                duration: 3000,
                position: 'top',
                isClosable: true,
              })
              return
            }
            if (threshold === "" || !threshold) {
              toast({
                title: 'Admin command',
                description: "threshold cannot be empty",
                status: 'error',
                duration: 3000,
                position: 'top',
                isClosable: true,
              })
              return
            }

            (async () => {
              const thresholdIn = parseInt(threshold)
              let voters = voterStr.split(/\r?\n/);
              console.log(voters)
              let installArg = {
                system_params : {
                  transfer_fee : {amount_e8s:BigInt(0)},
                  proposal_vote_threshold : {amount_e8s: BigInt(thresholdIn)},
                  proposal_submission_deposit : {amount_e8s:BigInt(0)},
                },
                accounts : [

                ] as any[],
                proposals : [],
              }
              let accountInfos :any[] = []
              for (let i = 0;i<voters.length;i++) {
                accountInfos.push({
                  owner : Principal.fromText(voters[i]),
                  tokens: {amount_e8s:BigInt(1)}
                })
              }
              installArg.accounts = accountInfos

              console.log(installArg)
              console.log(IDL.encode([BasicDaoStableStorage],[installArg]))
              const installCodeData = await mutationInstallCode.mutateAsync({
                args:IDL.encode([BasicDaoStableStorage],[installArg]),
                wasm:new Uint8Array(installCode),
                canisterId:Principal.fromText("rrkah-fqaaa-aaaaa-aaaaq-cai"),
              })
              console.log(installCodeData)
            })()

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
        <Select value={selectCommand} onChange={(event)=>{setSelectCommand(event.target.value)}}>
          {commands.map((v,k) => {
            return (
              <option key={k} value={v}>{v}</option>
            )
          })}
        </Select>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor='Proposal content'>Command</FormLabel>
        <Select value={subCommand} onChange={(event)=> {setSubCommand(event.target.value)}}>
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

      {selectCommand === "Token Command" && subCommand === "Transfer Token"?
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

      {selectCommand === "Admin Command" && subCommand === "Install Code"?
        <>
        <FormControl isRequired>
          <FormLabel htmlFor='Voters'>
            Votes
          </FormLabel>
          <Textarea onChange={(event) => {setVoterStr(event.target.value)}} placeholder={"Enter voter, multiple lines please"}/>
        </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor='Voters'>
              Proposal Vote Threshold
            </FormLabel>
            <NumberInput onChange={(threshold)=> {changeThreshold(threshold)}} defaultValue={0} min={1} >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor='Principal'>
              Install code file
            </FormLabel>
            <Input type={"file"} onChange={(event) => {
              // @ts-ignore
              let file = event.target.files[0];
              let fr = new FileReader();
              fr.readAsArrayBuffer(file)
              fr.onload = function(e) {
                // The file's text will be printed here
                if (e.target){
                  setInstallCode(e.target.result)
                }
              };
              console.log(event)
            }} placeholder='principal' />
          </FormControl>
        </>:
        <FormControl isRequired>
          <FormLabel htmlFor='Principal'>
            Principal
          </FormLabel>
          <Input
            onChange={(event) =>
            {changePrincipal(event)}} id='principal' placeholder='principal' />
        </FormControl>}
      <Button
        mt={4}
        colorScheme='teal'
        type='submit'
        isLoading={sumbitLoading}
        bg={"purple.500"}
        _hover={{bg:"purple.300"}}
        onClick={submitProposal}
        disabled={!principal || sumbitLoading}
      >
        Submit
      </Button>
    </Container>
  )
}