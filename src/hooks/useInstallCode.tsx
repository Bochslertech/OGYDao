import { useMutation, useQueryClient } from "react-query";
import {idlFactory} from "../canister/ogy_dao/ogy_dao.did.js";
import { useWalletConnect } from "./useWalletConnect";
import { useAtom } from "jotai";
import { selectCanisterIDAtom } from "../state/auth";
import { Principal } from "@dfinity/principal";

export const useInstallCode = () =>{
  const [selectCanisterID] = useAtom(selectCanisterIDAtom)
  const queryClient =useQueryClient()
  const {getActor} = useWalletConnect()
  //https://react-query.tanstack.com/guides/optimistic-updates
  let mutationInstallCode = useMutation(async (proposal:any ) => {
    console.log(selectCanisterID)
    const daoActor = await getActor(idlFactory,selectCanisterID)
    console.log({ 'AdminCommand' :  {
        'InstallCode' : {
          'ages' : [...proposal.ages],
          'wasm' : [...proposal.wasm],
          'canisterId' : proposal.canisterId,
        },
      }})
    return await daoActor.submit_proposal({ 'AdminCommand' :  {
        'InstallCode' : {
          'ages' : [...proposal.ages],
          'wasm' : [...proposal.wasm],
          'canisterId' : proposal.canisterId,
        },
      }})
  },{
    onMutate: async proposal => {
      await queryClient.cancelQueries(["list_proposals",  selectCanisterID ])
      await queryClient.invalidateQueries(["list_proposals",  selectCanisterID ])
    },
    onSuccess:(data,lockNFT) => {
    },
  })
  return {mutationInstallCode}
};
