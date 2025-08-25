
// src/services/feedbackService.ts
import { apiClient } from './authService';

export const submitFeedback = async (category: 'bug_report' | 'feature_request' | 'general_feedback', message: string): Promise<{ message: string }> => {
    return apiClient('/feedback', {
        method: 'POST',
        body: JSON.stringify({ category, message }),
    });
};
