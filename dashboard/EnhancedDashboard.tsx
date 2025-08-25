import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Zap, 
  Shield, 
  Globe, 
  BarChart3, 
  Activity,
  Star,
  Award,
  Target,
  Rocket,
  Brain,
  Sparkles,
  CheckCircle,
  Clock,
  ArrowRight,
  Play,
  Pause,
  Settings,
  RefreshCw
} from 'lucide-react';

interface DashboardMetric {
  id: string;
  label: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  color: string;
  trend: 'up' | 'down' | 'stable';
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  color: string;
  badge?: string;
}

const EnhancedDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState<DashboardMetric[]>([
    {
      id: 'ai-models',
      label: 'Active AI Models',
      value: 12,
      change: 23.5,
      icon: <Brain className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      trend: 'up'
    },
    {
      id: 'training-jobs',
      label: 'Training Jobs',
      value: 8,
      change: -5.2,
      icon: <Zap className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      trend: 'down'
    },
    {
      id: 'users',
      label: 'Active Users',
      value: '2.4K',
      change: 18.7,
      icon: <Users className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      trend: 'up'
    },
    {
      id: 'performance',
      label: 'System Performance',
      value: '98.5%',
      change: 2.1,
      icon: <Activity className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500',
      trend: 'up'
    }
  ]);

  const [quickActions] = useState<QuickAction[]>([
    {
      id: 'start-training',
      title: 'Start Model Training',
      description: 'Launch a new AI model training session',
      icon: <Play className="w-5 h-5" />,
      action: () => console.log('Start training'),
      color: 'from-green-500 to-emerald-600',
      badge: 'New'
    },
    {
      id: 'deploy-model',
      title: 'Deploy Model',
      description: 'Deploy trained model to production',
      icon: <Rocket className="w-5 h-5" />,
      action: () => console.log('Deploy model'),
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'analyze-data',
      title: 'Data Analysis',
      description: 'Run comprehensive data analysis',
      icon: <BarChart3 className="w-5 h-5" />,
      action: () => console.log('Analyze data'),
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 'system-health',
      title: 'System Health',
      description: 'Check system performance metrics',
      icon: <Shield className="w-5 h-5" />,
      action: () => console.log('Check health'),
      color: 'from-orange-500 to-red-600'
    }
  ]);

  const [recentActivities] = useState([
    {
      id: 1,
      type: 'training',
      title: 'Model training completed',
      description: 'BERT-base model training finished successfully',
      time: '2 hours ago',
      status: 'completed',
      icon: <CheckCircle className="w-4 h-4 text-green-500" />
    },
    {
      id: 2,
      type: 'deployment',
      title: 'Model deployed to production',
      description: 'GPT-3 fine-tuned model is now live',
      time: '4 hours ago',
      status: 'completed',
      icon: <Rocket className="w-4 h-4 text-blue-500" />
    },
    {
      id: 3,
      type: 'analysis',
      title: 'Data analysis in progress',
      description: 'Processing 10GB of training data',
      time: '6 hours ago',
      status: 'running',
      icon: <Activity className="w-4 h-4 text-purple-500" />
    }
  ]);

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                AI Platform Dashboard
              </h1>
              <p className="text-slate-600 mt-1">Monitor and manage your AI infrastructure</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <AnimatePresence>
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${metric.color}`}>
                    <div className="text-white">
                      {metric.icon}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(metric.trend)}
                    <span className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                      {metric.change > 0 ? '+' : ''}{metric.change}%
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-1">{metric.value}</h3>
                <p className="text-slate-600 text-sm">{metric.label}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-900">Quick Actions</h2>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="space-y-3">
                {quickActions.map((action) => (
                  <motion.button
                    key={action.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={action.action}
                    className="w-full p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200 hover:shadow-md transition-all duration-200 text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color}`}>
                        <div className="text-white">
                          {action.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-slate-900">{action.title}</h3>
                          {action.badge && (
                            <span className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-medium rounded-full">
                              {action.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-600">{action.description}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activities & Performance Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-900">Recent Activities</h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200/60"
                  >
                    <div className="flex-shrink-0">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-900 mb-1">{activity.title}</h3>
                      <p className="text-sm text-slate-600">{activity.description}</p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <span className="text-xs text-slate-500">{activity.time}</span>
                      <div className={`mt-1 px-2 py-1 rounded-full text-xs font-medium ${
                        activity.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {activity.status}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Performance Chart Placeholder */}
              <div className="mt-8 p-6 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-200/60">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900">System Performance</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-slate-600">Optimal</span>
                  </div>
                </div>
                <div className="h-32 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                    <p className="text-slate-500 text-sm">Performance visualization chart</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Platform Status */}
        <div className="mt-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-900">AI Platform Status</h2>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600 font-medium">All Systems Operational</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200/60">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Phase 1: Core AI</h3>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-green-600 font-medium">Active</span>
                </div>
                <p className="text-sm text-slate-600">Enhanced AI architecture running smoothly</p>
              </div>

              <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200/60">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Phase 2: Training</h3>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Activity className="w-5 h-5 text-blue-500" />
                  <span className="text-blue-600 font-medium">Training</span>
                </div>
                <p className="text-sm text-slate-600">Custom model training in progress</p>
              </div>

              <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200/60">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Phase 3: Advanced</h3>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-yellow-600 font-medium">Experimental</span>
                </div>
                <p className="text-sm text-slate-600">Future capabilities under development</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedDashboard;
