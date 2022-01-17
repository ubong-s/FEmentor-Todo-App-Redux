import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { BtnContainer, ToDoItem } from '.';
import { CLEAR_COMPLETED } from '../action';
import { variables } from '../styles/globalStyles';

const BottomSection = ({ filteredTasks, allTasks, clearCompleted }) => {
   const activeCount = allTasks.filter(
      (item) => item.status === 'active'
   ).length;

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
                     <ul>
                        {filteredTasks.map((item, index) => (
                           <ToDoItem item={item} key={index} />
                        ))}
                     </ul>
                  )}
                  <div className='footer'>
                     <p>{activeCount} active items left</p>
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
            </BottomRoot>
         )}
      </>
   );
};

const mapDispatchToProps = (dispatch, ownProps) => {
   const clearCompleted = () => dispatch({ type: CLEAR_COMPLETED });

   return { clearCompleted };
};

const mapStateToProps = (state) => {
   return { filteredTasks: state.filteredTasks, allTasks: state.allTasks };
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
