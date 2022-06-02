import {  useQuery } from "react-query";
import  idlFactory  from "../canister/ogy/ogy.did.js";
import { useAtom } from "jotai";
import { iiAgentAtom, selectCanisterIDAtom } from "../state/auth";
import { Actor } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";

export const useHoldOGYAmount = () =>{
  const [selectCanisterID] = useAtom(selectCanisterIDAtom)
  const [agent] = useAtom(iiAgentAtom)
  const {data,isLoading} = useQuery(   ["hold_ogy_amount",  selectCanisterID ], async ()=> {

    const nft = Actor.createActor<any>(idlFactory,{
      agent,
      canisterId:"rd6wb-lyaaa-aaaaj-acvla-cai",
    })
    console.log("3121",nft)
    return await nft.balanceOf(Principal.fromText(selectCanisterID));
  },{
    staleTime:60*1000*2,
  })

  return {data,isLoading,selectCanisterID}
};
