import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { useVoteProposal } from "../hooks/useVoteProposal";
import { useListProposals } from "../hooks/useListProposals";

export default function VoteProposal(props:any) {

  const {refetch,isFetching} = useListProposals()
  const [isLoading,setIsLoading] = useState(false)
  const {mutationVoteProposal} = useVoteProposal()
  const vote = (status:string,id:number) => {
    (async ()=>{
      setIsLoading(true)
      const voteData = await mutationVoteProposal.mutateAsync({
        vote:{[status]:null},
        id:id,
      })
      setIsLoading(false)
      refetch()
    })()
  }
  return (
    <>
      <Button disabled={props.disable || isLoading} isLoading={isLoading}
              onClick={() => {vote("yes",props.id)}} size={"sm"}
              colorScheme="pink" ml={1}>yes</Button>
      <Button disabled={props.disable || isLoading} isLoading={isLoading}
              onClick={() => {vote("no",props.id)}} size={"sm"}
              colorScheme="blue" ml={1}>no</Button>
    </>
  )
}