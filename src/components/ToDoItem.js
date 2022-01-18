import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { MARK_COMPLETE, DELETE_ITEM } from '../action';
import { check, cross } from '../images';
import { variables } from '../styles/globalStyles';

const ToDoItem = ({
   item,
   deleteItem,
   markComplete,
   index,
   dragStart,
   dragOver,
   dragDrop,
   dragLeave,
   dragEnd,
}) => {
   return (
      <ItemRoot
         draggable
         onDragStart={dragStart}
         onDragOver={dragOver}
         onDrop={dragDrop}
         onDragLeave={dragLeave}
         onDragEnd={dragEnd}
         data-index={index}
      >
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
         <p className={item.status === 'completed' ? 'complete' : undefined}>
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
   background: ${(props) => props.theme.bodyAlt};
   border-bottom: 0.5px solid ${(props) => props.theme.btn};
   transition: ${variables.misc.transitionEase};
   cursor: grab;

   &.hide {
      opacity: 0;
      height: 0;
      padding: 0;
   }

   &.over {
      background: ${(props) => props.theme.body};
      color: ${(props) => props.theme.body};
   }

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
