import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { toast } from "../lib/toast";
import type {
  SkillAssessment,
  CreateSkillAssessmentData,
} from "../types/skillAssessment.types";

interface SkillAssessmentModalProps {
  isOpen: boolean;
  mode: "create" | "edit";
  skillAssessment?: SkillAssessment | null;
  onClose: () => void;
  onSubmit: (data: CreateSkillAssessmentData) => Promise<boolean>;
}

export default function SkillAssessmentModal({
  isOpen,
  mode,
  skillAssessment,
  onClose,
  onSubmit,
}: SkillAssessmentModalProps) {
  const [formData, setFormData] = useState<Partial<CreateSkillAssessmentData>>({
    occupationGroups: "",
    pathwaysStreams: "",
    standardFeeAUD: "",
    priorityFeeAUD: "",
    standardProcessingTime: "",
    priorityProcessingTime: "",
    priorityAvailable: "",
    documentsChecklist: "",
    officialLink: "",
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (mode === "edit" && skillAssessment) {
      // Intentional: syncing form state with prop changes for edit mode
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        occupationGroups: skillAssessment.occupationGroups,
        pathwaysStreams: skillAssessment.pathwaysStreams,
        standardFeeAUD: skillAssessment.standardFeeAUD || "",
        priorityFeeAUD: skillAssessment.priorityFeeAUD || "",
        standardProcessingTime: skillAssessment.standardProcessingTime || "",
        priorityProcessingTime: skillAssessment.priorityProcessingTime || "",
        priorityAvailable: skillAssessment.priorityAvailable || "",
        documentsChecklist: skillAssessment.documentsChecklist || "",
        officialLink: skillAssessment.officialLink || "",
      });
    } else if (mode === "create") {
      setFormData({
        occupationGroups: "",
        pathwaysStreams: "",
        standardFeeAUD: "",
        priorityFeeAUD: "",
        standardProcessingTime: "",
        priorityProcessingTime: "",
        priorityAvailable: "",
        documentsChecklist: "",
        officialLink: "",
      });
    }
  }, [mode, skillAssessment]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.occupationGroups?.trim() || !formData.pathwaysStreams?.trim()) {
      toast.error("Occupation Groups and Pathways/Streams are required");
      return;
    }

    setSubmitting(true);
    const success = await onSubmit(formData as CreateSkillAssessmentData);
    setSubmitting(false);

    if (success) {
      onClose();
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      occupationGroups: "",
      pathwaysStreams: "",
      standardFeeAUD: "",
      priorityFeeAUD: "",
      standardProcessingTime: "",
      priorityProcessingTime: "",
      priorityAvailable: "",
      documentsChecklist: "",
      officialLink: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">
            {mode === "create" ? "Create New Skill Assessment" : "Edit Skill Assessment"}
          </h2>
          <button
            onClick={() => {
              onClose();
              resetForm();
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="mb-3 text-lg font-semibold text-gray-900">Basic Information</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Occupation Groups <span className="text-red-500">*</span>
                </label>
                <Input
                  value={formData.occupationGroups || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, occupationGroups: e.target.value })
                  }
                  placeholder="e.g., Engineering Professionals"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Pathways/Streams <span className="text-red-500">*</span>
                </label>
                <Input
                  value={formData.pathwaysStreams || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, pathwaysStreams: e.target.value })
                  }
                  placeholder="e.g., General Stream"
                  required
                />
              </div>
            </div>
          </div>

          {/* Fee Information */}
          <div>
            <h3 className="mb-3 text-lg font-semibold text-gray-900">Fee Information</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Standard Fee (AUD)
                </label>
                <Input
                  value={formData.standardFeeAUD || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, standardFeeAUD: e.target.value })
                  }
                  placeholder="e.g., 530"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Priority Fee (AUD)
                </label>
                <Input
                  value={formData.priorityFeeAUD || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, priorityFeeAUD: e.target.value })
                  }
                  placeholder="e.g., 1060"
                />
              </div>
            </div>
          </div>

          {/* Processing Time Information */}
          <div>
            <h3 className="mb-3 text-lg font-semibold text-gray-900">Processing Time</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Standard Processing Time
                </label>
                <Input
                  value={formData.standardProcessingTime || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, standardProcessingTime: e.target.value })
                  }
                  placeholder="e.g., 12-16 weeks"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Priority Processing Time
                </label>
                <Input
                  value={formData.priorityProcessingTime || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, priorityProcessingTime: e.target.value })
                  }
                  placeholder="e.g., 5-8 weeks"
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h3 className="mb-3 text-lg font-semibold text-gray-900">Additional Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Priority Available
                </label>
                <select
                  value={formData.priorityAvailable || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, priorityAvailable: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="N/A">N/A</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Documents Checklist
                </label>
                <textarea
                  value={formData.documentsChecklist || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, documentsChecklist: e.target.value })
                  }
                  placeholder="e.g., Passport, Educational certificates, Work experience letters..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Official Link
                </label>
                <Input
                  value={formData.officialLink || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, officialLink: e.target.value })
                  }
                  placeholder="https://example.com/skill-assessment"
                  type="url"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onClose();
                resetForm();
              }}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={submitting} className="bg-[#0A1F38] hover:bg-[#10192c] text-white">
              {submitting
                ? mode === "create"
                  ? "Creating..."
                  : "Updating..."
                : mode === "create"
                ? "Create"
                : "Update"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
