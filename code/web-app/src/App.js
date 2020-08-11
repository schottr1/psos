import React from 'react';
import './App.css';
import Header from './components/header/header';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
// import RedirectUser from './redirectUser';
// import { NotFound } from './notFound';
import DashboardPage from './pages/Dashboard'; 

const App = () => {
  return (
    <BrowserRouter>
      <Header></Header>
      <Switch>
        <Route path="/" exact component={() => <Redirect to="/dashboard" />} />
        <Route path="/dashboard" exact component={DashboardPage} /> 
      </Switch>
    </BrowserRouter>
  );
};

export default App;
