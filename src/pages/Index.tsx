import {
  chakra, Select, Text
} from "@chakra-ui/react";
import Panel from "../components/Panel";
import Proposals from "../components/Proposal";
import { useAtom } from "jotai";
import { selectCanisterIDAtom } from "../state/auth";
import React from "react";
import { getConfig } from "../config/config";
import {useHoldOGYAmount} from "../hooks/useHoldOGYAmount";
import {toBigNumber} from "../utils/format";

function Index(){
  const {DAO_CANISTER_ID,MANAGE_CANISTER_ID,IC_HOST} = getConfig()
  const [selectCanisterID,setSelectCanisterID] = useAtom(selectCanisterIDAtom)
  const {data,isLoading} = useHoldOGYAmount()

  return (
    <chakra.div >
      {/*<Panel/>*/}
      {/*<chakra.div display={"flex"} justifyContent={"space-between"}>*/}
      {/*<chakra.div ml={5}>*/}
      {/*  <chakra.div mt={3}>*/}
      {/*    <Text>Select Canister</Text>*/}
      {/*    <Select value={selectCanisterID} width={"200px"} onChange={(event) => {setSelectCanisterID(event.target.value)}}>*/}
      {/*      <option  value={DAO_CANISTER_ID}>Token</option>*/}
      {/*      <option  value={MANAGE_CANISTER_ID}>Management</option>*/}
      {/*    </Select>*/}
      {/*    <Text color={"purple.700"} fontWeight={"bold"}>Current CanisterID:{selectCanisterID}</Text>*/}
      {/*  </chakra.div>*/}
      {/*</chakra.div>*/}
      {/*  <chakra.div mr={5}>*/}
      {/*    <Text color={"purple.700"} fontWeight={"bold"}>Canister Hold OGY</Text>*/}
      {/*    <Text color={"purple.500"} fontWeight={"500"}>{isLoading?"loading...":toBigNumber(data).div(1e8).toNumber()}</Text>*/}
      {/*  </chakra.div>*/}
      {/*</chakra.div>*/}
      {/*<Proposals/>*/}
    </chakra.div>
  )
}

export default Index;