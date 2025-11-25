import React from 'react';
import { Loader as LoaderIcon } from 'lucide-react';

const Loader = ({ size = 48, text = '' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <LoaderIcon size={size} className="animate-spin text-yellow-500 mb-4" />
      {text && <p className="text-gray-600">{text}</p>}
    </div>
  );
};

export default Loader;