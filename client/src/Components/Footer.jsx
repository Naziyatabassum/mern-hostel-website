import React from 'react';
import srkrLogo from '../assets/srkrlogo.jpg'; // Import the logo directly

const Footer = () => {
  return (
    <footer className="w-full">
      {/* Main Footer */}
      <div className="w-full bg-[#076593] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* About Section */}
            <div className="flex flex-col">
              <h2 className="text-xl sm:text-2xl font-bold mb-6 border-b border-blue-400 pb-2">About SRKR</h2>
              <p className="text-sm sm:text-base leading-relaxed">
                Sagi Rama Krishnam Raju Engineering College (SRKREC), established in 1980, is a self-financed academic institution of coeducation striving to provide a high quality technical education to engineering aspirants. Being one of the premier and well-established technical institutions of the country, it continues to render service to the nation and the world at large with its alumni holding highly prestigious positions and making substantial contribution.
              </p>
            </div>

            {/* Contact Us */}
            <div className="flex flex-col">
              <h2 className="text-xl sm:text-2xl font-bold mb-6 border-b border-blue-400 pb-2">Contact Us</h2>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center mb-4">
                  <img src={srkrLogo} alt="SRKR Logo" className="h-16 w-16 object-contain mb-2 sm:mb-0 sm:mr-4" />
                  <div>
                    <p className="font-semibold text-base sm:text-lg">Sagi Rama Krishnam Raju (SRKR) Engineering College</p>
                    <p className="text-blue-200 text-sm sm:text-base">(Autonomous)</p>
                  </div>
                </div>

                <div className="flex items-start pt-1">
                  <svg className="w-5 h-5 mt-0.5 mr-2 text-blue-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-sm">SRKR Marg, China Amiram,</p>
                    <p className="text-sm">Bhimavaram, A.P, India - 534204</p>
                  </div>
                </div>

                <div className="pt-1 space-y-3">
                  <p className="text-sm flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span className="font-semibold">Mobile:</span>&nbsp;+91 9949844004
                  </p>
                  <p className="text-sm flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="font-semibold">Email:</span>&nbsp;principal@srkec.ac.in
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="w-full bg-blue-800 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            <span className="uppercase font-semibold">WEB DEVELOPMENT TEAM</span>
            <br />
            © 2025 | All Rights Reserved | SRKR Engineering College, Bhimavaram.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
