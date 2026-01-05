import { useState, useEffect, useCallback } from "react";
import skillAssessmentService from "../services/skillAssessmentService";
import type {
  SkillAssessment,
  SkillAssessmentFilters,
  CreateSkillAssessmentData,
  UpdateSkillAssessmentData,
} from "../types/skillAssessment.types";
import toast from "react-hot-toast";

export const useSkillAssessments = (initialFilters?: SkillAssessmentFilters) => {
  const [skillAssessments, setSkillAssessments] = useState<SkillAssessment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SkillAssessmentFilters>({
    page: 1,
    pageSize: 15,
    ...initialFilters,
  });

  const [occupationGroups, setOccupationGroups] = useState<string[]>([]);
  const [pathwaysStreams, setPathwaysStreams] = useState<string[]>([]);

  /**
   * Fetch skill assessments with current filters
   */
  const fetchSkillAssessments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await skillAssessmentService.getAllSkillAssessments(filters);
      setSkillAssessments(response.data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch skill assessments";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  /**
   * Fetch occupation groups
   */
  const fetchOccupationGroups = useCallback(async () => {
    try {
      const groups = await skillAssessmentService.getOccupationGroups();
      setOccupationGroups(groups);
    } catch (err) {
      console.error("Failed to fetch occupation groups:", err);
    }
  }, []);

  /**
   * Fetch pathways/streams
   */
  const fetchPathwaysStreams = useCallback(async () => {
    try {
      const streams = await skillAssessmentService.getPathwaysStreams();
      setPathwaysStreams(streams);
    } catch (err) {
      console.error("Failed to fetch pathways/streams:", err);
    }
  }, []);

  /**
   * Update filters and reset to page 1
   */
  const updateFilters = useCallback((newFilters: Partial<SkillAssessmentFilters>) => {
    setFilters((prev) => ({
      page: 1,
      pageSize: newFilters.pageSize || prev.pageSize || 15,
      ...newFilters,
    } as SkillAssessmentFilters));
  }, []);

  /**
   * Clear all filters
   */
  const clearFilters = useCallback(() => {
    setFilters({ page: 1, pageSize: 15 });
  }, []);

  /**
   * Create new skill assessment
   */
  const createSkillAssessment = async (data: CreateSkillAssessmentData): Promise<boolean> => {
    try {
      await skillAssessmentService.createSkillAssessment(data);
      toast.success("Skill assessment created successfully");
      await fetchSkillAssessments();
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create skill assessment";
      toast.error(errorMessage);
      return false;
    }
  };

  /**
   * Update skill assessment
   */
  const updateSkillAssessment = async (id: string, data: UpdateSkillAssessmentData): Promise<boolean> => {
    try {
      await skillAssessmentService.updateSkillAssessment(id, data);
      toast.success("Skill assessment updated successfully");
      await fetchSkillAssessments();
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update skill assessment";
      toast.error(errorMessage);
      return false;
    }
  };

  /**
   * Delete skill assessment
   */
  const deleteSkillAssessment = async (id: string): Promise<boolean> => {
    try {
      await skillAssessmentService.deleteSkillAssessment(id);
      toast.success("Skill assessment deleted successfully");
      await fetchSkillAssessments();
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete skill assessment";
      toast.error(errorMessage);
      return false;
    }
  };

  // Fetch data on mount or when filters change
  useEffect(() => {
    fetchSkillAssessments();
  }, [fetchSkillAssessments]);

  // Fetch dropdown options on mount
  useEffect(() => {
    fetchOccupationGroups();
    fetchPathwaysStreams();
  }, [fetchOccupationGroups, fetchPathwaysStreams]);

  return {
    skillAssessments,
    loading,
    error,
    filters,
    occupationGroups,
    pathwaysStreams,
    updateFilters,
    clearFilters,
    createSkillAssessment,
    updateSkillAssessment,
    deleteSkillAssessment,
    refetch: fetchSkillAssessments,
  };
};
