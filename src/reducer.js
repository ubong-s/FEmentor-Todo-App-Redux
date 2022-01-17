import {
   ADD_ITEM,
   TOGGLE_THEME,
   DELETE_ITEM,
   MARK_COMPLETE,
   CLEAR_COMPLETED,
   FILTER_TASKS,
} from './action';

export const reducer = (state, action) => {
   if (action.type === TOGGLE_THEME) {
      return {
         ...state,
         darkMode: !state.darkMode,
      };
   }

   if (action.type === ADD_ITEM) {
      const { input } = action.payload;

      const newItem = {
         id: new Date().valueOf(),
         title: input,
         status: 'active',
      };

      return {
         ...state,
         allTasks: [...state.allTasks, newItem],
         filteredTasks: [...state.allTasks, newItem],
      };
   }

   if (action.type === DELETE_ITEM) {
      const { id } = action.payload;

      const tempItems = state.allTasks.filter((item) => item.id !== id);

      return {
         ...state,
         allTasks: tempItems,
         filteredTasks: tempItems,
      };
   }

   if (action.type === MARK_COMPLETE) {
      const { id } = action.payload;

      const tempItems = state.allTasks.map((item) => {
         if (item.id === id) {
            if (item.status === 'completed') {
               return { ...item, status: 'active' };
            }

            return { ...item, status: 'completed' };
         }

         return item;
      });

      return {
         ...state,
         allTasks: tempItems,
         filteredTasks: tempItems,
      };
   }

   if (action.type === CLEAR_COMPLETED) {
      const tempItems = state.allTasks.filter(
         (item) => item.status !== 'completed'
      );

      return {
         ...state,
         allTasks: tempItems,
         filteredTasks: tempItems,
      };
   }

   if (action.type === FILTER_TASKS) {
      const { input } = action.payload;

      let tempItems;

      if (input === 'All') {
         tempItems = [...state.allTasks];
      } else {
         tempItems = state.allTasks.filter(
            (item) => item.status === input.toLowerCase()
         );
      }

      return {
         ...state,
         filteredTasks: tempItems,
         filter: input,
      };
   }

   return state;
};
