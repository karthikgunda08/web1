
// src/services/adminService.ts
import { KpiData, ProjectSummary, User, Feedback, KpiChartData, StrategicInsight } from '../types/index';
import { apiClient } from './authService';

// --- KPI and Data Fetching ---
export const getKpiData = async (): Promise<KpiData> => {
    return apiClient('/admin/kpis');
};

export const getKpiChartData = async (): Promise<KpiChartData[]> => {
    return apiClient('/admin/kpi-chart-data');
};

export const getAllProjectsForOwner = async (): Promise<ProjectSummary[]> => {
    return apiClient('/admin/all-projects');
};

export const getAllUsersForOwner = async (): Promise<User[]> => {
    return apiClient('/admin/all-users');
};

export const getAllFeedback = async (): Promise<Feedback[]> => {
    return apiClient('/admin/all-feedback');
}

// NEW: Fetch strategic insights for Brahman Protocol
export const getStrategicInsightsApi = async (): Promise<StrategicInsight[]> => {
    return apiClient('/admin/strategic-insights');
};


// --- AI Tools ---
export const analyzeBusinessDataApi = async (query: string, kpiData: KpiData): Promise<{ answer: string }> => {
    return apiClient('/gemini/analyze-business-data', { method: 'POST', body: JSON.stringify({ query, kpiData }) });
};

export const analyzeSupportIssuesApi = async (projectNames: string[]): Promise<{ topIssues: any[], topSuggestions: any[] }> => {
    return apiClient('/gemini/analyze-support-issues', { method: 'POST', body: JSON.stringify({ projectNames }) });
};

export const generateSocialMediaPostApi = async (projectTitle: string, projectNarrative: string): Promise<{ post: string }> => {
    return apiClient('/gemini/generate-social-media-post', { method: 'POST', body: JSON.stringify({ projectTitle, projectNarrative }) });
};
