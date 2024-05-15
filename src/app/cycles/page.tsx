import { format } from "date-fns";

import { BillboardClient } from "./components/client";
import { BillboardColumn } from "./components/columns";
import {cycles} from "@/app/data.json";


const BillboardsPage = () => {
  const billboards: any[] = cycles

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    name: item.name,
    startDate: format(item.startDate, "MMMM do, yyyy"),
    endDate: format(item.endDate, "MMMM do, yyyy")
  }))

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards}/>
      </div>
    </div> 
  );
}

export default BillboardsPage;