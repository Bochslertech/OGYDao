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
import { useClaimCanister } from "../hooks/useClaimCanister";

function ClaimCanister(){
  const {principal} = useWalletConnect()
  const toast = useToast()
  const {mutationClaimCanister} = useClaimCanister()
  const [isLoading,setIsLoading] = useState(false)
  const [claimCanisterId,setClaimCanisterId] = useState("")

  const claimCanister = async () => {
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

    setIsLoading(true)
    const result  = await mutationClaimCanister.mutateAsync()
    setIsLoading(false)
    console.log(result)
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
    }else {
      setClaimCanisterId(Principal.fromUint8Array(result.ok._arr).toString())
    }
  }

  return (
    <chakra.div mt={5}>
      <Container maxW={"4xl"}>
        <FormControl>
          <FormHelperText>请合理领取.仅限白名单用户领取,如你不是白名单,请联系管理员添加</FormHelperText>
        </FormControl>
        <FormControl  mt={3}>
          <Button disabled={isLoading} isLoading={isLoading} onClick={claimCanister} colorScheme={"blue"}>Claim</Button>
        </FormControl>
        <chakra.div mt={3}>
          <Alert status='success' borderRadius={"0.375rem"}>
            <AlertDescription>您申请的canisterid为,请及时复制保存:{claimCanisterId}</AlertDescription>
          </Alert>
        </chakra.div>
      </Container>
    </chakra.div>
  )
}

export default ClaimCanister;