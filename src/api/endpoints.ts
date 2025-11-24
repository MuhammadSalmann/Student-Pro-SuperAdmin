export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    VERIFY_EMAIL: "/auth/verify-email",
    RESEND_OTP: "/auth/resend-otp",
    RESET_OTP: "/auth/reset-otp",
    RESET_PASSWORD: "/auth/reset-password",
    LOGOUT: "/auth/logout",
    GET_CURRENT_USER: "/auth/user/me",
  },
  USERS: {
    LIST: "/auth/user",
    GET: (id: string) => `/auth/user/${id}`,
    UPDATE: (id: string) => `/auth/user/${id}`,
    DELETE: (id: string) => `/auth/user/${id}`,
  },
  STUDENTS: {
    LIST: "/student-profile",
    CREATE: "/student-profile",
    UPDATE: (id: string) => `/student-profile/${id}`,
    DELETE: (id: string) => `/student-profile/${id}`,
    GET: (id: string) => `/student-profile/${id}`,
  },
  APPLICATIONS: {
    LIST: "/applications",
    CREATE: "/applications",
    UPDATE: (id: string) => `/applications/${id}`,
    DELETE: (id: string) => `/applications/${id}`,
    GET: (id: string) => `/applications/${id}`,
  },
  COURSES: {
    LIST: "/courses",
    CREATE: "/courses",
    UPDATE: (id: string) => `/courses/${id}`,
    DELETE: (id: string) => `/courses/${id}`,
    GET: (id: string) => `/courses/${id}`,
  },
  COMMISSIONS: {
    LIST: "/commissions",
    CREATE: "/commissions",
    UPDATE: (id: string) => `/commissions/${id}`,
    DELETE: (id: string) => `/commissions/${id}`,
    GET: (id: string) => `/commissions/${id}`,
  },
  INVOICES: {
    LIST: "/invoices",
    CREATE: "/invoices",
    UPDATE: (id: string) => `/invoices/${id}`,
    DELETE: (id: string) => `/invoices/${id}`,
    GET: (id: string) => `/invoices/${id}`,
  },
  INSTITUTIONS: {
    GET_ALL: "/institution",
    GET_BY_ID: (id: string) => `/institution/${id}`,
    SEARCH: (query: string) => `/institution/search/${query}`,
    BY_COUNTRY: (country: string) => `/institution/country/${country}`,
    WITH_SCHOLARSHIPS: "/institution/scholarships",
    CREATE: "/institution",
    UPDATE: (id: string) => `/institution/${id}`,
    DELETE: (id: string) => `/institution/${id}`,
    ADD_COURSE: (id: string) => `/institution/${id}/courses`,
    REMOVE_COURSE: (id: string, courseIndex: number) => `/institution/${id}/courses/${courseIndex}`,
    // XLSX Import/Export endpoints
    EXPORT_XLSX: "/institution/export/xlsx",
    IMPORT_XLSX: "/institution/import/xlsx",

  },


  INSURANCE: {
    LIST: "/insurance",
    CREATE: "/insurance",
    UPDATE: (id: string) => `/insurance/${id}`,
    DELETE: (id: string) => `/insurance/${id}`,
    GET: (id: string) => `/insurance/${id}`,
  },
  VISA: {
    LIST: "/visa",
    CREATE: "/visa",
    UPDATE: (id: string) => `/visa/${id}`,
    DELETE: (id: string) => `/visa/${id}`,
    GET: (id: string) => `/visa/${id}`,
  },
  TRACK: {
    GET: (id: string) => `/track/${id}`,
  },
} as const;
