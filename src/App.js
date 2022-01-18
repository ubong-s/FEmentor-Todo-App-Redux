import { Layout } from './components';
import { reducer } from './reducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const getLocalStorage = () => {
   let items = localStorage.getItem('tasks');
   if (items) {
      return JSON.parse(localStorage.getItem('tasks'));
   } else {
      return [];
   }
};

// initialStore
const initialStore = {
   darkMode: true,
   allTasks: getLocalStorage(),
   filteredTasks: getLocalStorage(),
   startIndex: null,
   endIndex: null,
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
