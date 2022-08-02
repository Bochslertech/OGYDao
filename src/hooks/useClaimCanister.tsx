import { useMutation, useQueryClient } from "react-query";
import {idlFactory} from "../canister/mgmt/mgmt.did.js";
import { useWalletConnect } from "./useWalletConnect";

const canisterID = "cxgiz-nyaaa-aaaah-abg6q-cai";
export const useClaimCanister = () =>{
  const queryClient = useQueryClient()
  const {getActor} = useWalletConnect()
  //https://react-query.tanstack.com/guides/optimistic-updates
  let mutationClaimCanister = useMutation(async ( ) => {
    const cyclesActor = await getActor(idlFactory,canisterID)
    return await cyclesActor.claimCanister()
  },{
    onMutate: async proposal => {
      //await queryClient.invalidateQueries(["list_proposals",  selectCanisterID ])
    },
    onSuccess:(data,lockNFT) => {
    },
  })

  return {mutationClaimCanister}
};
