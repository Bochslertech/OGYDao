import {TableContainer, chakra, Spinner,Text, Table, Thead, Tr, Th, Tbody, Td, Badge, Button} from "@chakra-ui/react";
import {toBigNumber} from "../utils/format";
import { useListProposals } from "../hooks/useListProposals";
import LoadingSpinner from "./LoadingSpinner";

export default function Proposals() {
  const {data,isLoading} = useListProposals("r7inp-6aaaa-aaaaa-aaabq-cai")
  return (
    <>
      {isLoading?<LoadingSpinner/>:<TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Proposal ID</Th>
              <Th>Content</Th>
              <Th>Voters</Th>
              <Th>State</Th>
              <Th>Operation</Th>
            </Tr>
          </Thead>
          <Tbody>
            {/*{proposals?.map((v,k)=>{*/}
            {/*  let disable = false*/}
            {/*  for (let vote of v.voters ){*/}
            {/*    if (Wallet && Wallet.principal) {*/}
            {/*      if (vote[0].toText() === Wallet.principal) {*/}
            {/*        disable=true;*/}
            {/*      }*/}
            {/*    }*/}
            {/*  }*/}
            {/*  return (*/}
            {/*    <Tr key={k}>*/}
            {/*      <Td>{v.id.toString()}</Td>*/}
            {/*      <Td>{v.proposal_content}</Td>*/}
            {/*      <Td>*/}
            {/*        <chakra.div>*/}
            {/*          <Badge colorScheme='red'>*/}
            {/*            Reject Tokens*/}
            {/*          </Badge>*/}
            {/*          <Text>{toBigNumber(v.votes_no.amount_e8s).div(1e8).toNumber()}</Text>*/}
            {/*        </chakra.div>*/}
            {/*        <chakra.div>*/}
            {/*          <Badge colorScheme='green'>*/}
            {/*            Accept Tokens*/}
            {/*          </Badge>*/}
            {/*          <Text>{toBigNumber(v.votes_yes.amount_e8s).div(1e8).toNumber()}</Text>*/}
            {/*        </chakra.div>*/}
            {/*      </Td>*/}
            {/*      <Td>*/}
            {/*        <Badge  colorScheme='green'>*/}
            {/*          {Object.keys(v.state)}*/}
            {/*        </Badge>*/}
            {/*      </Td>*/}
            {/*      <Td>*/}
            {/*        {Object.keys(v.state)[0] === "open"?*/}
            {/*          <>*/}
            {/*            <Button disabled={disable || isLoading} isLoading={isLoading} onClick={() => {vote("yes",v.id)}} size={"sm"} colorScheme='blue'>Yes</Button>*/}
            {/*            <Button disabled={disable || isLoading} isLoading={isLoading} onClick={() => {vote("no",v.id)}} size={"sm"} colorScheme='pink' ml={1}>No</Button>*/}
            {/*          </>*/}
            {/*          :*/}
            {/*          "Non-operable"*/}
            {/*        }*/}

            {/*      </Td>*/}
            {/*    </Tr>*/}
            {/*  )*/}
            {/*})}*/}
          </Tbody>
        </Table>
      </TableContainer>}
      </>
  )
}