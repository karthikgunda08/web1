// src/components/professional/ProfessionalCADTools.tsx
// Professional CAD Tools Integration with Material Libraries

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Download, Upload, Share2, Settings, Palette, 
  Box, Ruler, Layers, Eye, RotateCcw, ZoomIn, ZoomOut,
  Move, Eraser, Text, Save, Undo, Redo, Import, Lock, Unlock, Plus
} from 'lucide-react';

interface CADTool {
  id: string;
  name: string;
  type: '2d' | '3d' | 'bim' | 'rendering';
  icon: string;
  description: string;
  status: 'available' | 'processing' | 'error';
  lastUsed: string;
  fileTypes: string[];
}

interface Material {
  id: string;
  name: string;
  category: 'wall' | 'floor' | 'ceiling' | 'furniture' | 'texture';
  type: 'solid' | 'pattern' | 'metallic' | 'glass' | 'wood' | 'stone';
  color: string;
  roughness: number;
  metallic: number;
  normalMap?: string;
  albedoMap?: string;
  roughnessMap?: string;
  metallicMap?: string;
  preview: string;
}

interface ProjectFile {
  id: string;
  name: string;
  type: 'dwg' | 'skp' | 'max' | 'rvt' | 'obj' | 'fbx' | 'ifc';
  size: number;
  lastModified: string;
  version: string;
  status: 'active' | 'archived' | 'review';
}

