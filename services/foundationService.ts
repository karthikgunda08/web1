// src/services/foundationService.ts
import { Submission } from '../types/index';
import { apiClient } from './authService';

export const submitToVaarahiPrize = async (projectId: string, proposal: string): Promise<{ message: string }> => {
    return apiClient('/foundation/submit', {
        method: 'POST',
        body: JSON.stringify({ projectId, proposal }),
    });
};

export const getSubmissionsForOwner = async (): Promise<Submission[]> => {
    return apiClient('/foundation/submissions');
};

export const adjudicateSubmissionApi = async (submissionId: string): Promise<Submission> => {
    return apiClient(`/foundation/submissions/${submissionId}/adjudicate`, {
        method: 'POST',
    });
};
