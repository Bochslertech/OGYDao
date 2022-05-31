import { useMutation, useQueryClient } from "react-query";
import {idlFactory} from "../canister/ogy_dao/ogy_dao.did.js";
import { useWalletConnect } from "./useWalletConnect";
import { useAtom } from "jotai";
import { selectCanisterIDAtom } from "../state/auth";

export const useAddMember = () =>{
  const [selectCanisterID] = useAtom(selectCanisterIDAtom)
  const queryClient =useQueryClient()
  const {getActor} = useWalletConnect()
  //https://react-query.tanstack.com/guides/optimistic-updates
  let mutationAddMember = useMutation(async (proposal:any ) => {
    const daoActor = await getActor(idlFactory,selectCanisterID)
    return await daoActor.submit_proposal({ 'AdminCommand' :  {
        'AddMembers' : [{owner:proposal.principal,tokens:{amount_e8s:BigInt(1*1e8)}}],
      }},proposal.content)
  },{
    onMutate: async proposal => {
      await queryClient.cancelQueries(["list_proposals",  selectCanisterID ])
      await queryClient.invalidateQueries(["list_proposals",  selectCanisterID ])
    },
    onSuccess:(data,lockNFT) => {
    },
  })
  return {mutationAddMember}
};