const ProfessionalCADTools: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tools' | 'materials' | 'files' | 'workflow'>('tools');
  const [selectedTool, setSelectedTool] = useState<CADTool | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [activeFile, setActiveFile] = useState<ProjectFile | null>(null);

  // Mock CAD Tools Data
  const [cadTools] = useState<CADTool[]>([
    {
      id: 'autocad',
      name: 'AutoCAD Professional',
      type: '2d',
      icon: '🖼️',
      description: 'Professional 2D drafting and documentation',
      status: 'available',
      lastUsed: '2024-10-26',
      fileTypes: ['.dwg', '.dxf', '.dwl', '.bak']
    },
    {
      id: 'sketchup',
      name: 'SketchUp Pro',
      type: '3d',
      icon: '🏗️',
      description: '3D modeling and visualization',
      status: 'available',
      lastUsed: '2024-10-26',
      fileTypes: ['.skp', '.skb', '.dae', '.kmz']
    },
    {
      id: '3dsmax',
      name: '3ds Max',
      type: '3d',
      icon: '🎨',
      description: 'Advanced 3D modeling and rendering',
      status: 'available',
      lastUsed: '2024-10-25',
      fileTypes: ['.max', '.chr', '.vrmesh', '.vrmap']
    },
    {
      id: 'revit',
      name: 'Autodesk Revit',
      type: 'bim',
      icon: '🏢',
      description: 'Building Information Modeling',
      status: 'available',
      lastUsed: '2024-10-24',
      fileTypes: ['.rvt', '.rfa', '.rte', '.rft']
    },
    {
      id: 'vray',
      name: 'V-Ray',
      type: 'rendering',
      icon: '🌟',
      description: 'Professional rendering engine',
      status: 'available',
      lastUsed: '2024-10-23',
      fileTypes: ['.vrscene', '.vrmat', '.vropt']
    }
  ]);

  // Mock Materials Library
  const [materials] = useState<Material[]>([
    {
      id: 'marble_white',
      name: 'White Marble',
      category: 'floor',
      type: 'stone',
      color: '#F5F5F5',
      roughness: 0.1,
      metallic: 0.0,
      preview: '/materials/marble_white.jpg',
      albedoMap: '/materials/marble_white_albedo.jpg',
      normalMap: '/materials/marble_white_normal.jpg',
      roughnessMap: '/materials/marble_white_roughness.jpg'
    },
    {
      id: 'oak_wood',
      name: 'Oak Wood',
      category: 'furniture',
      type: 'wood',
      color: '#8B4513',
      roughness: 0.8,
      metallic: 0.0,
      preview: '/materials/oak_wood.jpg',
      albedoMap: '/materials/oak_wood_albedo.jpg',
      normalMap: '/materials/oak_wood_normal.jpg',
      roughnessMap: '/materials/oak_wood_roughness.jpg'
    },
    {
      id: 'brass_metal',
      name: 'Brass Metal',
      category: 'furniture',
      type: 'metallic',
      color: '#CD853F',
      roughness: 0.3,
      metallic: 1.0,
      preview: '/materials/brass_metal.jpg',
      albedoMap: '/materials/brass_metal_albedo.jpg',
      normalMap: '/materials/brass_metal_normal.jpg',
      metallicMap: '/materials/brass_metal_metallic.jpg'
    },
    {
      id: 'glass_clear',
      name: 'Clear Glass',
      category: 'furniture',
      type: 'glass',
      color: '#FFFFFF',
      roughness: 0.0,
      metallic: 0.0,
      preview: '/materials/glass_clear.jpg'
    }
  ]);

  // Mock Project Files
  const [projectFiles] = useState<ProjectFile[]>([
    {
      id: 'file_001',
      name: 'Main_Floor_Plan.dwg',
      type: 'dwg',
      size: 2.4,
      lastModified: '2024-10-26',
      version: '2024.1',
      status: 'active'
    },
    {
      id: 'file_002',
      name: '3D_Model.skp',
      type: 'skp',
      size: 15.7,
      lastModified: '2024-10-26',
      version: '2024.0',
      status: 'active'
    },
    {
      id: 'file_003',
      name: 'Rendering_Scene.max',
      type: 'max',
      size: 45.2,
      lastModified: '2024-10-25',
      version: '2024.2',
      status: 'active'
    }
  ]);

  const getFileTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      dwg: '📐',
      skp: '🏗️',
      max: '🎨',
      rvt: '🏢',
      obj: '📦',
      fbx: '🎭',
      ifc: '🏗️'
    };
    return icons[type] || '📄';
  };

  const getFileTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      dwg: 'bg-blue-100 text-blue-800',
      skp: 'bg-green-100 text-green-800',
      max: 'bg-purple-100 text-purple-800',
      rvt: 'bg-orange-100 text-orange-800',
      obj: 'bg-gray-100 text-gray-800',
      fbx: 'bg-pink-100 text-pink-800',
      ifc: 'bg-indigo-100 text-indigo-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const renderTools = () => (
    <div className="space-y-6">
      {/* CAD Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cadTools.map((tool) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all cursor-pointer"
            onClick={() => setSelectedTool(tool)}
          >
            <div className="p-6">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{tool.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{tool.name}</h3>
                <p className="text-sm text-gray-600">{tool.description}</p>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Type</span>
                  <span className="font-medium capitalize">{tool.type}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Status</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    tool.status === 'available' ? 'bg-green-100 text-green-800' :
                    tool.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {tool.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Last Used</span>
                  <span className="font-medium">{new Date(tool.lastUsed).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    {tool.fileTypes.length} file types supported
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Launch
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tool Integration Status */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Integration Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-medium text-green-800">AutoCAD Integration</span>
            </div>
            <p className="text-sm text-green-700">Fully integrated with DWG import/export and live sync</p>
          </div>
          <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-medium text-green-800">SketchUp Integration</span>
            </div>
            <p className="text-sm text-green-700">3D model import/export with material preservation</p>
          </div>
          <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-medium text-green-800">3ds Max Integration</span>
            </div>
            <p className="text-sm text-green-700">Scene import/export with rendering capabilities</p>
          </div>
          <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="font-medium text-blue-800">Revit BIM Integration</span>
            </div>
            <p className="text-sm text-blue-700">BIM data exchange and collaboration features</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMaterials = () => (
    <div className="space-y-6">
      {/* Material Categories */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Material Categories</h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Add Material
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['wall', 'floor', 'ceiling', 'furniture'].map((category) => (
            <button
              key={category}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
              <div className="text-2xl mb-2">
                {category === 'wall' ? '🧱' : 
                 category === 'floor' ? '🏗️' : 
                 category === 'ceiling' ? '🏠' : '🪑'}
              </div>
              <span className="text-sm font-medium text-gray-900 capitalize">{category}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {materials.map((material) => (
          <motion.div
            key={material.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all cursor-pointer"
            onClick={() => setSelectedMaterial(material)}
          >
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <div className="text-4xl">🎨</div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{material.name}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  material.category === 'wall' ? 'bg-blue-100 text-blue-800' :
                  material.category === 'floor' ? 'bg-green-100 text-green-800' :
                  material.category === 'ceiling' ? 'bg-purple-100 text-purple-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {material.category}
                </span>
              </div>
              
              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Type</span>
                  <span className="font-medium capitalize">{material.type}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Roughness</span>
                  <span className="font-medium">{material.roughness}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Metallic</span>
                  <span className="font-medium">{material.metallic}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Apply
                </button>
                <button className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderFiles = () => (
    <div className="space-y-6">
      {/* File Management */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Project Files</h3>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {projectFiles.map((file) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => setActiveFile(file)}
            >
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{getFileTypeIcon(file.type)}</div>
                <div>
                  <h4 className="font-medium text-gray-900">{file.name}</h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getFileTypeColor(file.type)}`}>
                      {file.type.toUpperCase()}
                    </span>
                    <span>{file.size} MB</span>
                    <span>v{file.version}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  {new Date(file.lastModified).toLocaleDateString()}
                </span>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderWorkflow = () => (
    <div className="space-y-6">
      {/* Workflow Steps */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Workflow</h3>
        
        <div className="space-y-4">
          {[
            { step: 1, title: 'Concept Design', tool: 'SketchUp', status: 'completed' },
            { step: 2, title: '2D Documentation', tool: 'AutoCAD', status: 'completed' },
            { step: 3, title: '3D Modeling', tool: '3ds Max', status: 'in-progress' },
            { step: 4, title: 'Material Application', tool: 'Material Library', status: 'pending' },
            { step: 5, title: 'Rendering', tool: 'V-Ray', status: 'pending' },
            { step: 6, title: 'BIM Integration', tool: 'Revit', status: 'pending' }
          ].map((workflowStep) => (
            <div key={workflowStep.step} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                workflowStep.status === 'completed' ? 'bg-green-500 text-white' :
                workflowStep.status === 'in-progress' ? 'bg-blue-500 text-white' :
                'bg-gray-300 text-gray-600'
              }`}>
                {workflowStep.status === 'completed' ? '✓' : workflowStep.step}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{workflowStep.title}</h4>
                <p className="text-sm text-gray-600">Using {workflowStep.tool}</p>
              </div>
              <div className="flex items-center space-x-2">
                {workflowStep.status === 'completed' && (
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    Completed
                  </span>
                )}
                {workflowStep.status === 'in-progress' && (
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    In Progress
                  </span>
                )}
                {workflowStep.status === 'pending' && (
                  <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                    Pending
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Collaboration Tools */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Collaboration Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Real-time Collaboration</h4>
            <p className="text-sm text-gray-600 mb-3">Work together with team members in real-time</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              Enable
            </button>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Version Control</h4>
            <p className="text-sm text-gray-600 mb-3">Track changes and maintain file versions</p>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
              Manage
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`${isFullScreen ? 'fixed inset-0 z-50 bg-white' : 'min-h-screen bg-gray-50'}`}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-gray-900">Professional CAD Tools</h1>
              <nav className="flex space-x-6">
                {[
                  { id: 'tools', label: 'CAD Tools', icon: Box },
                  { id: 'materials', label: 'Materials', icon: Palette },
                  { id: 'files', label: 'Files', icon: FileText },
                  { id: 'workflow', label: 'Workflow', icon: Ruler }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {isFullScreen ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'tools' && renderTools()}
          {activeTab === 'materials' && renderMaterials()}
          {activeTab === 'files' && renderFiles()}
          {activeTab === 'workflow' && renderWorkflow()}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProfessionalCADTools;
