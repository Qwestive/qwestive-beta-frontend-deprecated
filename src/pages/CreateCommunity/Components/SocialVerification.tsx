import React from 'react';
import DiscordLogo from 'assets/SocialLogos/discord.png';
import TwitterLogo from 'assets/SocialLogos/twitter.png';

export default function SocialVerification(): JSX.Element {
  const socialConnect = [
    { name: 'Verify twitter', logo: TwitterLogo },
    { name: 'Connect discord bot', logo: DiscordLogo },
  ];
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-color-1 text-lg font-bold">Social Verification</h2>
        <h3 className="text-sm font-medium text-color-secondary">
          Connect and verify your social network
        </h3>
      </div>
      <div>
        <div
          className="max-w-md mx-auto space-y-3 divide-y 
              divide-gray-500 mt-5 px-2">
          {socialConnect.map((social) => (
            <div key={social.name}>
              <p className="text-center mt-2 text-color-1 font-semibold">
                Coming Soon!
              </p>
              <div
                className="opacity-30 flex items-center justify-between 
              py-2">
                <div className="flex gap-5 items-center">
                  <img
                    src={social.logo}
                    alt="socialLogo"
                    className="rounded-full h-10"
                  />
                  <p className="font-bold text-color-1">{social.name}</p>
                </div>
                <button
                  type="button"
                  className="px-4 button-action h-7 text-sm"
                  disabled>
                  <p className="text-sm mx-auto">Connect</p>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
