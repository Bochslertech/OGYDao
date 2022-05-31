const { REACT_APP_NODE_ENV } = process.env;
export function getConfig(){
  console.log(process.env)
  if (REACT_APP_NODE_ENV === "development"){
    return {
      DAO_CANISTER_ID:"r7inp-6aaaa-aaaaa-aaabq-cai",
      MANAGE_CANISTER_ID:"rrkah-fqaaa-aaaaa-aaaaq-cai",
      IC_HOST:"http://127.0.0.1:8000/",
    }
  }else {
    return {
      DAO_CANISTER_ID:"zkiie-xyaaa-aaaah-abdra-cai",
      MANAGE_CANISTER_ID:"2ouh4-ziaaa-aaaam-aahfa-cai",
      IC_HOST:"https://ic0.app",
    }
  }
}