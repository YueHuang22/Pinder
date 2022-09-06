import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticate } from "./store/session";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/HomePage/HomePage";
import AllDogsPage from "./components/AllDogsPage";
import DogDetailPage from "./components/DogDetailPage/DogDetailPage";

import EditDogForm from "./components/EditDogForm/EditDogForm";
import "./index.css";
import AddDogForm from "./components/AllDogsPage/AddDogModal/AddDogForm";

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
        <ProtectedRoute path="/dogs/new" exact={true}>
          <AddDogForm />
        </ProtectedRoute>
        {/* <ProtectedRoute path='/dogs/:dogId' exact={true} >
          <DogDetailPage />
        </ProtectedRoute >
        <ProtectedRoute path='/dogs/:dogId/edit' exact={true} >
          <EditDogForm />
        </ProtectedRoute > */}
        <Route path={["/", "/login", "/sign-up"]} exact={true}>
          <HomePage />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
