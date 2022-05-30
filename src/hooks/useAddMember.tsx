import { useMutation, useQueryClient } from "react-query";
import {idlFactory} from "../canister/ogy_dao/ogy_dao.did.js";
import { useWalletConnect } from "./useWalletConnect";

export const useAddMember = (canisterId:string) =>{
  const queryClient =useQueryClient()
  const {getActor} = useWalletConnect()
  //https://react-query.tanstack.com/guides/optimistic-updates
  let mutationAddMember = useMutation(async (proposal:any ) => {
    console.log(proposal)
    const daoActor = await getActor(idlFactory,canisterId)
    return await daoActor.submit_proposal({ 'AdminCommand' :  {
        'AddMembers' : [{owner:proposal.principal,tokens:{amount_e8s:BigInt(1)}}],
      }},proposal.content)
  },{
    onMutate: async proposal => {
      await queryClient.cancelQueries(["list_proposals",  canisterId ])
    },
    onSuccess:(data,lockNFT) => {
    },
  })
  return {mutationAddMember}
};
