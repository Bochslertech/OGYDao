import { useMutation, useQueryClient } from "react-query";
import {idlFactory} from "../canister/nft/nft.did.js";
import { useWalletConnect } from "./useWalletConnect";


export const useGetAllowances = () =>{
  const {getActor} = useWalletConnect()
  //https://react-query.tanstack.com/guides/optimistic-updates
  let mutationGetAllowances = useMutation(async (canisterId:any ) => {

    const modClubActor = await getActor(idlFactory,canisterId)
    return await modClubActor.getAllowances()
  },{
    onMutate: async proposal => {

    },
    onSuccess:(data,lockNFT) => {
    },
  })
  return {mutationGetAllowances}
};
