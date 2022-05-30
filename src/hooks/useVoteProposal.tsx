import { useMutation, useQueryClient } from "react-query";
import {idlFactory} from "../canister/ogy_dao/ogy_dao.did.js";
import { useWalletConnect } from "./useWalletConnect";
import { Vote } from "../canister/ogy_dao/ogy_dao";

export const useVoteProposal = (canisterId:string) =>{
  const queryClient = useQueryClient()
  const {getActor} = useWalletConnect()
  //https://react-query.tanstack.com/guides/optimistic-updates
  let mutationVoteProposal = useMutation(async (proposal:any ) => {
    const daoActor = await getActor(idlFactory,canisterId)
    return await daoActor.vote({ 'vote' : proposal.vote, 'proposal_id' : proposal.id })
  },{
    onMutate: async proposal => {
      await queryClient.invalidateQueries(["list_proposals",  canisterId ])
    },
    onSuccess:(data,lockNFT) => {
    },
  })
  return {mutationVoteProposal}
};
