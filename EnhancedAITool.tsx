// src/components/EnhancedAITool.tsx
// Enhanced AI Tool with Knowledge Base Integration

import React, { useState, useEffect } from 'react';
import { enhancedAI, EnhancedAIRequest, EnhancedAIResponse } from '../services/enhancedAIService';
import { PromptTemplateEngine, PromptContext } from '../services/promptTemplates';
import { architecturalRAG } from '../services/aiKnowledgeBase';

interface EnhancedAIToolProps {
  toolType: string;
  toolName: string;
  description: string;
  icon: string;
  creditCost: number;
  onAnalysisComplete?: (result: EnhancedAIResponse) => void;
  projectContext?: any;
}

export const EnhancedAITool: React.FC<EnhancedAIToolProps> = ({
  toolType,
  toolName,
  description,
  icon,
  creditCost,
  onAnalysisComplete,
  projectContext
}) => {
  const [userQuery, setUserQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<EnhancedAIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [advancedContext, setAdvancedContext] = useState<Partial<PromptContext>>({
    projectType: 'Residential',
    location: '',
    budget: '',
    style: 'Modern',
    requirements: [],
    constraints: [],
    userExperience: 'Beginner'
  });

  // Get available templates for this tool type
  const availableTemplates = PromptTemplateEngine.getAvailableTemplates();
  const currentTemplate = availableTemplates.find(t => t.includes(toolType));

  // Get specialized knowledge for this tool
  const toolKnowledge = architecturalRAG.getToolKnowledge(toolType);

  const handleAnalysis = async () => {
    if (!userQuery.trim()) {
      setError('Please enter your query');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      // Build enhanced request
      const request: EnhancedAIRequest = {
        toolType,
        userQuery,
        projectContext: {
          ...projectContext,
          ...advancedContext
        },
        budget: advancedContext.budget ? parseFloat(advancedContext.budget) : undefined,
        location: advancedContext.location || undefined,
        buildingType: advancedContext.projectType || undefined
      };

      // Perform analysis
      const result = await enhancedAI.analyzeWithExpertise(request);
      
      setAnalysisResult(result);
      onAnalysisComplete?.(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const addRequirement = () => {
    const newReq = prompt('Enter a new requirement:');
    if (newReq && newReq.trim()) {
      setAdvancedContext(prev => ({
        ...prev,
        requirements: [...(prev.requirements || []), newReq.trim()]
      }));
    }
  };

  const removeRequirement = (index: number) => {
    setAdvancedContext(prev => ({
      ...prev,
      requirements: prev.requirements?.filter((_, i) => i !== index) || []
    }));
  };

  const addConstraint = () => {
    const newConstraint = prompt('Enter a new constraint:');
    if (newConstraint && newConstraint.trim()) {
      setAdvancedContext(prev => ({
        ...prev,
        constraints: [...(prev.constraints || []), newConstraint.trim()]
      }));
    }
  };

  const removeConstraint = (index: number) => {
    setAdvancedContext(prev => ({
      ...prev,
      constraints: prev.constraints?.filter((_, i) => i !== index) || []
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      {/* Tool Header */}
      <div className="flex items-center mb-6">
        <div className="text-4xl mr-4">{icon}</div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{toolName}</h2>
          <p className="text-gray-600">{description}</p>
          <div className="flex items-center mt-2">
            <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-sm font-medium">
              {creditCost} Credits
            </span>
            {toolKnowledge?.persona && (
              <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                {toolKnowledge.persona.name}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Knowledge Base Preview */}
      {toolKnowledge && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">Expert Knowledge Available:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
            {toolKnowledge.principles && (
              <div>• {toolKnowledge.principles.length} architectural principles</div>
            )}
            {toolKnowledge.standards && (
              <div>• {toolKnowledge.standards.length} sustainability standards</div>
            )}
            {toolKnowledge.data && (
              <div>• {toolKnowledge.data.length} cost data points</div>
            )}
            <div>• International building codes</div>
            <div>• Professional best practices</div>
          </div>
        </div>
      )}

      {/* Query Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Describe your architectural question or requirement:
        </label>
        <textarea
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
          placeholder="e.g., Analyze the Vastu compliance of my 3BHK apartment in Mumbai for optimal energy flow and prosperity"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={4}
        />
      </div>

      {/* Advanced Context Options */}
      <div className="mb-6">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          {showAdvanced ? 'Hide' : 'Show'} Advanced Context Options
        </button>
        
        {showAdvanced && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Type
                </label>
                <select
                  value={advancedContext.projectType}
                  onChange={(e) => setAdvancedContext(prev => ({ ...prev, projectType: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Industrial">Industrial</option>
                  <option value="Mixed-use">Mixed-use</option>
                  <option value="Institutional">Institutional</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={advancedContext.location}
                  onChange={(e) => setAdvancedContext(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="e.g., Mumbai, Maharashtra"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Budget Range
                </label>
                <input
                  type="text"
                  value={advancedContext.budget}
                  onChange={(e) => setAdvancedContext(prev => ({ ...prev, budget: e.target.value }))}
                  placeholder="e.g., 50-75 Lakhs"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Style Preference
                </label>
                <select
                  value={advancedContext.style}
                  onChange={(e) => setAdvancedContext(prev => ({ ...prev, style: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="Modern">Modern</option>
                  <option value="Traditional">Traditional</option>
                  <option value="Contemporary">Contemporary</option>
                  <option value="Minimalist">Minimalist</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Eco-friendly">Eco-friendly</option>
                </select>
              </div>
            </div>

            {/* Requirements */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specific Requirements
              </label>
              <div className="space-y-2">
                {advancedContext.requirements?.map((req, index) => (
                  <div key={index} className="flex items-center">
                    <span className="flex-1 p-2 bg-white border border-gray-300 rounded-md text-sm">
                      {req}
                    </span>
                    <button
                      onClick={() => removeRequirement(index)}
                      className="ml-2 text-red-600 hover:text-red-800"
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

            {/* Constraints */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Constraints
              </label>
              <div className="space-y-2">
                {advancedContext.constraints?.map((constraint, index) => (
                  <div key={index} className="flex items-center">
                    <span className="flex-1 p-2 bg-white border border-gray-300 rounded-md text-sm">
                      {constraint}
                    </span>
                    <button
                      onClick={() => removeConstraint(index)}
                      className="ml-2 text-red-600 hover:text-red-800"
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
          </div>
        )}
      </div>

      {/* Analysis Button */}
      <div className="mb-6">
        <button
          onClick={handleAnalysis}
          disabled={isAnalyzing || !userQuery.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-md transition-colors"
        >
          {isAnalyzing ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing with AI Expertise...
            </span>
          ) : (
            `Analyze with ${toolName} (${creditCost} Credits)`
          )}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Analysis Results */}
      {analysisResult && (
        <div className="space-y-6">
          {/* Main Response */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
            <h3 className="font-semibold text-blue-800 mb-2">AI Expert Analysis</h3>
            <div className="prose prose-sm max-w-none text-blue-900">
              {analysisResult.response.split('\n').map((line, index) => (
                <p key={index} className="mb-2">{line}</p>
              ))}
            </div>
          </div>

          {/* Key Recommendations */}
          {analysisResult.recommendations.length > 0 && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <h3 className="font-semibold text-green-800 mb-2">Key Recommendations</h3>
              <ul className="space-y-1">
                {analysisResult.recommendations.map((rec, index) => (
                  <li key={index} className="text-green-700 flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Implementation Steps */}
          {analysisResult.implementationSteps.length > 0 && (
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-md">
              <h3 className="font-semibold text-purple-800 mb-2">Implementation Steps</h3>
              <ol className="space-y-1">
                {analysisResult.implementationSteps.map((step, index) => (
                  <li key={index} className="text-purple-700">
                    {index + 1}. {step}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Cost Estimates */}
          {analysisResult.costEstimates && Object.keys(analysisResult.costEstimates).length > 0 && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
              <h3 className="font-semibold text-amber-800 mb-2">Cost Estimates</h3>
              <div className="space-y-1">
                {Object.entries(analysisResult.costEstimates).map(([pattern, costs]) => (
                  <div key={pattern} className="text-amber-700">
                    <span className="font-medium">{pattern}:</span> {Array.isArray(costs) ? costs.join(', ') : String(costs)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Compliance Notes */}
          {analysisResult.complianceNotes.length > 0 && (
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-md">
              <h3 className="font-semibold text-orange-800 mb-2">Compliance & Safety Notes</h3>
              <ul className="space-y-1">
                {analysisResult.complianceNotes.map((note, index) => (
                  <li key={index} className="text-orange-700 flex items-start">
                    <span className="text-orange-500 mr-2">⚠</span>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Sustainability Score */}
          {analysisResult.sustainabilityScore !== undefined && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-md">
              <h3 className="font-semibold text-emerald-800 mb-2">Sustainability Score</h3>
              <div className="flex items-center">
                <div className="flex-1 bg-gray-200 rounded-full h-3 mr-3">
                  <div
                    className="bg-emerald-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${analysisResult.sustainabilityScore}%` }}
                  ></div>
                </div>
                <span className="text-emerald-700 font-medium">{analysisResult.sustainabilityScore}/100</span>
              </div>
            </div>
          )}

          {/* Knowledge Sources */}
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
            <h3 className="font-semibold text-gray-700 mb-2">Analysis Based On</h3>
            <div className="flex flex-wrap gap-2">
              {analysisResult.knowledgeSources.map((source, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-sm"
                >
                  {source}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedAITool;
