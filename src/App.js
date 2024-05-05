/**
 * 
 * App
 * @author - NA 
 * @date - 5th May, 2024
 * 
 */
// GENERIC IMPORT
import { Provider } from 'react-redux';

// USER LEVEL IMPORT
import HomePage from './view/pages/home';
import store from './redux/store';

// STYLE
import './app.css';

function App() {
  return (
    <Provider store={store}>
      <div className='app'>
        <HomePage />
      </div>
    </Provider>
  );
}

export default App;
