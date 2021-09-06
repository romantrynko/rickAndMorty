import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import { Characters } from '../characters/Characters';
import { Episodes } from '../episodes/Episodes';
import { Locations } from '../locations/Locations';
import { MyWatchList } from '../my-watchlist/MyWatchList';
import { Header } from '../header/Header';
import { MainPage } from '../main-page/MainPage';
import { Provider } from 'react-redux';
import { myStore } from '../../store';

function App() {
  return (
    <Provider store={myStore}>
      <BrowserRouter >
        <Header />
        <Switch>
          <Route path='/' component={MainPage} exact />

          <Route path='/characters' component={Characters} exact />

          <Route path='/episode' component={Episodes} exact />

          <Route path='/location' component={Locations} exact />

          <Route path='/watchlist' component={MyWatchList} exact />
        </Switch>

      </BrowserRouter>
    </Provider>
  );
}

export default App;
