import React from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { FILTER_TASKS } from '../action';

const BtnContainer = ({ filterTasks, filterValue }) => {
   return (
      <BtnContainerRoot
         onClick={(e) => {
            let value = e.target.textContent;
            filterTasks(value);
         }}
      >
         <button
            data-btn='All'
            className={filterValue === 'All' ? 'btn active' : 'btn'}
         >
            All
         </button>
         <button
            data-btn='Active'
            className={filterValue === 'Active' ? 'btn active' : 'btn'}
         >
            Active
         </button>
         <button className={filterValue === 'Completed' ? 'btn active' : 'btn'}>
            Completed
         </button>
      </BtnContainerRoot>
   );
};

const mapDispatchToProps = (dispatch) => {
   const filterTasks = (input) =>
      dispatch({ type: FILTER_TASKS, payload: { input } });

   return { filterTasks };
};
const mapStateToProps = (state) => {
   return { filterValue: state.filter };
};

export default connect(mapStateToProps, mapDispatchToProps)(BtnContainer);

const BtnContainerRoot = styled.div`
   display: flex;
   align-items: center;
   gap: 2rem;
   justify-content: center;

   .btn {
      &.active {
         color: ${(props) => props.theme.blue};
      }
   }
`;
