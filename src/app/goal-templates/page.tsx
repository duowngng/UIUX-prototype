import { TemplateClient } from "./components/client";
import { TemplateColumn } from "./components/columns";
import data from "@/app/data.json";


const TemplatesPage = () => {
  const templates: any[] = data.templates

  const formattedTemplates: TemplateColumn[] = templates.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    weight: item.weight,
    kpis: item.kpis
  }))

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <TemplateClient data={formattedTemplates}/>
      </div>
    </div> 
  );
}

export default TemplatesPage;