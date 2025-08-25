// src/components/professional/VastuPlanGenerator.tsx
// Vastu Shastra Compliant 2D Plan Generator
// Professional CAD Tools Platform

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Ruler, Compass, Palette, Download, Share2, Settings,
  Building, Car, Store, Bed, Utensils, Bath, Sofa,
  ArrowUpDown, DoorOpen, Square, TreePine, Droplets, Flame, Star,
  CheckCircle, AlertCircle, Info, Edit, Eye, EyeOff
} from 'lucide-react';

interface VastuPlanData {
  plotArea: number; // sq yards
  plotFacing: 'north' | 'south' | 'east' | 'west';
  floors: number;
  hasParking: boolean;
  hasStore: boolean;
  roomRequirements: {
    bedrooms: number;
    bathrooms: number;
    kitchen: boolean;
    livingRoom: boolean;
    diningRoom: boolean;
    study: boolean;
    terrace: boolean;
  };
}

interface Room {
  id: string;
  name: string;
  type: 'bedroom' | 'bathroom' | 'kitchen' | 'living' | 'dining' | 'store' | 'parking' | 'stairs' | 'balcony' | 'terrace' | 'study';
  width: number;
  height: number;
  x: number;
  y: number;
  color: string;
  vastuZone: string;
  recommendations: string[];
}

