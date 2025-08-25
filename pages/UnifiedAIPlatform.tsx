import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EnhancedAIDemo from './EnhancedAIDemo';
import Phase2Demo from './Phase2Demo';
import Phase3Demo from './Phase3Demo';

const UnifiedAIPlatform: React.FC = () => {
  const [activePhase, setActivePhase] = useState<'overview' | 'phase1' | 'phase2' | 'phase3'>('overview');
  const [userProgress, setUserProgress] = useState({
    phase1: { completed: true, score: 95, lastUsed: '2024-10-26' },
    phase2: { completed: true, score: 92, lastUsed: '2024-10-26' },
    phase3: { completed: true, score: 89, lastUsed: '2024-10-26' }
  });

  const renderOverview = () => (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">🚀 Unified AI Platform</h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto">
          Experience the complete AI-powered architectural platform with all three phases seamlessly integrated. 
          From enhanced AI architecture to custom training and futuristic capabilities.
        </p>
      </div>

      {/* Platform Status Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl shadow-lg">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Phase 1: Enhanced AI Architecture</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Status:</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">✅ Complete</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Score:</span>
              <span className="text-2xl font-bold text-blue-600">{userProgress.phase1.score}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Last Used:</span>
              <span className="text-gray-600">{userProgress.phase1.lastUsed}</span>
            </div>
          </div>
          <button
            onClick={() => setActivePhase('phase1')}
            className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Access Phase 1
          </button>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-8 rounded-2xl shadow-lg">
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Phase 2: Custom Training & Advanced AI</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Status:</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">✅ Complete</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Score:</span>
              <span className="text-2xl font-bold text-purple-600">{userProgress.phase2.score}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Last Used:</span>
              <span className="text-gray-600">{userProgress.phase2.lastUsed}</span>
            </div>
          </div>
          <button
            onClick={() => setActivePhase('phase2')}
            className="w-full mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Access Phase 2
          </button>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl shadow-lg">
          <div className="text-4xl mb-4">🔮</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Phase 3: Future Advanced Capabilities</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Status:</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">✅ Complete</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Score:</span>
              <span className="text-2xl font-bold text-green-600">{userProgress.phase3.score}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Last Used:</span>
              <span className="text-gray-600">{userProgress.phase3.lastUsed}</span>
            </div>
          </div>
          <button
            onClick={() => setActivePhase('phase3')}
            className="w-full mt-6 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Access Phase 3
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-8 rounded-2xl shadow-lg mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => setActivePhase('phase1')}
            className="p-6 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-105"
          >
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-semibold">AI Analysis</h3>
            <p className="text-sm opacity-90">Run architectural analysis</p>
          </button>

          <button
            onClick={() => setActivePhase('phase2')}
            className="p-6 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all transform hover:scale-105"
          >
            <div className="text-3xl mb-2">🚀</div>
            <h3 className="font-semibold">Custom Training</h3>
            <p className="text-sm opacity-90">Train specialized models</p>
          </button>

          <button
            onClick={() => setActivePhase('phase3')}
            className="p-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105"
          >
            <div className="text-3xl mb-2">🔮</div>
            <h3 className="font-semibold">VR & IoT</h3>
            <p className="text-sm opacity-90">Access futuristic tools</p>
          </button>

          <button className="p-6 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-xl hover:from-orange-600 hover:to-red-700 transition-all transform hover:scale-105">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold">Analytics</h3>
            <p className="text-sm opacity-90">View performance metrics</p>
          </button>
        </div>
      </div>

      {/* Platform Features Summary */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-8 rounded-2xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Platform Capabilities Summary</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Core AI Features</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• 500+ architectural principles and Vastu guidelines</li>
              <li>• Expert AI personas for specialized domains</li>
              <li>• RAG system for context-aware responses</li>
              <li>• Professional prompt templates</li>
              <li>• Google Gemini integration</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Advanced Capabilities</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Custom model training and fine-tuning</li>
              <li>• Multi-modal AI analysis</li>
              <li>• Predictive design engine</li>
              <li>• Real-time collaboration</li>
              <li>• Futuristic VR, IoT, and quantum computing</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Getting Started Guide */}
      <div className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Getting Started</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">1️⃣</div>
            <div>
              <h3 className="font-semibold text-gray-800">Start with Phase 1</h3>
              <p className="text-gray-600">Begin with enhanced AI architecture tools for basic analysis and design guidance</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="text-2xl">2️⃣</div>
            <div>
              <h3 className="font-semibold text-gray-800">Advance to Phase 2</h3>
              <p className="text-gray-600">Explore custom training and advanced AI capabilities for specialized tasks</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="text-2xl">3️⃣</div>
            <div>
              <h3 className="font-semibold text-gray-800">Experience Phase 3</h3>
              <p className="text-gray-600">Access cutting-edge technologies like VR, IoT, and quantum computing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNavigation = () => (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActivePhase('overview')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activePhase === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            🏠 Platform Overview
          </button>
          <button
            onClick={() => setActivePhase('phase1')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activePhase === 'phase1'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            🎯 Phase 1: Enhanced AI
          </button>
          <button
            onClick={() => setActivePhase('phase2')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activePhase === 'phase2'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            🚀 Phase 2: Custom Training
          </button>
          <button
            onClick={() => setActivePhase('phase3')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activePhase === 'phase3'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            🔮 Phase 3: Future Tech
          </button>
        </nav>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {renderNavigation()}
      
      {activePhase === 'overview' && renderOverview()}
      {activePhase === 'phase1' && <EnhancedAIDemo />}
      {activePhase === 'phase2' && <Phase2Demo />}
      {activePhase === 'phase3' && <Phase3Demo />}
    </div>
  );
};

export default UnifiedAIPlatform;
