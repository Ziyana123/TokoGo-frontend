import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-lg font-semibold">TokoGo</div>
          <div className="flex space-x-6">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 text-sm md:text-base"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 text-sm md:text-base"
            >
              Instagram
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 text-sm md:text-base"
            >
              Twitter
            </a>
          </div>
        </div>
        <p className="text-center text-sm mt-4 text-gray-400">
          © {new Date().getFullYear()} TokoGo. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
