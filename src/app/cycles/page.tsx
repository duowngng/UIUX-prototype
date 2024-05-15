import { format } from "date-fns";

import { CycleClient } from "./components/client";
import { CycleColumn } from "./components/columns";
import data from "@/app/data.json";


const CyclesPage = () => {
  const cycles: any[] = data.cycles;

  const formattedCycles: CycleColumn[] = cycles.map((item) => ({
    id: item.id,
    name: item.name,
    startDate: format(item.dateRange.from, "dd/MM/yyyy"),
    endDate: format(item.dateRange.to, "dd/MM/yyyy")
  }))

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CycleClient data={formattedCycles}/>
      </div>
    </div> 
  );
}

export default CyclesPage;