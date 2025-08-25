// src/features/tools/BoqTool.tsx
import React from 'react';
import { PhoenixEnginePanelProps, ProjectData, BillOfQuantitiesReport } from '../../types/index';
import { GenericApiTool } from './misc/GenericApiTool';
import { useAppStore } from '../../state/appStore';
import { useNotificationStore } from '../../state/notificationStore';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

const BoqResultDisplay: React.FC<{ report: BillOfQuantitiesReport, projectId: string }> = ({ report, projectId }) => {
    const { addNotification } = useNotificationStore();
    const [isLoading, setIsLoading] = React.useState(false);

    const handleExport = async () => {
        setIsLoading(true);
        try {
            // Export logic here
            addNotification('BOQ exported successfully!', 'success');
        } catch (error) {
            addNotification('Failed to export BOQ', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Bill of Quantities</h3>
                <button
                    onClick={handleExport}
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {isLoading ? <LoadingSpinner size="sm" /> : 'Export BOQ'}
                </button>
            </div>
            
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Total Items</label>
                        <p className="text-lg font-semibold">{report.items?.length || 0}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Total Value</label>
                        <p className="text-lg font-semibold">₹{report.total?.toLocaleString() || 0}</p>
                    </div>
                </div>
                
                {report.items && report.items.length > 0 ? (
                    <div className="border rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {report.items.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.description}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.quantity}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.unit}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{item.rate}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{item.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        <p>No BOQ items available</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// Mock API function for now
const mockBoqApi = async (projectId: string, projectData: ProjectData): Promise<BillOfQuantitiesReport> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
        items: [
            { description: 'Concrete', quantity: 100, unit: 'm³', rate: 5000, amount: 500000 },
            { description: 'Steel', quantity: 50, unit: 'tonnes', rate: 80000, amount: 4000000 },
            { description: 'Bricks', quantity: 10000, unit: 'pieces', rate: 15, amount: 150000 }
        ],
        total: 4650000
    };
};

export const BoqTool: React.FC<PhoenixEnginePanelProps> = (props) => {
    const store = useAppStore();
    return (
        <GenericApiTool
            {...props}
            toolName="BOQ Generator"
            description="Generate comprehensive Bill of Quantities for your project"
            creditCost={15}
            icon="🧾"
            apiFn={mockBoqApi}
            buildPayload={(p) => {
                if (!p.currentProject) {
                    return null;
                }
                const projectData = store.createProjectData({
                    projectType: p.currentProject?.projectType || 'building',
                    levels: p.levels,
                    planNorthDirection: p.planNorthDirection,
                    propertyLines: p.propertyLines,
                    terrainMesh: p.terrainMesh,
                    zones: [],
                    infrastructure: []
                });
                return [projectData];
            }}
            onSuccess={(result, p) => {
                p.setBillOfQuantities(result);
                p.addNotification("BOQ generated successfully!", "success");
            }}
            buttonText="Generate Bill of Quantities"
            renderResult={(result) => <BoqResultDisplay report={result} projectId={props.currentProject?.id || ''} />}
        />
    );
};