import React from 'react';
import { TrendingUpIcon } from 'lucide-react';

function TrendsGraph() {
  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Air Quality Trends</h2>
      <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
        <TrendingUpIcon className="w-24 h-24 text-gray-400" />
      </div>
      <p className="mt-4 text-sm text-gray-500 text-center">
        Trends graph will be displayed here.
      </p>
    </div>
  );
}

export default TrendsGraph;