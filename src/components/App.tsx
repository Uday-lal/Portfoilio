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
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img
            src="/assets/maintenance.svg"
            style={{ width: "40%", height: "40%" }}
            alt="Maintenance Image"
          />
          <h2
            style={{
              color: "white",
              textAlign: "center",
              width: "80%",
              marginTop: "50px",
            }}
          >
            Uday's portfolio website is under mentaince right now 😊. This
            website will live by 4-3-2023
          </h2>
        </div>
      </div>
      {/* <Router>
        <Switch>
          {state.pages.map((page) => (
            <Route exact path={page.route} key={page.id}>
              {<page.component key={page.id} />}
            </Route>
          ))}
        </Switch>
      </Router> */}
    </div>
  );
}

export default App;
