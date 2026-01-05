import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";
import type {
  SkillAssessment,
  SkillAssessmentFilters,
  SkillAssessmentsResponse,
  SingleSkillAssessmentResponse,
  CreateSkillAssessmentData,
  UpdateSkillAssessmentData,
  OccupationGroupsResponse,
  PathwaysStreamsResponse,
} from "../types/skillAssessment.types";
import { AxiosError } from "axios";

class SkillAssessmentService {
  /**
   * Get all skill assessments with optional filters
   */
  async getAllSkillAssessments(filters?: SkillAssessmentFilters): Promise<SkillAssessmentsResponse> {
    try {
      const response = await axiosInstance.get<SkillAssessmentsResponse>(
        API_ENDPOINTS.SKILL_ASSESSMENT.GET_ALL,
        { params: { ...filters, _t: Date.now() } }
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || "Failed to fetch skill assessments");
      }
      throw error;
    }
  }

  /**
   * Get skill assessment by ID
   */
  async getSkillAssessmentById(id: string): Promise<SkillAssessment> {
    try {
      const response = await axiosInstance.get<SingleSkillAssessmentResponse>(
        API_ENDPOINTS.SKILL_ASSESSMENT.GET_BY_ID(id)
      );
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || "Failed to fetch skill assessment");
      }
      throw error;
    }
  }

  /**
   * Get unique occupation groups
   */
  async getOccupationGroups(): Promise<string[]> {
    try {
      const response = await axiosInstance.get<OccupationGroupsResponse>(
        API_ENDPOINTS.SKILL_ASSESSMENT.GET_OCCUPATION_GROUPS
      );
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || "Failed to fetch occupation groups");
      }
      throw error;
    }
  }

  /**
   * Get unique pathways/streams
   */
  async getPathwaysStreams(): Promise<string[]> {
    try {
      const response = await axiosInstance.get<PathwaysStreamsResponse>(
        API_ENDPOINTS.SKILL_ASSESSMENT.GET_PATHWAYS_STREAMS
      );
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || "Failed to fetch pathways/streams");
      }
      throw error;
    }
  }

  /**
   * Create new skill assessment
   */
  async createSkillAssessment(data: CreateSkillAssessmentData): Promise<SkillAssessment> {
    try {
      const response = await axiosInstance.post<SingleSkillAssessmentResponse>(
        API_ENDPOINTS.SKILL_ASSESSMENT.CREATE,
        data
      );
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || "Failed to create skill assessment");
      }
      throw error;
    }
  }

  /**
   * Update skill assessment
   */
  async updateSkillAssessment(id: string, data: UpdateSkillAssessmentData): Promise<SkillAssessment> {
    try {
      const response = await axiosInstance.put<SingleSkillAssessmentResponse>(
        API_ENDPOINTS.SKILL_ASSESSMENT.UPDATE(id),
        data
      );
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || "Failed to update skill assessment");
      }
      throw error;
    }
  }

  /**
   * Delete skill assessment
   */
  async deleteSkillAssessment(id: string): Promise<void> {
    try {
      await axiosInstance.delete(API_ENDPOINTS.SKILL_ASSESSMENT.DELETE(id));
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || "Failed to delete skill assessment");
      }
      throw error;
    }
  }
}

export default new SkillAssessmentService();
