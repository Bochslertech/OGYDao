import { useMutation, useQueryClient } from "react-query";
import {idlFactory} from "../canister/nft/nft.did.js";
import { useWalletConnect } from "./useWalletConnect";


export const useGetRegistry = () =>{
  const {getActor} = useWalletConnect()
  //https://react-query.tanstack.com/guides/optimistic-updates
  let mutationGetRegistry = useMutation(async (canisterId:any ) => {

    const modClubActor = await getActor(idlFactory,canisterId)
    return await modClubActor.getRegistry()
  },{
    onMutate: async proposal => {

    },
    onSuccess:(data,lockNFT) => {
    },
  })
  return {mutationGetRegistry}
};
