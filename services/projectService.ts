// src/services/projectService.ts
import { User, Project, ProjectData, ProjectSummary, UpdateUserPayload, ChangePasswordPayload, ProjectStatus, BudgetCategory, ProjectTask, ProjectVersion, Collaborator, GeneratedDocument, GeneratedRender, MarketplaceInfo, ProjectAnalyticsData, HolocronData, DigitalTwinData } from '../types/index';
import { BACKEND_API_BASE_URL } from '../lib/constants';
import * as analyticsService from './analyticsService';
import { apiClient } from './authService';

const generateId = (prefix: string): string => `${prefix}_${new Date().getTime()}_${Math.random().toString(36).substring(2, 7)}`;

// ---- Project Management ----
export const saveProject = async (params: {
    projectContent: ProjectData;
    projectName: string;
    commitMessage: string;
    existingProjectId?: string;
    commitType?: 'manual' | 'auto';
}): Promise<{project: Project}> => {
  const { projectContent, projectName, commitMessage, existingProjectId, commitType = 'manual' } = params;
  const payload = {
    ...projectContent,
    name: projectName,
    commitMessage,
    commitType,
    ...(existingProjectId && { existingProjectId }), 
  };
  const response = await apiClient('/projects', {
    method: 'POST', 
    body: JSON.stringify(payload),
  });
  if (response && response.project) {
    if (!existingProjectId) { 
      analyticsService.trackEvent('Project Created', { type: projectContent.projectType });
    } else {
      analyticsService.trackEvent('Project Version Saved', { projectId: existingProjectId, type: commitType });
    }
    return response;
  }
  throw new Error("Failed to save project or invalid response structure.");
};

export const updateProjectName = async (projectId: string, name: string): Promise<{ id: string; name: string; }> => {
    return apiClient(`/projects/${projectId}/name`, {
        method: 'PUT',
        body: JSON.stringify({ name }),
    });
};


export const loadUserProjects = async (): Promise<ProjectSummary[]> => {
  return apiClient('/projects'); 
};

export const getProjectDetails = async (projectId: string): Promise<Project> => {
  return apiClient(`/projects/${projectId}`);
};

export const deleteProject = async (projectId: string): Promise<void> => {
  await apiClient(`/projects/${projectId}`, { method: 'DELETE' });
};

// --- Version History ---
export const getProjectVersions = async (projectId: string): Promise<ProjectVersion[]> => {
    return apiClient(`/projects/${projectId}/versions`);
};

export const restoreProjectVersion = async (projectId: string, versionId: string): Promise<{project: Project}> => {
    return apiClient(`/projects/${projectId}/versions/${versionId}/restore`, {
        method: 'POST',
    });
};

// --- Project Analytics ---
export const getProjectAnalytics = async (projectId: string): Promise<ProjectAnalyticsData> => {
  return apiClient(`/projects/${projectId}/analytics`);
};

// --- Digital Twin ---
export const getDigitalTwinData = async (projectId: string): Promise<DigitalTwinData> => {
    return apiClient(`/projects/${projectId}/digital-twin-data`);
};


// --- Project Hub Asset Management ---
export const addProjectDocument = async (projectId: string, doc: Omit<GeneratedDocument, '_id' | 'createdAt'>): Promise<GeneratedDocument[]> => {
    return apiClient(`/projects/${projectId}/documents`, {
        method: 'POST',
        body: JSON.stringify(doc),
    });
};
export const deleteProjectDocument = async (projectId: string, assetId: string): Promise<GeneratedDocument[]> => {
    return apiClient(`/projects/${projectId}/documents/${assetId}`, {
        method: 'DELETE',
    });
};
export const addProjectRender = async (projectId: string, render: Omit<GeneratedRender, '_id' | 'createdAt'>): Promise<GeneratedRender[]> => {
    return apiClient(`/projects/${projectId}/renders`, {
        method: 'POST',
        body: JSON.stringify(render),
    });
};
export const deleteProjectRender = async (projectId: string, assetId: string): Promise<GeneratedRender[]> => {
    return apiClient(`/projects/${projectId}/renders/${assetId}`, {
        method: 'DELETE',
    });
};

// --- NEW: Revit/External Integration ---
export const importRevitProject = async (revitProjectId: string): Promise<ProjectData> => {
    // This is a mock function. In a real app, this would call a backend endpoint
    // that processes a Revit file and returns AuraOS-compatible JSON.
    console.log(`Simulating import of Revit project: ${revitProjectId}`);
    
    // Simulate network delay
    await new Promise(res => setTimeout(res, 1500));

    // Return mock project data
    return {
        id: generateId('imported'),
        name: 'Imported Revit Model - High Rise',
        type: 'building',
        projectType: 'building',
        levels: [
            {
                id: generateId('level_imp_1'),
                name: 'Level 1 (Imported)',
                elevation: 0,
                walls: [
                    { id: generateId('wall'), x1: 100, y1: 100, x2: 500, y2: 100, thickness: 15, height: 300, layerId: 'default' },
                    { id: generateId('wall'), x1: 500, y1: 100, x2: 500, y2: 400, thickness: 15, height: 300, layerId: 'default' },
                    { id: generateId('wall'), x1: 500, y1: 400, x2: 100, y2: 400, thickness: 15, height: 300, layerId: 'default' },
                    { id: generateId('wall'), x1: 100, y1: 400, x2: 100, y2: 100, thickness: 15, height: 300, layerId: 'default' },
                ],
                rooms: [],
                placements: [],
                placedModels: [],
                dimensionLines: [],
                comments: [],
                suggestedFurniture: [],
                plumbingLayout: [],
                electricalLayout: null,
                hvacLayout: null,
                drawingSet: null,
                layers: [{ id: 'default', name: 'Default', isVisible: true, isLocked: false }],
                activeLayerId: 'default',
            }
        ],
        zones: [],
        infrastructure: [],
        planNorthDirection: 'N',
        propertyLines: [],
        terrainMesh: null,
    };
};


