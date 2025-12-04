import { X, FileText } from "lucide-react";
import type { VisaService } from "../types/visaService.types";

interface VisaServiceViewModalProps {
  isOpen: boolean;
  visaService: VisaService | null;
  onClose: () => void;
}

export default function VisaServiceViewModal({
  isOpen,
  visaService,
  onClose,
}: VisaServiceViewModalProps) {
  if (!isOpen || !visaService) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-2xl border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white">
          <div className="flex items-center gap-3">
            <FileText size={28} className="text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-800">
              {visaService.serviceType}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 transition-colors hover:text-gray-600 focus:outline-none focus:ring-0"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Service Information */}
          <div>
            <h3 className="mb-4 text-xs font-medium tracking-wider text-gray-500 uppercase">
              Visa Service Information
            </h3>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Field label="Service Type" value={visaService.serviceType || "N/A"} />
              <Field 
                label="Country" 
                value={
                  <span className="px-2.5 py-1 text-xs font-normal bg-blue-50 text-blue-700 rounded-md border border-blue-100">
                    {visaService.country || "N/A"}
                  </span>
                }
              />
            </div>
          </div>

          {/* Fee Information */}
          <div>
            <h3 className="mb-4 text-xs font-medium tracking-wider text-gray-500 uppercase">
              Fee Details
            </h3>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Field 
                label="Service Fee" 
                value={
                  <span className="px-3 py-1.5 text-sm font-medium bg-green-50 text-green-700 rounded-md border border-green-200">
                    {visaService.serviceFee || "N/A"}
                  </span>
                }
              />
              <Field 
                label="Referral Fee" 
                value={
                  <span className="px-3 py-1.5 text-sm font-medium bg-purple-50 text-purple-700 rounded-md border border-purple-200">
                    {visaService.referralFee || "N/A"}
                  </span>
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
