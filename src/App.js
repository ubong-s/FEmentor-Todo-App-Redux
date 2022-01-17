import { Layout } from './components';
import { reducer } from './reducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// initialStore

const initialStore = {
   darkMode: true,
   allTasks: [],
   filteredTasks: [],
};

// store
const store = createStore(reducer, initialStore);

function App() {
   return (
      <Provider store={store}>
         <Layout />
      </Provider>
   );
}

export default App;
