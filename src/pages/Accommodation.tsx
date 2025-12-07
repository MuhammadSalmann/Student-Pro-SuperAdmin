import { useState } from "react";
import { useAccommodation } from "../hooks/useAccommodation";
import AccommodationTable from "../components/AccommodationTable";


import { PAGE_SIZE_OPTIONS } from "../utils/helpers";

const Accommodation = () => {
  const {
    accommodations,
    loading,
  } = useAccommodation();

  const [pageSize, setPageSize] = useState(15);
 



  return (
   <div className="p-4 space-y-4">
          {/* Header */}
        <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Accommodation</h1>
                  <p className="mt-1 text-gray-600">Manage accommodation companies and locations</p>
                </div>
                <select
                  className="h-9 w-[120px] rounded-lg border px-3 py-1.5 text-sm"
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                >
                  {PAGE_SIZE_OPTIONS.map((size: number) => (
                    <option key={size} value={size}>
                      {size} rows
                    </option>
                  ))}
                </select>
              </div>
        
              
                    
        
        
              {/* Results Summary */}
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>
                  Showing {Math.min(accommodations.length, pageSize)} of {accommodations.length} {accommodations.length === 1 ? 'accommodation' : 'accommodations'}
                </span>
              </div>

          {/* Table */}
          <AccommodationTable
            accommodations={accommodations}
            loading={loading}
          />
       </div>
  );
};

export default Accommodation;
