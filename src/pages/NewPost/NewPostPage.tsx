import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import NewPostTabs from './NewPostTabs';

/*
TODO: check credentials
*/

export default function NewPostPage(): JSX.Element {
  const { cId } = useParams<'cId'>();

  const [hasAccess, setHasAccess] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);

  async function handleLoadPage() {
    setLoadingPage(true);
    if (cId !== undefined) {
      try {
        // TODO: check credentials
        setHasAccess(true);

        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      } catch (error: any) {
        toast.error(error?.message);
      }
    }
    setLoadingPage(false);
  }

  useEffect(() => {
    handleLoadPage();
  }, [cId]);

  return (
    <div className="max-w-5xl mx-auto px-2 mt-5">
      {loadingPage && <p>Loading..</p>}
      {!loadingPage && hasAccess && cId !== undefined && (
        <NewPostTabs cId={cId} />
      )}
      {!loadingPage && !hasAccess && (
        <div>
          <p>
            You can not create posts for this community. To do so, you must own
            the community&apos;s token
          </p>
          <Link to="/">Go back home</Link>
        </div>
      )}
    </div>
  );
}