// --- DWG Interoperability ---
export const importDwgApi = async (file: File): Promise<ProjectData & { name: string }> => {
    const formData = new FormData();
    formData.append('dwgFile', file);
    return apiClient('/projects/import-dwg', {
        method: 'POST',
        body: formData,
    });
};

export const exportDwgApi = async (projectId: string, projectName: string): Promise<void> => {
    const blob = await apiClient(`/projects/${projectId}/export-dwg`);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName.replace(/\s+/g, '_')}.dxf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
};

// --- Aura Dashboard ---
export const updateProjectMetaApi = async (projectId: string, meta: { status?: ProjectStatus, budget?: BudgetCategory[], tasks?: ProjectTask[] }): Promise<{ project: Project }> => {
    return apiClient(`/projects/${projectId}/meta`, {
        method: 'PUT',
        body: JSON.stringify(meta),
    });
};

export const manageClientPortalApi = async (projectId: string, enable: boolean): Promise<{ project: Project }> => {
    return apiClient(`/projects/${projectId}/client-portal`, {
        method: 'POST',
        body: JSON.stringify({ enable }),
    });
};

// --- Architect's Folio & Showcase ---
export const generateArchitectsFolioApi = async (projectId: string): Promise<{ project: Project }> => {
    return apiClient(`/projects/${projectId}/folio`, {
        method: 'POST',
    });
};

export const toggleProjectPublicStatus = async (projectId: string): Promise<{ id: string; isPublic: boolean; previewImageUrl?: string; }> => {
    return apiClient(`/projects/${projectId}/toggle-public`, {
        method: 'PUT',
    });
};

// --- NEW: Holocron API ---
export const generateHolocronApi = async (projectId: string): Promise<{ project: Project }> => {
    return apiClient(`/projects/${projectId}/holocron`, {
        method: 'POST',
    });
}

export const getPublicHolocronDataApi = async (shareableLink: string): Promise<HolocronData> => {
     const response = await fetch(`${BACKEND_API_BASE_URL}/projects/holocron/${shareableLink}`);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Could not fetch Holocron data.');
    }
    return response.json();
}


// --- Collaborator Management ---
export const getCollaborators = async (projectId: string): Promise<Collaborator[]> => {
    return apiClient(`/projects/${projectId}/collaborators`);
};

export const inviteCollaborator = async (projectId: string, email: string): Promise<{ message: string, collaborators: Collaborator[] }> => {
    return apiClient(`/projects/${projectId}/collaborators`, {
        method: 'POST',
        body: JSON.stringify({ email })
    });
};

export const removeCollaborator = async (projectId: string, collaboratorId: string): Promise<{ message: string, collaborators: Collaborator[] }> => {
    return apiClient(`/projects/${projectId}/collaborators/${collaboratorId}`, {
        method: 'DELETE'
    });
};

// --- Marketplace APIs ---

/**
 * Publishes a project to the marketplace.
 * @param projectId The ID of the project to publish.
 * @param details The marketplace details (price, description).
 */
export const publishProjectToMarketplace = async (projectId: string, details: { price: number; description: string; }): Promise<{ project: Project }> => {
    return apiClient(`/projects/${projectId}/publish-as-template`, {
        method: 'POST',
        body: JSON.stringify(details),
    });
};

/**
 * Fetches all available templates from the marketplace. Public endpoint.
 */
export const getMarketplaceTemplates = async (): Promise<ProjectSummary[]> => {
    // This is a public endpoint, so it doesn't need fetchWithAuth
    const response = await fetch(`${BACKEND_API_BASE_URL}/projects/marketplace/templates`);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch marketplace templates.');
    }
    return response.json();
};

/**
 * Buys a project template from the marketplace.
 * @param projectId The ID of the template project to buy.
 */
export const buyMarketplaceTemplate = async (projectId: string): Promise<{ message: string; newProjectId: string }> => {
    return apiClient(`/projects/marketplace/templates/${projectId}/buy`, {
        method: 'POST',
    });
};

/**
 * Fetches all tokenized projects from the exchange. Public endpoint.
 */
export const getExchangeListingsApi = async (): Promise<ProjectSummary[]> => {
    // This is a public endpoint, so it doesn't need fetchWithAuth
    const response = await fetch(`${BACKEND_API_BASE_URL}/projects/exchange/listings`);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch exchange listings.');
    }
    return response.json();
};

/**
 * Tokenizes a project and lists it on the exchange.
 * @param projectId The ID of the project to tokenize.
 * @param details The tokenization details.
 */
export const tokenizeProjectApi = async (projectId: string, details: { totalTokens: number; pricePerToken: number; offeringDescription: string; }): Promise<{ project: Project }> => {
    return apiClient(`/projects/${projectId}/tokenize`, {
        method: 'POST',
        body: JSON.stringify(details),
    });
};