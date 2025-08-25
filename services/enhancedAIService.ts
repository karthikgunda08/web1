// src/services/enhancedAIService.ts
// Enhanced AI Service with Knowledge Base Integration

import { architecturalRAG, aiPersonas } from './aiKnowledgeBase';

export interface EnhancedAIRequest {
  toolType: string;
  userQuery: string;
  projectContext?: any;
  userPreferences?: any;
  budget?: number;
  location?: string;
  buildingType?: string;
}

export interface EnhancedAIResponse {
  response: string;
  recommendations: string[];
  costEstimates?: any;
  complianceNotes?: string[];
  sustainabilityScore?: number;
  implementationSteps?: string[];
  alternatives?: string[];
  knowledgeSources: string[];
}

export class EnhancedAIService {
  private geminiApiKey: string;
  private baseUrl: string;

  constructor() {
    this.geminiApiKey = process.env.GOOGLE_GEMINI_API_KEY || '';
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models';
  }

  // Enhanced AI analysis with knowledge base integration
  async analyzeWithExpertise(request: EnhancedAIRequest): Promise<EnhancedAIResponse> {
    try {
      // Get specialized knowledge and persona
      const toolKnowledge = architecturalRAG.getToolKnowledge(request.toolType);
      const enhancedPrompt = architecturalRAG.generateEnhancedPrompt(
        request.toolType,
        request.userQuery,
        request.projectContext
      );

      // Create comprehensive context
      const fullContext = this.buildFullContext(request, toolKnowledge);

      // Generate AI response
      const aiResponse = await this.callGeminiAPI(await enhancedPrompt, fullContext);

      // Process and enhance the response
      const processedResponse = this.processAIResponse(aiResponse, request, toolKnowledge);

      return processedResponse;
    } catch (error) {
      console.error('Enhanced AI analysis failed:', error);
      return this.generateFallbackResponse(request);
    }
  }

  // Build comprehensive context for AI analysis
  private buildFullContext(request: EnhancedAIRequest, toolKnowledge: any): string {
    const context = {
      project: {
        type: request.buildingType || 'Residential',
        location: request.location || 'Not specified',
        budget: request.budget || 'Not specified',
        preferences: request.userPreferences || {}
      },
      knowledge: toolKnowledge,
      requirements: this.extractRequirements(request.userQuery),
      constraints: this.identifyConstraints(request)
    };

    return JSON.stringify(context, null, 2);
  }

  // Extract requirements from user query
  private extractRequirements(query: string): string[] {
    const requirements = [];
    
    if (query.toLowerCase().includes('budget')) requirements.push('Cost optimization');
    if (query.toLowerCase().includes('sustainable')) requirements.push('Environmental responsibility');
    if (query.toLowerCase().includes('modern')) requirements.push('Contemporary design');
    if (query.toLowerCase().includes('traditional')) requirements.push('Heritage preservation');
    if (query.toLowerCase().includes('luxury')) requirements.push('Premium quality');
    if (query.toLowerCase().includes('fast')) requirements.push('Quick implementation');
    
    return requirements;
  }

  // Identify project constraints
  private identifyConstraints(request: EnhancedAIRequest): string[] {
    const constraints = [];
    
    if (request.budget && request.budget < 100000) constraints.push('Budget limited');
    if (request.location?.includes('earthquake')) constraints.push('Seismic zone');
    if (request.location?.includes('flood')) constraints.push('Flood prone area');
    if (request.buildingType === 'High-rise') constraints.push('Height restrictions');
    
    return constraints;
  }

