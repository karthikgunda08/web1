// src/components/3DInteriorConverter.tsx
// 3D Interior Conversion Component for converting floor plans to 3D interior models

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Box, 
  Eye, 
  RotateCcw, 
  Download, 
  Settings, 
  Palette, 
  Sofa,
  Lightbulb,
  Camera,
  Zap
} from 'lucide-react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface Wall {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  height: number;
  thickness: number;
  material?: string;
}

interface Room {
  id: string;
  name: string;
  wallIds: string[];
  calculatedArea?: number;
  roomType?: string;
  wallMaterialOverride?: string;
  floorMaterialOverride?: string;
}

interface InteriorStyle {
  id: string;
  name: string;
  description: string;
  colorPalette: string[];
  materials: string[];
  furniture: string[];
  lighting: string;
  mood: string;
}

interface ConversionOptions {
  style: string;
  quality: 'low' | 'medium' | 'high' | 'ultra';
  includeFurniture: boolean;
  includeLighting: boolean;
  includeTextures: boolean;
  renderMode: 'wireframe' | 'solid' | 'textured' | 'realistic';
}

interface ThreeDInteriorConverterProps {
  walls: Wall[];
  rooms: Room[];
  onConversionComplete?: (result: any) => void;
  onError?: (error: string) => void;
}

const interiorStyles: InteriorStyle[] = [
  {
    id: 'modern-minimalist',
    name: 'Modern Minimalist',
    description: 'Clean lines, neutral colors, and functional design',
    colorPalette: ['#FFFFFF', '#F5F5F5', '#E0E0E0', '#333333', '#666666'],
    materials: ['Glass', 'Steel', 'Concrete', 'Wood', 'Leather'],
    furniture: ['Sleek sofa', 'Minimalist table', 'Modern chairs', 'Built-in storage'],
    lighting: 'Natural and ambient LED',
    mood: 'Calm and sophisticated'
  },
  {
    id: 'traditional-classic',
    name: 'Traditional Classic',
    description: 'Timeless elegance with rich textures and warm tones',
    colorPalette: ['#8B4513', '#CD853F', '#F4A460', '#DEB887', '#F5DEB3'],
    materials: ['Mahogany', 'Marble', 'Brass', 'Silk', 'Velvet'],
    furniture: ['Antique table', 'Classic chairs', 'Ornate cabinet', 'Traditional sofa'],
    lighting: 'Warm chandeliers and sconces',
    mood: 'Elegant and welcoming'
  },
  {
    id: 'contemporary-luxury',
    name: 'Contemporary Luxury',
    description: 'High-end modern design with premium materials',
    colorPalette: ['#000000', '#1A1A1A', '#FFFFFF', '#C0C0C0', '#FFD700'],
    materials: ['Marble', 'Gold', 'Crystal', 'Premium leather', 'Exotic wood'],
    furniture: ['Designer sofa', 'Luxury table', 'Premium chairs', 'Art pieces'],
    lighting: 'Statement chandeliers and accent lighting',
    mood: 'Luxurious and sophisticated'
  },
  {
    id: 'scandinavian',
    name: 'Scandinavian',
    description: 'Light, airy spaces with natural materials and functionality',
    colorPalette: ['#FFFFFF', '#F8F9FA', '#E9ECEF', '#6C757D', '#495057'],
    materials: ['Light wood', 'Wool', 'Linen', 'Glass', 'Metal'],
    furniture: ['Wooden table', 'Comfortable chairs', 'Natural sofa', 'Storage units'],
    lighting: 'Natural light and warm bulbs',
    mood: 'Cozy and natural'
  },
  {
    id: 'industrial-urban',
    name: 'Industrial Urban',
    description: 'Raw materials, exposed elements, and urban aesthetic',
    colorPalette: ['#2C3E50', '#34495E', '#7F8C8D', '#BDC3C7', '#ECF0F1'],
    materials: ['Exposed brick', 'Concrete', 'Steel', 'Reclaimed wood', 'Metal'],
    furniture: ['Industrial table', 'Metal chairs', 'Vintage sofa', 'Raw storage'],
    lighting: 'Edison bulbs and metal fixtures',
    mood: 'Urban and edgy'
  }
];

