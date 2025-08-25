// src/components/AdvancedAITools.tsx
// Advanced AI Tools for Phase 2: Multi-modal, Predictive & Collaborative AI

import React, { useState } from 'react';
import { advancedAI, MultiModalInput, PredictiveDesignInput, AdvancedAIResponse } from '../services/advancedAIService';
import { phase2Training } from '../services/phase2TrainingService';

const AdvancedAITools: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'multiModal' | 'predictive' | 'collaboration'>('multiModal');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AdvancedAIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Multi-modal inputs
  const [multiModalInput, setMultiModalInput] = useState<MultiModalInput>({
    text: '',
    images: [],
    sketches: [],
    blueprints: [],
    projectData: {}
  });

  // Predictive design inputs
  const [predictiveInput, setPredictiveInput] = useState<PredictiveDesignInput>({
    projectType: 'Residential',
    location: '',
    budget: 1000000,
    timeline: '6-8 months',
    style: 'Modern',
    requirements: [],
    constraints: []
  });

  // Collaboration inputs
  const [collaborationInput, setCollaborationInput] = useState({
    participants: [''],
    tools: ['Design Assistant', 'Cost Analyst', 'Sustainability Expert']
  });

  const capabilities = phase2Training.getAdvancedCapabilities();

  const handleMultiModalAnalysis = async () => {
    if (!capabilities.multiModal) {
      setError('Multi-modal AI capabilities not yet enabled. Complete training first.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const result = await advancedAI.analyzeMultiModal(multiModalInput);
      setAnalysisResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handlePredictiveAnalysis = async () => {
    if (!capabilities.predictiveDesign) {
      setError('Predictive design capabilities not yet enabled. Complete training first.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const result = await advancedAI.analyzePredictiveDesign(predictiveInput);
      setAnalysisResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCreateCollaboration = async () => {
    try {
      const session = await advancedAI.createCollaborationSession(
        collaborationInput.participants.filter(p => p.trim()),
        collaborationInput.tools
      );
      alert(`Collaboration session created: ${session.sessionId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create collaboration session');
    }
  };

  const addRequirement = () => {
    setPredictiveInput(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const updateRequirement = (index: number, value: string) => {
    setPredictiveInput(prev => ({
      ...prev,
      requirements: prev.requirements.map((req, i) => i === index ? value : req)
    }));
  };

  const removeRequirement = (index: number) => {
    setPredictiveInput(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const addConstraint = () => {
    setPredictiveInput(prev => ({
      ...prev,
      constraints: [...prev.constraints, '']
    }));
  };

  const updateConstraint = (index: number, value: string) => {
    setPredictiveInput(prev => ({
      ...prev,
      constraints: prev.constraints.map((constraint, i) => i === index ? value : constraint)
    }));
  };

  const removeConstraint = (index: number) => {
    setPredictiveInput(prev => ({
      ...prev,
      constraints: prev.constraints.filter((_, i) => i !== index)
    }));
  };

  const addParticipant = () => {
    setCollaborationInput(prev => ({
      ...prev,
      participants: [...prev.participants, '']
    }));
  };

  const updateParticipant = (index: number, value: string) => {
    setCollaborationInput(prev => ({
      ...prev,
      participants: prev.participants.map((p, i) => i === index ? value : p)
    }));
  };

  const removeParticipant = (index: number) => {
    setCollaborationInput(prev => ({
      ...prev,
      participants: prev.participants.filter((_, i) => i !== index)
    }));
  };

  const handleFileUpload = (type: 'images' | 'sketches' | 'blueprints', files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      setMultiModalInput(prev => ({
        ...prev,
        [type]: fileArray
      }));
    }
  };

  const getCapabilityStatus = (capability: keyof typeof capabilities) => {
    return capabilities[capability] ? '✅ Enabled' : '❌ Disabled - Complete Training First';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🚀 Advanced AI Tools & Capabilities
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Phase 2: Multi-modal Analysis, Predictive Design & Real-time Collaboration
          </p>
        </div>

        {/* Capability Status */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">🔧 AI Capability Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-800">Multi-modal AI</div>
              <div className="text-sm text-gray-600">{getCapabilityStatus('multiModal')}</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-800">Predictive Design</div>
              <div className="text-sm text-gray-600">{getCapabilityStatus('predictiveDesign')}</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-800">Real-time Collaboration</div>
              <div className="text-sm text-gray-600">{getCapabilityStatus('realTimeCollaboration')}</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-800">Document Parsing</div>
              <div className="text-sm text-gray-600">{getCapabilityStatus('documentParsing')}</div>
            </div>
          </div>
        </div>

        {/* Tool Selection */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTool('multiModal')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTool === 'multiModal'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            🖼️ Multi-modal Analysis
          </button>
          <button
            onClick={() => setActiveTool('predictive')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTool === 'predictive'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            🔮 Predictive Design
          </button>
          <button
            onClick={() => setActiveTool('collaboration')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTool === 'collaboration'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            👥 Real-time Collaboration
          </button>
        </div>

        {/* Multi-modal Analysis Tool */}
        {activeTool === 'multiModal' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">🖼️ Multi-modal AI Analysis</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Section */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Description</label>
                  <textarea
                    value={multiModalInput.text}
                    onChange={(e) => setMultiModalInput(prev => ({ ...prev, text: e.target.value }))}
                    placeholder="Describe your architectural project, requirements, and goals..."
                    className="w-full p-3 border border-gray-300 rounded-md"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileUpload('images', e.target.files)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {multiModalInput.images.length > 0 && (
                    <div className="mt-2 text-sm text-gray-600">
                      {multiModalInput.images.length} image(s) selected
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Sketches</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileUpload('sketches', e.target.files)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {multiModalInput.sketches.length > 0 && (
                    <div className="mt-2 text-sm text-gray-600">
                      {multiModalInput.sketches.length} sketch(es) selected
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Blueprints</label>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,image/*"
                    onChange={(e) => handleFileUpload('blueprints', e.target.files)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {multiModalInput.blueprints.length > 0 && (
                    <div className="mt-2 text-sm text-gray-600">
                      {multiModalInput.blueprints.length} blueprint(s) selected
                    </div>
                  )}
                </div>

                <button
                  onClick={handleMultiModalAnalysis}
                  disabled={isAnalyzing || (!multiModalInput.text && multiModalInput.images.length === 0)}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-md transition-colors"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze with Multi-modal AI'}
                </button>
              </div>

              {/* Results Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Analysis Results</h3>
                
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-800">{error}</p>
                  </div>
                )}

                {analysisResult && (
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                      <h4 className="font-semibold text-blue-800 mb-2">AI Analysis</h4>
                      <p className="text-blue-900 text-sm">{analysisResult.analysis}</p>
                    </div>

                    {analysisResult.visualSuggestions && analysisResult.visualSuggestions.length > 0 && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                        <h4 className="font-semibold text-green-800 mb-2">Visual Suggestions</h4>
                        <ul className="space-y-1">
                          {analysisResult.visualSuggestions.map((suggestion, index) => (
                            <li key={index} className="text-green-700 text-sm">• {suggestion}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {analysisResult.costProjections && (
                      <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
                        <h4 className="font-semibold text-amber-800 mb-2">Cost Projections</h4>
                        <div className="text-amber-700 text-sm">
                          <div>Current: ${analysisResult.costProjections.current.toLocaleString()}</div>
                          <div>Projected: ${analysisResult.costProjections.projected.toLocaleString()}</div>
                          <div>Savings: ${analysisResult.costProjections.savings.toLocaleString()}</div>
                          <div>Timeline: {analysisResult.costProjections.timeline}</div>
                        </div>
                      </div>
                    )}

                    {analysisResult.sustainabilityScore && (
                      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-md">
                        <h4 className="font-semibold text-emerald-800 mb-2">Sustainability Score</h4>
                        <div className="text-emerald-700 text-sm">
                          <div>Current: {analysisResult.sustainabilityScore.current}/100</div>
                          <div>Potential: {analysisResult.sustainabilityScore.potential}/100</div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Predictive Design Tool */}
        {activeTool === 'predictive' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">🔮 Predictive Design Analysis</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Section */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
                    <select
                      value={predictiveInput.projectType}
                      onChange={(e) => setPredictiveInput(prev => ({ ...prev, projectType: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Industrial">Industrial</option>
                      <option value="Mixed-use">Mixed-use</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Style</label>
                    <select
                      value={predictiveInput.style}
                      onChange={(e) => setPredictiveInput(prev => ({ ...prev, style: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="Modern">Modern</option>
                      <option value="Traditional">Traditional</option>
                      <option value="Contemporary">Contemporary</option>
                      <option value="Minimalist">Minimalist</option>
                      <option value="Eco-friendly">Eco-friendly</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={predictiveInput.location}
                    onChange={(e) => setPredictiveInput(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g., Mumbai, Maharashtra"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Budget (₹)</label>
                    <input
                      type="number"
                      value={predictiveInput.budget}
                      onChange={(e) => setPredictiveInput(prev => ({ ...prev, budget: parseInt(e.target.value) }))}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Timeline</label>
                    <input
                      type="text"
                      value={predictiveInput.timeline}
                      onChange={(e) => setPredictiveInput(prev => ({ ...prev, timeline: e.target.value }))}
                      placeholder="e.g., 6-8 months"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Requirements</label>
                  <div className="space-y-2">
                    {predictiveInput.requirements.map((req, index) => (
                      <div key={index} className="flex space-x-2">
                        <input
                          type="text"
                          value={req}
                          onChange={(e) => updateRequirement(index, e.target.value)}
                          placeholder="Enter requirement"
                          className="flex-1 p-2 border border-gray-300 rounded-md"
                        />
                        <button
                          onClick={() => removeRequirement(index)}
                          className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addRequirement}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      + Add Requirement
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Constraints</label>
                  <div className="space-y-2">
                    {predictiveInput.constraints.map((constraint, index) => (
                      <div key={index} className="flex space-x-2">
                        <input
                          type="text"
                          value={constraint}
                          onChange={(e) => updateConstraint(index, e.target.value)}
                          placeholder="Enter constraint"
                          className="flex-1 p-2 border border-gray-300 rounded-md"
                        />
                        <button
                          onClick={() => removeConstraint(index)}
                          className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addConstraint}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      + Add Constraint
                    </button>
                  </div>
                </div>

                <button
                  onClick={handlePredictiveAnalysis}
                  disabled={isAnalyzing || !predictiveInput.location}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-md transition-colors"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Generate Predictive Analysis'}
                </button>
              </div>

              {/* Results Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Predictive Insights</h3>
                
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-800">{error}</p>
                  </div>
                )}

                {analysisResult && (
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-md">
                      <h4 className="font-semibold text-purple-800 mb-2">Analysis Summary</h4>
                      <p className="text-purple-900 text-sm">{analysisResult.analysis}</p>
                    </div>

                    {analysisResult.predictiveInsights && (
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                        <h4 className="font-semibold text-blue-800 mb-2">Design Trends</h4>
                        <ul className="space-y-1">
                          {analysisResult.predictiveInsights.designTrends.map((trend, index) => (
                            <li key={index} className="text-blue-700 text-sm">• {trend}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {analysisResult.costProjections && (
                      <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
                        <h4 className="font-semibold text-amber-800 mb-2">Cost Projections</h4>
                        <div className="text-amber-700 text-sm">
                          <div>Current: ${analysisResult.costProjections.current.toLocaleString()}</div>
                          <div>Projected: ${analysisResult.costProjections.projected.toLocaleString()}</div>
                          <div>Savings: ${analysisResult.costProjections.savings.toLocaleString()}</div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Real-time Collaboration Tool */}
        {activeTool === 'collaboration' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">👥 Real-time Collaboration</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Setup Section */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Participants</label>
                  <div className="space-y-2">
                    {collaborationInput.participants.map((participant, index) => (
                      <div key={index} className="flex space-x-2">
                        <input
                          type="text"
                          value={participant}
                          onChange={(e) => updateParticipant(index, e.target.value)}
                          placeholder="Enter participant name"
                          className="flex-1 p-2 border border-gray-300 rounded-md"
                        />
                        <button
                          onClick={() => removeParticipant(index)}
                          className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addParticipant}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      + Add Participant
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">AI Assistants</label>
                  <div className="space-y-2">
                    {collaborationInput.tools.map((tool, index) => (
                      <div key={index} className="p-2 bg-gray-50 rounded-md text-sm text-gray-700">
                        {tool}
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleCreateCollaboration}
                  disabled={collaborationInput.participants.filter(p => p.trim()).length === 0}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-md transition-colors"
                >
                  Create Collaboration Session
                </button>
              </div>

              {/* Info Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Collaboration Features</h3>
                
                <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                  <h4 className="font-semibold text-green-800 mb-2">Real-time Features</h4>
                  <ul className="space-y-1 text-green-700 text-sm">
                    <li>• Live design collaboration</li>
                    <li>• AI-powered suggestions</li>
                    <li>• Shared project context</li>
                    <li>• Instant feedback loops</li>
                    <li>• Multi-user editing</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                  <h4 className="font-semibold text-blue-800 mb-2">AI Assistants Available</h4>
                  <ul className="space-y-1 text-blue-700 text-sm">
                    <li>• Design Assistant - Layout optimization</li>
                    <li>• Cost Analyst - Budget management</li>
                    <li>• Sustainability Expert - Green building</li>
                    <li>• Structural Engineer - Safety compliance</li>
                    <li>• Vastu Master - Cultural integration</li>
                  </ul>
                </div>

                <div className="p-4 bg-purple-50 border border-purple-200 rounded-md">
                  <h4 className="font-semibold text-purple-800 mb-2">Benefits</h4>
                  <ul className="space-y-1 text-purple-700 text-sm">
                    <li>• Faster decision making</li>
                    <li>• Reduced communication gaps</li>
                    <li>• AI-powered insights</li>
                    <li>• Real-time problem solving</li>
                    <li>• Enhanced team productivity</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedAITools;
