import React from 'react';

interface IfeatureCard {
  title: string;
  contents: string;
  imgUrl: string;
}

/// Component which displays a card with text and an image.
function FeatureCard({ title, contents, imgUrl }: IfeatureCard): JSX.Element {
  return (
    <div className="flex flex-col w-full mx-auto md:flex-row md:w-10/12">
      <div className="flex flex-col w-full md:w-1/3 mt-10">
        <h2
          className="text-color-primary text-2xl 
          tracking-tight leading-10 font-extrabold mb-4">
          {title}
        </h2>
        <p className="text-color-secondary">{contents}</p>
      </div>
      <img className="w-full md:w-2/3 pt-10" src={imgUrl} alt="" />
    </div>
  );
}

export default FeatureCard;