export const ThreeDInteriorConverter: React.FC<ThreeDInteriorConverterProps> = ({
  walls,
  rooms,
  onConversionComplete,
  onError
}) => {
  const [isConverting, setIsConverting] = useState(false);
  const [conversionProgress, setConversionProgress] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState<string>('modern-minimalist');
  const [conversionOptions, setConversionOptions] = useState<ConversionOptions>({
    style: 'modern-minimalist',
    quality: 'high',
    includeFurniture: true,
    includeLighting: true,
    includeTextures: true,
    renderMode: 'textured'
  });
  const [showPreview, setShowPreview] = useState(false);
  const [conversionResult, setConversionResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  const currentStyle = interiorStyles.find(s => s.id === selectedStyle);

  const handleStyleChange = (styleId: string) => {
    setSelectedStyle(styleId);
    setConversionOptions(prev => ({ ...prev, style: styleId }));
  };

  const handleOptionChange = (option: keyof ConversionOptions, value: any) => {
    setConversionOptions(prev => ({ ...prev, [option]: value }));
  };

  const startConversion = async () => {
    if (!walls.length || !rooms.length) {
      setError('No floor plan data available for conversion');
      return;
    }

    setIsConverting(true);
    setConversionProgress(0);
    setError(null);

    try {
      // Simulate conversion process with progress updates
      await simulateConversion();
      
      // Generate 3D model
      const result = await generate3DInterior();
      
      setConversionResult(result);
      setShowPreview(true);
      onConversionComplete?.(result);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Conversion failed';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsConverting(false);
      setConversionProgress(100);
    }
  };

  const simulateConversion = async () => {
    const steps = [
      'Analyzing floor plan...',
      'Generating 3D geometry...',
      'Applying materials and textures...',
      'Adding furniture and fixtures...',
      'Setting up lighting...',
      'Optimizing for rendering...',
      'Finalizing 3D model...'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setConversionProgress(((i + 1) / steps.length) * 100);
    }
  };

  const generate3DInterior = async () => {
    // Initialize Three.js scene
    if (!canvasRef.current) throw new Error('Canvas not available');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvasRef.current.clientWidth / canvasRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Set up scene
    scene.background = new THREE.Color(0xf0f0f0);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    // Generate walls
    walls.forEach(wall => {
      const wallGeometry = new THREE.BoxGeometry(
        Math.abs(wall.x2 - wall.x1),
        wall.height,
        wall.thickness
      );
      
      const wallMaterial = new THREE.MeshLambertMaterial({ 
        color: currentStyle?.colorPalette[2] || 0xcccccc 
      });
      
      const wallMesh = new THREE.Mesh(wallGeometry, wallMaterial);
      wallMesh.position.set(
        (wall.x1 + wall.x2) / 2,
        wall.height / 2,
        0
      );
      
      scene.add(wallMesh);
    });

    // Generate rooms
    rooms.forEach(room => {
      if (room.calculatedArea) {
        // Add room label
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (context) {
          context.font = '24px Arial';
          context.fillStyle = '#333333';
          context.fillText(room.name, 10, 30);
          
          const texture = new THREE.CanvasTexture(canvas);
          const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
          const sprite = new THREE.Sprite(spriteMaterial);
          
          // Position sprite above room center
          const roomCenter = calculateRoomCenter(room, walls);
          sprite.position.set(roomCenter.x, 3, roomCenter.y);
          scene.add(sprite);
        }
      }
    });

    // Add furniture if enabled
    if (conversionOptions.includeFurniture) {
      addFurniture(scene);
    }

    // Add lighting if enabled
    if (conversionOptions.includeLighting) {
      addLighting(scene);
    }

    // Set up camera and controls
    camera.position.set(15, 10, 15);
    camera.lookAt(0, 0, 0);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controlsRef.current = controls;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return {
      scene,
      camera,
      renderer,
      controls,
      metadata: {
        walls: walls.length,
        rooms: rooms.length,
        style: currentStyle?.name,
        quality: conversionOptions.quality,
        furniture: conversionOptions.includeFurniture,
        lighting: conversionOptions.includeLighting
      }
    };
  };

  const calculateRoomCenter = (room: Room, walls: Wall[]) => {
    const roomWalls = room.wallIds.map(id => walls.find(w => w.id === id)).filter(Boolean) as Wall[];
    if (roomWalls.length === 0) return { x: 0, y: 0 };

    const allPoints = roomWalls.flatMap(w => [{ x: w.x1, y: w.y1 }, { x: w.x2, y: w.y2 }]);
    const uniquePoints = Array.from(new Map(allPoints.map(p => [`${p.x},${p.y}`, p])).values());

    if (uniquePoints.length === 0) return { x: 0, y: 0 };

    const centerX = uniquePoints.reduce((sum, p) => sum + p.x, 0) / uniquePoints.length;
    const centerY = uniquePoints.reduce((sum, p) => sum + p.y, 0) / uniquePoints.length;

    return { x: centerX, y: centerY };
  };

  const addFurniture = (scene: THREE.Scene) => {
    // Add basic furniture based on style
    const furnitureGeometry = new THREE.BoxGeometry(2, 0.5, 1);
    const furnitureMaterial = new THREE.MeshLambertMaterial({ 
      color: currentStyle?.colorPalette[1] || 0xf5f5f5 
    });

    // Add sofa
    const sofa = new THREE.Mesh(furnitureGeometry, furnitureMaterial);
    sofa.position.set(0, 0.25, 0);
    scene.add(sofa);

    // Add table
    const tableGeometry = new THREE.BoxGeometry(1.5, 0.8, 1.5);
    const table = new THREE.Mesh(tableGeometry, furnitureMaterial);
    table.position.set(0, 0.4, 2);
    scene.add(table);
  };

  const addLighting = (scene: THREE.Scene) => {
    // Add ceiling lights
    const lightGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const lightMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });

    const light1 = new THREE.Mesh(lightGeometry, lightMaterial);
    light1.position.set(0, 4, 0);
    scene.add(light1);

    const light2 = new THREE.Mesh(lightGeometry, lightMaterial);
    light2.position.set(5, 4, 0);
    scene.add(light2);

    const light3 = new THREE.Mesh(lightGeometry, lightMaterial);
    light3.position.set(-5, 4, 0);
    scene.add(light3);
  };

  const exportModel = (format: 'gltf' | 'obj' | 'stl') => {
    if (!conversionResult) return;
    
    // Implementation for exporting 3D model
    console.log(`Exporting model in ${format} format`);
    // Here you would implement actual export functionality
  };

  const resetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          🎨 3D Interior Converter
        </h1>
        <p className="text-lg text-gray-600">
          Transform your 2D floor plan into a stunning 3D interior visualization
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Control Panel */}
        <div className="lg:col-span-1 space-y-6">
          {/* Style Selection */}
          <div className="bg-white p-6 rounded-lg shadow-lg border">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Palette className="w-5 h-5 mr-2" />
              Interior Style
            </h3>
            <div className="space-y-3">
              {interiorStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => handleStyleChange(style.id)}
                  className={`w-full p-3 text-left rounded-lg border-2 transition-all ${
                    selectedStyle === style.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-gray-800">{style.name}</div>
                  <div className="text-sm text-gray-600">{style.description}</div>
                  <div className="flex gap-1 mt-2">
                    {style.colorPalette.slice(0, 3).map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Conversion Options */}
          <div className="bg-white p-6 rounded-lg shadow-lg border">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              Conversion Options
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quality
                </label>
                <select
                  value={conversionOptions.quality}
                  onChange={(e) => handleOptionChange('quality', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="low">Low (Fast)</option>
                  <option value="medium">Medium</option>
                  <option value="high">High (Recommended)</option>
                  <option value="ultra">Ultra (Slow)</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={conversionOptions.includeFurniture}
                    onChange={(e) => handleOptionChange('includeFurniture', e.target.checked)}
                    className="mr-2"
                  />
                                     <Sofa className="w-4 h-4 mr-2" />
                   Include Furniture
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={conversionOptions.includeLighting}
                    onChange={(e) => handleOptionChange('includeLighting', e.target.checked)}
                    className="mr-2"
                  />
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Include Lighting
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={conversionOptions.includeTextures}
                    onChange={(e) => handleOptionChange('includeTextures', e.target.checked)}
                    className="mr-2"
                  />
                                     <Box className="w-4 h-4 mr-2" />
                   Include Textures
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Render Mode
                </label>
                <select
                  value={conversionOptions.renderMode}
                  onChange={(e) => handleOptionChange('renderMode', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="wireframe">Wireframe</option>
                  <option value="solid">Solid</option>
                  <option value="textured">Textured</option>
                  <option value="realistic">Realistic</option>
                </select>
              </div>
            </div>
          </div>

          {/* Conversion Button */}
          <div className="bg-white p-6 rounded-lg shadow-lg border">
            <button
              onClick={startConversion}
              disabled={isConverting || !walls.length}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
            >
              {isConverting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  Converting... {conversionProgress.toFixed(0)}%
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-2" />
                  Start 3D Conversion
                </>
              )}
            </button>

            {conversionProgress > 0 && conversionProgress < 100 && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${conversionProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Export Options */}
          {conversionResult && (
            <div className="bg-white p-6 rounded-lg shadow-lg border">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Download className="w-5 h-5 mr-2" />
                Export Model
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => exportModel('gltf')}
                  className="p-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
                >
                  GLTF
                </button>
                <button
                  onClick={() => exportModel('obj')}
                  className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                >
                  OBJ
                </button>
                <button
                  onClick={() => exportModel('stl')}
                  className="p-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors text-sm"
                >
                  STL
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 3D Preview */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-lg border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                3D Preview
              </h3>
              {conversionResult && (
                <div className="flex gap-2">
                  <button
                    onClick={resetView}
                    className="p-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                    title="Reset View"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    title="Toggle Preview"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              {!conversionResult ? (
                <div className="aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                                       <Box className="w-16 h-16 mx-auto mb-4 opacity-50" />
                   <p className="text-lg font-medium">No 3D Model Yet</p>
                    <p className="text-sm">Click "Start 3D Conversion" to generate your interior</p>
                  </div>
                </div>
              ) : (
                <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                  <canvas
                    ref={canvasRef}
                    className="w-full h-full"
                    style={{ display: showPreview ? 'block' : 'none' }}
                  />
                  {!showPreview && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center text-white">
                                               <Box className="w-16 h-16 mx-auto mb-4 opacity-50" />
                       <p className="text-lg font-medium">3D Model Ready</p>
                        <p className="text-sm">Click the camera button to view</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Model Information */}
            {conversionResult && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">Model Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Style:</span>
                    <span className="ml-2 font-medium">{conversionResult.metadata.style}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Quality:</span>
                    <span className="ml-2 font-medium capitalize">{conversionResult.metadata.quality}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Walls:</span>
                    <span className="ml-2 font-medium">{conversionResult.metadata.walls}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Rooms:</span>
                    <span className="ml-2 font-medium">{conversionResult.metadata.rooms}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      )}
    </div>
  );
};

export default ThreeDInteriorConverter;
