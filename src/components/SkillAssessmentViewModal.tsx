import { X } from "lucide-react";
import type { SkillAssessment } from "../types/skillAssessment.types";

interface SkillAssessmentViewModalProps {
  isOpen: boolean;
  skillAssessment: SkillAssessment | null;
  onClose: () => void;
}

export default function SkillAssessmentViewModal({
  isOpen,
  skillAssessment,
  onClose,
}: SkillAssessmentViewModalProps) {
  if (!isOpen || !skillAssessment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-2xl border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-green-50">
          <h2 className="text-2xl font-semibold text-gray-800">
            {skillAssessment.occupationGroups}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-blue-600 hover:bg-blue-100/50 rounded-full p-1 transition-all focus:outline-none focus:ring-0"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="mb-4 text-xs font-medium tracking-wider text-gray-500 uppercase">
              Skill Assessment Information
            </h3>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Field label="Occupation Groups" value={skillAssessment.occupationGroups} />
              <Field label="Pathways/Streams" value={skillAssessment.pathwaysStreams} />
            </div>
          </div>

          {/* Fee Information */}
          <div>
            <h3 className="mb-4 text-xs font-medium tracking-wider text-gray-500 uppercase">
              Fee Details
            </h3>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Field label="Standard Fee (AUD)" value={skillAssessment.standardFeeAUD || "N/A"} />
              <Field label="Priority Fee (AUD)" value={skillAssessment.priorityFeeAUD || "N/A"} />
            </div>
          </div>

          {/* Processing Time Information */}
          <div>
            <h3 className="mb-4 text-xs font-medium tracking-wider text-gray-500 uppercase">
              Processing Time
            </h3>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Field label="Standard Processing Time" value={skillAssessment.standardProcessingTime || "N/A"} />
              <Field label="Priority Processing Time" value={skillAssessment.priorityProcessingTime || "N/A"} />
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h3 className="mb-4 text-xs font-medium tracking-wider text-gray-500 uppercase">
              Additional Information
            </h3>
            <div className="grid grid-cols-1 gap-5">
              <Field label="Priority Available" value={skillAssessment.priorityAvailable || "N/A"} />
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Documents Checklist
                </label>
                {skillAssessment.documentsChecklist ? (
                  <ol className="text-sm text-gray-600 list-decimal list-inside space-y-1 mt-2">
                    {skillAssessment.documentsChecklist.split(';').map((item, idx) => {
                      const trimmedItem = item.trim();
                      return trimmedItem ? (
                        <li key={idx}>{trimmedItem}</li>
                      ) : null;
                    })}
                  </ol>
                ) : (
                  <p className="text-sm text-gray-600">—</p>
                )}
              </div>
              <Field 
                label="Official Link" 
                value={
                  skillAssessment.officialLink ? (
                    <a
                      href={skillAssessment.officialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1 break-all"
                    >
                      {skillAssessment.officialLink}
                      <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : (
                    "N/A"
                  )
                } 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-500 mb-1.5">{label}</p>
      <div className="text-sm text-gray-800">{value}</div>
    </div>
  );
}
