import { useMutation, useQueryClient } from "react-query";
import {idlFactory} from "../canister/modclub/modclub.did.js";
import { useWalletConnect } from "./useWalletConnect";
import { getConfig } from "../config/config";

export const useCheckStatus = () =>{
  const {MODCLUB_CANISTER_ID} = getConfig()
  const queryClient =useQueryClient()
  const {getActor} = useWalletConnect()
  //https://react-query.tanstack.com/guides/optimistic-updates
  let mutationCheckStatus = useMutation(async (proposal:any ) => {
    console.log("asdaas")
    const modClubActor = await getActor(idlFactory,MODCLUB_CANISTER_ID)
    return await modClubActor.checkStatus()
  },{
    onMutate: async proposal => {

    },
    onSuccess:(data,lockNFT) => {
    },
  })
  return {mutationCheckStatus}
};
