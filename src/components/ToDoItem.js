import styled from '@emotion/styled';
import React from 'react';
import { connect } from 'react-redux';
import { MARK_COMPLETE, DELETE_ITEM } from '../action';
import { check, cross } from '../images';
import { variables } from '../styles/globalStyles';

const ToDoItem = ({ item, deleteItem, markComplete }) => {
   return (
      <ItemRoot>
         <button
            className={
               item.status === 'completed'
                  ? 'btn circle complete'
                  : 'btn circle'
            }
            onClick={() => markComplete(item.id)}
         >
            {item.status === 'completed' && <img src={check} alt='' />}
         </button>
         <p
            className={item.status === 'completed' ? 'complete' : undefined}
            onClick={() => markComplete(item.id)}
         >
            {item.title}
         </p>
         <button className='btn delete-btn' onClick={() => deleteItem(item.id)}>
            <img src={cross} alt='delete' />
         </button>
      </ItemRoot>
   );
};

const mapDispatchToProps = (dispatch, ownProps) => {
   const deleteItem = (id) => dispatch({ type: DELETE_ITEM, payload: { id } });
   const markComplete = (id) =>
      dispatch({ type: MARK_COMPLETE, payload: { id } });

   return { deleteItem, markComplete };
};

export default connect(null, mapDispatchToProps)(ToDoItem);

const ItemRoot = styled.li`
   display: grid;
   grid-template-columns: auto 1fr auto;
   align-items: center;
   gap: 1rem;
   padding: 1.5rem;
   border-bottom: 0.5px solid ${(props) => props.theme.btn};

   .circle {
      border-radius: 50%;
      border: 1px solid ${(props) => props.theme.check};
      width: 20px;
      height: 20px;

      &.complete {
         background: ${(props) => props.theme.gradient};
      }
   }

   p {
      margin-bottom: 0;
      cursor: pointer;

      &.complete {
         color: ${(props) => props.theme.btn};
         text-decoration: line-through;
      }
   }

   @media screen and (min-width: ${variables.breakpoints.desktop}px) {
      .delete-btn {
         visibility: hidden;
         transition: ${variables.misc.transitionEase};
      }

      &:hover {
         .delete-btn {
            visibility: visible;
         }
      }
   }
`;
