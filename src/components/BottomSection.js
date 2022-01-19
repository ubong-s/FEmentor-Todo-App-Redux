import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { BtnContainer, ToDoItem } from '.';
import {
   CLEAR_COMPLETED,
   FILTER_TASKS,
   SORT_TASKS,
   UPDATE_SORT,
} from '../action';
import { variables } from '../styles/globalStyles';

const BottomSection = ({ state, clearCompleted }) => {
   const dispatch = useDispatch();
   const { filteredTasks, allTasks, filter } = state;

   const [start, setStart] = useState(null);
   const [end, setEnd] = useState(null);

   const dragDrop = (e) => {
      e.currentTarget.classList.remove('over');
      let endValue = +e.currentTarget.dataset.index;
      setEnd(endValue);
   };

   const dragStart = (e) => {
      let startValue = +e.currentTarget.dataset.index;
      setStart(startValue);
   };

   const dragEnd = (e) => {
      e.currentTarget.classList.remove('hide');
   };

   const dragOver = (e) => {
      e.currentTarget.classList.add('over');
      e.preventDefault();
   };

   const dragLeave = (e) => {
      e.currentTarget.classList.remove('over');
   };

   const activeCount = allTasks.filter(
      (item) => item.status === 'active'
   ).length;

   useEffect(() => {
      dispatch({ type: UPDATE_SORT, payload: { start, end } });
      setEnd(null);
      setEnd(null);
      console.log('Update sort');
      // eslint-disable-next-line
   }, [start, end]);

   useEffect(() => {
      dispatch({ type: SORT_TASKS });
      console.log('Sort tasks');
      // eslint-disable-next-line
   }, [start, end]);

   useEffect(() => {
      console.log('filter tasks');
      dispatch({ type: FILTER_TASKS });
   }, [filter, allTasks]);

   return (
      <>
         {allTasks.length < 1 ? (
            <Empty>
               <div className='container'>
                  <p>Todo list is empty. Start adding items</p>
               </div>
            </Empty>
         ) : (
            <BottomRoot>
               <div className='inner-wrap container'>
                  {filteredTasks.length < 1 ? (
                     <div className='list-empty'>
                        <p>Empty</p>
                     </div>
                  ) : (
                     <ul className='list'>
                        {filteredTasks.map((item, index) => (
                           <ToDoItem
                              item={item}
                              key={index}
                              index={index}
                              dragStart={dragStart}
                              dragDrop={dragDrop}
                              dragLeave={dragLeave}
                              dragOver={dragOver}
                              drag={dragEnd}
                           />
                        ))}
                     </ul>
                  )}
                  <div className='footer'>
                     <p>{activeCount} items left</p>
                     <div className='desktop'>
                        <BtnContainer />
                     </div>
                     <button className='btn' onClick={clearCompleted}>
                        clear completed
                     </button>
                  </div>
               </div>
               <div className='mobile btn-group container'>
                  <BtnContainer />
               </div>
               <div className='drag container'>
                  <p>Drag and drop to reorder list</p>
               </div>
            </BottomRoot>
         )}
      </>
   );
};

const mapDispatchToProps = (dispatch) => {
   const clearCompleted = () => dispatch({ type: CLEAR_COMPLETED });
   // const sortTasks = (start, end) =>
   //    dispatch({ type: SORT_TASKS, payload: { start, end } });

   return { clearCompleted };
};

const mapStateToProps = (state) => {
   return { state };
};

export default connect(mapStateToProps, mapDispatchToProps)(BottomSection);

const BottomRoot = styled.section`
   min-height: 65vh;
   padding-bottom: 5rem;

   .inner-wrap {
      position: relative;
      border-radius: 5px;
      background: ${(props) => props.theme.bodyAlt};
      margin-top: -2rem;
      margin-bottom: 1.5rem;
      z-index: 10;
   }

   .list-empty {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100px;
      border-bottom: 0.5px solid ${(props) => props.theme.btn};
   }

   .footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.5rem;

      p {
         color: ${(props) => props.theme.btn};
      }
   }

   .btn {
      color: ${(props) => props.theme.btn};
   }

   .btn-group {
      padding: 2rem 1.5rem;
      background: ${(props) => props.theme.bodyAlt};
      border-radius: 5px;
   }

   .drag {
      margin-top: 4rem;
      text-align: center;

      p {
         color: ${(props) => props.theme.btn};
      }
   }

   .desktop {
      display: none;
   }

   @media screen and (min-width: ${variables.breakpoints.desktop}px) {
      .mobile {
         display: none;
      }

      .desktop {
         display: initial;
      }
   }
`;

const Empty = styled.div`
   height: 30vh;
   display: flex;
   align-items: center;
   justify-content: center;
   text-align: center;

   p {
      font-size: 1.5rem;
   }
`;
