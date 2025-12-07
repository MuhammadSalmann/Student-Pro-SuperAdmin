import { Edit2, Trash2, Eye } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/Table";
import type { VisaService } from "../types/visaService.types";

interface VisaServiceTableProps {
    visaServices: VisaService[];
    onEdit: (visaService: VisaService) => void;
    onDelete: (id: string) => void;
    onView: (visaService: VisaService) => void;
}

export default function VisaServiceTable({
    visaServices,
    onEdit,
    onDelete,
    onView,
}: VisaServiceTableProps) {
    return (
        <div className="overflow-x-auto border rounded-md">
            <Table>
                <TableHeader className="bg-gradient-to-l from-[#ABDBC0] to-[#E3EFFE] shadow-sm">
                    <TableRow className="transition-colors hover:bg-black/5 border-b-black/10">
                        <TableHead className="px-4 py-3">Service Type</TableHead>
                        <TableHead className="px-4 py-3">Country</TableHead>
                        <TableHead className="px-4 py-3">Service Fee</TableHead>
                        <TableHead className="px-4 py-3">Referral Fee</TableHead>
                        <TableHead className="px-4 py-3 w-[120px]">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {visaServices.map((service) => (
                        <TableRow key={service._id} className="hover:bg-gray-50">
                            {/* Service Type */}
                            <TableCell className="px-4 py-3">
                                <span className="text-sm text-gray-700">
                                    {service.serviceType}
                                </span>
                            </TableCell>

                            {/* Country */}
                            <TableCell className="px-4 py-3">
                                <span className="text-sm text-gray-700">
                                    {service.country}
                                </span>
                            </TableCell>

                            {/* Service Fee */}
                            <TableCell className="px-4 py-3">
                                <span className="text-sm text-gray-700">
                                    {service.serviceFee}
                                </span>
                            </TableCell>

                            {/* Referral Fee */}
                            <TableCell className="px-4 py-3">
                                <span className="text-sm text-gray-700">
                                    {service.referralFee}
                                </span>
                            </TableCell>

                            {/* Actions */}
                            <TableCell className="px-4 py-3">
                                <div className="flex items-center gap-1.5">
                                    <button
                                        onClick={() => onView(service)}
                                        className="rounded p-1.5 text-blue-600 transition hover:bg-blue-50 hover:text-blue-900"
                                        title="View Details"
                                    >
                                        <Eye size={16} />
                                    </button>
                                    <button
                                        onClick={() => onEdit(service)}
                                        className="rounded p-1.5 text-green-600 transition hover:bg-green-50 hover:text-green-900"
                                        title="Edit"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => onDelete(service._id)}
                                        className="rounded p-1.5 text-red-600 transition hover:bg-red-50 hover:text-red-900"
                                        title="Delete"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
