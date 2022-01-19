import React from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { UPDATE_FILTER } from '../action';

const BtnContainer = ({ updateFilter, filter }) => {
   return (
      <BtnContainerRoot
         onClick={(e) => {
            let value = e.target.textContent;
            updateFilter(value);
         }}
      >
         <button
            data-btn='All'
            className={filter === 'All' ? 'btn active' : 'btn'}
         >
            All
         </button>
         <button
            data-btn='Active'
            className={filter === 'Active' ? 'btn active' : 'btn'}
         >
            Active
         </button>
         <button className={filter === 'Completed' ? 'btn active' : 'btn'}>
            Completed
         </button>
      </BtnContainerRoot>
   );
};

const mapDispatchToProps = (dispatch) => {
   const updateFilter = (input) =>
      dispatch({ type: UPDATE_FILTER, payload: { input } });

   return { updateFilter };
};
const mapStateToProps = (state) => {
   return { filter: state.filter };
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
