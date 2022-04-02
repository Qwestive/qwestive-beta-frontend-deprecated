import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage(): JSX.Element {
  return (
    <div className="min-h-full page-frame max-w-7xl">
      <main className="py-16">
        <div className="text-center">
          <p
            className="text-base font-semibold 
            text-indigo-600 uppercase tracking-wide">
            404 error
          </p>
          <h1
            className="mt-2 text-4xl font-extrabold 
              text-color-0
            tracking-tight sm:text-5xl">
            Page not found.
          </h1>
          <p className="mt-2 text-base text-color-secondary">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="text-base font-medium 
                text-indigo-600 hover:text-indigo-500 hover:underline">
              Go back home<span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
