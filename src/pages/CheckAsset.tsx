import {
  chakra,
  Button,
  Text,
  useToast,
  Link,
  Container,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Alert,
  AlertDescription, useClipboard
} from "@chakra-ui/react";
import { useCheckStatus } from "../hooks/useCheckStatus";
import { IDL } from "@dfinity/candid";
import { Principal } from "@dfinity/principal";
import { useEffect, useState } from "react";
import { useGetToken } from "../hooks/useGetToken";
import { toBigNumber } from "../utils/format";
import { useGetAllowances } from "../hooks/useGetAllowances";
import { useGetRegistry } from "../hooks/useGetRegistry";
import { useGetTokensByIds } from "../hooks/useGetTokenByIds";
import { Buffer } from 'buffer';
import axios from "axios"
import { log } from "util";

function CheckAsset(){
  const {mutationGetRegistry} = useGetRegistry()
  const [isLoading,setIsLoading] = useState(false)
  const [nftRegistry,setNFTRegistry] = useState<any>([])
  const toast = useToast();
  const [toCanisterId,setToCanisterId] = useState("");
  const getRegistry = async () => {
    if (toCanisterId === "") {
      toast({
        title: 'reg command',
        description: "Content cannot be empty",
        status: 'error',
        duration: 3000,
        position: 'top',
        isClosable: true,
      })
      return;
    }
    setIsLoading(true)
    const getTokenData = await mutationGetRegistry.mutateAsync(toCanisterId)
    setIsLoading(false)
    setNFTRegistry(getTokenData)
  }
  const ab2str = (buf:any) => {
    const decoder = new TextDecoder()
    return decoder.decode(Buffer.from(buf))
  }

  const [logs,setLogs] = useState<any>([])

  const {mutationGetTokenIds} = useGetTokensByIds()
  useEffect(()=>{
    (async ()=>{
      setIsLoading(true)
      if (nftRegistry.length>0){
        let tokenIndexs = []
        console.log("nftRegistry",nftRegistry.length)
        for  (let i = 0;i<nftRegistry.length;i++){

          tokenIndexs.push(nftRegistry[i][0])
          if (tokenIndexs.length >= 20) {
            console.log("lll",tokenIndexs)
            const data = await mutationGetTokenIds.mutateAsync({canisterId:toCanisterId,tokenIndexs:tokenIndexs})
            console.log(data)
            for (let d =0;d<data.length;d++) {
              const metadata = ab2str(data[d][1]["nonfungible"]["metadata"][0]) as string
              const metadataObj = JSON.parse(metadata)
              if ("url" in metadataObj) {
                console.log(metadataObj["url"])
                axios.get(metadataObj['url'])
                  .then(function (response) {
                    if (response.status !== 200){
                      logs.push("404:",metadata)
                      setLogs(logs)
                    }
                  })
                  .catch(function (error) {
                    logs.push("error:",metadata)
                    setLogs(logs)
                  });
              }

              if ("thumb" in metadataObj) {
                axios.get(metadataObj['thumb'])
                  .then(function (response) {
                    if (response.status !== 200){
                      logs.push("404:",metadata)
                      setLogs(logs)
                    }
                  })
                  .catch(function (error) {
                    logs.push("error:",metadata)
                    setLogs(logs)
                  });
              }
            }

            tokenIndexs = []
          }
        }

        if (tokenIndexs.length > 0) {
          console.log("lll",tokenIndexs)
          const data = await mutationGetTokenIds.mutateAsync({canisterId:toCanisterId,tokenIndexs:tokenIndexs})
          console.log(data)
          for (let d =0;d<data.length;d++) {
            const metadata = ab2str(data[d][1]["nonfungible"]["metadata"][0]) as string
            const metadataObj = JSON.parse(metadata)
            if ("url" in metadataObj) {
              console.log(metadataObj["url"])
              axios.get(metadataObj['url'])
                .then(function (response) {
                  if (response.status !== 200){
                    logs.push("404:",metadata)
                    setLogs(logs)
                  }
                })
                .catch(function (error) {
                  logs.push("error:",metadata)
                  setLogs(logs)
                });
            }

            if ("thumb" in metadataObj) {
              axios.get(metadataObj['thumb'])
                .then(function (response) {
                  if (response.status !== 200){
                    logs.push("404:",metadata)
                    setLogs(logs)
                  }
                })
                .catch(function (error) {
                  logs.push("error:",metadata)
                  setLogs(logs)
                });
            }
          }

          tokenIndexs = []
        }
        //mutationGetTokenIds.mutateAsync({canisterId:toCanisterId,tokenIndexs:})
      }
      setIsLoading(false)
    })()

  },[nftRegistry])
  // const [copyValue,setCopyValue] = useState("")
  // const { hasCopied, onCopy } =  useClipboard(copyValue)


  return (
    <chakra.div mt={5}>
      <Container maxW={"4xl"}>
        <FormControl>
          <FormLabel>CanisterID</FormLabel>
          <Input type='Canisterid' onChange={(event)=>{setToCanisterId(event.target.value)}} />
          <FormHelperText>检测NFT的图片是否可用(只支持yumi nft标准)</FormHelperText>
        </FormControl>
        <FormControl  mt={3}>
          <Button disabled={isLoading} isLoading={isLoading} onClick={getRegistry} colorScheme={"blue"}>Check</Button>
        </FormControl>
        <chakra.div mt={2} p={3} bg={"purple.100"}>
          {logs?logs.map((v:any,k:any)=>{
            return  <chakra.p>{v}</chakra.p>
          }):""}
          {/*<chakra.p>saddasdas</chakra.p>*/}
          {/*<chakra.p>saddasdas</chakra.p>*/}
        </chakra.div>
        {/*<chakra.div>*/}
        {/*  Launchpad Canister Id: pczmq-maaaa-aaaah-abhwa-cai*/}
        {/*  <br/>*/}
        {/*  Platform Canister Id: udtw4-baaaa-aaaah-abc3q-cai*/}

        {/*</chakra.div>*/}
        {/*<Button mt={3} onClick={()=>{*/}
        {/*  if (nftRegistry) {*/}
        {/*    var str = "";*/}
        {/*    for(let i = 0;i<nftRegistry.length;i++){*/}
        {/*      str = str+nftRegistry[i][0]+","+nftRegistry[i][1] +"\r\n"*/}
        {/*    }*/}
        {/*    setCopyValue(str)*/}
        {/*    onCopy()*/}
        {/*  }*/}
        {/*}} ml={2}>*/}
        {/*  {hasCopied ? 'Copied' : 'Copy'}*/}
        {/*</Button>*/}

        {/*<chakra.div mt={2} p={3} bg={"purple.100"}>*/}
        {/*  {nftRegistry?nftRegistry.map((v:any,k:any)=>{*/}
        {/*      return  <chakra.p>{v[0]},{v[1].toText()}</chakra.p>*/}
        {/*  }):""}*/}
        {/*  /!*<chakra.p>saddasdas</chakra.p>*!/*/}
        {/*  /!*<chakra.p>saddasdas</chakra.p>*!/*/}
        {/*</chakra.div>*/}
        {/*<chakra.div mt={3}>*/}
        {/*  <Alert status='success' borderRadius={"0.375rem"}>*/}
        {/*    <AlertDescription>当前可用Cycles {data ? toBigNumber(data).div(1e12).minus(2).toString()+"T":"loading"}</AlertDescription>*/}
        {/*  </Alert>*/}
        {/*</chakra.div>*/}
      </Container>
    </chakra.div>
  )
}

export default CheckAsset;