// Visa Service Types
export interface VisaService {
    _id: string;
    serviceType: string;
    country: string;
    serviceFee: string;
    referralFee: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateVisaServiceData {
    serviceType: string;
    country: string;
    serviceFee: string;
    referralFee: string;
}

export interface UpdateVisaServiceData {
    serviceType?: string;
    country?: string;
    serviceFee?: string;
    referralFee?: string;
}

export interface VisaServiceFilters {
    country?: string;
}
