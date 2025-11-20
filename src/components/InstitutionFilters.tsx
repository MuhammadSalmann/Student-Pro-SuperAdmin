import { useState } from "react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Search, Plus, Upload, Download, Filter, X } from "lucide-react";
import {
  INSTITUTION_SECTORS,
  FILTER_COUNTRIES,
  FILTER_TERRITORIES,
  FILTER_GROUPS,
  FILTER_PROMOTIONS,
  FILTER_YES_NO,
  PAGE_SIZE_OPTIONS,
} from "../utils/helpers";

interface InstitutionFiltersProps {
  searchName: string;
  filterCountry: string;
  filterTerritory: string;
  filterSector: string;
  filterGroup: string;
  filterPromoted: string;
  filter100Promotion: string;
  filterScholarship: string;
  pageSize: number;
  importing: boolean;
  exporting: boolean;
  hasActiveFilters: boolean;
  onSearchNameChange: (value: string) => void;
  onFilterCountryChange: (value: string) => void;
  onFilterTerritoryChange: (value: string) => void;
  onFilterSectorChange: (value: string) => void;
  onFilterGroupChange: (value: string) => void;
  onFilterPromotedChange: (value: string) => void;
  onFilter100PromotionChange: (value: string) => void;
  onFilterScholarshipChange: (value: string) => void;
  onPageSizeChange: (value: number) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  onImport: () => void;
  onExport: () => void;
  onAddInstitution: () => void;
}

export default function InstitutionFilters(props: InstitutionFiltersProps) {
  const {
    searchName,
    filterCountry,
    filterTerritory,
    filterSector,
    filterGroup,
    filterPromoted,
    filter100Promotion,
    filterScholarship,
    pageSize,
    importing,
    exporting,
    hasActiveFilters,
    onSearchNameChange,
    onFilterCountryChange,
    onFilterTerritoryChange,
    onFilterSectorChange,
    onFilterGroupChange,
    onFilterPromotedChange,
    onFilter100PromotionChange,
    onFilterScholarshipChange,
    onPageSizeChange,
    onApplyFilters,
    onClearFilters,
    onImport,
    onExport,
    onAddInstitution,
  } = props;

  // NEW: Toggle filter visibility
  const [showFilters, setShowFilters] = useState(false);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
           <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="flex items-center gap-1.5 h-8 text-xs px-3"
            >
              {showFilters ? <X size={14} /> : <Filter size={14} />}
              {showFilters ? "Close Filters" : "Filters"}
            </Button>

          <div className="flex gap-1.5">
            {/* NEW FILTER TOGGLE BUTTON */}
            {/* <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="flex items-center gap-1.5 h-8 text-xs px-3"
            >
              {showFilters ? <X size={14} /> : <Filter size={14} />}
              {showFilters ? "Close Filters" : "Filters"}
            </Button> */}

            <Button
              onClick={onImport}
              variant="outline"
              className="flex items-center gap-1.5 h-8 text-xs px-3"
              disabled={importing}
            >
              <Upload size={14} />
              {importing ? "Importing..." : "Import"}
            </Button>

            <Button
              onClick={onExport}
              className="flex items-center gap-1.5 h-8 text-xs px-3 bg-gray-500 hover:bg-gray-700 text-white"
              disabled={exporting}
            >
              <Download size={14} />
              {exporting ? "Exporting..." : "Export"}
            </Button>

            <Button
              onClick={onAddInstitution}
              className="flex items-center gap-1.5 h-8 text-xs px-3 bg-[#313647] hover:bg-[#10192c] text-white"
            >
              <Plus size={14} />
              Add Institution
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* SHOW FILTERS ONLY WHEN OPEN */}
      {showFilters && (
        <CardContent className="pt-3">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-4">

            <Input
              placeholder="Search by name..."
              value={searchName}
              onChange={(e) => onSearchNameChange(e.target.value)}
              className="h-9 text-sm"
            />

            <select
              className="w-full h-9 px-3 py-1.5 text-sm border rounded-lg"
              value={filterCountry}
              onChange={(e) => onFilterCountryChange(e.target.value)}
            >
              <option value="">All Countries</option>
              {FILTER_COUNTRIES.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>

            <select
              className="w-full h-9 px-3 py-1.5 text-sm border rounded-lg"
              value={filterTerritory}
              onChange={(e) => onFilterTerritoryChange(e.target.value)}
            >
              <option value="">All Territories</option>
              {FILTER_TERRITORIES.map((territory) => (
                <option key={territory} value={territory}>
                  {territory}
                </option>
              ))}
            </select>

            <select
              className="w-full h-9 px-3 py-1.5 text-sm border rounded-lg"
              value={filterSector}
              onChange={(e) => onFilterSectorChange(e.target.value)}
            >
              <option value="">All Sectors</option>
              {INSTITUTION_SECTORS.map((sector) => (
                <option key={sector} value={sector}>
                  {sector}
                </option>
              ))}
            </select>

            <select
              className="w-full h-9 px-3 py-1.5 text-sm border rounded-lg"
              value={filterGroup}
              onChange={(e) => onFilterGroupChange(e.target.value)}
            >
              <option value="">All Groups</option>
              {FILTER_GROUPS.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>

            <select
              className="w-full h-9 px-3 py-1.5 text-sm border rounded-lg"
              value={filterPromoted}
              onChange={(e) => onFilterPromotedChange(e.target.value)}
            >
              <option value="">Promoted: All</option>
              {FILTER_PROMOTIONS.map((promotion) => (
                <option key={promotion} value={promotion}>
                  {promotion}
                </option>
              ))}
            </select>

            <select
              className="w-full h-9 px-3 py-1.5 text-sm border rounded-lg"
              value={filter100Promotion}
              onChange={(e) => onFilter100PromotionChange(e.target.value)}
            >
              <option value="">100% Promotion: All</option>
              {FILTER_YES_NO.map((option) => (
                <option key={option} value={option.toLowerCase()}>
                  {option}
                </option>
              ))}
            </select>

            <select
              className="w-full h-9 px-3 py-1.5 text-sm border rounded-lg"
              value={filterScholarship}
              onChange={(e) => onFilterScholarshipChange(e.target.value)}
            >
              <option value="">Scholarship: All</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            <select
              className="w-full h-9 px-3 py-1.5 text-sm border rounded-lg"
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
            >
              {PAGE_SIZE_OPTIONS.map((size) => (
                <option key={size} value={size}>
                  {size} rows
                </option>
              ))}
            </select>

            {!hasActiveFilters ? (
              <Button
                onClick={onApplyFilters}
                className="h-8 text-xs bg-[#313647] hover:bg-[#10192c] text-white px-4"
              >
                Apply Filters
              </Button>
            ) : (
              <Button
                onClick={onClearFilters}
                className="h-8 text-xs bg-gray-400 hover:bg-gray-500 text-white px-4"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
