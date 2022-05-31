import { useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import { Center, chakra, Grid, GridItem, Text } from "@chakra-ui/react";
import { useSystemConfig } from "../hooks/useSystemConfig";
import LoadingSpinner from "./LoadingSpinner";
import { toBigNumber } from "../utils/format";
import { useListAccounts } from "../hooks/useListAccount";
import { Principal } from "@dfinity/principal";

export default function Panel() {
  const {data,isLoading} = useSystemConfig()

  const {data:listAccounts,isLoading:isLoadingAccounts} = useListAccounts()
  return (
    <>

      <Grid p={10} templateColumns='repeat(2, 1fr)' gap={6}>
        {isLoadingAccounts?<LoadingSpinner/>:
          <chakra.div borderRadius={"0.5rem"} as={GridItem} bg={"purple.50"} minH={"100px"}>
          <chakra.div px={10} mt={2} display={"flex"} flexDirection={"column"} >
            {listAccounts.map((v:any,k:any) => {
              return (

                  <chakra.div key={k}>
                    <Text><chakra.span fontWeight={"600"}>Voter: </chakra.span> {Principal.from(v.owner).toText()}</Text>
                  </chakra.div>

              )
            })}
          </chakra.div>
        </chakra.div>}

        {isLoading?<LoadingSpinner/>:
          <chakra.div borderRadius={"0.5rem"} as={GridItem} bg={"purple.50"} minH={"100px"}>
            <chakra.div px={10} mt={2}  display={"flex"} flexDirection={"column"} >
              <chakra.div>
                <Text><chakra.span fontWeight={"600"}>proposal_submission_deposit:</chakra.span> {
                  toBigNumber(data.proposal_submission_deposit.amount_e8s).div(1e8).toNumber()
                }</Text>
              </chakra.div>
              <chakra.div>
                <Text>
                  <chakra.span fontWeight={"600"}> proposal_vote_threshold:</chakra.span>
                  {
                  toBigNumber(data.proposal_vote_threshold.amount_e8s).div(1e8).toNumber()
                }</Text>
              </chakra.div>
              <chakra.div>
                <Text>
                  <chakra.span fontWeight={"600"}>transfer_fee:</chakra.span>
                  {
                  toBigNumber(data.transfer_fee.amount_e8s).div(1e8).toNumber()
                }</Text>
              </chakra.div>
            </chakra.div>
          </chakra.div>}


      </Grid>
    </>
  );
}