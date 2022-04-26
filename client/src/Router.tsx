import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
