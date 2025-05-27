import { ApiResponse } from '../types';

const API_URL = 'https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json';

export const fetchVideos = async (): Promise<ApiResponse> => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data as ApiResponse;
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
};