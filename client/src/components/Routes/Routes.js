import { lazy, Suspense } from "react";
import Backdrop from "@material-ui/core/Backdrop";
// Application routes
import { Switch, Route, Redirect } from "react-router-dom";
// components
const Home = lazy(() => import("../../views/Home"));
const Certifications = lazy(() => import("../../views/Certifications"));
const Skills = lazy(() => import("../../views/Skills"));
const Hobbies = lazy(() => import("../../views/Hobbies"));
const Contacts = lazy(() => import("../../views/Contacts"));

// routes
const Routes = () => (
  <Suspense fallback={<Backdrop />}>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/certifications" component={Certifications} />
      <Route path="/skills" component={Skills} />
      <Route path="/hobbies" component={Hobbies} />
      <Route path="/contacts" component={Contacts} />
      <Redirect to="/" />
    </Switch>
  </Suspense>
);

export default Routes;
