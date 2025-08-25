// src/components/professional/VastuPlanDemo.tsx
// Vastu Plan Generator Demo Page
// Professional CAD Tools Platform

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, Ruler, Compass, Download, Share2, Settings, Building,
  Car, Store, Bed, Utensils, Bath, Sofa, Star, CheckCircle,
  Info, Eye, EyeOff, ArrowRight, Zap, Shield, Award
} from 'lucide-react';
import VastuPlanGenerator from './VastuPlanGenerator';

interface VastuInputForm {
  plotArea: number;
  plotFacing: 'north' | 'south' | 'east' | 'west';
  floors: number;
  hasParking: boolean;
  hasStore: boolean;
  bedrooms: number;
  bathrooms: number;
  kitchen: boolean;
  livingRoom: boolean;
  diningRoom: boolean;
  study: boolean;
  terrace: boolean;
}

const VastuPlanDemo: React.FC = () => {
  const [showGenerator, setShowGenerator] = useState(false);
  const [formData, setFormData] = useState<VastuInputForm>({
    plotArea: 212,
    plotFacing: 'west',
    floors: 4,
    hasParking: true,
    hasStore: true,
    bedrooms: 6,
    bathrooms: 4,
    kitchen: true,
    livingRoom: true,
    diningRoom: true,
    study: true,
    terrace: true
  });

  const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = (field: keyof VastuInputForm, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    setShowGenerator(true);
    setCurrentStep(3);
  };

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Home className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Plot Information</h2>
        <p className="text-gray-600">Enter your plot details to generate a Vastu-compliant plan</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Plot Area (sq. yards)
          </label>
          <input
            type="number"
            value={formData.plotArea}
            onChange={(e) => handleInputChange('plotArea', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="212"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Plot Facing Direction
          </label>
          <select
            value={formData.plotFacing}
            onChange={(e) => handleInputChange('plotFacing', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="north">North</option>
            <option value="south">South</option>
            <option value="east">East</option>
            <option value="west">West</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Floors
          </label>
          <select
            value={formData.floors}
            onChange={(e) => handleInputChange('floors', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={1}>G+0 (Ground Floor Only)</option>
            <option value={2}>G+1 (Ground + 1 Floor)</option>
            <option value={3}>G+2 (Ground + 2 Floors)</option>
            <option value={4}>G+3 (Ground + 3 Floors)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Plot Dimensions
          </label>
          <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="text-sm text-gray-600">
              <div>Width: ~{Math.sqrt(formData.plotArea * 9).toFixed(1)} ft</div>
              <div>Length: ~{(formData.plotArea * 9 / Math.sqrt(formData.plotArea * 9)).toFixed(1)} ft</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <div></div>
        <button
          onClick={() => setCurrentStep(2)}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <span>Next Step</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Building className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Room Requirements</h2>
        <p className="text-gray-600">Specify the rooms and spaces you need in your plan</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Bedrooms
          </label>
          <input
            type="number"
            value={formData.bedrooms}
            onChange={(e) => handleInputChange('bedrooms', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="1"
            max="10"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Bathrooms
          </label>
          <input
            type="number"
            value={formData.bathrooms}
            onChange={(e) => handleInputChange('bathrooms', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="1"
            max="8"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Additional Spaces
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.hasParking}
                onChange={(e) => handleInputChange('hasParking', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 flex items-center">
                <Car className="w-4 h-4 mr-1" />
                Parking
              </span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.hasStore}
                onChange={(e) => handleInputChange('hasStore', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 flex items-center">
                <Store className="w-4 h-4 mr-1" />
                Store
              </span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.kitchen}
                onChange={(e) => handleInputChange('kitchen', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 flex items-center">
                <Utensils className="w-4 h-4 mr-1" />
                Kitchen
              </span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.livingRoom}
                onChange={(e) => handleInputChange('livingRoom', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 flex items-center">
                <Sofa className="w-4 h-4 mr-1" />
                Living Room
              </span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.diningRoom}
                onChange={(e) => handleInputChange('diningRoom', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 flex items-center">
                <Utensils className="w-4 h-4 mr-1" />
                Dining Room
              </span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.study}
                onChange={(e) => handleInputChange('study', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 flex items-center">
                <Info className="w-4 h-4 mr-1" />
                Study/Office
              </span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.terrace}
                onChange={(e) => handleInputChange('terrace', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 flex items-center">
                <Home className="w-4 h-4 mr-1" />
                Terrace
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <button
          onClick={() => setCurrentStep(1)}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Previous Step
        </button>
        <button
          onClick={handleSubmit}
          className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Zap className="w-4 h-4" />
          <span>Generate Plan</span>
        </button>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Star className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Vastu Plan Generated!</h2>
        <p className="text-gray-600">Your professional, Vastu-compliant architectural plan is ready</p>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">{formData.plotArea}</div>
            <div className="text-blue-100 text-sm">Sq. Yards</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{formData.plotFacing.toUpperCase()}</div>
            <div className="text-blue-100 text-sm">Facing</div>
          </div>
          <div>
            <div className="text-3xl font-bold">G+{formData.floors - 1}</div>
            <div className="text-blue-100 text-sm">Floors</div>
          </div>
        </div>
      </div>

      <VastuPlanGenerator />
    </motion.div>
  );

  if (showGenerator && currentStep === 3) {
    return renderStep3();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-gray-900">Vastu Plan Generator</h1>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-600" />
                <span className="text-sm text-gray-600">Professional CAD Tools Platform</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
      </div>

      {/* Features Section */}
      <div className="bg-white border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Vastu Plan Generator?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional, accurate, and Vastu-compliant architectural plans generated instantly
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Vastu Compliant</h3>
              <p className="text-gray-600">
                All plans follow traditional Vastu Shastra principles for positive energy flow
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Quality</h3>
              <p className="text-gray-600">
                Industry-standard CAD-quality plans suitable for construction and permits
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Generation</h3>
              <p className="text-gray-600">
                Get your complete architectural plan in seconds, not weeks
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VastuPlanDemo;
