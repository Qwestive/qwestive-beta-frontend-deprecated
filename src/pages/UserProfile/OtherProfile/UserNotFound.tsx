import React from 'react';
import { Link } from 'react-router-dom';

type TuserName = {
  userName: string | undefined;
};
/*
TODO:
- style
*/
export default function UserNotFound({ userName }: TuserName): JSX.Element {
  return (
    <div className="max-w-5xl mx-auto">
      <p>User </p>
      <p>{userName}</p>
      <p>Not Found</p>
      <button type="button" className="btn-filled">
        <Link to="/Home">Navigate Back Home</Link>
      </button>
    </div>
  );
}
