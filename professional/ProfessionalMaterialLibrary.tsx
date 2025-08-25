// src/components/professional/ProfessionalMaterialLibrary.tsx
// Advanced Material Library Management for Professional CAD Workflows

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Palette, Search, Filter, Plus, Edit, Trash2, Download, Upload, 
  Eye, EyeOff, Lock, Unlock, Star, Share2, Settings, Layers,
  Box, Package, Ruler, Save, Undo, Redo, Printer, FileDown, Import
} from 'lucide-react';

interface AdvancedMaterial {
  id: string;
  name: string;
  category: 'wall' | 'floor' | 'ceiling' | 'furniture' | 'texture' | 'landscape';
  type: 'solid' | 'pattern' | 'metallic' | 'glass' | 'wood' | 'stone' | 'fabric' | 'ceramic';
  subcategory: string;
  brand?: string;
  manufacturer?: string;
  color: string;
  roughness: number;
  metallic: number;
  normalMap?: string;
  albedoMap?: string;
  roughnessMap?: string;
  metallicMap?: string;
  aoMap?: string;
  displacementMap?: string;
  preview: string;
  tags: string[];
  cost: number;
  sustainability: 'A' | 'B' | 'C' | 'D';
  fireRating: 'A1' | 'A2' | 'B' | 'C' | 'D' | 'E' | 'F';
  uvScale: { x: number; y: number };
  tiling: boolean;
  createdAt: string;
  lastModified: string;
  isPublic: boolean;
  isFavorite: boolean;
}

interface MaterialCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
  subcategories: string[];
}

