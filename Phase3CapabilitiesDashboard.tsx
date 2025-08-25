import React, { useState, useEffect } from 'react';
import { phase3Capabilities, FutureCapabilities, VRExperience, IoTDevice, SmartBuildingSystem, QuantumComputingTask } from '../services/phase3AdvancedCapabilities';

const Phase3CapabilitiesDashboard: React.FC = () => {
  const [capabilities, setCapabilities] = useState<FutureCapabilities | null>(null);
  const [vrSessions, setVrSessions] = useState<VRExperience[]>([]);
  const [iotDevices, setIotDevices] = useState<IoTDevice[]>([]);
  const [smartSystems, setSmartSystems] = useState<SmartBuildingSystem[]>([]);
  const [quantumTasks, setQuantumTasks] = useState<QuantumComputingTask[]>([]);
  const [systemStatus, setSystemStatus] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'vr' | 'iot' | 'quantum' | 'capabilities'>('overview');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDashboardData();
    const interval = setInterval(loadDashboardData, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = async () => {
    try {
      setCapabilities(phase3Capabilities.getCapabilities());
      setVrSessions(phase3Capabilities.getVRSessions());
      setIotDevices(phase3Capabilities.getIoTDevices());
      setSmartSystems(phase3Capabilities.getSmartBuildingSystems());
      setQuantumTasks(phase3Capabilities.getQuantumTasks());
      setSystemStatus(phase3Capabilities.getSystemStatus());
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const handleEnableCapability = async (capability: keyof FutureCapabilities) => {
    setLoading(true);
    try {
      await phase3Capabilities.enableCapability(capability);
      await loadDashboardData();
    } catch (error) {
      console.error(`Error enabling ${capability}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleEndVRSession = async (sessionId: string) => {
    try {
      await phase3Capabilities.endVRExperience(sessionId);
      await loadDashboardData();
    } catch (error) {
      console.error('Error ending VR session:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'operational':
      case 'completed':
        return 'text-green-600';
      case 'inactive':
      case 'offline':
      case 'failed':
        return 'text-red-600';
      case 'maintenance':
      case 'processing':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'operational':
      case 'completed':
        return '🟢';
      case 'inactive':
      case 'offline':
      case 'failed':
        return '🔴';
      case 'maintenance':
      case 'processing':
        return '🟡';
      default:
        return '⚪';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="text-lg font-semibold text-gray-800">VR Sessions</h3>
          <p className="text-3xl font-bold text-blue-600">{systemStatus?.activeVRSessions || 0}</p>
          <p className="text-sm text-gray-600">Active Sessions</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="text-lg font-semibold text-gray-800">IoT Devices</h3>
          <p className="text-3xl font-bold text-green-600">{systemStatus?.iotDevices || 0}</p>
          <p className="text-sm text-gray-600">Connected Devices</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="text-lg font-semibold text-gray-800">Smart Systems</h3>
          <p className="text-3xl font-bold text-purple-600">{systemStatus?.smartSystems || 0}</p>
          <p className="text-sm text-gray-600">Operational Systems</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="text-lg font-semibold text-gray-800">System Health</h3>
          <p className="text-3xl font-bold text-orange-600">{systemStatus?.overallHealth || 0}%</p>
          <p className="text-sm text-gray-600">Overall Status</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Capability Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {capabilities && Object.entries(capabilities).map(([key, enabled]) => (
            <div key={key} className="flex items-center space-x-2">
              <span className={enabled ? 'text-green-600' : 'text-red-600'}>
                {enabled ? '✅' : '❌'}
              </span>
              <span className="text-sm font-medium text-gray-700">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {quantumTasks.slice(0, 3).map(task => (
            <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium text-gray-800">{task.type} Task</p>
                <p className="text-sm text-gray-600">Complexity: {task.complexity}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${getStatusColor(task.status)}`}>
                  {getStatusIcon(task.status)} {task.status}
                </p>
                <p className="text-xs text-gray-500">{task.progress}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderVRTab = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow border">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">VR Sessions</h3>
        {vrSessions.length === 0 ? (
          <p className="text-gray-500">No VR sessions found.</p>
        ) : (
          <div className="space-y-4">
            {vrSessions.map(session => (
              <div key={session.sessionId} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-800">{session.type} Session</h4>
                  <span className={`px-2 py-1 rounded text-sm font-medium ${getStatusColor(session.status)}`}>
                    {getStatusIcon(session.status)} {session.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div>
                    <p className="font-medium">Session ID</p>
                    <p>{session.sessionId}</p>
                  </div>
                  <div>
                    <p className="font-medium">Participants</p>
                    <p>{session.participants.join(', ')}</p>
                  </div>
                  <div>
                    <p className="font-medium">Duration</p>
                    <p>{session.duration} minutes</p>
                  </div>
                  <div>
                    <p className="font-medium">Features</p>
                    <p>{session.features.slice(0, 2).join(', ')}...</p>
                  </div>
                </div>
                {session.status === 'active' && (
                  <button
                    onClick={() => handleEndVRSession(session.sessionId)}
                    className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                  >
                    End Session
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderIoTTab = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow border">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">IoT Devices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {iotDevices.map(device => (
            <div key={device.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-800">{device.name}</h4>
                <span className={`px-2 py-1 rounded text-sm font-medium ${getStatusColor(device.status)}`}>
                  {getStatusIcon(device.status)} {device.status}
                </span>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p><span className="font-medium">Type:</span> {device.type}</p>
                <p><span className="font-medium">Location:</span> {device.location}</p>
                <p><span className="font-medium">Last Update:</span> {new Date(device.lastUpdate).toLocaleTimeString()}</p>
                {device.data.temperature && <p><span className="font-medium">Temperature:</span> {device.data.temperature.toFixed(1)}°C</p>}
                {device.data.humidity && <p><span className="font-medium">Humidity:</span> {device.data.humidity.toFixed(1)}%</p>}
                {device.data.occupancy && <p><span className="font-medium">Occupancy:</span> {device.data.occupancy}</p>}
                {device.data.energy && <p><span className="font-medium">Energy:</span> {device.data.energy.toFixed(1)} kWh</p>}
                {device.data.airQuality && <p><span className="font-medium">Air Quality:</span> {device.data.airQuality}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Smart Building Systems</h3>
        <div className="space-y-4">
          {smartSystems.map(system => (
            <div key={system.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-800">{system.name}</h4>
                <span className={`px-2 py-1 rounded text-sm font-medium ${getStatusColor(system.status)}`}>
                  {getStatusIcon(system.status)} {system.status}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                <div>
                  <p className="font-medium">Type</p>
                  <p>{system.type.toUpperCase()}</p>
                </div>
                <div>
                  <p className="font-medium">Efficiency</p>
                  <p>{system.efficiency}%</p>
                </div>
                <div>
                  <p className="font-medium">Next Maintenance</p>
                  <p>{new Date(system.nextMaintenance).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="font-medium">Automation Rules</p>
                  <p>{system.automationRules.length} rules</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderQuantumTab = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow border">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Quantum Computing Tasks</h3>
        {quantumTasks.length === 0 ? (
          <p className="text-gray-500">No quantum tasks found.</p>
        ) : (
          <div className="space-y-4">
            {quantumTasks.map(task => (
              <div key={task.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-800">{task.type} Task</h4>
                  <span className={`px-2 py-1 rounded text-sm font-medium ${getStatusColor(task.status)}`}>
                    {getStatusIcon(task.status)} {task.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                  <div>
                    <p className="font-medium">Complexity</p>
                    <p className="capitalize">{task.complexity}</p>
                  </div>
                  <div>
                    <p className="font-medium">Qubits Required</p>
                    <p>{task.qubitsRequired}</p>
                  </div>
                  <div>
                    <p className="font-medium">Estimated Time</p>
                    <p>{task.estimatedTime}</p>
                  </div>
                  <div>
                    <p className="font-medium">Progress</p>
                    <p>{task.progress}%</p>
                  </div>
                </div>
                {task.status === 'processing' && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${task.progress}%` }}></div>
                  </div>
                )}
                {task.result && (
                  <div className="mt-3 p-3 bg-gray-50 rounded">
                    <p className="font-medium text-gray-800 mb-2">Result:</p>
                    <pre className="text-sm text-gray-600 overflow-x-auto">
                      {JSON.stringify(task.result, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderCapabilitiesTab = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow border">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Enable Advanced Capabilities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {capabilities && Object.entries(capabilities).map(([key, enabled]) => (
            <div key={key} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-800">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </h4>
                <span className={enabled ? 'text-green-600' : 'text-red-600'}>
                  {enabled ? '✅ Enabled' : '❌ Disabled'}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                {getCapabilityDescription(key)}
              </p>
              {!enabled && (
                <button
                  onClick={() => handleEnableCapability(key as keyof FutureCapabilities)}
                  disabled={loading}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Enabling...' : 'Enable Capability'}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const getCapabilityDescription = (capability: string): string => {
    const descriptions: Record<string, string> = {
      autonomousDesign: 'AI-powered autonomous design generation with minimal human intervention',
      vrIntegration: 'Virtual reality experiences for design visualization and collaboration',
      iotSmartBuilding: 'Internet of Things integration for smart building management',
      quantumComputing: 'Quantum computing tasks for complex optimization and simulation',
      aiPredictiveMaintenance: 'AI-driven predictive maintenance and system health monitoring',
      holographicProjection: '3D holographic projections for immersive presentations',
      neuralInterface: 'Brain-computer interface for intuitive design control',
      blockchainIntegration: 'Blockchain technology for secure design ownership and collaboration'
    };
    return descriptions[capability] || 'Advanced capability for enhanced architectural design';
  };

  if (!capabilities) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Phase 3 capabilities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Phase 3: Advanced Capabilities Dashboard</h1>
        <p className="text-gray-600">Monitor and manage cutting-edge architectural technology capabilities</p>
      </div>

      <div className="bg-white rounded-lg shadow border mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { key: 'overview', label: 'Overview' },
              { key: 'vr', label: 'VR Integration' },
              { key: 'iot', label: 'IoT & Smart Building' },
              { key: 'quantum', label: 'Quantum Computing' },
              { key: 'capabilities', label: 'Capabilities' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'vr' && renderVRTab()}
          {activeTab === 'iot' && renderIoTTab()}
          {activeTab === 'quantum' && renderQuantumTab()}
          {activeTab === 'capabilities' && renderCapabilitiesTab()}
        </div>
      </div>
    </div>
  );
};

export default Phase3CapabilitiesDashboard;
