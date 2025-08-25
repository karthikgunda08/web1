import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  content: React.ReactNode;
  phase: 'phase1' | 'phase2' | 'phase3';
  duration: number; // in minutes
}

const AIPlatformOnboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [userProgress, setUserProgress] = useState({
    phase1: { completed: false, score: 0 },
    phase2: { completed: false, score: 0 },
    phase3: { completed: false, score: 0 }
  });

  const onboardingSteps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to the AI Platform',
      description: 'Discover the future of architectural design with AI',
      phase: 'phase1',
      duration: 2,
      content: (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🚀</div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome to Next of Dakshin Vaarahi</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            You're about to experience the most advanced AI-powered architectural platform ever created. 
            Get ready to explore three phases of cutting-edge technology.
          </p>
          <div className="flex justify-center space-x-4">
            <div className="text-center">
              <div className="text-2xl mb-2">🎯</div>
              <p className="font-semibold">Phase 1</p>
              <p className="text-sm text-gray-600">Enhanced AI</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🚀</div>
              <p className="font-semibold">Phase 2</p>
              <p className="text-sm text-gray-600">Custom Training</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🔮</div>
              <p className="font-semibold">Phase 3</p>
              <p className="text-sm text-gray-600">Future Tech</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'phase1-overview',
      title: 'Phase 1: Enhanced AI Architecture',
      description: 'Master the foundation of AI-powered design',
      phase: 'phase1',
      duration: 5,
      content: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-gray-900">Enhanced AI Architecture</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-3">Knowledge Base</h4>
              <ul className="text-blue-800 space-y-2">
                <li>• 500+ architectural principles</li>
                <li>• Vastu guidelines & modern codes</li>
                <li>• Expert AI personas</li>
                <li>• RAG system integration</li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-3">AI Capabilities</h4>
              <ul className="text-green-800 space-y-2">
                <li>• Google Gemini integration</li>
                <li>• Professional prompts</li>
                <li>• Context-aware responses</li>
                <li>• Design analysis tools</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-100 to-green-100 p-6 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Quick Start Guide</h4>
            <ol className="text-gray-700 space-y-2">
              <li>1. Select an AI expert from the dropdown</li>
              <li>2. Describe your project or ask a question</li>
              <li>3. Receive AI-powered analysis and recommendations</li>
              <li>4. Apply insights to your architectural design</li>
            </ol>
          </div>
        </div>
      )
    },
    {
      id: 'phase1-practice',
      title: 'Phase 1: Hands-on Practice',
      description: 'Try the enhanced AI tools yourself',
      phase: 'phase1',
      duration: 8,
      content: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Practice with AI Tools</h3>
            <p className="text-gray-600">Let's walk through a real example together</p>
          </div>

          <div className="bg-white border rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Sample Project: Modern Villa Design</h4>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">1</div>
                <div>
                  <p className="font-medium">Select AI Expert</p>
                  <p className="text-sm text-gray-600">Choose "Vastu Specialist" for residential projects</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">2</div>
                <div>
                  <p className="font-medium">Describe Your Project</p>
                  <p className="text-sm text-gray-600">"I need a 3-bedroom villa with modern design and Vastu compliance"</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">3</div>
                <div>
                  <p className="font-medium">Review AI Response</p>
                  <p className="text-sm text-gray-600">Get detailed analysis, floor plan suggestions, and material recommendations</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 text-sm">
                <strong>Pro Tip:</strong> The more specific you are about location, budget, and requirements, 
                the better the AI analysis will be!
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'phase2-overview',
      title: 'Phase 2: Custom Training & Advanced AI',
      description: 'Explore custom model training and advanced capabilities',
      phase: 'phase2',
      duration: 6,
      content: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold text-gray-900">Custom Training & Advanced AI</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-purple-50 p-6 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-3">Custom Training</h4>
              <ul className="text-purple-800 space-y-2">
                <li>• Specialized datasets</li>
                <li>• Model fine-tuning</li>
                <li>• Performance metrics</li>
                <li>• Training recommendations</li>
              </ul>
            </div>
            
            <div className="bg-pink-50 p-6 rounded-lg">
              <h4 className="font-semibold text-pink-900 mb-3">Advanced Capabilities</h4>
              <ul className="text-pink-800 space-y-2">
                <li>• Multi-modal analysis</li>
                <li>• Predictive design</li>
                <li>• Real-time collaboration</li>
                <li>• Advanced analytics</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Training Dashboard Features</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl mb-2">📊</div>
                <p className="font-medium">Progress Tracking</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🎯</div>
                <p className="font-medium">Dataset Management</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">⚡</div>
                <p className="font-medium">Performance Metrics</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🔧</div>
                <p className="font-medium">Fine-tuning Jobs</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'phase3-overview',
      title: 'Phase 3: Future Advanced Capabilities',
      description: 'Experience cutting-edge technologies',
      phase: 'phase3',
      duration: 7,
      content: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <div className="text-4xl mb-4">🔮</div>
            <h3 className="text-2xl font-bold text-gray-900">Future Advanced Capabilities</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-6 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-3">Immersive Technologies</h4>
              <ul className="text-green-800 space-y-2">
                <li>• Virtual Reality (VR)</li>
                <li>• Holographic projections</li>
                <li>• Neural interfaces</li>
                <li>• IoT smart buildings</li>
              </ul>
            </div>
            
            <div className="bg-emerald-50 p-6 rounded-lg">
              <h4 className="font-semibold text-emerald-900 mb-3">Advanced Computing</h4>
              <ul className="text-emerald-800 space-y-2">
                <li>• Quantum computing tasks</li>
                <li>• Autonomous AI design</li>
                <li>• Predictive maintenance</li>
                <li>• Blockchain integration</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Technology Showcase</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl mb-2">🥽</div>
                <p className="font-medium">VR Sessions</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">📱</div>
                <p className="font-medium">IoT Devices</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">⚛️</div>
                <p className="font-medium">Quantum Tasks</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🤖</div>
                <p className="font-medium">AI Design</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'completion',
      title: 'Onboarding Complete!',
      description: 'You\'re ready to explore the AI platform',
      phase: 'phase3',
      duration: 2,
      content: (
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-gray-900">Congratulations!</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            You've completed the comprehensive onboarding for the Next of Dakshin Vaarahi AI Platform. 
            You now have a solid understanding of all three phases and their capabilities.
          </p>
          
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-4">Your Learning Journey</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl mb-2">🎯</div>
                <p className="font-medium">Phase 1</p>
                <p className="text-sm text-gray-600">Enhanced AI Architecture</p>
                <div className="mt-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Completed</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🚀</div>
                <p className="font-medium">Phase 2</p>
                <p className="text-sm text-gray-600">Custom Training</p>
                <div className="mt-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Completed</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🔮</div>
                <p className="font-medium">Phase 3</p>
                <p className="text-sm text-gray-600">Future Tech</p>
                <div className="mt-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Completed</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">What's Next?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Explore the Platform</h4>
                <p className="text-blue-800 text-sm">Start using the AI tools and discover their capabilities</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium text-purple-900 mb-2">Join the Community</h4>
                <p className="text-purple-800 text-sm">Connect with other architects and AI enthusiasts</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const totalDuration = onboardingSteps.reduce((sum, step) => sum + step.duration, 0);
  const currentProgress = ((currentStep + 1) / onboardingSteps.length) * 100;

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
      // Mark onboarding as completed in user profile
      localStorage.setItem('aiPlatformOnboardingCompleted', 'true');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    setIsCompleted(true);
    localStorage.setItem('aiPlatformOnboardingCompleted', 'true');
  };

  const getPhaseProgress = (phase: string) => {
    const phaseSteps = onboardingSteps.filter(step => step.phase === phase);
    const completedSteps = phaseSteps.filter((_, index) => 
      onboardingSteps.indexOf(phaseSteps[index]) <= currentStep
    );
    return (completedSteps.length / phaseSteps.length) * 100;
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="max-w-4xl mx-auto p-8 text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to the Future!</h1>
          <p className="text-xl text-gray-600 mb-8">
            You're now ready to explore the complete AI-powered architectural platform.
          </p>
          <button
            onClick={() => window.location.href = '/ai-platform'}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
          >
            🚀 Launch AI Platform
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-2 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
          style={{ width: `${currentProgress}%` }}
        />
      </div>

      {/* Header */}
      <div className="pt-8 pb-4 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Platform Onboarding</h1>
              <p className="text-gray-600">Step {currentStep + 1} of {onboardingSteps.length}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Estimated time remaining</p>
              <p className="font-semibold text-gray-900">
                {Math.ceil(totalDuration - onboardingSteps.slice(0, currentStep + 1).reduce((sum, step) => sum + step.duration, 0))} minutes
              </p>
            </div>
          </div>

          {/* Phase Progress */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-lg mb-2">🎯</div>
              <p className="text-sm font-medium text-gray-700">Phase 1</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${getPhaseProgress('phase1')}%` }}
                />
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg mb-2">🚀</div>
              <p className="text-sm font-medium text-gray-700">Phase 2</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${getPhaseProgress('phase2')}%` }}
                />
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg mb-2">🔮</div>
              <p className="text-sm font-medium text-gray-700">Phase 3</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${getPhaseProgress('phase3')}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-8">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {onboardingSteps[currentStep].title}
                </h2>
                <p className="text-lg text-gray-600">
                  {onboardingSteps[currentStep].description}
                </p>
              </div>

              <div className="mb-8">
                {onboardingSteps[currentStep].content}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div className="flex space-x-4">
                  {currentStep > 0 && (
                    <button
                      onClick={handlePrevious}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      ← Previous
                    </button>
                  )}
                  <button
                    onClick={handleSkip}
                    className="px-6 py-3 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Skip Onboarding
                  </button>
                </div>

                <button
                  onClick={handleNext}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
                >
                  {currentStep === onboardingSteps.length - 1 ? 'Complete' : 'Next →'}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AIPlatformOnboarding;