const ProfessionalMaterialLibrary: React.FC = () => {
  const [materials, setMaterials] = useState<AdvancedMaterial[]>([]);
  const [categories, setCategories] = useState<MaterialCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'detail'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'category' | 'cost' | 'sustainability' | 'date'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sustainabilityFilter, setSustainabilityFilter] = useState<string[]>([]);
  const [fireRatingFilter, setFireRatingFilter] = useState<string[]>([]);

  // Mock data initialization
  useEffect(() => {
    // Initialize with comprehensive material data
    const mockMaterials: AdvancedMaterial[] = [
      {
        id: 'marble_white_premium',
        name: 'Premium White Marble',
        category: 'floor',
        type: 'stone',
        subcategory: 'marble',
        brand: 'Luxury Stone Co.',
        manufacturer: 'Premium Materials Inc.',
        color: '#F8F8F8',
        roughness: 0.1,
        metallic: 0.0,
        preview: '/materials/marble_white_premium.jpg',
        albedoMap: '/materials/marble_white_albedo.jpg',
        normalMap: '/materials/marble_white_normal.jpg',
        roughnessMap: '/materials/marble_white_roughness.jpg',
        aoMap: '/materials/marble_white_ao.jpg',
        displacementMap: '/materials/marble_white_displacement.jpg',
        tags: ['premium', 'luxury', 'classic', 'durable'],
        cost: 85.50,
        sustainability: 'A',
        fireRating: 'A1',
        uvScale: { x: 1.0, y: 1.0 },
        tiling: true,
        createdAt: '2024-01-15',
        lastModified: '2024-10-26',
        isPublic: true,
        isFavorite: false
      },
      {
        id: 'oak_wood_aged',
        name: 'Aged Oak Wood',
        category: 'furniture',
        type: 'wood',
        subcategory: 'hardwood',
        brand: 'Heritage Woods',
        manufacturer: 'Traditional Timber Ltd.',
        color: '#8B4513',
        roughness: 0.8,
        metallic: 0.0,
        preview: '/materials/oak_wood_aged.jpg',
        albedoMap: '/materials/oak_aged_albedo.jpg',
        normalMap: '/materials/oak_aged_normal.jpg',
        roughnessMap: '/materials/oak_aged_roughness.jpg',
        tags: ['vintage', 'warm', 'natural', 'sustainable'],
        cost: 45.20,
        sustainability: 'A',
        fireRating: 'B',
        uvScale: { x: 0.5, y: 0.5 },
        tiling: false,
        createdAt: '2024-02-20',
        lastModified: '2024-10-25',
        isPublic: true,
        isFavorite: true
      },
      {
        id: 'brass_polished',
        name: 'Polished Brass',
        category: 'furniture',
        type: 'metallic',
        subcategory: 'brass',
        brand: 'Metallic Finishes',
        manufacturer: 'Industrial Metals Co.',
        color: '#CD853F',
        roughness: 0.1,
        metallic: 1.0,
        preview: '/materials/brass_polished.jpg',
        albedoMap: '/materials/brass_albedo.jpg',
        normalMap: '/materials/brass_normal.jpg',
        metallicMap: '/materials/brass_metallic.jpg',
        tags: ['luxury', 'metallic', 'reflective', 'durable'],
        cost: 120.75,
        sustainability: 'B',
        fireRating: 'A1',
        uvScale: { x: 1.0, y: 1.0 },
        tiling: true,
        createdAt: '2024-03-10',
        lastModified: '2024-10-24',
        isPublic: true,
        isFavorite: false
      },
      {
        id: 'glass_frosted',
        name: 'Frosted Glass',
        category: 'furniture',
        type: 'glass',
        subcategory: 'textured',
        brand: 'Glass Solutions',
        manufacturer: 'Modern Glassworks',
        color: '#FFFFFF',
        roughness: 0.9,
        metallic: 0.0,
        preview: '/materials/glass_frosted.jpg',
        albedoMap: '/materials/glass_frosted_albedo.jpg',
        normalMap: '/materials/glass_frosted_normal.jpg',
        tags: ['modern', 'privacy', 'elegant', 'translucent'],
        cost: 65.30,
        sustainability: 'A',
        fireRating: 'A1',
        uvScale: { x: 1.0, y: 1.0 },
        tiling: true,
        createdAt: '2024-04-05',
        lastModified: '2024-10-23',
        isPublic: true,
        isFavorite: true
      }
    ];

    const mockCategories: MaterialCategory[] = [
      {
        id: 'wall',
        name: 'Wall Materials',
        icon: '🧱',
        count: 45,
        subcategories: ['paint', 'wallpaper', 'stone', 'brick', 'concrete', 'wood']
      },
      {
        id: 'floor',
        name: 'Flooring',
        icon: '🏗️',
        count: 38,
        subcategories: ['tile', 'wood', 'stone', 'carpet', 'vinyl', 'laminate']
      },
      {
        id: 'ceiling',
        name: 'Ceiling',
        icon: '🏠',
        count: 22,
        subcategories: ['drywall', 'acoustic', 'metal', 'wood', 'fabric']
      },
      {
        id: 'furniture',
        name: 'Furniture',
        icon: '🪑',
        count: 67,
        subcategories: ['wood', 'metal', 'fabric', 'leather', 'plastic', 'glass']
      },
      {
        id: 'texture',
        name: 'Textures',
        icon: '🎨',
        count: 89,
        subcategories: ['fabric', 'leather', 'stone', 'wood', 'metal', 'ceramic']
      },
      {
        id: 'landscape',
        name: 'Landscape',
        icon: '🌿',
        count: 34,
        subcategories: ['stone', 'wood', 'concrete', 'metal', 'fabric', 'plants']
      }
    ];

    setMaterials(mockMaterials);
    setCategories(mockCategories);
  }, []);

  const filteredMaterials = materials.filter(material => {
    const matchesCategory = selectedCategory === 'all' || material.category === selectedCategory;
    const matchesSubcategory = selectedSubcategory === 'all' || material.subcategory === selectedSubcategory;
    const matchesSearch = material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesPrice = material.cost >= priceRange[0] && material.cost <= priceRange[1];
    const matchesSustainability = sustainabilityFilter.length === 0 || sustainabilityFilter.includes(material.sustainability);
    const matchesFireRating = fireRatingFilter.length === 0 || fireRatingFilter.includes(material.fireRating);

    return matchesCategory && matchesSubcategory && matchesSearch && matchesPrice && 
           matchesSustainability && matchesFireRating;
  });

  const sortedMaterials = [...filteredMaterials].sort((a, b) => {
    let aValue: any, bValue: any;
    
    switch (sortBy) {
      case 'name':
        aValue = a.name;
        bValue = b.name;
        break;
      case 'category':
        aValue = a.category;
        bValue = b.category;
        break;
      case 'cost':
        aValue = a.cost;
        bValue = b.cost;
        break;
      case 'sustainability':
        aValue = a.sustainability;
        bValue = b.sustainability;
        break;
      case 'date':
        aValue = new Date(a.lastModified);
        bValue = new Date(b.lastModified);
        break;
      default:
        aValue = a.name;
        bValue = b.name;
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const toggleMaterialSelection = (materialId: string) => {
    setSelectedMaterials(prev => 
      prev.includes(materialId) 
        ? prev.filter(id => id !== materialId)
        : [...prev, materialId]
    );
  };

  const toggleFavorite = (materialId: string) => {
    setMaterials(prev => 
      prev.map(material => 
        material.id === materialId 
          ? { ...material, isFavorite: !material.isFavorite }
          : material
      )
    );
  };

  const renderMaterialCard = (material: AdvancedMaterial) => (
    <motion.div
      key={material.id}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-white rounded-xl shadow-lg border-2 overflow-hidden hover:shadow-xl transition-all cursor-pointer ${
        selectedMaterials.includes(material.id) ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
      }`}
      onClick={() => toggleMaterialSelection(material.id)}
    >
      <div className="relative">
        <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <div className="text-6xl">🎨</div>
          {material.isFavorite && (
            <div className="absolute top-2 right-2">
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
            </div>
          )}
          <div className="absolute top-2 left-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(material.id);
              }}
              className="p-1 bg-white/80 rounded-full hover:bg-white transition-colors"
            >
              {material.isFavorite ? (
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
              ) : (
                <Star className="w-4 h-4 text-gray-400 hover:text-yellow-500" />
              )}
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-2 left-2 right-2 flex space-x-1">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            material.category === 'wall' ? 'bg-blue-100 text-blue-800' :
            material.category === 'floor' ? 'bg-green-100 text-green-800' :
            material.category === 'ceiling' ? 'bg-purple-100 text-purple-800' :
            material.category === 'furniture' ? 'bg-orange-100 text-orange-800' :
            material.category === 'texture' ? 'bg-pink-100 text-pink-800' :
            'bg-indigo-100 text-indigo-800'
          }`}>
            {material.category}
          </span>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            material.sustainability === 'A' ? 'bg-green-100 text-green-800' :
            material.sustainability === 'B' ? 'bg-blue-100 text-blue-800' :
            material.sustainability === 'C' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {material.sustainability}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight">{material.name}</h3>
          <span className="text-lg font-bold text-blue-600">${material.cost}</span>
        </div>
        
        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">Type</span>
            <span className="font-medium capitalize">{material.type}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">Brand</span>
            <span className="font-medium">{material.brand || 'N/A'}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">Fire Rating</span>
            <span className="font-medium">{material.fireRating}</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
            Apply
          </button>
          <button className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
            <Eye className="w-4 h-4" />
          </button>
          <button className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
            <Edit className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderMaterialList = (material: AdvancedMaterial) => (
    <motion.div
      key={material.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex items-center justify-between p-4 border-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${
        selectedMaterials.includes(material.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
      }`}
      onClick={() => toggleMaterialSelection(material.id)}
    >
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
          <div className="text-2xl">🎨</div>
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{material.name}</h4>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              material.category === 'wall' ? 'bg-blue-100 text-blue-800' :
              material.category === 'floor' ? 'bg-green-100 text-green-800' :
              material.category === 'ceiling' ? 'bg-purple-100 text-purple-800' :
              material.category === 'furniture' ? 'bg-orange-100 text-orange-800' :
              material.category === 'texture' ? 'bg-pink-100 text-pink-800' :
              'bg-indigo-100 text-indigo-800'
            }`}>
              {material.category}
            </span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              material.sustainability === 'A' ? 'bg-green-100 text-green-800' :
              material.sustainability === 'B' ? 'bg-blue-100 text-blue-800' :
              material.sustainability === 'C' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {material.sustainability}
            </span>
            <span className="text-xs">{material.type}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <span className="text-lg font-bold text-blue-600">${material.cost}</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(material.id);
            }}
            className="p-2 text-gray-400 hover:text-yellow-500 transition-colors"
          >
            {material.isFavorite ? (
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
            ) : (
              <Star className="w-5 h-5" />
            )}
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Edit className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-gray-900">Professional Material Library</h1>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{materials.length} materials</span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-600">{selectedMaterials.length} selected</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Upload className="w-4 h-4 mr-2" />
                Import
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4 mr-2" />
                Add Material
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Search */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search materials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedSubcategory('all');
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedCategory === 'all' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <span className="text-lg mr-2">📁</span>
                  All Materials ({materials.length})
                </button>
                {categories.map((category) => (
                  <div key={category.id}>
                    <button
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setSelectedSubcategory('all');
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.id ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-lg mr-2">{category.icon}</span>
                      {category.name} ({category.count})
                    </button>
                    {selectedCategory === category.id && (
                      <div className="ml-6 mt-2 space-y-1">
                        {category.subcategories.map((subcategory) => (
                          <button
                            key={subcategory}
                            onClick={() => setSelectedSubcategory(subcategory)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                              selectedSubcategory === subcategory ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                            }`}
                          >
                            {subcategory}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                </button>
              </div>
              
              {showFilters && (
                <div className="space-y-4">
                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                      <span className="text-gray-500">-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </div>

                  {/* Sustainability */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sustainability</label>
                    <div className="space-y-2">
                      {['A', 'B', 'C', 'D'].map((rating) => (
                        <label key={rating} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={sustainabilityFilter.includes(rating)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSustainabilityFilter([...sustainabilityFilter, rating]);
                              } else {
                                setSustainabilityFilter(sustainabilityFilter.filter(r => r !== rating));
                              }
                            }}
                            className="mr-2"
                          />
                          <span className="text-sm">{rating}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Fire Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fire Rating</label>
                    <div className="space-y-2">
                      {['A1', 'A2', 'B', 'C', 'D', 'E', 'F'].map((rating) => (
                        <label key={rating} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={fireRatingFilter.includes(rating)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFireRatingFilter([...fireRatingFilter, rating]);
                              } else {
                                setFireRatingFilter(fireRatingFilter.filter(r => r !== rating));
                              }
                            }}
                            className="mr-2"
                          />
                          <span className="text-sm">{rating}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === 'grid' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <Box className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === 'list' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <Layers className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('detail')}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === 'detail' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <span className="text-sm text-gray-600">
                    {filteredMaterials.length} of {materials.length} materials
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="category">Sort by Category</option>
                    <option value="cost">Sort by Cost</option>
                    <option value="sustainability">Sort by Sustainability</option>
                    <option value="date">Sort by Date</option>
                  </select>
                  
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {sortOrder === 'asc' ? '↑' : '↓'}
                  </button>
                </div>
              </div>
            </div>

            {/* Materials Display */}
            <div className="space-y-4">
              {viewMode === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {sortedMaterials.map(renderMaterialCard)}
                </div>
              )}
              
              {viewMode === 'list' && (
                <div className="space-y-3">
                  {sortedMaterials.map(renderMaterialList)}
                </div>
              )}
              
              {viewMode === 'detail' && (
                <div className="space-y-6">
                  {sortedMaterials.map((material) => (
                    <motion.div
                      key={material.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1">
                          <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                            <div className="text-8xl">🎨</div>
                          </div>
                        </div>
                        <div className="lg:col-span-2">
                          <div className="flex items-start justify-between mb-4">
                            <h3 className="text-2xl font-bold text-gray-900">{material.name}</h3>
                            <span className="text-3xl font-bold text-blue-600">${material.cost}</span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                              <span className="text-sm text-gray-600">Category</span>
                              <p className="font-medium">{material.category}</p>
                            </div>
                            <div>
                              <span className="text-sm text-gray-600">Type</span>
                              <p className="font-medium capitalize">{material.type}</p>
                            </div>
                            <div>
                              <span className="text-sm text-gray-600">Brand</span>
                              <p className="font-medium">{material.brand || 'N/A'}</p>
                            </div>
                            <div>
                              <span className="text-sm text-gray-600">Sustainability</span>
                              <p className="font-medium">{material.sustainability}</p>
                            </div>
                            <div>
                              <span className="text-sm text-gray-600">Fire Rating</span>
                              <p className="font-medium">{material.fireRating}</p>
                            </div>
                            <div>
                              <span className="text-sm text-gray-600">Last Modified</span>
                              <p className="font-medium">{new Date(material.lastModified).toLocaleDateString()}</p>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                              Apply to Selection
                            </button>
                            <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                              Edit Properties
                            </button>
                            <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalMaterialLibrary;
