import React from 'react';
import { DocumentData } from 'firebase/firestore';

/*
TODO:
- Populate
*/
export default function UserFound({ userData }: DocumentData): JSX.Element {
  function logUserData() {
    // eslint-disable-next-line no-console
    console.log(userData);
  }
  return (
    <div className="mx-auto max-w-5xl">
      <p>User Found</p>
      <button type="button" className="btn-filled" onClick={logUserData}>
        Log user data
      </button>
    </div>
  );
}
