// src/features/tools/VishwakarmaTool.tsx
import React, { useState } from 'react';
import { PhoenixEnginePanelProps, GFCDrawingSet, ProjectData } from '../../types/index';
import { generateGfcDrawingsApi } from '../../services/geminiService';
import { exportDwgApi } from '../../services/projectService';
import { useNotificationStore } from '../../state/notificationStore';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { DrawingSheetViewer } from '../../components/common/DrawingSheetViewer';
import { useAppStore } from '../../state/appStore';

export const VishwakarmaTool: React.FC<PhoenixEnginePanelProps> = (props) => {
    const { currentUser, setDrawingSet, setBuyCreditsModalOpen, refreshCurrentUser, levels, activeLevelIndex, planNorthDirection, propertyLines, terrainMesh, currentProject } = props;
    const drawingSet = levels[activeLevelIndex]?.drawingSet;

    const [isLoading, setIsLoading] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { addNotification } = useNotificationStore();
    const store = useAppStore();
    
    const projectData = store.createProjectData({
        name: props.currentProject?.name || 'Untitled Project',
        projectType: props.currentProject?.projectType || 'building',
        levels,
        planNorthDirection,
        propertyLines,
        terrainMesh,
        zones: [],
        infrastructure: []
    });

    const handleGenerate = async () => {
        if (!currentUser) {
            addNotification("Please log in to use this feature.", "error");
            return;
        }
        if (currentUser.role !== 'owner' && currentUser.credits < 150) {
            addNotification(`You need 150 credits for the Vishwakarma Engine. You have ${currentUser.credits}.`, "info");
            setBuyCreditsModalOpen(true);
            return;
        }

        setIsLoading(true);
        setError(null);
        setDrawingSet(null); 

        try {
            const response = await generateGfcDrawingsApi(currentProject?.id || '', projectData);
            setDrawingSet(response);
            addNotification("Vishwakarma Engine has generated a GFC Drawing Set!", "success");
            await refreshCurrentUser();
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
            addNotification(err.message, 'error');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleExportDxf = async () => {
        if (!currentProject) {
            addNotification("No project loaded to export.", "error");
            return;
        }
        setIsExporting(true);
        try {
            await exportDwgApi(currentProject.id, currentProject.name);
            addNotification("DXF file export started.", "success");
        } catch (err: any) {
             addNotification(`DXF export failed: ${err.message}`, 'error');
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div>
            <h3 className="text-lg font-bold text-sky-300">Vishwakarma Engine</h3>
            <p className="text-sm text-slate-300 my-3">The ultimate detailing tool. The Vishwakarma Engine synthesizes your entire project into a professional, "Good for Construction" (GFC) document set, complete with MEP layers, material legends, and detailed construction notes.</p>
            
             <div className="grid grid-cols-2 gap-2">
                <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="w-full mt-2 px-4 py-3 text-white font-semibold rounded-md disabled:opacity-50 flex items-center justify-center transition-all bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                >
                    {isLoading ? <LoadingSpinner size="h-5 w-5 mr-2" /> : <span className="mr-2 text-lg">🛠️</span>}
                    <span className="flex-grow text-sm">{drawingSet ? 'Regenerate' : 'Generate'} GFC Set</span>
                    <span className="text-xs bg-black/30 px-2 py-0.5 rounded-full">150cr</span>
                </button>
                 <button
                    onClick={handleExportDxf}
                    disabled={isExporting}
                    className="w-full mt-2 px-4 py-3 text-white font-semibold rounded-md disabled:opacity-50 flex items-center justify-center transition-all bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800"
                >
                    {isExporting ? <LoadingSpinner size="h-5 w-5 mr-2" /> : <span className="mr-2 text-lg">📄</span>}
                    <span className="flex-grow text-sm">Export DXF</span>
                </button>
             </div>


            {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
            
            {drawingSet && (
                <div className="mt-4 p-2 bg-slate-900/50 rounded-lg">
                    <DrawingSheetViewer 
                        sheet={drawingSet} 
                        projectData={projectData}
                        currentUser={currentUser}
                    />
                </div>
            )}
        </div>
    );
};