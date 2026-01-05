import { useState } from "react";
import { useSkillAssessments } from "../hooks/useSkillAssessment";
import { Button } from "../components/ui/Button";
import type {
  SkillAssessment,
  CreateSkillAssessmentData,
  UpdateSkillAssessmentData,
} from "../types/skillAssessment.types";
import SkillAssessmentModal from "../components/SkillAssessmentModal";
import SkillAssessmentTable from "../components/SkillAssessmentTable";
import SkillAssessmentViewModal from "../components/SkillAssessmentViewModal";

export default function SkillAssessment() {
  const [pageSize] = useState(100);
  const {
    skillAssessments,
    loading,
    createSkillAssessment,
    updateSkillAssessment,
    deleteSkillAssessment,
  } = useSkillAssessments({ page: 1, pageSize });

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedSkillAssessment, setSelectedSkillAssessment] = useState<SkillAssessment | null>(
    null
  );

  const handleCreate = async (data: CreateSkillAssessmentData) => {
    return await createSkillAssessment(data);
  };

  const handleEdit = (skillAssessment: SkillAssessment) => {
    setSelectedSkillAssessment(skillAssessment);
    setShowEditModal(true);
  };

  const handleUpdate = async (data: UpdateSkillAssessmentData) => {
    if (!selectedSkillAssessment) return false;
    return await updateSkillAssessment(selectedSkillAssessment._id, data);
  };

  const handleDelete = async (id: string) => {
    await deleteSkillAssessment(id);
  };

  const handleView = (skillAssessment: SkillAssessment) => {
    setSelectedSkillAssessment(skillAssessment);
    setShowViewModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Skill Assessment</h1>
                <p className="mt-1 text-sm text-gray-600 truncate md:text-base">
                  Manage skill assessment information
                </p>
              </div>
            </div>
            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-[#0A1F38] text-white hover:bg-[#0A1F38] hover:shadow-lg"
            >
              + Add New Assessment
            </Button>
          </div>
        </div>

    
  {/* Showing count */}
        {!loading && (
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Showing {Math.min(skillAssessments.length, pageSize)} of {skillAssessments.length} {skillAssessments.length === 1 ? 'assessment' : 'assessments'}
            </p>
          </div>
        )}

        {/* Main Content */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-12 h-12 border-b-2 border-purple-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <SkillAssessmentTable
            skillAssessments={skillAssessments}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
          />
        )}
      </div>

      {/* Modals */}
      <SkillAssessmentModal
        isOpen={showCreateModal}
        mode="create"
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreate}
      />
      <SkillAssessmentModal
        isOpen={showEditModal}
        mode="edit"
        skillAssessment={selectedSkillAssessment}
        onClose={() => {
          setShowEditModal(false);
          setSelectedSkillAssessment(null);
        }}
        onSubmit={handleUpdate}
      />
      <SkillAssessmentViewModal
        isOpen={showViewModal}
        skillAssessment={selectedSkillAssessment}
        onClose={() => {
          setShowViewModal(false);
          setSelectedSkillAssessment(null);
        }}
      />
    </div>
  );
}
