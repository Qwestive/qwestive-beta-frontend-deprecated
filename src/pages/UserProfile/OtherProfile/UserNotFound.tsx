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
    <div className="max-w-5xl mx-auto text-center mt-10 ">
      <p className="text-xl font-bold text-color-primary ">User</p>
      <p className=" text-2xl font-bold text-color-primary mt-2">{userName}</p>
      <p className="text-xl font-bold text-color-primary mt-2">Not Found</p>
      <div className="mt-5">
        <Link to="/">
          <button type="button" className="btn-filled">
            Navigate Back Home
          </button>
        </Link>
      </div>
    </div>
  );
}
