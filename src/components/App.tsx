import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminLogin from "./pages/AdminLogin";
import ProjectPage from "./pages/ProjectPage";
import AdminPage from "./pages/AdminPage";

function App() {
  const [state] = useState({
    pages: [
      { route: "/", component: HomePage, id: 0 },
      { route: "/admin", component: AdminLogin, id: 1 },
      { route: "/admin/:auth_token", component: AdminPage, id: 2 },
      { route: "/projects", component: ProjectPage, id: 3 },
    ],
  });
  return (
    <div className="App">
      <Router>
        <Switch>
          {state.pages.map((page) => (
            <Route exact path={page.route} key={page.id}>
              {<page.component key={page.id} />}
            </Route>
          ))}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
