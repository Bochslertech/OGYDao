import { useMutation, useQueryClient } from "react-query";
import {idlFactory} from "../canister/ogy_dao/ogy_dao.did.js";
import { useWalletConnect } from "./useWalletConnect";
import { useAtom } from "jotai";
import { selectCanisterIDAtom } from "../state/auth";

export const useOGYTransfer = () =>{
  const [selectCanisterID] = useAtom(selectCanisterIDAtom)
  const queryClient = useQueryClient()
  const {getActor} = useWalletConnect()
  let mutationOGYTransfer = useMutation(async (proposal:any ) => {
    const daoActor = await getActor(idlFactory,selectCanisterID);
    console.log({ 'TokenCommand' :  {
        'TransferOGY' : { 'recipient' : proposal.principal, 'amount' : proposal.amount}
      } },proposal.content as string)
    return await daoActor.submit_proposal({ 'TokenCommand' :  {
        'TransferOGY' : { 'recipient' : proposal.principal, 'amount' : proposal.amount}
      } },proposal.content as string)
  },{
    onMutate: async proposal => {
      await queryClient.cancelQueries(["list_proposals",  selectCanisterID ])
      await queryClient.invalidateQueries(["list_proposals",  selectCanisterID ])
      await queryClient.cancelQueries(["hold_ogy_amount",  selectCanisterID ])
      await queryClient.invalidateQueries(["hold_ogy_amount",  selectCanisterID ])
    },
    onSuccess:(data,lockNFT) => {
    },
  })
  return {mutationOGYTransfer}
};
