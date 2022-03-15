/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import populateDb from '../../services/Firebase/WriteData/populateDb';

/// WARNING: Should only be used for development.
/// This button will populate the DB with some fake data.
//
// eslint-disable-next-line react/function-component-definition
const PopulateDbButton: any = () => {
  const onClick = (event: any): void => {
    populateDb();
  };

  return (
    <button className="btn-filled mx-4" type="button" onClick={onClick}>
      Populate DB for testing
    </button>
  );
};

export default PopulateDbButton;
