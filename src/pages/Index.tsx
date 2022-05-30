
import {
  chakra, Select, Text
} from "@chakra-ui/react";
import Panel from "../components/Panel";
import Proposals from "../components/Proposal";
import { useAtom } from "jotai";
import { selectCanisterIDAtom } from "../state/auth";
import React from "react";

function Index(){

  const [selectCanisterID,setSelectCanisterID] = useAtom(selectCanisterIDAtom)
  return (
    <chakra.div >
      <Panel/>
      <chakra.div ml={5}>
        <chakra.div mt={3}>
          <Text>Select Canister</Text>
          <Select width={"200px"} onChange={(event) => {setSelectCanisterID(event.target.value)}}>
            <option  value={"r7inp-6aaaa-aaaaa-aaabq-cai"}>OGY</option>
            <option  value={"rrkah-fqaaa-aaaaa-aaaaq-cai"}>Management</option>
          </Select>
          <Text color={"purple.700"} fontWeight={"bold"}>Current CanisterID:{selectCanisterID}</Text>
        </chakra.div>
      </chakra.div>
      <Proposals/>
    </chakra.div>
  )
}

export default Index;