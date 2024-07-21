import React, { useState } from 'react';
import styled from 'styled-components';

const ToggleCont = styled.div`
  display: flex;
  border-radius: 5px;
  background-color: #e0dff6;
  margin-bottom: 20px;
`;

const ToggleButt = styled.button`
  flex: 1;
  padding: 12px 20px; /* Increase padding for larger button */
  border-radius: 8px;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: ${({ active }) => (active ? '#6d4ad6' : 'transparent')};
  color: ${({ active }) => (active ? 'white' : '#6d4ad6')};
  transition: background-color 0.3s, color 0.3s;
  white-space: nowrap; /* Prevent text wrapping */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;

  &:hover {
    background-color: #a594f9;
    color: white;
  }
`;

const Toggle = ({ active, setActive }) => (
  <ToggleCont>
    <ToggleButt
      active={active === 'browse'}
      onClick={() => setActive('browse')}
    >
      browse reviews
    </ToggleButt>
    <ToggleButt
      active={active === 'write'}
      onClick={() => setActive('write')}
    >
      write a review
    </ToggleButt>
  </ToggleCont>
);

export default Toggle;
