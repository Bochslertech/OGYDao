import { Actor } from "@dfinity/agent";
import { useQuery } from "react-query";
import {idlFactory} from "../canister/ogy_dao/ogy_dao.did.js";
import {useAtom} from "jotai";
import {iiAgentAtom} from "../state/auth";

export const useListAccounts = (canisterId:string) =>{
  const [agent] = useAtom(iiAgentAtom)
  const {data,isLoading} = useQuery(   ["list_accounts",  canisterId ], async ()=> {
    const nft = Actor.createActor<any>(idlFactory,{
      agent,
      canisterId,
    })
    return await nft.list_accounts();
  },{
    staleTime:60*1000*2,
  })

  return {data,isLoading,canisterId}
};
