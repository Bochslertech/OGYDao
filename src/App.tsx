import * as React from "react"
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import Index from "./pages/Index";
import CreateProposal from "./pages/CreateProposal";
import ModClubVerify from "./pages/ModClubVerify";
import ClaimCycles from "./pages/ClaimCycles";
import ClaimCanister from "./pages/ClaimCanister";
import Snapshot from "./pages/Snapshot";
import Allowance from "./pages/Allowance";
import CheckAsset from "./pages/CheckAsset";

const queryClient = new QueryClient();
export const App = () => (
  <QueryClientProvider client={queryClient} >
  <ChakraProvider theme={theme}>
    <Router>
      <ScrollToTop/>
      <Header/>
      <Switch>
        {/*<Route exact path="/">*/}
        {/*    <Redirect to="/index" />*/}
        {/*</Route>*/}
        <Route exact path="/" component={Index} />
        <Route exact path="/create_proposal" component={CreateProposal} />
        <Route exact path="/modclub_verify" component={ModClubVerify} />
        <Route exact path="/claim_cycles" component={ClaimCycles} />
        <Route exact path="/claim_canister" component={ClaimCanister} />
        <Route exact path="/snapshot" component={Snapshot} />
        <Route exact path="/allowance" component={Allowance} />
        <Route exact path="/check_asset" component={CheckAsset} />
      </Switch>
    </Router>
  </ChakraProvider>
  </QueryClientProvider>
)
