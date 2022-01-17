import React, { useState } from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { FILTER_TASKS } from '../action';

const BtnContainer = ({ filterTasks }) => {
   const [current, setCurrent] = useState('All');

   return (
      <BtnContainerRoot
         onClick={(e) => {
            filterTasks(e.target.textContent);
            setCurrent(e.target.textContent);
         }}
      >
         <button
            data-btn='All'
            className={current === 'All' ? 'btn active' : 'btn'}
         >
            All
         </button>
         <button
            data-btn='Active'
            className={current === 'Active' ? 'btn active' : 'btn'}
         >
            Active
         </button>
         <button className={current === 'Completed' ? 'btn active' : 'btn'}>
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

export default connect(null, mapDispatchToProps)(BtnContainer);

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
