
// src/services/astraService.ts
import { Supplier, Quote, BoqItem } from '../types/index';
import { apiClient } from './authService';

export const findSuppliers = (materialCategory: string): Promise<Supplier[]> => {
    return apiClient(`/astra/suppliers?materialCategory=${encodeURIComponent(materialCategory)}`);
};

export const getProjectQuotes = (projectId: string): Promise<Quote[]> => {
    return apiClient(`/astra/projects/${projectId}/quotes`);
};

export const createRfqForProject = (projectId: string, items: BoqItem[]): Promise<{ message: string }> => {
    return apiClient(`/astra/projects/${projectId}/rfq`, {
        method: 'POST',
        body: JSON.stringify({ items }),
    });
};

export const getUserQuotes = (): Promise<Quote[]> => {
    return apiClient('/astra/quotes');
};
