import {
  chakra, FormControl, FormLabel, Input,Alert,AlertDescription,FormHelperText, Container, Button, useToast
} from "@chakra-ui/react";
import { useWalletConnect } from "../hooks/useWalletConnect";
import { useClaimCycles } from "../hooks/useClaimCycles";
import { Principal } from "@dfinity/principal";
import { useState } from "react";
import { useHoldOGYAmount } from "../hooks/useHoldOGYAmount";
import { useAvailableCycles } from "../hooks/useAvailableCycles";
import { toBigNumber } from "../utils/format";

function ClaimCycles(){
  const {principal} = useWalletConnect()
  const toast = useToast()
  const {mutationClaimCycles} = useClaimCycles()
  const [isLoading,setIsLoading] = useState(false)
  const [toCanisterId,setToCanisterId] = useState("");

  const {data,isLoading : isLoading2 } = useAvailableCycles()
  const claimCycles = async () => {
    if (!principal) {
      toast({
        title: 'Pls login',
        description: "Pls login",
        status: 'error',
        duration: 3000,
        position: 'top',
        isClosable: true,
      })
      return;
    }

    try {
      Principal.fromText(toCanisterId)
    }catch (e){
      console.log(e)
      toast({
        title: 'canisterID error',
        description: "canisterID error",
        status: 'error',
        duration: 3000,
        position: 'top',
        isClosable: true,
      })
      return;
    }
    setIsLoading(true)
    const result  = await mutationClaimCycles.mutateAsync(Principal.fromText(toCanisterId))
    setIsLoading(false)

    if ("err" in result) {
      toast({
        title: result.err,
        description: result.err,
        status: 'error',
        duration: 3000,
        position: 'top',
        isClosable: true,
      })
      return;
    }
  }

  return (
    <chakra.div mt={5}>
      <Container maxW={"4xl"}>
        <FormControl>
          <FormLabel>CanisterID</FormLabel>
          <Input type='Canisterid' onChange={(event)=>{setToCanisterId(event.target.value)}} />
          <FormHelperText>请合理领取.仅限白名单用户领取,如你不是白名单,请联系管理员添加</FormHelperText>
        </FormControl>
        <FormControl mt={3}>
          <Button disabled={isLoading} isLoading={isLoading} onClick={claimCycles} colorScheme={"blue"}>Claim</Button>
        </FormControl>
        <chakra.div mt={3}>
          <Alert status='success' borderRadius={"0.375rem"}>
            <AlertDescription>当前可用Cycles {data ? toBigNumber(data).div(1e12).minus(2).toString()+"T":"loading"}</AlertDescription>
          </Alert>
        </chakra.div>
      </Container>
    </chakra.div>
  )
}

export default ClaimCycles;