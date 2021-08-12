import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import Characters from '../characters/Characters';
import Episodes from '../episodes/Episodes';
import Locations from '../locations/Locations';
import MyWatchList from '../my-watchlist/MyWatchList';
import Header from '../header/Header';
import MainPage from '../main-page/MainPage';

function App() {
  return (
    <BrowserRouter >
      <Header />
      <Switch>
        <Route path='/' component={MainPage} exact />

        <Route path='/characters' component={Characters} exact />

        <Route path='/episodes' component={Episodes} exact />

        <Route path='/locations' component={Locations} exact />

        <Route path='/watchlist' component={MyWatchList} exact />
      </Switch>

    </BrowserRouter>
  );
}

export default App;
