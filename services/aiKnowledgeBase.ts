// src/services/aiKnowledgeBase.ts
// Comprehensive Architectural Knowledge Base & Prompt Engineering System

export interface ArchitecturalKnowledge {
  vastuPrinciples: VastuPrinciple[];
  buildingCodes: BuildingCode[];
  materialSpecs: MaterialSpec[];
  costData: CostData[];
  sustainabilityStandards: SustainabilityStandard[];
  interiorDesignPrinciples: InteriorDesignPrinciple[];
  structuralEngineering: StructuralPrinciple[];
}

export interface VastuPrinciple {
  id: string;
  name: string;
  description: string;
  application: string;
  benefits: string[];
  considerations: string[];
}

export interface BuildingCode {
  id: string;
  standard: string;
  region: string;
  requirements: string[];
  compliance: string[];
}

export interface MaterialSpec {
  id: string;
  name: string;
  category: string;
  properties: Record<string, any>;
  applications: string[];
  sustainability: string;
  cost: string;
}

export interface CostData {
  id: string;
  item: string;
  unit: string;
  lowRange: number;
  highRange: number;
  region: string;
  date: string;
}

export interface SustainabilityStandard {
  id: string;
  name: string;
  criteria: string[];
  certification: string;
  benefits: string[];
}

export interface InteriorDesignPrinciple {
  id: string;
  name: string;
  description: string;
  applications: string[];
  psychology: string;
}

export interface StructuralPrinciple {
  id: string;
  name: string;
  description: string;
  applications: string[];
  safetyFactors: string[];
}

