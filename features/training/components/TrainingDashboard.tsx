import React, { useState, useEffect } from 'react';
import { phase2Training, TrainingDataset, FineTuningJob } from '../../../services/phase2TrainingService';

export const TrainingDashboard: React.FC = () => {
  const [datasets, setDatasets] = useState<TrainingDataset[]>([]);
  const [jobs, setJobs] = useState<FineTuningJob[]>([]);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 3000);
    return () => clearInterval(interval);
  }, []);

  const loadData = () => {
    setDatasets(phase2Training.getTrainingDatasets());
    setJobs(phase2Training.getFineTuningJobs());
  };

  const progress = phase2Training.getTrainingProgress();
  const recommendations = phase2Training.getTrainingRecommendations();
  const estimates = phase2Training.getTrainingEstimates();

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">{progress.totalDatasets}</div>
          <div className="text-gray-600">Total Datasets</div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">{progress.completedTraining}</div>
          <div className="text-gray-600">Completed Training</div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-yellow-600 mb-2">{progress.inProgress}</div>
          <div className="text-gray-600">In Progress</div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">{progress.averageAccuracy.toFixed(1)}%</div>
          <div className="text-gray-600">Avg. Accuracy</div>
        </div>
      </div>

      {/* Training Timeline & Estimates */}
      <div className="bg-white rounded-lg shadow border p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Training Timeline & Investment</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">{estimates.totalTime}</div>
            <div className="text-gray-600">Total Timeline</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">${estimates.totalCost.toLocaleString()}</div>
            <div className="text-gray-600">Total Investment</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">{datasets.filter(d => d.trainingStatus === 'pending').length}</div>
            <div className="text-gray-600">Pending Training</div>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-semibold text-gray-700 mb-3">Training Phases:</h4>
          <div className="space-y-3">
            {estimates.phases.map((phase, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-800">{phase.phase}</div>
                  <div className="text-sm text-gray-600">{phase.datasets.join(', ')}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-800">{phase.duration}</div>
                  <div className="text-sm text-green-600">${phase.cost.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dataset Management */}
      <div className="bg-white rounded-lg shadow border p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Dataset Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {datasets.map(dataset => (
            <div key={dataset.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-800">{dataset.name}</h4>
                <span className={`px-2 py-1 text-xs rounded ${
                  dataset.trainingStatus === 'completed' ? 'bg-green-100 text-green-800' :
                  dataset.trainingStatus === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {dataset.trainingStatus}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{dataset.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{dataset.dataPoints.toLocaleString()} points</span>
                <span className="text-blue-600">{dataset.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
