import { useMutation, useQueryClient } from "react-query";
import {idlFactory} from "../canister/mgmt/mgmt.did.js";
import { useWalletConnect } from "./useWalletConnect";

const canisterID = "cxgiz-nyaaa-aaaah-abg6q-cai";
export const useClaimCycles = () =>{
  const queryClient = useQueryClient()
  const {getActor} = useWalletConnect()
  //https://react-query.tanstack.com/guides/optimistic-updates
  let mutationClaimCycles = useMutation(async (to:any ) => {
    const cyclesActor = await getActor(idlFactory,canisterID)
    console.log({ 'canisterId' : to })
    return await cyclesActor.claim( to )
  },{
    onMutate: async proposal => {
      //await queryClient.invalidateQueries(["list_proposals",  selectCanisterID ])
    },
    onSuccess:(data,lockNFT) => {
    },
  })

  return {mutationClaimCycles}
};
