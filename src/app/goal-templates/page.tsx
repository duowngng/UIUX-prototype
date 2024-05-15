import { BillboardClient } from "./components/client";
import { BillboardColumn } from "./components/columns";
import goal_templates from "@/app/data.json";


const BillboardsPage = () => {
  const billboards: any[] = goal_templates['goal-templates'];

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    weight: item.weight,
    kpis: item.kpis
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