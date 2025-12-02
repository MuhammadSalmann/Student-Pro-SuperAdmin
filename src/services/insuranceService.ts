import api from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";
import type {
    // HealthInsurance,
    CreateHealthInsuranceData,
    UpdateHealthInsuranceData,
    HealthInsuranceFilters,
} from "../types/insurance.types";

export const healthInsuranceService = {
    // Get all health insurance companies
    getAll: async (filters?: HealthInsuranceFilters) => {
        const params = new URLSearchParams();
        if (filters?.country) {
            params.append("country", filters.country);
        }

        const url = `${API_ENDPOINTS.HEALTH_INSURANCE.GET_ALL}${params.toString() ? `?${params.toString()}` : ""
            }`;

        const response = await api.get(url);
        return response.data;
    },

    // Get health insurance by ID
    getById: async (id: string) => {
        const response = await api.get(API_ENDPOINTS.HEALTH_INSURANCE.GET_BY_ID(id));
        return response.data;
    },

    // Get list of countries
    getCountries: async () => {
        const response = await api.get(API_ENDPOINTS.HEALTH_INSURANCE.GET_COUNTRIES);
        return response.data;
    },

    // Create new health insurance
    create: async (data: CreateHealthInsuranceData) => {
        const response = await api.post(API_ENDPOINTS.HEALTH_INSURANCE.CREATE, data);
        return response.data;
    },

    // Update health insurance
    update: async (id: string, data: UpdateHealthInsuranceData) => {
        const response = await api.put(
            API_ENDPOINTS.HEALTH_INSURANCE.UPDATE(id),
            data
        );
        return response.data;
    },

    // Delete health insurance
    delete: async (id: string) => {
        const response = await api.delete(API_ENDPOINTS.HEALTH_INSURANCE.DELETE(id));
        return response.data;
    },
};
