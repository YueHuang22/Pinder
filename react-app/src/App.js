import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticate } from "./store/session";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/HomePage/HomePage";
import AllDogsPage from "./components/AllDogsPage";
import "./index.css";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <ProtectedRoute path={["/dogs", "/dogs/:dogId"]} exact={true}>
          <AllDogsPage />
        </ProtectedRoute>
        <Route path={["/", "/login", "/sign-up"]} exact={true}>
          <HomePage />
        </Route>
        <Route>
          <div className="NotFound">
            <div>
              <h1>Uh Oh...</h1>
            </div>
            <div>
              <p>
                We can't always find things that we're looking for. Maybe that's
                just life.
              </p>
            </div>
            <div>
              <img
                alt=""
                src="https://images.adagio.com/images2/custom_blends/150432.jpg"
              ></img>
            </div>
          </div>
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
