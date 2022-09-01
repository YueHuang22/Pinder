import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticate } from './store/session';
import { Modal } from './context/Modal';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import SignUpForm from './components/SignUpModal/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer';
import LoginForm from './components/LoginModal/LoginForm';
import HomePage from "./components/HomePage";
import AllDogsPage from './components/AllDogsPage';
import DogDetailPage from './components/DogDetailPage/DogDetailPage';


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
        <Route path='/sign-up' exact={true}>
          <Modal>
            <SignUpForm />
          </Modal>
        </Route>
        <Route path='/login' exact={true}>
          <Modal>
            <LoginForm />
          </Modal>
        </Route>
        <ProtectedRoute path='/dogs' exact={true} >
          <AllDogsPage />
        </ProtectedRoute >
        <ProtectedRoute path='/dogs/:dogId' exact={true} >
          <DogDetailPage />
        </ProtectedRoute >
        <ProtectedRoute path='/users/:userId/playdates' exact={true}>

        </ProtectedRoute>
        <Route path='/' exact={true} >
          <HomePage />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
