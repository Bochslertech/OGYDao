import { Actor } from "@dfinity/agent";
import { useQuery } from "react-query";
import {idlFactory} from "../canister/ogy_dao/ogy_dao.did.js";
import {useAtom} from "jotai";
import { iiAgentAtom, selectCanisterIDAtom } from "../state/auth";

export const useListProposals = () =>{
  const [selectCanisterID] = useAtom(selectCanisterIDAtom)
  const [agent] = useAtom(iiAgentAtom)
  const {data,isLoading,isFetching,refetch} = useQuery(["list_proposals",  selectCanisterID ], async ()=> {
    const nft = Actor.createActor<any>(idlFactory,{
      agent,
      canisterId:selectCanisterID,
    })
    return await nft.list_proposals();
  },{
    staleTime:60*1000*2,
  })

  return {data,isLoading,refetch,isFetching,selectCanisterID}
};
