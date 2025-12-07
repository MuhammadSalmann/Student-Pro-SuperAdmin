import { useState } from "react";
import { Eye, ChevronDown, ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/Table";
import type { Accommodation } from "../types/accommodation";
import AccommodationViewModal from "./AccommodationViewModal";

interface AccommodationTableProps {
  accommodations: Accommodation[];
  loading: boolean;
}

const AccommodationTable = ({
  accommodations,
  loading,
}: AccommodationTableProps) => {
  const [selectedAccommodation, setSelectedAccommodation] =
    useState<Accommodation | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const handleView = (accommodation: Accommodation) => {
    setSelectedAccommodation(accommodation);
    setIsViewModalOpen(true);
  };

  const toggleRow = (accommodationId: string) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(accommodationId)) {
        newSet.delete(accommodationId);
      } else {
        newSet.add(accommodationId);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="w-8 h-8 border-b-2 rounded-full animate-spin border-primary"></div>
      </div>
    );
  }

  if (accommodations.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        No accommodations found
      </div>
    );
  }

  return (
    <>
      <div className="border rounded-md">
        <Table>
          <TableHeader className="bg-gradient-to-l from-[#ABDBC0] to-[#E3EFFE] shadow-sm">
            <TableRow className="transition-colors hover:bg-black/5 border-b-black/10">
              <TableHead className="w-[35px]"></TableHead>
              <TableHead className="w-[250px]">Company</TableHead>
              <TableHead className="w-[120px]">Country</TableHead>
              <TableHead className="min-w-[200px]">Locations</TableHead>
              <TableHead className="w-[90px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accommodations.map((accommodation) => {
              const isExpanded = expandedRows.has(accommodation._id);
              const hasItems = accommodation.items && accommodation.items.length > 0;

              return (
                <>
                  <TableRow key={accommodation._id}>
                    {/* Expand/Collapse Arrow */}
                    <TableCell>
                      {hasItems ? (
                        <button
                          onClick={() => toggleRow(accommodation._id)}
                          className="rounded p-1.5 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                          title={isExpanded ? "Collapse items" : "Expand items"}
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

                    {/* Company */}
                    <TableCell className="text-gray-700 ">
                      {accommodation.company}
                    </TableCell>

                    {/* Country */}
                    <TableCell>
                      <span className="text-sm text-gray-700">
                        {accommodation.country}
                      </span>
                    </TableCell>

                    {/* Locations */}
                    <TableCell>
                      {accommodation.locations && accommodation.locations.length > 0 ? (
                        <span className="text-sm text-gray-700">
                          {accommodation.locations.join(", ")}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">—</span>
                      )}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <button
                        onClick={() => handleView(accommodation)}
                        className="p-2 text-blue-500 transition-colors rounded-md hover:bg-gray-100"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </TableCell>
                  </TableRow>

                  {/* Expanded Items Details Row */}
                  {isExpanded && hasItems && (
                    <TableRow key={`${accommodation._id}-items`}>
                      <TableCell></TableCell>
                      <TableCell colSpan={4} className="p-0 bg-gray-50">
                        <div className="px-4 py-3">
                          <div className="max-w-4xl overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm">
                            <div className="px-3 py-2 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                              <h4 className="text-sm font-semibold text-gray-800">
                                 {accommodation.company}
                              </h4>
                            </div>
                            <div className="overflow-x-auto">
                              <table className="w-full">
                                <thead>
                                  <tr className="border-b border-gray-200 bg-gray-100/70">
                                    <th className="text-left px-3 py-1.5 text-xs font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200">
                                      Name
                                    </th>
                                    <th className="text-right px-3 py-1.5 text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[180px] max-w-[300px]">
                                      Commission
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                  {accommodation.items.map((item, index: number) => (
                                    <tr
                                      key={item._id || index}
                                      className="transition-colors hover:bg-blue-50/30"
                                    >
                                      <td className="px-3 py-1.5 text-sm text-gray-700 border-r border-gray-200">
                                        {item.name}
                                      </td>
                                      <td className="px-3 py-1.5 text-right align-top min-w-[180px] max-w-[300px]">
                                        <span className="inline-block text-sm text-right text-gray-700 break-words whitespace-normal">
                                          {typeof item.commission === 'number' ? `$${item.commission.toFixed(2)}` : item.commission}
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

      <AccommodationViewModal
        accommodation={selectedAccommodation}
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
      />
    </>
  );
};

export default AccommodationTable;
