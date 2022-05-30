import { useMutation, useQueryClient } from "react-query";
import {idlFactory} from "../canister/ogy_dao/ogy_dao.did.js";
import { useWalletConnect } from "./useWalletConnect";
import { useAtom } from "jotai";
import { selectCanisterIDAtom } from "../state/auth";

export const useRemoveMember = () =>{
  const [selectCanisterID] = useAtom(selectCanisterIDAtom)
  const queryClient = useQueryClient()
  const {getActor} = useWalletConnect()
  //https://react-query.tanstack.com/guides/optimistic-updates
  let mutationRemoveMember = useMutation(async (proposal:any ) => {
    const daoActor = await getActor(idlFactory,selectCanisterID)
    return await daoActor.submit_proposal({ 'AdminCommand' :  {
        'RemoveMembers' : [proposal.principal]
      }},proposal.content)
  },{
    onMutate: async proposal => {
      await queryClient.cancelQueries(["list_proposals",  selectCanisterID ])
      await queryClient.invalidateQueries(["list_proposals",  selectCanisterID ])
    },
    onSuccess:(data,lockNFT) => {
    },
  })
  return {mutationRemoveMember}
};
