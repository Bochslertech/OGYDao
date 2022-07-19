import {
  chakra, Button, Text, useToast,Link
} from "@chakra-ui/react";
import { useCheckStatus } from "../hooks/useCheckStatus";
import { IDL } from "@dfinity/candid";
import { Principal } from "@dfinity/principal";
import { useState } from "react";
import { useGetToken } from "../hooks/useGetToken";

function ModClubVerify(){
  const {mutationCheckStatus} = useCheckStatus()
  const {mutationGetToken} = useGetToken()
  const [isLoading,setIsLoading] = useState(false)
  const toast = useToast();
  const [verifyUrl,setVerifyUrl] = useState("")

  const checkStatus = async () => {
    setIsLoading(true)
    const installCodeData = await mutationCheckStatus.mutateAsync({
    })
    setIsLoading(false)
    console.log(installCodeData)
    if ("err" in installCodeData) {
      const errCode = Object.keys(installCodeData.err)[0];
      console.log(errCode)
      switch (errCode) {
        case "pohNotCompleted":
          setIsLoading(true)
          const getTokenData = await mutationGetToken.mutateAsync({
          })
          setIsLoading(false)

          if (getTokenData.length > 0) {
            setVerifyUrl("https://ocbvi-5yaaa-aaaah-qcopa-cai.raw.ic0.app/#/new-poh-profile?token="+getTokenData[0]+"&redirect_uri=https://tppkg-ziaaa-aaaal-qatrq-cai.raw.ic0.app/")
          }

          break
        default:
          toast({
            title: 'Check Stasts .',
            description: errCode,
            status: 'warning',
            duration: 9000,
            isClosable: true,
          })
      }
    }

  }
  return (
    <chakra.div mt={5} display={"flex"} justifyContent={"center"}  alignItems={"center"} flexDirection={"column"}>
      <chakra.div mb={5}>
        <Button colorScheme={"blue"} onClick={checkStatus} disabled={isLoading}>{isLoading?"Loading...":"Check Status"}</Button>
      </chakra.div>
      <chakra.div mb={5}>
        <Text>点击跳转链接去认证:
          {verifyUrl?  <Link href={verifyUrl} isExternal>
            {verifyUrl}
          </Link>:""}

        </Text>
      </chakra.div>

      <chakra.div  mb={5}>
        <Button colorScheme={"blue"}>Verify</Button>
      </chakra.div>

    </chakra.div>
  )
}

export default ModClubVerify;