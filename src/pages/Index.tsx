
import {
  chakra,
} from "@chakra-ui/react";
import Panel from "../components/Panel";
import Proposals from "../components/Proposal";

function Index(){
  return (
    <chakra.div >
      <Panel/>
      <Proposals/>
    </chakra.div>
  )
}

export default Index;