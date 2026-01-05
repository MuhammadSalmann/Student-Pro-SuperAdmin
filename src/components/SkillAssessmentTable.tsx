
import { Edit2, Trash2, Eye, ExternalLink } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/Table";
import type { SkillAssessment } from "../types/skillAssessment.types";

interface SkillAssessmentTableProps {
  skillAssessments: SkillAssessment[];
  onEdit: (skillAssessment: SkillAssessment) => void;
  onDelete: (id: string) => void;
  onView: (skillAssessment: SkillAssessment) => void;
}

export default function SkillAssessmentTable({
  skillAssessments,
  onEdit,
  onDelete,
  onView,
}: SkillAssessmentTableProps) {
  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden overflow-x-auto border rounded-md md:block">
        <Table>
          <TableHeader className="bg-gradient-to-l from-[#ABDBC0] to-[#E3EFFE] shadow-sm">
            <TableRow className="transition-colors hover:bg-black/5 border-b-black/10">
              <TableHead className="px-3 py-2">Occupation Groups</TableHead>
              <TableHead className="px-3 py-2">Pathways</TableHead>
              <TableHead className="px-3 py-2">Standard Fee (AUD)</TableHead>
              <TableHead className="px-3 py-2">Priority Fee (AUD)</TableHead>
              <TableHead className="px-3 py-2">Standard Time</TableHead>
              <TableHead className="px-3 py-2">Priority Time</TableHead>
              <TableHead className="px-3 py-2">Priority Available</TableHead>
              <TableHead className="px-3 py-2">Official Link</TableHead>
              <TableHead className="px-3 py-2 w-[90px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skillAssessments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="py-8 text-center text-gray-500">
                  No skill assessments found
                </TableCell>
              </TableRow>
            ) : (
              skillAssessments.map((assessment) => (
                <TableRow key={assessment._id}>
                  <TableCell className="px-3 py-2">
                    <span className="text-sm text-gray-700">
                      {assessment.occupationGroups}
                    </span>
                  </TableCell>
                  <TableCell className="px-3 py-2">
                    <span className="text-sm text-gray-700">
                      {assessment.pathwaysStreams}
                    </span>
                  </TableCell>
                  <TableCell className="px-3 py-2">
                    <span className="text-gray-700 ">
                      {assessment.standardFeeAUD || "N/A"}
                    </span>
                  </TableCell>
                  <TableCell className="px-3 py-2">
                    <span className="text-sm text-gray-700">
                      {assessment.priorityFeeAUD || "N/A"}
                    </span>
                  </TableCell>
                  <TableCell className="px-3 py-2">
                    <span className="text-sm text-gray-700">
                      {assessment.standardProcessingTime || "N/A"}
                    </span>
                  </TableCell>
                  <TableCell className="px-3 py-2">
                    <span className="text-sm text-gray-700">
                      {assessment.priorityProcessingTime || "N/A"}
                    </span>
                  </TableCell>
                  <TableCell className="px-3 py-2">
                    <span className="text-sm text-gray-700">
                      {assessment.priorityAvailable || "N/A"}
                    </span>
                  </TableCell>
                  <TableCell className="px-3 py-2">
                    {assessment.officialLink ? (
                      <a
                        href={assessment.officialLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        <ExternalLink size={14} className="flex-shrink-0" />
                        <span className="text-xs text-gray-700">Link</span>
                      </a>
                    ) : (
                      <span className="text-xs text-gray-400">N/A</span>
                    )}
                  </TableCell>
                  <TableCell className="px-3 py-2">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onView(assessment)}
                        className="rounded p-1.5 text-blue-600 transition hover:bg-blue-50 hover:text-blue-900"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => onEdit(assessment)}
                        className="rounded p-1.5 text-green-600 transition hover:bg-green-50 hover:text-green-900"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this skill assessment?"
                            )
                          ) {
                            onDelete(assessment._id);
                          }
                        }}
                        className="rounded p-1.5 text-red-600 transition hover:bg-red-50 hover:text-red-900"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="space-y-4 md:hidden">
        {skillAssessments.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            No skill assessments found
          </div>
        ) : (
          skillAssessments.map((assessment) => (
            <div
              key={assessment._id}
              className="p-4 bg-white border rounded-lg shadow-sm"
            >
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-medium text-gray-500">Occupation Groups</span>
                  <p className="text-sm font-semibold text-gray-900">
                    {assessment.occupationGroups}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500">Pathways/Streams</span>
                  <p className="text-sm text-gray-900">{assessment.pathwaysStreams}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-xs font-medium text-gray-500">Standard Fee</span>
                    <p className="text-sm text-gray-900">{assessment.standardFeeAUD || "N/A"}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-500">Priority Fee</span>
                    <p className="text-sm text-gray-900">{assessment.priorityFeeAUD || "N/A"}</p>
                  </div>
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500">Priority Available</span>
                  <p className="text-sm">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        assessment.priorityAvailable?.toLowerCase() === "yes"
                          ? "bg-green-100 text-green-800"
                          : assessment.priorityAvailable?.toLowerCase() === "no"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {assessment.priorityAvailable || "N/A"}
                    </span>
                  </p>
                </div>
                {assessment.officialLink && (
                  <div>
                    <span className="text-xs font-medium text-gray-500">Official Link</span>
                    <p className="text-sm">
                      <a
                        href={assessment.officialLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        <ExternalLink size={14} />
                        <span>Open Link</span>
                      </a>
                    </p>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 pt-4 mt-4 border-t">
                <button
                  onClick={() => onView(assessment)}
                  className="flex items-center justify-center flex-1 gap-2 px-3 py-2 text-sm text-blue-600 transition-colors rounded bg-blue-50 hover:bg-blue-100"
                >
                  <Eye size={16} />
                  View
                </button>
                <button
                  onClick={() => onEdit(assessment)}
                  className="flex items-center justify-center flex-1 gap-2 px-3 py-2 text-sm text-yellow-600 transition-colors rounded bg-yellow-50 hover:bg-yellow-100"
                >
                  <Edit2 size={16} />
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this skill assessment?"
                      )
                    ) {
                      onDelete(assessment._id);
                    }
                  }}
                  className="flex items-center justify-center flex-1 gap-2 px-3 py-2 text-sm text-red-600 transition-colors rounded bg-red-50 hover:bg-red-100"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
