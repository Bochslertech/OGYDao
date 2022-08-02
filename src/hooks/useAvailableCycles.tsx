import { useMutation, useQuery, useQueryClient } from "react-query";
import {idlFactory} from "../canister/mgmt/mgmt.did.js";
import { useWalletConnect } from "./useWalletConnect";
import { Actor } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { useAtom } from "jotai";
import { iiAgentAtom } from "../state/auth";

const canisterID = "cxgiz-nyaaa-aaaah-abg6q-cai";
export const useAvailableCycles = () =>{
  const queryClient = useQueryClient()
  const {getActor} = useWalletConnect()
  //https://react-query.tanstack.com/guides/optimistic-updates
  const [agent] = useAtom(iiAgentAtom)
  const {data,isLoading} = useQuery(   ["claim_available_cycles",  canisterID ], async ()=> {

    const nft = Actor.createActor<any>(idlFactory,{
      agent,
      canisterId:canisterID,
    })
    console.log("3121",nft)
    return await nft.availableCycles();
  },{
    staleTime:60*1000*2,
  })

  return {data,isLoading}
};
