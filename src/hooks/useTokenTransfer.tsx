import { useMutation, useQueryClient } from "react-query";
import {idlFactory} from "../canister/ogy_dao/ogy_dao.did.js";
import { useWalletConnect } from "./useWalletConnect";
import { useAtom } from "jotai";
import { selectCanisterIDAtom } from "../state/auth";

export const useTokenTransfer = () =>{
  const [selectCanisterID] = useAtom(selectCanisterIDAtom)
  const queryClient = useQueryClient()
  const {getActor} = useWalletConnect()
  let mutationTransferToken = useMutation(async (proposal:any ) => {
    const daoActor = await getActor(idlFactory,selectCanisterID);
    console.log({ 'TokenCommand' :  {
        'Transfer' : { 'recipient' : proposal.principal, 'amount' : proposal.amount}
      } },proposal.content as string)
    return await daoActor.submit_proposal({ 'TokenCommand' :  {
        'Transfer' : { 'recipient' : proposal.principal, 'amount' : proposal.amount}
      } },proposal.content as string)
  },{
    onMutate: async proposal => {
      await queryClient.cancelQueries(["list_proposals",  selectCanisterID ])
      await queryClient.invalidateQueries(["list_proposals",  selectCanisterID ])
    },
    onSuccess:(data,lockNFT) => {
    },
  })
  return {mutationTransferToken}
};