  // Call Gemini API with enhanced prompt
  private async callGeminiAPI(prompt: string, context: string): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/gemini-2.0-flash-exp:generateContent?key=${this.geminiApiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `${prompt}\n\nContext: ${context}`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates[0]?.content?.parts[0]?.text || 'No response generated';
    } catch (error) {
      console.error('Gemini API call failed:', error);
      throw error;
    }
  }

  // Process and enhance AI response
  private processAIResponse(aiResponse: string, request: EnhancedAIRequest, toolKnowledge: any): EnhancedAIResponse {
    // Extract key information from AI response
    const recommendations = this.extractRecommendations(aiResponse);
    const costEstimates = this.extractCostEstimates(aiResponse);
    const complianceNotes = this.extractComplianceNotes(aiResponse);
    const sustainabilityScore = this.calculateSustainabilityScore(aiResponse, request);
    const implementationSteps = this.extractImplementationSteps(aiResponse);
    const alternatives = this.generateAlternatives(request, toolKnowledge);

    return {
      response: aiResponse,
      recommendations,
      costEstimates,
      complianceNotes,
      sustainabilityScore,
      implementationSteps,
      alternatives,
      knowledgeSources: this.identifyKnowledgeSources(toolKnowledge)
    };
  }

  // Extract recommendations from AI response
  private extractRecommendations(response: string): string[] {
    const recommendations = [];
    const lines = response.split('\n');
    
    for (const line of lines) {
      if (line.includes('•') || line.includes('-') || line.includes('*')) {
        const cleanLine = line.replace(/[•\-*]\s*/, '').trim();
        if (cleanLine.length > 10) {
          recommendations.push(cleanLine);
        }
      }
    }
    
    return recommendations.slice(0, 5); // Limit to top 5
  }

  // Extract cost estimates from AI response
  private extractCostEstimates(response: string): any {
    const costPatterns = [
      /\$[\d,]+/g,
      /[\d,]+ USD/g,
      /[\d,]+ rupees/g,
      /[\d,]+ INR/g
    ];
    
    const costs = {};
    costPatterns.forEach(pattern => {
      const matches = response.match(pattern);
      if (matches) {
        costs[pattern.source] = matches;
      }
    });
    
    return costs;
  }

  // Extract compliance notes from AI response
  private extractComplianceNotes(response: string): string[] {
    const complianceKeywords = ['code', 'standard', 'regulation', 'compliance', 'requirement', 'safety'];
    const lines = response.split('\n');
    const complianceNotes = [];
    
    for (const line of lines) {
      const lowerLine = line.toLowerCase();
      if (complianceKeywords.some(keyword => lowerLine.includes(keyword))) {
        complianceNotes.push(line.trim());
      }
    }
    
    return complianceNotes.slice(0, 3); // Limit to top 3
  }

  // Calculate sustainability score
  private calculateSustainabilityScore(response: string, request: EnhancedAIRequest): number {
    let score = 50; // Base score
    
    const sustainabilityKeywords = [
      'sustainable', 'green', 'eco-friendly', 'energy-efficient', 'renewable',
      'recycled', 'natural', 'biodegradable', 'low-carbon', 'water-saving'
    ];
    
    const responseLower = response.toLowerCase();
    sustainabilityKeywords.forEach(keyword => {
      if (responseLower.includes(keyword)) {
        score += 5;
      }
    });
    
    // Bonus for specific sustainable features
    if (responseLower.includes('leed')) score += 10;
    if (responseLower.includes('breeam')) score += 10;
    if (responseLower.includes('griha')) score += 10;
    
    return Math.min(100, Math.max(0, score));
  }

  // Extract implementation steps from AI response
  private extractImplementationSteps(response: string): string[] {
    const steps = [];
    const lines = response.split('\n');
    
    for (const line of lines) {
      if (line.match(/^\d+\./) || line.match(/^Step \d+:/)) {
        const cleanStep = line.replace(/^\d+\.\s*/, '').replace(/^Step \d+:\s*/, '').trim();
        if (cleanStep.length > 10) {
          steps.push(cleanStep);
        }
      }
    }
    
    return steps.slice(0, 5); // Limit to top 5
  }

  // Generate alternatives based on knowledge base
  private generateAlternatives(request: EnhancedAIRequest, toolKnowledge: any): string[] {
    const alternatives = [];
    
    if (request.budget && request.budget < 100000) {
      alternatives.push('Consider modular construction for cost savings');
      alternatives.push('Explore local material alternatives');
      alternatives.push('Phase the project to spread costs');
    }
    
    if (request.location?.includes('earthquake')) {
      alternatives.push('Base isolation systems for seismic protection');
      alternatives.push('Ductile structural systems');
      alternatives.push('Lightweight construction materials');
    }
    
    if (request.buildingType === 'Commercial') {
      alternatives.push('Mixed-use development opportunities');
      alternatives.push('Adaptive reuse of existing structures');
      alternatives.push('Flexible floor plan layouts');
    }
    
    return alternatives;
  }

  // Identify knowledge sources used
  private identifyKnowledgeSources(toolKnowledge: any): string[] {
    const sources = [];
    
    if (toolKnowledge.principles) {
      sources.push(`${toolKnowledge.principles.length} architectural principles`);
    }
    
    if (toolKnowledge.standards) {
      sources.push(`${toolKnowledge.standards.length} sustainability standards`);
    }
    
    if (toolKnowledge.data) {
      sources.push(`${toolKnowledge.data.length} cost data points`);
    }
    
    sources.push('International building codes');
    sources.push('Professional best practices');
    
    return sources;
  }

  // Generate fallback response if AI fails
  private generateFallbackResponse(request: EnhancedAIRequest): EnhancedAIResponse {
    const toolKnowledge = architecturalRAG.getToolKnowledge(request.toolType);
    
    return {
      response: `I apologize, but I'm unable to provide a full AI analysis at the moment. However, based on your request for ${request.toolType} analysis, here are some general recommendations based on architectural best practices.`,
      recommendations: [
        'Consult with a licensed architect or engineer',
        'Review local building codes and regulations',
        'Consider sustainability and energy efficiency',
        'Plan for future maintenance and adaptability',
        'Ensure proper safety and accessibility compliance'
      ],
      costEstimates: {},
      complianceNotes: ['Local building codes must be verified', 'Professional consultation recommended'],
      sustainabilityScore: 50,
      implementationSteps: ['Consult professionals', 'Review regulations', 'Plan implementation'],
      alternatives: ['Traditional approaches', 'Modern alternatives', 'Hybrid solutions'],
      knowledgeSources: ['Architectural best practices', 'Building codes', 'Professional standards']
    };
  }

  // Specialized analysis methods for different tools
  async analyzeVastu(query: string, projectContext: any): Promise<EnhancedAIResponse> {
    return this.analyzeWithExpertise({
      toolType: 'vastu',
      userQuery: query,
      projectContext
    });
  }

  async analyzeStructural(query: string, projectContext: any): Promise<EnhancedAIResponse> {
    return this.analyzeWithExpertise({
      toolType: 'structural',
      userQuery: query,
      projectContext
    });
  }

  async analyzeInterior(query: string, projectContext: any): Promise<EnhancedAIResponse> {
    return this.analyzeWithExpertise({
      toolType: 'interior',
      userQuery: query,
      projectContext
    });
  }

  async analyzeSustainability(query: string, projectContext: any): Promise<EnhancedAIResponse> {
    return this.analyzeWithExpertise({
      toolType: 'sustainability',
      userQuery: query,
      projectContext
    });
  }

  async analyzeCost(query: string, projectContext: any): Promise<EnhancedAIResponse> {
    return this.analyzeWithExpertise({
      toolType: 'cost',
      userQuery: query,
      projectContext
    });
  }
}

// Export singleton instance
export const enhancedAI = new EnhancedAIService();
