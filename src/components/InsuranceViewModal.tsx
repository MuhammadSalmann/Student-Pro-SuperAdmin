import { X, ShieldCheck } from "lucide-react";
import type { HealthInsurance } from "../types/insurance.types";

interface InsuranceViewModalProps {
  isOpen: boolean;
  insurance: HealthInsurance | null;
  onClose: () => void;
}

export default function InsuranceViewModal({
  isOpen,
  insurance,
  onClose,
}: InsuranceViewModalProps) {
  if (!isOpen || !insurance) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white shadow-2xl border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white">
          <div className="flex items-center gap-3">
            <ShieldCheck size={28} className="text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-800">
              {insurance.company}
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
        <div className="p-6 space-y-7">
          {/* Basic Information */}
          <div>
            <h3 className="mb-4 text-xs font-medium tracking-wider text-gray-500 uppercase">
              Basic Information
            </h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-5">
              <Field label="Company Name" value={insurance.company || "N/A"} />
              <Field 
                label="Country" 
                value={
                  <span className="px-2.5 py-1 text-xs font-normal bg-blue-50 text-blue-700 rounded-md border border-blue-100">
                    {insurance.country || "N/A"}
                  </span>
                }
              />
            </div>
          </div>

          {/* Insurance Items */}
          {insurance.items && insurance.items.length > 0 && (
            <div>
              <h3 className="mb-4 text-xs font-medium tracking-wider text-gray-500 uppercase">
                Insurance Items ({insurance.items.length})
              </h3>
              <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                {insurance.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col p-4 transition-colors border border-gray-200 rounded-lg bg-gradient-to-r from-gray-50 to-white hover:border-gray-300"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-sm font-medium text-gray-800">
                        {item.name}
                      </span>
                     
                    </div>
                    <div className="pt-2 border-t border-gray-100">
                      <p className="mb-1 text-xs font-medium text-gray-500">Commission</p>
                      <p className="text-sm text-gray-700 break-words">
                        {item.commission || 'N/A'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {(!insurance.items || insurance.items.length === 0) && (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
              <ShieldCheck size={48} className="mb-4 text-gray-400" />
              <p className="text-lg font-medium">No insurance items available</p>
              <p className="text-sm">This company has no insurance plans listed</p>
            </div>
          )}


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
      <p className="text-sm text-gray-800">{value}</p>
    </div>
  );
}
