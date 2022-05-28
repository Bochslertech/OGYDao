
import {
  chakra,
} from "@chakra-ui/react";
import Panel from "../components/Panel";
import SubmitProposals from "../components/SubmitProposal";

function CreateProposal(){
  return (
    <chakra.div mt={5}>
      <SubmitProposals/>
    </chakra.div>
  )
}

export default CreateProposal;