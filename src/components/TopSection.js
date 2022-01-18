import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ADD_ITEM, TOGGLE_THEME } from '../action';
import {
   sun,
   moon,
   bgMobileDark,
   bgDesktopDark,
   bgMobileLight,
   bgDesktopLight,
} from '../images';
import { variables } from '../styles/globalStyles';

const TopSection = ({
   toggleTheme,
   addItem,
   darkMode,
   allTasks,
   filteredTasks,
}) => {
   const [input, setInput] = useState('');
   const [error, setError] = useState({ status: false, msg: '' });
   const [success, setSuccess] = useState({ status: false, msg: '' });

   const submitItem = (e) => {
      setError({ status: false, msg: '' });
      setSuccess({ status: false, msg: '' });
      e.preventDefault();

      if (input.trim() === '') {
         setError({ status: true, msg: 'Please input value' });
      } else {
         addItem(input);
         setSuccess({ status: true, msg: 'Item added' });
      }

      setInput('');
   };

   useEffect(() => {
      let timer = setTimeout(() => {
         setError({ status: false, msg: '' });
         setSuccess({ status: false, msg: '' });
      }, 5000);

      return () => {
         clearTimeout(timer);
      };
   }, [error, success]);

   useEffect(() => {
      localStorage.setItem('tasks', JSON.stringify(allTasks));
   }, [allTasks, filteredTasks]);

   return (
      <TopRoot darkMode={darkMode}>
         <div className='inner-wrap container'>
            <div className='top'>
               <h1>ToDo</h1>
               <button className='theme-btn' onClick={toggleTheme}>
                  {darkMode ? (
                     <img src={sun} alt='sun' />
                  ) : (
                     <img src={moon} alt='moon' />
                  )}
               </button>
            </div>
            <div className='btm'>
               <form onSubmit={submitItem}>
                  <div className='form-group'>
                     {error.status && (
                        <small className='status-msg  error'>{error.msg}</small>
                     )}
                     {success.status && (
                        <small className='status-msg success'>
                           {success.msg}
                        </small>
                     )}
                     <div className='circle'></div>
                     <input
                        type='text'
                        value={input}
                        placeholder='Create a new todo...'
                        onChange={(e) => setInput(e.target.value)}
                     />
                  </div>
               </form>
            </div>
         </div>
      </TopRoot>
   );
};

const mapDispatchToProps = (dispatch, ownProps) => {
   const toggleTheme = () => dispatch({ type: TOGGLE_THEME });

   const addItem = (input) => dispatch({ type: ADD_ITEM, payload: { input } });

   return { toggleTheme, addItem };
};

const mapStateToProps = (state) => {
   return {
      darkMode: state.darkMode,
      allTasks: state.allTasks,
      filteredTasks: state.filteredTasks,
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopSection);

const TopRoot = styled.section`
   min-height: 35vh;
   position: relative;
   display: flex;
   gap: 2rem;
   flex-direction: column;
   align-items: center;
   background-image: ${({ darkMode }) =>
      darkMode ? `url(${bgMobileDark})` : `url(${bgMobileLight})`};
   background-repeat: no-repeat;
   background-size: cover;

   .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2rem;

      h1 {
         text-transform: uppercase;
         letter-spacing: 10px;
         color: #fff;
      }

      .theme-btn {
         border: none;
         outline: none;
         background: none;
         cursor: pointer;
      }
   }

   .btm {
      .form-group {
         position: relative;
         display: grid;
         grid-template-columns: auto 1fr;
         align-items: center;
         gap: 1rem;
         padding: 0 1.5rem;
         background: ${(props) => props.theme.bodyAlt};
         border-radius: 5px;

         .status-msg {
            position: absolute;
            color: red;
            right: 1rem;
            top: 50%;
            transform: translateY(-50%);
            font-size: 1rem;

            &.error {
               color: red;
            }

            &.success {
               color: ${(props) => props.theme.blue};
            }
         }

         .circle {
            border-radius: 50%;
            border: 1px solid ${(props) => props.theme.check};
            width: 20px;
            height: 20px;
         }

         input {
            width: 100%;
            padding: 1.5rem 0;
            border: none;
            outline: none;
            color: ${(props) => props.theme.text};
            background: ${(props) => props.theme.bodyAlt};
            font-size: 16px;
            margin-bottom: 0;

            &::placeholder {
               line-height: 1;
               margin-bottom: 0;
            }

            @media screen and (min-width: ${variables.breakpoints.tablet}px) {
               font-size: 18px;
            }
         }
      }
   }

   @media screen and (min-width: ${variables.breakpoints.tablet}px) {
      min-height: 40vh;
      background-image: ${({ darkMode }) =>
         darkMode ? `url(${bgDesktopDark})` : `url(${bgDesktopLight})`};

      h1 {
         font-size: 2.5rem;
      }

      input {
         font-size: 18px;
      }
   }
`;
