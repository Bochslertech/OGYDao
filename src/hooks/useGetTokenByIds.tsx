import { useMutation, useQueryClient } from "react-query";
import {idlFactory} from "../canister/nft/nft.did.js";
import { useWalletConnect } from "./useWalletConnect";


export const useGetTokensByIds = () =>{
  const {getActor} = useWalletConnect()
  //https://react-query.tanstack.com/guides/optimistic-updates
  let mutationGetTokenIds = useMutation(async (params:any ) => {

    const nftActor = await getActor(idlFactory,params.canisterId)
    return await nftActor.getTokensByIds(params.tokenIndexs)
  },{
    onMutate: async proposal => {

    },
    onSuccess:(data,lockNFT) => {
    },
  })
  return {mutationGetTokenIds}
};
