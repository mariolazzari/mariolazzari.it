// Application routes
import { Switch, Route, Redirect } from "react-router-dom";
// components
import Home from "../../views/Home";
import Certifications from "../../views/Certifications";
import Skills from "../../views/Skills";
import Hobbies from "../../views/Hobbies";
import Contacts from "../../views/Contacts";

// routes
const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/certifications" component={Certifications} />
    <Route path="/skills" component={Skills} />
    <Route path="/hobbies" component={Hobbies} />
    <Route path="/contacts" component={Contacts} />
    <Redirect to="/" />
  </Switch>
);

export default Routes;
