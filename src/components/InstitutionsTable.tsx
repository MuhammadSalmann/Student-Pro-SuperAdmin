import { useState } from "react";
import { Edit2, Trash2, Eye, Globe, ChevronDown, ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/Table";
import type { Institution } from "../types/institution.types";
import {
  getCountryName,
  parseStateField,
  renderTerritoryBadge,
  parseCourseString,
} from "../utils/helpers";

interface InstitutionsTableProps {
  institutions: Institution[];
  onEdit: (institution: Institution) => void;
  onDelete: (id: string) => void;
  onView: (institution: Institution) => void;
}

export default function InstitutionsTable({
  institutions,
  onEdit,
  onDelete,
  onView,
}: InstitutionsTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (institutionId: string) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(institutionId)) {
        newSet.delete(institutionId);
      } else {
        newSet.add(institutionId);
      }
      return newSet;
    });
  };

  const parseCourses = (courses: any[]) => {
    return courses.flatMap((course) => {
      const courseText = course.course || '';
      const existingCommission = course.commission || '';

      const courseLines = courseText
        .split(/\n+/)
        .map((line: string) => line.trim())
        .filter((line: string) => line.length > 0);

      if (existingCommission.trim() && courseLines.length === 1) {
        return [
          {
            ...course,
            course: courseText,
            commission: existingCommission,
          },
        ];
      }

      return courseLines.map((line: string) => {
        const parsed = parseCourseString(line);

        if (parsed && parsed.commission && parsed.commission.trim()) {
          return {
            ...course,
            _id: undefined,
            course: parsed.course,
            commission: parsed.commission,
          };
        }

        return {
          ...course,
          _id: undefined,
          course: parsed?.course || line,
          commission: existingCommission.trim() || 'N/A',
        };
      });
    });
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader className="bg-gradient-to-l from-[#ABDBC0] to-[#E3EFFE] shadow-sm">
          <TableRow className="hover:bg-black/5 border-b-black/10 transition-colors">
            <TableHead className="w-[35px]"></TableHead>
            <TableHead className="w-[70px]">Country</TableHead>
            <TableHead className="w-[70px]">State</TableHead>
            <TableHead className="w-[60px]">Sector</TableHead>
            <TableHead className="min-w-[120px]">Name</TableHead>
            <TableHead className="w-[70px]">Territory</TableHead>
            <TableHead className="w-[65px]">100% Promotion</TableHead>
            <TableHead className="w-[65px]">Promoted</TableHead>
            <TableHead className="w-[65px]">Scholarship</TableHead>
            <TableHead className="w-[70px]">Group</TableHead>
            <TableHead className="w-[90px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {institutions.map((institution) => {
            const isExpanded = expandedRows.has(institution._id);
            const hasCourses = institution.course && institution.course.length > 0;
            const parsedCourses = hasCourses ? parseCourses(institution.course) : [];

            return (
              <>
                <TableRow key={institution._id}>
                  {/* Expand/Collapse Arrow */}
                  <TableCell>
                    {hasCourses ? (
                      <button
                        onClick={() => toggleRow(institution._id)}
                        className="rounded p-1.5 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                        title={isExpanded ? "Collapse courses" : "Expand courses"}
                      >
                        {isExpanded ? (
                          <ChevronDown size={18} />
                        ) : (
                          <ChevronRight size={18} />
                        )}
                      </button>
                    ) : (
                      <div className="w-[34px]"></div>
                    )}
                  </TableCell>

                  {/* Country */}
                  <TableCell className="text-sm font-medium text-gray-700">
                    {getCountryName(institution.country)}
                  </TableCell>

                  {/* State */}
                  <TableCell className="text-sm font-medium text-gray-700">{parseStateField(institution.state)}</TableCell>

                  {/* Sector */}
                  <TableCell>
                    <span className=" text-sm font-medium text-gray-700">
                      {institution.sector}
                    </span>
                  </TableCell>

                  {/* Name with Link */}
                  <TableCell>
                    {institution.url ? (
                      <a
                        href={institution.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1  text-blue-700 hover:text-gray-700 transition-colors"
                      >
                        <span title={institution.name}>
                          {institution.name}
                        </span>

                      </a>
                    ) : (
                      <span
                        className="font-medium text-gray-900"
                        title={institution.name}
                      >
                        {institution.name}
                      </span>
                    )}
                  </TableCell>

                  {/* Territory */}
                  <TableCell>
                    {institution.global ? (
                      <span
                        className="inline-flex items-center justify-center w-8 h-8 text-gray-500 transition-transform hover:scale-110 cursor-default"
                        title="Global"
                      >
                        <Globe size={14} />
                      </span>
                    ) : institution.territory && institution.territory.length > 0 ? (
                      <div className="flex flex-wrap gap-1 items-center max-w-[120px]">
                        {institution.territory.map((t, idx) => {
                          const territoryData = renderTerritoryBadge(t);
                          if (!territoryData.displayText) return null;

                          if (territoryData.isGlobal) {
                            return (
                              <span
                                key={idx}
                                className="inline-flex items-center justify-center w-8 h-8 text-gray-500 transition-transform hover:scale-110 cursor-default"
                                title="Global"
                              >
                                <Globe size={14} />
                              </span>
                            )
                          }

                          return (
                            <span
                              key={idx}
                              className="inline-flex items-center justify-center w-7 h-5 cursor-default transition-transform hover:scale-110 select-none"
                              title={territoryData.displayText}
                              aria-hidden="true"
                            >
                              {territoryData.countryCode.length === 2 ? (
                                <img
                                  src={`https://flagcdn.com/w20/${territoryData.countryCode.toLowerCase()}.png`}
                                  srcSet={`https://flagcdn.com/w40/${territoryData.countryCode.toLowerCase()}.png 2x`}
                                  width="16"
                                  height="12"
                                  alt={territoryData.countryCode}
                                  className="object-contain"
                                  loading="lazy"
                                />
                              ) : (
                                <span className="text-sm leading-none">{territoryData.flag}</span>
                              )}
                            </span>
                          );
                        })}
                      </div>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </TableCell>

                  {/* 100% Promotion */}
                  <TableCell>
                    {institution.promotion && institution.promotion !== "" ? (
                      <span
                        className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800"
                        title={institution.promotion}
                      >
                        {institution.promotion}
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </TableCell>

                  {/* Promoted */}
                  <TableCell>
                    {institution.promoted ? (
                      <span
                        className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800"
                        title={institution.promoted}
                      >
                        {institution.promoted}
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </TableCell>

                  {/* Scholarship */}
                  <TableCell>
                    {institution.scholarship ? (
                      <a
                        href={institution.scholarship}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded bg-[#ABDBC0] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#00b2a1] transition-colors shadow-sm"
                        title={institution.scholarship}
                      >
                        Scholarship
                      </a>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </TableCell>

                  {/* Group */}
                  <TableCell className="text-sm font-medium text-gray-700">
                    {institution.group &&
                      institution.group.trim() &&
                      institution.group !== "_" ? (
                      <span
                        className="text-sm font-medium text-gray-700"
                        title={institution.group}
                      >
                        {institution.group}
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1.5">
                      <button
                        onClick={() => onView(institution)}
                        className="rounded p-1.5 text-blue-600 transition hover:bg-blue-50 hover:text-blue-900"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => onEdit(institution)}
                        className="rounded p-1.5 text-green-600 transition hover:bg-green-50 hover:text-green-900"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(institution._id)}
                        className="rounded p-1.5 text-red-600 transition hover:bg-red-50 hover:text-red-900"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>

                {/* Expanded Course Details Row */}
                {isExpanded && hasCourses && (
                  <TableRow key={`${institution._id}-courses`}>
                    <TableCell></TableCell>
                    <TableCell colSpan={10} className="bg-gray-50 p-0">
                      <div className="px-4 py-3">
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden max-w-2xl">
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-2 border-b border-gray-200">
                            <h4 className="text-sm font-semibold text-gray-800">
                              Courses for {institution.name}
                            </h4>
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="bg-gray-100/70 border-b border-gray-200">
                                  <th className="text-left px-3 py-1.5 text-xs font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200">
                                    Course Name
                                  </th>
                                  <th className="text-right px-3 py-1.5 text-xs font-semibold text-gray-700 uppercase tracking-wider w-[140px]">
                                    Commission
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                {parsedCourses.map((course, index) => (
                                  <tr
                                    key={course._id || index}
                                    className="hover:bg-blue-50/30 transition-colors"
                                  >
                                    <td className="px-3 py-1.5 text-sm text-gray-900 border-r border-gray-200">
                                      {course.course}
                                    </td>
                                    <td className="px-3 py-1.5 text-right">
                                      <span className="text-sm font-medium text-gray-900">
                                        {course.commission || 'N/A'}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
