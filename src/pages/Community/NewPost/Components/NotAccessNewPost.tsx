import React from 'react';
import { Link } from 'react-router-dom';

export default function NotAccessNewPost(): JSX.Element {
  return (
    <div className="text-center text-color-0 mt-10">
      <p>
        You can not create posts for this community. To do so, you must own the
        community&apos;s token
      </p>
      <Link to="/">Go back home</Link>
    </div>
  );
}
