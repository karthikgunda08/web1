
// src/services/walletService.ts
import { Transaction } from '../types/index';
import { apiClient } from './authService';

/**
 * Fetches the transaction history for the current user.
 */
export const getTransactions = async (page = 1, limit = 50): Promise<{transactions: Transaction[], totalPages: number, currentPage: number}> => {
  return apiClient(`/wallet/transactions?page=${page}&limit=${limit}`);
};
