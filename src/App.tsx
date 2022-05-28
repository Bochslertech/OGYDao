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
      </Switch>
    </Router>
  </ChakraProvider>
  </QueryClientProvider>
)
