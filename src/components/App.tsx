import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";

function App() {
  const [state] = useState({
    pages: [
      { route: "/", component: HomePage, id: 0 },
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
