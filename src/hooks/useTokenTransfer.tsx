import { useMutation, useQueryClient } from "react-query";
import {idlFactory} from "../canister/ogy_dao/ogy_dao.did.js";
import { useWalletConnect } from "./useWalletConnect";

export const useTokenTransfer = (canisterId:string) =>{
  const queryClient = useQueryClient()
  const {getActor} = useWalletConnect()
  let mutationTransferToken = useMutation(async (proposal:any ) => {
    const daoActor = await getActor(idlFactory,canisterId)
    return await daoActor.submit_proposal({ 'TokenCommand' :  {
        'Transfer' : { 'recipient' :proposal.principal},
          'amount' : proposal.amount
      }})
  },{
    onMutate: async proposal => {
      await queryClient.cancelQueries(["list_proposals",  canisterId ])
      await queryClient.invalidateQueries(["list_proposals",  canisterId ])
    },
    onSuccess:(data,lockNFT) => {
    },
  })
  return {mutationTransferToken}
};
