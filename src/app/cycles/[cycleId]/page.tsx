
import { CycleForm } from "./components/cycle-form";
import data from "@/app/data.json";

const CyclePage = async ({
  params
}: {
  params: { cycleId: string}
}) => {
  let cycle;
  for (const key in data.cycles) {
    if (data.cycles[key].id === params.cycleId) {
      cycle = data.cycles[key];
      break;
    }
  }

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CycleForm initialData={cycle}/>
      </div>
    </div>
  );
}

export default CyclePage;