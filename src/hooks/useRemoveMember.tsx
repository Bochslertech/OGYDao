import { useMutation, useQueryClient } from "react-query";
import {idlFactory} from "../canister/ogy_dao/ogy_dao.did.js";
import { useWalletConnect } from "./useWalletConnect";

export const useRemoveMember = (canisterId:string) =>{
  const queryClient = useQueryClient()
  const {getActor} = useWalletConnect()
  //https://react-query.tanstack.com/guides/optimistic-updates
  let mutationRemoveMember = useMutation(async (proposal:any ) => {
    const daoActor = await getActor(idlFactory,canisterId)
    return await daoActor.submit_proposal({ 'AdminCommand' :  {
        'RemoveMembers' : [proposal.principal]
      }},proposal.content)
  },{
    onMutate: async proposal => {
      await queryClient.cancelQueries(["list_proposals",  canisterId ])
      await queryClient.invalidateQueries(["list_proposals",  canisterId ])
    },
    onSuccess:(data,lockNFT) => {
    },
  })
  return {mutationRemoveMember}
};
