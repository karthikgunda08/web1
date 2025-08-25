import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Zap, 
  Sparkles, 
  ArrowRight, 
  Play, 
  Settings, 
  BarChart3, 
  Users, 
  Target,
  Rocket,
  Shield,
  Globe,
  Star,
  CheckCircle,
  Clock,
  TrendingUp,
  Activity,
  Award,
  BookOpen,
  Code,
  Database,
  Cpu,
  Network,
  Zap as Lightning
} from 'lucide-react';
import EnhancedAIDemo from './EnhancedAIDemo';
import Phase2Demo from './Phase2Demo';
import Phase3Demo from './Phase3Demo';

const EnhancedUnifiedAIPlatform: React.FC = () => {
  const [activePhase, setActivePhase] = useState<'overview' | 'phase1' | 'phase2' | 'phase3'>('overview');
  const [userProgress, setUserProgress] = useState({
    phase1: { completed: true, score: 95, lastUsed: '2024-10-26', features: 12, models: 8 },
    phase2: { completed: true, score: 92, lastUsed: '2024-10-26', features: 18, models: 15 },
    phase3: { completed: true, score: 89, lastUsed: '2024-10-26', features: 25, models: 22 }
  });

  const [platformStats] = useState({
    totalUsers: '15.2K',
    activeModels: 45,
    trainingJobs: 23,
    successRate: '98.7%',
    uptime: '99.99%',
    responseTime: '45ms'
  });

  const [featuredCapabilities] = useState([
    {
      id: 'real-time-collaboration',
      title: 'Real-time Collaboration',
      description: 'Work together with team members in real-time on AI projects',
      icon: <Users className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      status: 'active'
    },
    {
      id: 'predictive-analytics',
      title: 'Predictive Analytics',
      description: 'Advanced forecasting and trend analysis capabilities',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      status: 'active'
    },
    {
      id: 'multi-modal-ai',
      title: 'Multi-modal AI',
      description: 'Process text, images, and audio simultaneously',
      icon: <Cpu className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      status: 'active'
    },
    {
      id: 'edge-computing',
      title: 'Edge Computing',
      description: 'Deploy AI models at the edge for faster inference',
      icon: <Network className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500',
      status: 'beta'
    }
  ]);

  const renderHeroSection = () => (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-3xl mb-12">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 p-12 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
            🚀 Unified AI Platform
          </h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto mb-8 leading-relaxed">
            Experience the complete AI-powered architectural platform with all three phases seamlessly integrated. 
            From enhanced AI architecture to custom training and futuristic capabilities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              Watch Demo
            </motion.button>
          </div>
        </motion.div>
      </div>
      
      {/* Abstract AI Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>
    </div>
  );

  const renderPlatformStats = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
      {Object.entries(platformStats).map(([key, value], index) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="text-3xl font-bold text-slate-900 mb-2">{value}</div>
          <div className="text-sm text-slate-600 capitalize">
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderPhaseCards = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
      {/* Phase 1 Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{userProgress.phase1.score}%</div>
              <div className="text-sm text-blue-500">Complete</div>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Phase 1: Enhanced AI Architecture</h3>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-slate-700">Features:</span>
              <span className="font-semibold text-slate-900">{userProgress.phase1.features}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-700">AI Models:</span>
              <span className="font-semibold text-slate-900">{userProgress.phase1.models}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-700">Last Used:</span>
              <span className="text-slate-600">{userProgress.phase1.lastUsed}</span>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActivePhase('phase1')}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            Access Phase 1
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </motion.div>

      {/* Phase 2 Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="group relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-100 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-600">{userProgress.phase2.score}%</div>
              <div className="text-sm text-purple-500">Complete</div>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Phase 2: Custom Training & Advanced AI</h3>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-slate-700">Features:</span>
              <span className="font-semibold text-slate-900">{userProgress.phase2.features}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-700">AI Models:</span>
              <span className="font-semibold text-slate-900">{userProgress.phase2.models}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-700">Last Used:</span>
              <span className="text-slate-600">{userProgress.phase2.lastUsed}</span>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActivePhase('phase2')}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            Access Phase 2
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </motion.div>

      {/* Phase 3 Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="group relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">{userProgress.phase3.score}%</div>
              <div className="text-sm text-green-500">Complete</div>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Phase 3: Future Advanced Capabilities</h3>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-slate-700">Features:</span>
              <span className="font-semibold text-slate-900">{userProgress.phase3.features}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-700">AI Models:</span>
              <span className="font-semibold text-slate-900">{userProgress.phase3.models}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-700">Last Used:</span>
              <span className="text-slate-600">{userProgress.phase3.lastUsed}</span>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActivePhase('phase3')}
            className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            Access Phase 3
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );

  const renderFeaturedCapabilities = () => (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Featured Capabilities</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Discover the cutting-edge features that make our AI platform stand out from the rest
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredCapabilities.map((capability, index) => (
          <motion.div
            key={capability.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className={`w-12 h-12 bg-gradient-to-r ${capability.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <div className="text-white">
                {capability.icon}
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-slate-900 mb-2">{capability.title}</h3>
            <p className="text-sm text-slate-600 mb-4">{capability.description}</p>
            
            <div className="flex items-center justify-between">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                capability.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {capability.status}
              </span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderQuickActions = () => (
    <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-3xl p-8 border border-slate-200/60 mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Quick Actions</h2>
        <p className="text-lg text-slate-600">Get started with common tasks and workflows</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Start Training', icon: <Play className="w-6 h-6" />, color: 'from-green-500 to-emerald-500' },
          { title: 'Deploy Model', icon: <Rocket className="w-6 h-6" />, color: 'from-blue-500 to-cyan-500' },
          { title: 'Analyze Data', icon: <BarChart3 className="w-6 h-6" />, color: 'from-purple-500 to-pink-500' },
          { title: 'System Health', icon: <Shield className="w-6 h-6" />, color: 'from-orange-500 to-red-500' }
        ].map((action, index) => (
          <motion.button
            key={action.title}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group p-6 bg-white rounded-2xl border border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left"
          >
            <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <div className="text-white">
                {action.icon}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
              {action.title}
            </h3>
          </motion.button>
        ))}
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="max-w-7xl mx-auto p-6">
      {renderHeroSection()}
      {renderPlatformStats()}
      {renderPhaseCards()}
      {renderFeaturedCapabilities()}
      {renderQuickActions()}
      
      {/* Getting Started Guide */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/60 shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Getting Started Guide</h2>
          <p className="text-lg text-slate-600">Follow these steps to maximize your AI platform experience</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: '1', title: 'Explore Phase 1', description: 'Start with core AI functionalities and get familiar with the enhanced architecture', icon: <Brain className="w-8 h-8" /> },
            { step: '2', title: 'Train Custom Models', description: 'Move to Phase 2 to train and fine-tune your own AI models', icon: <Zap className="w-8 h-8" /> },
            { step: '3', title: 'Experiment with Future Tech', description: 'Try Phase 3 capabilities and explore cutting-edge AI features', icon: <Sparkles className="w-8 h-8" /> }
          ].map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                {item.step}
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <div className="text-blue-600">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNavigation = () => (
    <div className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-6">
        <nav className="flex space-x-8 py-4">
          {[
            { id: 'overview', label: 'Overview', icon: '🏠' },
            { id: 'phase1', label: 'Phase 1', icon: '🎯' },
            { id: 'phase2', label: 'Phase 2', icon: '🚀' },
            { id: 'phase3', label: 'Phase 3', icon: '🔮' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePhase(item.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activePhase === item.id
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {renderNavigation()}
      {activePhase === 'overview' && renderOverview()}
      {activePhase === 'phase1' && <EnhancedAIDemo />}
      {activePhase === 'phase2' && <Phase2Demo />}
      {activePhase === 'phase3' && <Phase3Demo />}
    </div>
  );
};

export default EnhancedUnifiedAIPlatform;
