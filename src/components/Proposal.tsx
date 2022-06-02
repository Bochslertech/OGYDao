import {TableContainer, chakra, IconButton,Text, Table, Thead, Tr, Th, Tbody, Td, Badge, Button} from "@chakra-ui/react";
import {toBigNumber} from "../utils/format";
import { useListProposals } from "../hooks/useListProposals";
import { useWalletConnect } from "../hooks/useWalletConnect";
import VoteProposal from "./VoteProposal";
import { FiRefreshCw } from "react-icons/fi"

export default function Proposals() {
  const {data,isLoading,isFetching,refetch} = useListProposals()
  const {principal} = useWalletConnect()
  console.log("list po",data)
  return (
    <>
      <chakra.div display={"flex"} justifyContent={"right"} mr={3} >
        <IconButton onClick={()=>{refetch()}}
          isLoading={isFetching}
          colorScheme='purple'
          aria-label='refresh'
          icon={<FiRefreshCw />}
        />
      </chakra.div>

      <TableContainer>
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
            {data?.map((v:any,k:any)=>{
              let disable = false
              for (let vote of v.voters ){
                if (principal) {
                  if (vote[0].toText() === principal) {
                    disable=true;
                  }
                }
              }
              return (
                <Tr key={k}>
                  <Td>{v.id.toString()}</Td>
                  <Td>{v.proposal_content}</Td>
                  <Td>
                    <chakra.div>
                      <Badge colorScheme='red'>
                        Reject Tokens
                      </Badge>
                      <Text>{toBigNumber(v.votes_no.amount_e8s).div(1e8).toNumber()}</Text>
                    </chakra.div>
                    <chakra.div>
                      <Badge colorScheme='green'>
                        Accept Tokens
                      </Badge>
                      <Text>{toBigNumber(v.votes_yes.amount_e8s).div(1e8).toNumber()}</Text>
                    </chakra.div>
                  </Td>
                  <Td>
                    <Badge>
                      {Object.keys(v.state)}
                    </Badge>
                  </Td>
                  <Td>
                    {Object.keys(v.state)[0] === "open"?
                      <>
                        <VoteProposal disable={disable} id={v.id} />
                      </>
                      :
                      "Non-operable"
                    }
                  </Td>
                </Tr>
              )
            })}
          </Tbody>

        </Table>
      </TableContainer>
      </>
  )
}