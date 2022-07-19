import { useMutation, useQueryClient } from "react-query";
import {idlFactory} from "../canister/modclub/modclub.did.js";
import { useWalletConnect } from "./useWalletConnect";
import { getConfig } from "../config/config";

export const useGetToken = () =>{
  const {MODCLUB_CANISTER_ID} = getConfig()
  const queryClient =useQueryClient()
  const {getActor} = useWalletConnect()
  //https://react-query.tanstack.com/guides/optimistic-updates
  let mutationGetToken = useMutation(async (proposal:any ) => {

    const modClubActor = await getActor(idlFactory,MODCLUB_CANISTER_ID)
    return await modClubActor.getToken()
  },{
    onMutate: async proposal => {

    },
    onSuccess:(data,lockNFT) => {
    },
  })
  return {mutationGetToken}
};
