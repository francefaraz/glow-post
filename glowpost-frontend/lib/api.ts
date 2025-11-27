const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.error || 'An error occurred' };
    }

    return { data };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Network error' };
  }
}

// Posts API
export const postsApi = {
  getAll: async () => apiRequest<any[]>('/api/posts'),
  create: async (post: { content: string; topic?: string; tone?: string; keywords?: string; platform?: string }) =>
    apiRequest<any>('/api/posts', {
      method: 'POST',
      body: JSON.stringify(post),
    }),
  update: async (id: number, updates: Partial<{ content: string; topic: string; tone: string; keywords: string; platform: string }>) =>
    apiRequest<any>(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    }),
  delete: async (id: number) =>
    apiRequest<{ success: boolean }>(`/api/posts/${id}`, {
      method: 'DELETE',
    }),
};

// Generate API
export const generateApi = {
  generate: async (params: { topic?: string; tone?: string; keywords?: string }) =>
    apiRequest<{ result: string }>('/api/generate', {
      method: 'POST',
      body: JSON.stringify(params),
    }),
};

// Schedule API
export const scheduleApi = {
  getAll: async () => apiRequest<any[]>('/api/schedule'),
  create: async (schedule: { post_id: number; scheduled_time: string; platform?: string }) =>
    apiRequest<any>('/api/schedule', {
      method: 'POST',
      body: JSON.stringify(schedule),
    }),
  delete: async (id: number) =>
    apiRequest<{ success: boolean }>(`/api/schedule/${id}`, {
      method: 'DELETE',
    }),
};

// Brand Settings API
export const brandApi = {
  get: async () => apiRequest<any>('/api/brand'),
  update: async (settings: {
    tone?: string;
    keywords?: string;
    brand_color?: string;
    brand_name?: string;
    brand_voice?: string;
    target_audience?: string;
  }) =>
    apiRequest<any>('/api/brand', {
      method: 'POST',
      body: JSON.stringify(settings),
    }),
};

// Contact API
export const contactApi = {
  submit: async (message: { name: string; email: string; message: string }) =>
    apiRequest<{ success: boolean; id?: number }>('/api/contact', {
      method: 'POST',
      body: JSON.stringify(message),
    }),
};

// Templates API
export const templatesApi = {
  getAll: async () => apiRequest<any[]>('/api/templates'),
  getById: async (id: string) => apiRequest<any>(`/api/templates/${id}`),
};

// Pricing API
export const pricingApi = {
  get: async () => apiRequest<{ inr: { pro: number; agency: number }; usd: { pro: number; agency: number } }>('/api/pricing'),
};

