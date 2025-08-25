// src/pages/Phase2Demo.tsx
// Phase 2 Demo Page showcasing Custom Training & Advanced AI Capabilities

import React, { useState } from 'react';
import AITrainingDashboard from '../features/training/AITrainingDashboard';
import AdvancedAITools from '../components/AdvancedAITools';
import ThreeDInteriorConverter from '../components/3DInteriorConverter';
import { phase2Training } from '../services/phase2TrainingService';

const Phase2Demo: React.FC = () => {
  const [activeView, setActiveView] = useState<'overview' | 'training' | 'tools' | 'capabilities' | '3d-conversion'>('overview');
  const [showQuickStart, setShowQuickStart] = useState(false);

  const capabilities = phase2Training.getAdvancedCapabilities();
  const progress = phase2Training.getTrainingProgress();
  const estimates = phase2Training.getTrainingEstimates();

  const getCapabilityIcon = (capability: keyof typeof capabilities) => {
    return capabilities[capability] ? '✅' : '❌';
  };

  const getCapabilityStatus = (capability: keyof typeof capabilities) => {
    return capabilities[capability] ? 'Enabled' : 'Disabled - Complete Training First';
  };

  const getCapabilityColor = (capability: keyof typeof capabilities) => {
    return capabilities[capability] ? 'text-green-600' : 'text-red-600';
  };

  const handleQuickStart = async () => {
    try {
      // Start training for the highest priority dataset
      const recommendations = phase2Training.getTrainingRecommendations();
      if (recommendations.length > 0) {
        const topPriority = recommendations[0];
        const datasets = phase2Training.getTrainingDatasets();
        const targetDataset = datasets.find(d => d.name === topPriority.dataset);
        
        if (targetDataset) {
          await phase2Training.startFineTuning(targetDataset.id);
          setShowQuickStart(false);
          setActiveView('training');
          alert(`Started training for ${targetDataset.name}! Check the training dashboard for progress.`);
        }
      }
    } catch (error) {
      console.error('Quick start failed:', error);
      alert('Failed to start training. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50">
      {/* Navigation Header */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-gray-800">🚀 Phase 2 Platform</h1>
              <nav className="flex space-x-6">
                <button
                  onClick={() => setActiveView('overview')}
                  className={`px-3 py-2 rounded-md font-medium transition-colors ${
                    activeView === 'overview'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveView('training')}
                  className={`px-3 py-2 rounded-md font-medium transition-colors ${
                    activeView === 'training'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Training Dashboard
                </button>
                <button
                  onClick={() => setActiveView('tools')}
                  className={`px-3 py-2 rounded-md font-medium transition-colors ${
                    activeView === 'tools'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Advanced Tools
                </button>
                <button
                  onClick={() => setActiveView('capabilities')}
                  className={`px-3 py-2 rounded-md font-medium transition-colors ${
                    activeView === 'capabilities'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Capabilities
                </button>
                <button
                  onClick={() => setActiveView('3d-conversion')}
                  className={`px-3 py-2 rounded-md font-medium transition-colors ${
                    activeView === '3d-conversion'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  3D Conversion
                </button>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">Training Progress</div>
                <div className="text-lg font-bold text-blue-600">
                  {progress.completedTraining}/{progress.totalDatasets}
                </div>
              </div>
              <button
                onClick={() => setShowQuickStart(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all transform hover:scale-105"
              >
                🚀 Quick Start
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-8">
        {activeView === 'overview' && (
          <div className="max-w-7xl mx-auto px-4">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-gray-800 mb-6">
                🚀 Phase 2: Custom Training & Advanced AI Platform
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
                Unlock the full potential of AI-powered architecture with custom Gemini fine-tuning, 
                multi-modal analysis, predictive design, and real-time collaboration capabilities.
              </p>
              <div className="inline-flex items-center space-x-6 bg-white rounded-full px-8 py-4 shadow-lg">
                <span className="text-green-600 font-semibold">✓ Phase 1 Complete</span>
                <span className="text-blue-600 font-semibold">🔄 Phase 2 Active</span>
                <span className="text-purple-600 font-semibold">⚡ Advanced AI</span>
              </div>
            </div>

            {/* Key Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Custom Model Training</h3>
                <p className="text-gray-600 mb-4">
                  Fine-tune Gemini on architectural domain data for specialized expertise in Vastu, 
                  structural engineering, sustainability, and cost estimation.
                </p>
                <div className="text-sm text-blue-600 font-medium">
                  • 5 specialized datasets • Real-time progress tracking • Performance metrics
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">🖼️</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Multi-modal AI</h3>
                <p className="text-gray-600 mb-4">
                  Analyze text, images, sketches, and blueprints simultaneously for comprehensive 
                  architectural insights and recommendations.
                </p>
                <div className="text-sm text-blue-600 font-medium">
                  • Image analysis • Sketch recognition • Blueprint parsing • Combined insights
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">🔮</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Predictive Design</h3>
                <p className="text-gray-600 mb-4">
                  Leverage historical data and AI to predict design trends, optimize costs, 
                  and identify opportunities for improvement.
                </p>
                <div className="text-sm text-blue-600 font-medium">
                  • Trend analysis • Cost optimization • Risk assessment • Future insights
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Real-time Collaboration</h3>
                <p className="text-gray-600 mb-4">
                  Enable seamless team collaboration with AI assistants, shared context, 
                  and instant feedback loops for faster decision-making.
                </p>
                <div className="text-sm text-blue-600 font-medium">
                  • Live collaboration • AI assistants • Shared context • Instant feedback
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Advanced Analytics</h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive analysis with sustainability scoring, risk assessment, 
                  and detailed cost projections for informed decision-making.
                </p>
                <div className="text-sm text-blue-600 font-medium">
                  • Sustainability scoring • Risk assessment • Cost projections • ROI analysis
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Performance Boost</h3>
                <p className="text-gray-600 mb-4">
                  Achieve up to 95% accuracy in specialized domains with custom-trained models 
                  and advanced AI capabilities.
                </p>
                <div className="text-sm text-blue-600 font-medium">
                  • 95% accuracy • Domain expertise • Fast response • Reliable insights
                </div>
              </div>
            </div>

            {/* Training Progress Overview */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">📊 Training Progress Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{progress.totalDatasets}</div>
                  <div className="text-gray-600">Total Datasets</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">{progress.completedTraining}</div>
                  <div className="text-gray-600">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-600 mb-2">{progress.inProgress}</div>
                  <div className="text-gray-600">In Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">{progress.averageAccuracy.toFixed(1)}%</div>
                  <div className="text-gray-600">Avg. Accuracy</div>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setActiveView('training')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                >
                  View Training Dashboard
                </button>
              </div>
            </div>

            {/* Investment & Timeline */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl shadow-lg p-8 mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">💰 Investment & Timeline</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{estimates.totalTime}</div>
                  <div className="text-gray-600">Total Timeline</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">${estimates.totalCost.toLocaleString()}</div>
                  <div className="text-gray-600">Total Investment</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{estimates.phases.length}</div>
                  <div className="text-gray-600">Training Phases</div>
                </div>
              </div>

              <div className="space-y-4">
                {estimates.phases.map((phase, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                    <div>
                      <div className="font-medium text-gray-800">{phase.phase}</div>
                      <div className="text-sm text-gray-600">{phase.datasets.join(', ')}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-800">{phase.duration}</div>
                      <div className="text-green-600 font-medium">${phase.cost.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">🔄 Next Steps</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Immediate Actions</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => setActiveView('training')}
                      className="w-full text-left p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <div className="font-medium text-blue-800">1. Start Training Datasets</div>
                      <div className="text-sm text-blue-600">Begin fine-tuning models for specialized domains</div>
                    </button>
                    <button
                      onClick={() => setActiveView('tools')}
                      className="w-full text-left p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      <div className="font-medium text-green-800">2. Explore Advanced Tools</div>
                      <div className="text-sm text-green-600">Test multi-modal and predictive capabilities</div>
                    </button>
                    <button
                      onClick={() => setActiveView('capabilities')}
                      className="w-full text-left p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
                    >
                      <div className="font-medium text-purple-800">3. Monitor Capabilities</div>
                      <div className="text-sm text-purple-600">Track enabled features and performance</div>
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Expected Outcomes</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="font-medium text-gray-800">🎯 Enhanced Accuracy</div>
                      <div className="text-sm text-gray-600">95% accuracy in specialized domains</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="font-medium text-gray-800">⚡ Advanced Capabilities</div>
                      <div className="text-sm text-gray-600">Multi-modal analysis and predictive insights</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="font-medium text-gray-800">👥 Team Collaboration</div>
                      <div className="text-sm text-gray-600">Real-time AI-powered collaboration</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="font-medium text-gray-800">💰 ROI Improvement</div>
                      <div className="text-sm text-gray-600">Better cost estimation and optimization</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === 'training' && <AITrainingDashboard />}
        {activeView === 'tools' && <AdvancedAITools />}
        {activeView === '3d-conversion' && (
          <ThreeDInteriorConverter 
            walls={[
              { id: 'wall1', x1: 0, y1: 0, x2: 10, y2: 0, height: 3, thickness: 0.2 },
              { id: 'wall2', x1: 10, y1: 0, x2: 10, y2: 8, height: 3, thickness: 0.2 },
              { id: 'wall3', x1: 10, y1: 8, x2: 0, y2: 8, height: 3, thickness: 0.2 },
              { id: 'wall4', x1: 0, y1: 8, x2: 0, y2: 0, height: 3, thickness: 0.2 },
              { id: 'wall5', x1: 0, y1: 4, x2: 6, y2: 4, height: 3, thickness: 0.2 }
            ]}
            rooms={[
              { id: 'room1', name: 'Living Room', wallIds: ['wall1', 'wall2', 'wall5'], calculatedArea: 40 },
              { id: 'room2', name: 'Bedroom', wallIds: ['wall5', 'wall3', 'wall4'], calculatedArea: 32 }
            ]}
            onConversionComplete={(result) => console.log('3D Conversion Complete:', result)}
            onError={(error) => console.error('3D Conversion Error:', error)}
          />
        )}

        {activeView === 'capabilities' && (
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                🔧 AI Capabilities & Status
              </h1>
              <p className="text-xl text-gray-600">
                Monitor the status of advanced AI capabilities and their training progress
              </p>
            </div>

            {/* Capability Status Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">🖼️</div>
                  <span className={`text-lg font-bold ${getCapabilityColor('multiModal')}`}>
                    {getCapabilityStatus('multiModal')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Multi-modal AI</h3>
                <p className="text-gray-600 mb-4">
                  Analyze text, images, sketches, and blueprints simultaneously for comprehensive insights.
                </p>
                <div className="text-sm text-gray-500">
                  Status: {getCapabilityIcon('multiModal')} {getCapabilityStatus('multiModal')}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">🔮</div>
                  <span className={`text-lg font-bold ${getCapabilityColor('predictiveDesign')}`}>
                    {getCapabilityStatus('predictiveDesign')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Predictive Design</h3>
                <p className="text-gray-600 mb-4">
                  Leverage historical data and AI to predict design trends and optimize costs.
                </p>
                <div className="text-sm text-gray-500">
                  Status: {getCapabilityIcon('predictiveDesign')} {getCapabilityStatus('predictiveDesign')}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">👥</div>
                  <span className={`text-lg font-bold ${getCapabilityColor('realTimeCollaboration')}`}>
                    {getCapabilityStatus('realTimeCollaboration')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Real-time Collaboration</h3>
                <p className="text-gray-600 mb-4">
                  Enable seamless team collaboration with AI assistants and shared context.
                </p>
                <div className="text-sm text-gray-500">
                  Status: {getCapabilityIcon('realTimeCollaboration')} {getCapabilityStatus('realTimeCollaboration')}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">📄</div>
                  <span className={`text-lg font-bold ${getCapabilityColor('documentParsing')}`}>
                    {getCapabilityStatus('documentParsing')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Document Parsing</h3>
                <p className="text-gray-600 mb-4">
                  Advanced NLP for parsing architectural documents and extracting insights.
                </p>
                <div className="text-sm text-gray-500">
                  Status: {getCapabilityIcon('documentParsing')} {getCapabilityStatus('documentParsing')}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">💰</div>
                  <span className={`text-lg font-bold ${getCapabilityColor('regionalCostModels')}`}>
                    {getCapabilityStatus('regionalCostModels')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Regional Cost Models</h3>
                <p className="text-gray-600 mb-4">
                  Location-specific cost estimation with regional market data and trends.
                </p>
                <div className="text-sm text-gray-500">
                  Status: {getCapabilityIcon('regionalCostModels')} {getCapabilityStatus('regionalCostModels')}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">🏗️</div>
                  <span className={`text-lg font-bold ${getCapabilityColor('seismicAnalysis')}`}>
                    {getCapabilityStatus('seismicAnalysis')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Seismic Analysis</h3>
                <p className="text-gray-600 mb-4">
                  Advanced structural analysis for earthquake-prone regions and safety compliance.
                </p>
                <div className="text-sm text-gray-500">
                  Status: {getCapabilityIcon('seismicAnalysis')} {getCapabilityStatus('seismicAnalysis')}
                </div>
              </div>
            </div>

            {/* Training Recommendations */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">🎯 Training Recommendations</h2>
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  To enable advanced capabilities, complete the training for the recommended datasets.
                </p>
                <button
                  onClick={() => setActiveView('training')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Go to Training Dashboard
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Start Modal */}
      {showQuickStart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">🚀 Quick Start Training</h3>
            <p className="text-gray-600 mb-6">
              Start training the highest priority dataset to quickly enable advanced AI capabilities.
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="font-medium text-blue-800">Recommended Action</div>
                <div className="text-sm text-blue-600">
                  Start training for the highest priority dataset to unlock advanced features.
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowQuickStart(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleQuickStart}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
              >
                Start Training
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Phase2Demo;
