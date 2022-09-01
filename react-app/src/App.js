import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SignUpForm from './components/Auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import HomePage from "./components/HomePage";
import AllDogPage from './components/AllDogPage';
import LoginModal from './components/LoginModal';
import { authenticate } from './store/session';

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
          <SignUpForm />
        </Route>
        <Route path='/login' exact={true}>
          <LoginModal />
        </Route>
        <ProtectedRoute path='/dogs' exact={true} >
          <AllDogPage />
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