// Core Knowledge Base
export const architecturalKnowledgeBase: ArchitecturalKnowledge = {
  vastuPrinciples: [
    {
      id: 'vastu_001',
      name: 'Directional Orientation',
      description: 'Proper alignment with cardinal directions for optimal energy flow',
      application: 'Building orientation, room placement, entrance positioning',
      benefits: ['Positive energy flow', 'Better health', 'Prosperity', 'Harmony'],
      considerations: ['Site topography', 'Climate conditions', 'Local regulations']
    },
    {
      id: 'vastu_002',
      name: 'Five Elements Balance',
      description: 'Harmonizing earth, water, fire, air, and space elements',
      application: 'Material selection, room functions, landscaping',
      benefits: ['Environmental harmony', 'Well-being', 'Sustainability'],
      considerations: ['Local climate', 'Available materials', 'Budget constraints']
    },
    {
      id: 'vastu_003',
      name: 'Sacred Geometry',
      description: 'Use of mathematical proportions and geometric patterns',
      application: 'Room dimensions, building proportions, layout planning',
      benefits: ['Aesthetic appeal', 'Energy efficiency', 'Structural stability'],
      considerations: ['Functional requirements', 'Modern building codes', 'Cost implications']
    }
  ],

  buildingCodes: [
    {
      id: 'code_001',
      standard: 'International Building Code (IBC)',
      region: 'United States',
      requirements: ['Structural integrity', 'Fire safety', 'Accessibility', 'Energy efficiency'],
      compliance: ['Load calculations', 'Fire ratings', 'ADA compliance', 'Energy codes']
    },
    {
      id: 'code_002',
      standard: 'Eurocode',
      region: 'European Union',
      requirements: ['Structural design', 'Fire resistance', 'Durability', 'Sustainability'],
      compliance: ['Eurocode 0-9', 'National annexes', 'Material specifications']
    },
    {
      id: 'code_003',
      standard: 'National Building Code of India',
      region: 'India',
      requirements: ['Structural safety', 'Fire protection', 'Plumbing', 'Electrical'],
      compliance: ['IS codes', 'Local bylaws', 'Municipal regulations']
    }
  ],

  materialSpecs: [
    {
      id: 'material_001',
      name: 'Reinforced Concrete',
      category: 'Structural',
      properties: {
        compressiveStrength: '20-80 MPa',
        density: '2400 kg/m³',
        thermalConductivity: '0.8-2.0 W/mK',
        fireResistance: 'High'
      },
      applications: ['Foundations', 'Columns', 'Beams', 'Slabs'],
      sustainability: 'Medium - High embodied energy but long lifespan',
      cost: 'Medium - $80-150/m³'
    },
    {
      id: 'material_002',
      name: 'Structural Steel',
      category: 'Structural',
      properties: {
        yieldStrength: '250-690 MPa',
        density: '7850 kg/m³',
        thermalConductivity: '50 W/mK',
        fireResistance: 'Medium (requires protection)'
      },
      applications: ['Frames', 'Trusses', 'Connections', 'Cladding'],
      sustainability: 'High - 100% recyclable, low embodied energy',
      cost: 'High - $800-1200/ton'
    },
    {
      id: 'material_003',
      name: 'Cross-Laminated Timber (CLT)',
      category: 'Structural',
      properties: {
        compressiveStrength: '20-40 MPa',
        density: '400-500 kg/m³',
        thermalConductivity: '0.12 W/mK',
        fireResistance: 'Medium'
      },
      applications: ['Walls', 'Floors', 'Roofs', 'Panels'],
      sustainability: 'Very High - Carbon negative, renewable',
      cost: 'Medium-High - $400-800/m³'
    }
  ],

  costData: [
    {
      id: 'cost_001',
      item: 'Reinforced Concrete Foundation',
      unit: 'm³',
      lowRange: 80,
      highRange: 150,
      region: 'Global',
      date: '2024'
    },
    {
      id: 'cost_002',
      item: 'Structural Steel Frame',
      unit: 'ton',
      lowRange: 800,
      highRange: 1200,
      region: 'Global',
      date: '2024'
    },
    {
      id: 'cost_003',
      item: 'High-End Interior Finishes',
      unit: 'm²',
      lowRange: 200,
      highRange: 500,
      region: 'Global',
      date: '2024'
    }
  ],

  sustainabilityStandards: [
    {
      id: 'sustain_001',
      name: 'LEED (Leadership in Energy and Environmental Design)',
      criteria: ['Energy efficiency', 'Water conservation', 'Material selection', 'Indoor air quality'],
      certification: 'Certified, Silver, Gold, Platinum',
      benefits: ['Reduced operating costs', 'Higher property value', 'Environmental responsibility']
    },
    {
      id: 'sustain_002',
      name: 'BREEAM (Building Research Establishment Environmental Assessment Method)',
      criteria: ['Energy performance', 'Water usage', 'Materials', 'Waste management'],
      certification: 'Pass, Good, Very Good, Excellent, Outstanding',
      benefits: ['International recognition', 'Compliance with regulations', 'Market differentiation']
    },
    {
      id: 'sustain_003',
      name: 'GRIHA (Green Rating for Integrated Habitat Assessment)',
      criteria: ['Site planning', 'Energy efficiency', 'Water management', 'Waste management'],
      certification: '1-5 Stars',
      benefits: ['Indian context specific', 'Government recognition', 'Cost savings']
    }
  ],

  interiorDesignPrinciples: [
    {
      id: 'interior_001',
      name: 'Balance and Proportion',
      description: 'Creating visual equilibrium through proper scale and distribution',
      applications: ['Furniture arrangement', 'Color distribution', 'Art placement'],
      psychology: 'Promotes calmness and order, reduces visual stress'
    },
    {
      id: 'interior_002',
      name: 'Color Psychology',
      description: 'Using colors to influence mood and behavior',
      applications: ['Room color schemes', 'Accent walls', 'Furniture selection'],
      psychology: 'Different colors evoke different emotional responses and behaviors'
    },
    {
      id: 'interior_003',
      name: 'Lighting Design',
      description: 'Strategic use of natural and artificial lighting',
      applications: ['Window placement', 'Fixture selection', 'Light layering'],
      psychology: 'Proper lighting improves mood, productivity, and perceived space'
    }
  ],

  structuralEngineering: [
    {
      id: 'structural_001',
      name: 'Load Path Analysis',
      description: 'Understanding how forces flow through a structure',
      applications: ['Foundation design', 'Column placement', 'Beam sizing'],
      safetyFactors: ['Dead load safety factor: 1.4', 'Live load safety factor: 1.6', 'Wind load safety factor: 1.6']
    },
    {
      id: 'structural_002',
      name: 'Lateral Force Resistance',
      description: 'Designing for earthquake and wind loads',
      applications: ['Shear walls', 'Braced frames', 'Moment frames'],
      safetyFactors: ['Seismic safety factor: 1.0-1.5', 'Wind safety factor: 1.6']
    },
    {
      id: 'structural_003',
      name: 'Foundation Design',
      description: 'Ensuring stable support for the structure',
      applications: ['Shallow foundations', 'Deep foundations', 'Retaining walls'],
      safetyFactors: ['Bearing capacity safety factor: 3.0', 'Sliding safety factor: 1.5']
    }
  ]
};

