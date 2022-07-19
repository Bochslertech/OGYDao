const { REACT_APP_NODE_ENV } = process.env;
export function getConfig(){
  if (REACT_APP_NODE_ENV === "development"){
    return {
      DAO_CANISTER_ID:"r7inp-6aaaa-aaaaa-aaabq-cai",
      MANAGE_CANISTER_ID:"rrkah-fqaaa-aaaaa-aaaaq-cai",
      IC_HOST:"https://ic0.app",
      MODCLUB_CANISTER_ID:"wg45t-qiaaa-aaaah-abflq-cai",
    }
  }else {
    return {
      DAO_CANISTER_ID:"zkiie-xyaaa-aaaah-abdra-cai",
      MANAGE_CANISTER_ID:"cqhon-aaaaa-aaaah-abg6a-cai",
      IC_HOST:"https://ic0.app",
      MODCLUB_CANISTER_ID:"wg45t-qiaaa-aaaah-abflq-cai",
    }
  }
}