const VastuPlanGenerator: React.FC = () => {
  const [planData, setPlanData] = useState<VastuPlanData>({
    plotArea: 212,
    plotFacing: 'west',
    floors: 4, // G+3
    hasParking: true,
    hasStore: true,
    roomRequirements: {
      bedrooms: 6,
      bathrooms: 4,
      kitchen: true,
      livingRoom: true,
      diningRoom: true,
      study: true,
      terrace: true
    }
  });

  const [currentFloor, setCurrentFloor] = useState(0);
  const [showVastuGuidelines, setShowVastuGuidelines] = useState(true);
  const [planScale, setPlanScale] = useState(1);
  const [generatedRooms, setGeneratedRooms] = useState<Room[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Vastu Color Scheme
  const vastuColors = {
    northEast: '#E3F2FD', // Light Blue (Water)
    southEast: '#FFEBEE', // Light Red (Fire)
    southWest: '#F3E5F5', // Light Purple (Earth)
    northWest: '#F5F5F5', // Light Gray (Air)
    center: '#FFFFFF',     // White (Space)
    default: '#E8F5E8'    // Light Green
  };

  // Vastu Zone Definitions
  const vastuZones = {
    northEast: { name: 'Ishaan (Water)', element: 'Water', favorable: ['prayer', 'study', 'water'] },
    southEast: { name: 'Agneya (Fire)', element: 'Fire', favorable: ['kitchen', 'dining', 'fire'] },
    southWest: { name: 'Nairitya (Earth)', element: 'Earth', favorable: ['bedroom', 'heavy', 'storage'] },
    northWest: { name: 'Vayavya (Air)', element: 'Air', favorable: ['guest', 'mechanical', 'air'] },
    center: { name: 'Brahmasthan (Space)', element: 'Space', favorable: ['open', 'light', 'center'] }
  };

  // Generate Vastu Compliant Plan
  const generateVastuPlan = () => {
    setIsGenerating(true);
    
    // Simulate plan generation
    setTimeout(() => {
      const rooms: Room[] = [];
      
      if (currentFloor === 0) {
        // Ground Floor - Commercial + Parking
        rooms.push(
          {
            id: 'store-1',
            name: 'General Store',
            type: 'store',
            width: 20,
            height: 20,
            x: 5,
            y: 5,
            color: vastuColors.northEast,
            vastuZone: 'northEast',
            recommendations: ['Main entrance facing North-East', 'Keep cash counter in North', 'Display items in East']
          },
          {
            id: 'parking-1',
            name: 'Parking Area',
            type: 'parking',
            width: 15,
            height: 20,
            x: 30,
            y: 5,
            color: vastuColors.northWest,
            vastuZone: 'northWest',
            recommendations: ['Vehicle entrance from West', 'Keep mechanical tools in North-West', 'Good for guest parking']
          },
          {
            id: 'stairs-1',
            name: 'Main Staircase',
            type: 'stairs',
            width: 8,
            height: 10,
            x: 50,
            y: 35,
            color: vastuColors.southWest,
            vastuZone: 'southWest',
            recommendations: ['Stairs should rise from South to North', 'Keep heavy materials in South-West', 'Good for structural stability']
          }
        );
      } else if (currentFloor === 1) {
        // First Floor - Residential
        rooms.push(
          {
            id: 'living-1',
            name: 'Living Room',
            type: 'living',
            width: 16,
            height: 15,
            x: 5,
            y: 5,
            color: vastuColors.northEast,
            vastuZone: 'northEast',
            recommendations: ['Large windows facing North-East', 'Keep water features here', 'Ideal for morning sun']
          },
          {
            id: 'kitchen-1',
            name: 'Kitchen',
            type: 'kitchen',
            width: 12,
            height: 12,
            x: 25,
            y: 5,
            color: vastuColors.southEast,
            vastuZone: 'southEast',
            recommendations: ['Cooking platform facing East', 'Keep gas stove in South-East', 'Good for fire element']
          },
          {
            id: 'bedroom-1',
            name: 'Master Bedroom',
            type: 'bedroom',
            width: 14,
            height: 12,
            x: 5,
            y: 25,
            color: vastuColors.southWest,
            vastuZone: 'southWest',
            recommendations: ['Bed head towards South', 'Keep heavy furniture here', 'Ideal for stability']
          },
          {
            id: 'bedroom-2',
            name: 'Second Bedroom',
            type: 'bedroom',
            width: 12,
            height: 10,
            x: 25,
            y: 25,
            color: vastuColors.northWest,
            vastuZone: 'northWest',
            recommendations: ['Good for guest room', 'Keep light furniture here', 'Ideal for air circulation']
          }
        );
      } else if (currentFloor === 2) {
        // Second Floor - Residential
        rooms.push(
          {
            id: 'bedroom-3',
            name: 'Bedroom 3',
            type: 'bedroom',
            width: 16,
            height: 12,
            x: 5,
            y: 5,
            color: vastuColors.southWest,
            vastuZone: 'southWest',
            recommendations: ['Master suite location', 'Bed head towards South', 'Keep heavy furniture']
          },
          {
            id: 'bedroom-4',
            name: 'Bedroom 4',
            type: 'bedroom',
            width: 14,
            height: 10,
            x: 25,
            y: 5,
            color: vastuColors.northWest,
            vastuZone: 'northWest',
            recommendations: ['Good for children', 'Light and airy space', 'Keep study table in North']
          },
          {
            id: 'family-1',
            name: 'Family Room',
            type: 'living',
            width: 15,
            height: 13,
            x: 5,
            y: 20,
            color: vastuColors.northEast,
            vastuZone: 'northEast',
            recommendations: ['Entertainment area', 'Keep TV in North-East', 'Good for family gatherings']
          }
        );
      } else if (currentFloor === 3) {
        // Third Floor - Penthouse
        rooms.push(
          {
            id: 'master-3',
            name: 'Master Suite',
            type: 'bedroom',
            width: 20,
            height: 15,
            x: 5,
            y: 5,
            color: vastuColors.southWest,
            vastuZone: 'southWest',
            recommendations: ['Luxury bedroom', 'Bed head towards South', 'Keep valuables here']
          },
          {
            id: 'study-3',
            name: 'Study/Office',
            type: 'study',
            width: 12,
            height: 10,
            x: 30,
            y: 5,
            color: vastuColors.northEast,
            vastuZone: 'northEast',
            recommendations: ['Study table facing East', 'Keep books in North-East', 'Ideal for concentration']
          },
          {
            id: 'terrace-3',
            name: 'Terrace Garden',
            type: 'terrace',
            width: 20,
            height: 15,
            x: 5,
            y: 25,
            color: vastuColors.center,
            vastuZone: 'center',
            recommendations: ['Open space for plants', 'Keep water features in North-East', 'Good for meditation']
          }
        );
      }

      setGeneratedRooms(rooms);
      setIsGenerating(false);
    }, 2000);
  };

  // Draw Plan on Canvas
  useEffect(() => {
    if (canvasRef.current && generatedRooms.length > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set canvas size
      canvas.width = 800;
      canvas.height = 600;

      // Draw plot boundary
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 3;
      ctx.strokeRect(50, 50, 700, 500);

      // Draw rooms
      generatedRooms.forEach(room => {
        // Room background
        ctx.fillStyle = room.color;
        ctx.fillRect(room.x * 10 + 50, room.y * 10 + 50, room.width * 10, room.height * 10);

        // Room border
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 2;
        ctx.strokeRect(room.x * 10 + 50, room.y * 10 + 50, room.width * 10, room.height * 10);

        // Room label
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(
          room.name,
          room.x * 10 + 50 + (room.width * 10) / 2,
          room.y * 10 + 50 + (room.height * 10) / 2
        );

        // Room dimensions
        ctx.font = '10px Arial';
        ctx.fillText(
          `${room.width}' × ${room.height}'`,
          room.x * 10 + 50 + (room.width * 10) / 2,
          room.y * 10 + 50 + (room.height * 10) / 2 + 15
        );
      });

      // Draw compass directions
      ctx.font = '16px Arial';
      ctx.fillStyle = '#333';
      ctx.fillText('N', 400, 30);
      ctx.fillText('S', 400, 580);
      ctx.fillText('E', 780, 300);
      ctx.fillText('W', 30, 300);
    }
  }, [generatedRooms, currentFloor]);

  // Auto-generate plan when floor changes
  useEffect(() => {
    generateVastuPlan();
  }, [currentFloor]);

  const getFloorName = (floor: number) => {
    switch (floor) {
      case 0: return 'Ground Floor (Commercial + Parking)';
      case 1: return 'First Floor (Residential)';
      case 2: return 'Second Floor (Residential)';
      case 3: return 'Third Floor (Penthouse)';
      default: return 'Unknown Floor';
    }
  };

  const downloadPlan = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = `vastu-plan-${getFloorName(currentFloor).toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-gray-900">Vastu Plan Generator</h1>
              <div className="flex items-center space-x-2">
                <Compass className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-600">Professional CAD Tools Platform</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowVastuGuidelines(!showVastuGuidelines)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {showVastuGuidelines ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{showVastuGuidelines ? 'Hide' : 'Show'} Guidelines</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Controls & Vastu Guidelines */}
          <div className="space-y-6">
            {/* Floor Selection */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Building className="w-5 h-5 mr-2 text-blue-600" />
                Floor Selection
              </h3>
              
              <div className="grid grid-cols-2 gap-2">
                {[0, 1, 2, 3].map(floor => (
                  <button
                    key={floor}
                    onClick={() => setCurrentFloor(floor)}
                    className={`p-3 text-sm font-medium rounded-lg transition-colors ${
                      currentFloor === floor
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {floor === 0 ? 'G+0' : `G+${floor}`}
                  </button>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-sm font-medium text-blue-900">
                  {getFloorName(currentFloor)}
                </div>
              </div>
            </div>

            {/* Vastu Guidelines */}
            {showVastuGuidelines && (
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-600" />
                  Vastu Guidelines
                </h3>
                
                <div className="space-y-4">
                  {Object.entries(vastuZones).map(([zone, info]) => (
                    <div key={zone} className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{info.name}</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          zone === 'northEast' ? 'bg-blue-100 text-blue-800' :
                          zone === 'southEast' ? 'bg-red-100 text-red-800' :
                          zone === 'southWest' ? 'bg-purple-100 text-purple-800' :
                          zone === 'northWest' ? 'bg-gray-100 text-gray-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {info.element}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Favorable for: {info.favorable.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Plan Actions */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-green-600" />
                Plan Actions
              </h3>
              
              <div className="space-y-3">
                <button
                  onClick={generateVastuPlan}
                  disabled={isGenerating}
                  className="w-full flex items-center justify-center space-x-2 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  <Ruler className="w-4 h-4" />
                  <span>{isGenerating ? 'Generating...' : 'Generate Plan'}</span>
                </button>
                
                <button
                  onClick={downloadPlan}
                  className="w-full flex items-center justify-center space-x-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Plan</span>
                </button>
                
                <button className="w-full flex items-center justify-center space-x-2 p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span>Share Plan</span>
                </button>
              </div>
            </div>
          </div>

          {/* Center Panel - 2D Plan Canvas */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Home className="w-5 h-5 mr-2 text-blue-600" />
                  2D Vastu Compliant Plan
                </h3>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Scale:</span>
                    <select
                      value={planScale}
                      onChange={(e) => setPlanScale(Number(e.target.value))}
                      className="px-2 py-1 border border-gray-300 rounded text-sm"
                    >
                      <option value={0.5}>1:200</option>
                      <option value={1}>1:100</option>
                      <option value={2}>1:50</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Canvas Container */}
              <div className="border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                <canvas
                  ref={canvasRef}
                  className="w-full h-[500px] bg-white"
                  style={{ cursor: 'crosshair' }}
                />
              </div>

              {/* Plan Legend */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(vastuColors).map(([zone, color]) => (
                  <div key={zone} className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded border border-gray-300"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-sm text-gray-600 capitalize">
                      {zone.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Room Details Panel */}
        {generatedRooms.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Info className="w-5 h-5 mr-2 text-blue-600" />
              Room Details & Vastu Recommendations
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {generatedRooms.map(room => (
                <div key={room.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{room.name}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      room.vastuZone === 'northEast' ? 'bg-blue-100 text-blue-800' :
                      room.vastuZone === 'southEast' ? 'bg-red-100 text-red-800' :
                      room.vastuZone === 'southWest' ? 'bg-purple-100 text-purple-800' :
                      room.vastuZone === 'northWest' ? 'bg-gray-100 text-gray-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {vastuZones[room.vastuZone as keyof typeof vastuZones]?.name}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-3">
                    <div>Dimensions: {room.width}' × {room.height}'</div>
                    <div>Area: {room.width * room.height} sq. ft</div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-gray-700">Vastu Recommendations:</div>
                    {room.recommendations.map((rec, index) => (
                      <div key={index} className="text-xs text-gray-600 flex items-start space-x-1">
                        <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VastuPlanGenerator;