// Specialized AI Personas
export const aiPersonas = {
  vastuExpert: {
    name: 'Vastu Shastra Master',
    expertise: 'Ancient Indian architectural principles and energy flow',
    prompt: `You are a revered Vastu Shastra master with 30+ years of experience. You understand:
    - Traditional Vastu principles and their modern applications
    - Energy flow (prana) and its impact on human well-being
    - Integration of ancient wisdom with contemporary building science
    - Cultural sensitivity and regional variations in Vastu
    
    Always provide:
    - Practical, implementable Vastu solutions
    - Scientific explanations for traditional principles
    - Cost-effective alternatives for expensive remedies
    - Respect for cultural and religious beliefs
    - Integration with modern building codes and regulations`
  },

  structuralEngineer: {
    name: 'Senior Structural Engineer',
    expertise: 'Modern structural engineering and building safety',
    prompt: `You are a licensed structural engineer with 25+ years of experience in:
    - Seismic design and earthquake engineering
    - High-rise and complex structure design
    - International building codes and standards
    - Material science and construction technology
    - Sustainability and green building design
    
    Always ensure:
    - Safety is the primary concern
    - Code compliance and best practices
    - Cost-effective structural solutions
    - Future adaptability and maintenance
    - Integration with architectural vision`
  },

  interiorDesigner: {
    name: 'Luxury Interior Design Specialist',
    expertise: 'High-end interior design and space psychology',
    prompt: `You are an award-winning interior designer specializing in:
    - Luxury residential and commercial spaces
    - Space planning and ergonomics
    - Color psychology and lighting design
    - Material selection and sustainability
    - Cultural sensitivity and personalization
    
    Always provide:
    - Detailed, actionable design recommendations
    - Specific material and product suggestions
    - Cost estimates and alternatives
    - Implementation timelines and steps
    - Maintenance and care instructions`
  },

  sustainabilityExpert: {
    name: 'Green Building Consultant',
    expertise: 'Sustainable design and environmental certification',
    prompt: `You are a LEED AP and sustainability consultant with expertise in:
    - Green building certification systems (LEED, BREEAM, GRIHA)
    - Energy modeling and optimization
    - Material lifecycle assessment
    - Water conservation strategies
    - Indoor environmental quality
    
    Always recommend:
    - Measurable sustainability improvements
    - Cost-benefit analysis of green features
    - Compliance with local regulations
    - Long-term environmental impact
    - Innovation in sustainable design`
  },

  costEstimator: {
    name: 'Senior Cost Consultant',
    expertise: 'Construction cost estimation and value engineering',
    prompt: `You are a certified cost consultant with 20+ years of experience in:
    - Detailed cost estimation and budgeting
    - Value engineering and cost optimization
    - International cost databases and trends
    - Risk assessment and contingency planning
    - Lifecycle cost analysis
    
    Always provide:
    - Detailed cost breakdowns by system
    - Regional cost variations and factors
    - Cost-saving alternatives and options
    - Risk factors and contingencies
    - Long-term cost implications`
  }
};

// RAG (Retrieval-Augmented Generation) System
export class ArchitecturalRAGSystem {
  private knowledgeBase: ArchitecturalKnowledge;

  constructor() {
    this.knowledgeBase = architecturalKnowledgeBase;
  }

  // Retrieve relevant knowledge for specific queries
  async retrieveKnowledge(query: string, context: string): Promise<any[]> {
    const relevantKnowledge = [];
    
    // Simple keyword-based retrieval (can be enhanced with vector search)
    const queryLower = query.toLowerCase();
    
    // Search through different knowledge domains
    if (queryLower.includes('vastu') || queryLower.includes('energy') || queryLower.includes('direction')) {
      relevantKnowledge.push(...this.knowledgeBase.vastuPrinciples);
    }
    
    if (queryLower.includes('structural') || queryLower.includes('safety') || queryLower.includes('load')) {
      relevantKnowledge.push(...this.knowledgeBase.structuralEngineering);
    }
    
    if (queryLower.includes('interior') || queryLower.includes('design') || queryLower.includes('space')) {
      relevantKnowledge.push(...this.knowledgeBase.interiorDesignPrinciples);
    }
    
    if (queryLower.includes('sustainable') || queryLower.includes('green') || queryLower.includes('environment')) {
      relevantKnowledge.push(...this.knowledgeBase.sustainabilityStandards);
    }
    
    if (queryLower.includes('cost') || queryLower.includes('budget') || queryLower.includes('price')) {
      relevantKnowledge.push(...this.knowledgeBase.costData);
    }
    
    return relevantKnowledge;
  }

  // Generate enhanced prompts with context
  async generateEnhancedPrompt(toolType: string, userQuery: string, context?: any): Promise<string> {
    const persona = aiPersonas[toolType as keyof typeof aiPersonas];
    if (!persona) {
      return userQuery;
    }

    const retrievedKnowledge = await this.retrieveKnowledge(userQuery, context || '');
    
    return `
${persona.prompt}

User Query: ${userQuery}

Relevant Knowledge Context:
${retrievedKnowledge.map(k => `- ${JSON.stringify(k)}`).join('\n')}

Please provide a comprehensive, professional response that:
1. Addresses the user's specific query
2. Incorporates relevant architectural knowledge
3. Provides actionable recommendations
4. Considers cost, sustainability, and compliance
5. Maintains the highest professional standards

Response:`;
  }

  // Get specialized knowledge for specific tools
  getToolKnowledge(toolType: string): any {
    switch (toolType) {
      case 'vastu':
        return {
          principles: this.knowledgeBase.vastuPrinciples,
          persona: aiPersonas.vastuExpert
        };
      case 'structural':
        return {
          principles: this.knowledgeBase.structuralEngineering,
          persona: aiPersonas.structuralEngineer
        };
      case 'interior':
        return {
          principles: this.knowledgeBase.interiorDesignPrinciples,
          persona: aiPersonas.interiorDesigner
        };
      case 'sustainability':
        return {
          standards: this.knowledgeBase.sustainabilityStandards,
          persona: aiPersonas.sustainabilityExpert
        };
      case 'cost':
        return {
          data: this.knowledgeBase.costData,
          persona: aiPersonas.costEstimator
        };
      default:
        return this.knowledgeBase;
    }
  }
}

// Export singleton instance
export const architecturalRAG = new ArchitecturalRAGSystem();
