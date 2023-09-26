// components/Config.tsx

import React from 'react';


const Config: React.FC = () => {
    return (
      <div>
        <div className="bg-gray-200 p-4 rounded-md mx-5 mt-5">
          {/* Add your configuration options here */}
          <div className="mb-4">
            <label htmlFor="config-input-tester-id" className="block text-gray-700 font-bold mb-2">
              Type a test id for future reference (do not type the name, id or any other identifiable information):
            </label>
            <input
              type="text"
              id="config-input-tester-id"
              className="border rounded-md p-2 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="config-input-result-email" className="block text-gray-700 font-bold mb-2">
              Type the email to send the results after test is done:
            </label>
            <input
              type="text"
              id="config-input-result-email"
              className="border rounded-md p-2 focus:outline-none"
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
          >
            Start test
          </button>
        </div>
      </div>
    );
};

export default Config;
  
  
  
  
  