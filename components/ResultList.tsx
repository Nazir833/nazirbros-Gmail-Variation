import React from 'react';
import { GeneratedEmail } from '../types';

interface ResultListProps {
  emails: GeneratedEmail[];
  onCopy: (id: string, email: string) => void;
  onDownload: () => void;
}

export const ResultList: React.FC<ResultListProps> = ({ emails, onCopy, onDownload }) => {
  if (emails.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Generated Results <span className="text-gray-400 text-sm font-normal">({emails.length})</span>
        </h2>
        <button
          onClick={onDownload}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors w-full sm:w-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download All
        </button>
      </div>

      <div className="space-y-3">
        {emails.map((item) => {
          const isLimitReached = item.copyCount >= 2;
          
          return (
            <div 
              key={item.id} 
              className={`flex items-center justify-between p-3 rounded-lg border ${
                isLimitReached ? 'bg-gray-50 border-gray-100' : 'bg-white border-gray-200 hover:border-blue-300'
              } transition-colors group`}
            >
              <div className="min-w-0 flex-1 mr-4">
                <p className={`font-mono text-sm truncate ${isLimitReached ? 'text-gray-400' : 'text-gray-700'}`}>
                  {item.email}
                </p>
              </div>
              
              <button
                onClick={() => onCopy(item.id, item.email)}
                disabled={isLimitReached}
                className={`flex-shrink-0 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  isLimitReached
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 active:scale-95'
                }`}
              >
                {isLimitReached ? 'Copied 2x' : item.copyCount === 1 ? 'Copy (1 left)' : 'Copy'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
