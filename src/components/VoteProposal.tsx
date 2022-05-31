import { Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useVoteProposal } from "../hooks/useVoteProposal";
import { useListProposals } from "../hooks/useListProposals";
import { useWalletConnect } from "../hooks/useWalletConnect";

export default function VoteProposal(props:any) {

  const {refetch,isFetching} = useListProposals()
  const [isLoading,setIsLoading] = useState(false)
  const {mutationVoteProposal} = useVoteProposal()
  const {principal} = useWalletConnect()
  const toast = useToast()
  const vote = (status:string,id:number) => {
    (async ()=>{
      setIsLoading(true)
      const voteData = await mutationVoteProposal.mutateAsync({
        vote:{[status]:null},
        id:id,
      })
      if ("err" in voteData) {
        toast({
          title: 'Admin command',
          description: voteData.err,
          status: 'error',
          duration: 3000,
          position: 'top',
          isClosable: true,
        })
      }else {
        toast({
          title: 'Admin command',
          description: "vote success",
          status: 'success',
          duration: 3000,
          position: 'top',
          isClosable: true,
        })
      }
      setIsLoading(false)
      refetch()
    })()
  }
  return (
    <>
      <Button disabled={!principal || props.disable || isLoading} isLoading={isLoading}
              onClick={() => {vote("yes",props.id)}} size={"sm"}
              colorScheme="pink" ml={1}>yes</Button>
      <Button disabled={!principal ||props.disable || isLoading} isLoading={isLoading}
              onClick={() => {vote("no",props.id)}} size={"sm"}
              colorScheme="blue" ml={1}>no</Button>
    </>
  )
}