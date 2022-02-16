import React from 'react';
import defaultUserProfileImage from '../../../assets/defaultUserProfileImage.png';

function CommunityCarousel(): JSX.Element {
  const communities = [1, 2, 3, 4];
  return (
    <div
      id="hideScrollBar"
      className="flex flex-no-wrap overflow-x-scroll scrolling-touch
       items-start mb-8">
      {communities.map((item) => (
        <div key={item} className="flex-none w-2/3 md:w-1/3 pb-8">
          <a href="www.test.com" className="space-y-4">
            <div className="aspect-w-16 aspect-h-9 flex flex-col text-center">
              <img
                className="h-40 w-40 object-cover shadow-md hover:shadow-xl
                 rounded-full mx-auto"
                src={defaultUserProfileImage}
                alt=""
              />
              <h3 className="">Solana Foundation </h3>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}

export default CommunityCarousel;
