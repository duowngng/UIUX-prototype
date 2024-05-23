import { useEffect, useState } from "react";
import CycleCard from "./cycle-card";
import { EmptyCycles } from "./empty-cycle";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

export default function CycleList({ 
  data 
}: any) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCycles, setFilteredCycles] = useState(data);

  useEffect(() => {
    setFilteredCycles(
      data.filter((cycle: any) =>
        cycle.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, data]);

  const handleSearch = (e: any) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <div className="relative flex items-center py-4 max-w-sm">
        <Input
          placeholder="Tìm kiếm"
          value={searchQuery}
          onChange={handleSearch}
          className="max-w-sm"
        />
        {searchQuery && (
          <X
            onClick={() => handleSearch({ target: { value: '' } })}
            size={16}
            className="absolute right-2 cursor-pointer ml-2"
          />
        )}
      </div>
      <div className="space-y-4">
        <ul role="list" className="space-y-4">
          {filteredCycles
            ? filteredCycles.map((cycle: any) => (
                <CycleCard key={cycle.id} cycle={cycle} />
              ))
            : Array.from({ length: 3 }).map((_, i) => (
                <li
                  key={i}
                  className="relative flex w-full items-center space-x-3 rounded-lg border px-4 py-5 sm:px-6 lg:px-6"
                >
                  <Skeleton key={i} className="h-9 w-9" />
                  <div>
                    <Skeleton key={i} className="h-4 w-32" />
                    <Skeleton key={i + 1} className="mt-2 h-3 w-12" />
                  </div>
                  <Skeleton
                    key={i + 1}
                    className="absolute right-5 top-[50%] h-5 w-20 -translate-y-[50%] transform"
                  />
                </li>
              ))}
        </ul>
        {filteredCycles && filteredCycles.length === 0 && (
          <div className="flex items-center justify-center">
            <EmptyCycles />
          </div>
        )}
      </div>
    </div>
  );
}
