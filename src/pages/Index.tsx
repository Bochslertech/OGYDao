
import {
  chakra, Select, Text
} from "@chakra-ui/react";
import Panel from "../components/Panel";
import Proposals from "../components/Proposal";
import { useAtom } from "jotai";
import { selectCanisterIDAtom } from "../state/auth";
import React from "react";
import { getConfig } from "../config/config";

function Index(){
  const {DAO_CANISTER_ID,MANAGE_CANISTER_ID,IC_HOST} = getConfig()
  const [selectCanisterID,setSelectCanisterID] = useAtom(selectCanisterIDAtom)
  return (
    <chakra.div >
      <Panel/>
      <chakra.div ml={5}>
        <chakra.div mt={3}>
          <Text>Select Canister</Text>
          <Select value={selectCanisterID} width={"200px"} onChange={(event) => {setSelectCanisterID(event.target.value)}}>
            <option  value={DAO_CANISTER_ID}>Token</option>
            <option  value={MANAGE_CANISTER_ID}>Management</option>
          </Select>
          <Text color={"purple.700"} fontWeight={"bold"}>Current CanisterID:{selectCanisterID}</Text>
        </chakra.div>
      </chakra.div>
      <Proposals/>
    </chakra.div>
  )
}

export default Index;