import React, { useState, useEffect } from 'react';
import { phase2Training } from '../../services/phase2TrainingService';
import { phase3Capabilities } from '../../services/phase3AdvancedCapabilities';
import { TrainingDashboard } from './components/TrainingDashboard';
import { AdvancedToolsPanel } from './components/AdvancedToolsPanel';

export const AITrainingDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'training' | 'tools'>('training');

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Training & Advanced Tools</h1>
        <p className="text-gray-600">Manage training data and access advanced architectural AI tools</p>
      </div>

      <div className="bg-white rounded-lg shadow border mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-1 px-6">
            <button
              onClick={() => setSelectedTab('training')}
              className={`py-3 px-4 text-sm font-medium rounded-t-lg transition-colors ${
                selectedTab === 'training'
                  ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              🎓 Training Dashboard
            </button>
            <button
              onClick={() => setSelectedTab('tools')}
              className={`py-3 px-4 text-sm font-medium rounded-t-lg transition-colors ${
                selectedTab === 'tools'
                  ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              🛠️ Advanced Tools
            </button>
          </nav>
        </div>

        <div className="p-6">
          {selectedTab === 'training' ? <TrainingDashboard /> : <AdvancedToolsPanel />}
        </div>
      </div>
    </div>
  );
};

export default AITrainingDashboard;
