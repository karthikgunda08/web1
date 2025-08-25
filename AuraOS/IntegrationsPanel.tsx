// src/components/AuraOS/IntegrationsPanel.tsx
import React, { useState, useRef } from 'react';
import { useAppStore } from '../../state/appStore';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { LoadingSpinner } from '../common/LoadingSpinner';

export const IntegrationsPanel: React.FC = () => {
    const { importRevitProject, globalLoadingMessage, importDwgProject, exportAsDxf, currentProject } = useAppStore(state => ({
        importRevitProject: state.importRevitProject,
        globalLoadingMessage: state.globalLoadingMessage,
        importDwgProject: state.importDwgProject,
        exportAsDxf: state.exportAsDxf,
        currentProject: state.currentProject,
    }));
    const [revitId, setRevitId] = useState('RVT-2024-HS-001'); // Mock ID
    const isLoading = !!globalLoadingMessage?.includes('Importing');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImportRevit = () => {
        importRevitProject(revitId);
    };
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            importDwgProject(file);
        }
    };

    return (
        <div className="p-4 h-full flex flex-col space-y-4">
            <p className="text-sm text-slate-300">
                Connect AuraOS with your existing workflows by importing data from other platforms.
            </p>

            <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                <h4 className="font-semibold text-amber-300">Revit / BIM Import (Simulation)</h4>
                <p className="text-xs text-slate-400 my-2">
                    Enter a mock Revit Project ID to simulate importing a BIM model. This will load a predefined project structure into the editor.
                </p>
                <div className="space-y-2">
                    <Label htmlFor="revit-id">Mock Revit Project ID</Label>
                    <Input id="revit-id" value={revitId} onChange={e => setRevitId(e.target.value)} disabled={isLoading} />
                </div>
                 <Button onClick={handleImportRevit} className="w-full mt-4" disabled={isLoading}>
                    {isLoading && <LoadingSpinner size="h-4 w-4 mr-2" />}
                    Import Project
                </Button>
            </div>
            
             <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                <h4 className="font-semibold text-amber-300">Autodesk DWG/DXF</h4>
                 <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".dwg,.dxf"
                    onChange={handleFileChange}
                />
                <div className="grid grid-cols-2 gap-2 mt-2">
                     <Button onClick={() => fileInputRef.current?.click()} variant="outline" disabled={isLoading}>
                        {isLoading ? <LoadingSpinner size="h-4 w-4" /> : 'Import DWG/DXF'}
                    </Button>
                     <Button onClick={exportAsDxf} variant="outline" disabled={!currentProject}>
                        Export as DXF
                    </Button>
                </div>
            </div>

        </div>
    );
};