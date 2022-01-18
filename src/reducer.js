import {
   ADD_ITEM,
   TOGGLE_THEME,
   DELETE_ITEM,
   MARK_COMPLETE,
   CLEAR_COMPLETED,
   FILTER_TASKS,
   SORT_TASKS,
   UPDATE_SORT,
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
         filter: 'All',
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
         filter: 'All',
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

   if (action.type === UPDATE_SORT) {
      const { start, end } = action.payload;

      return {
         ...state,
         startIndex: start,
         endIndex: end,
      };
   }

   if (action.type === SORT_TASKS) {
      let { startIndex, endIndex } = state;
      let tempItems = [...state.allTasks];
      let tempPerson = tempItems[state.startIndex];

      if (
         (startIndex && endIndex) ||
         (startIndex === 0 && endIndex) ||
         (startIndex && endIndex === 0)
      ) {
         tempItems.splice(startIndex, 1);
         tempItems.splice(endIndex, 0, tempPerson);
      }

      return {
         ...state,
         allTasks: tempItems,
         filteredTasks: tempItems,
      };
   }

   return state;
};
