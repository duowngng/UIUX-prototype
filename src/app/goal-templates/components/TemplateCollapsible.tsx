import { TableCell, TableRow } from "@/components/ui/table";
import data from "@/app/data.json";

export default function TemplatesKpis({templateId}: {templateId: string}) {
  const template = data.templates.find(t => t.id === templateId);

  // Check if the template is found
  if (!template) {
    return <div>Template not found</div>;
  }

  // Extract the kpis array from the found template
  const { kpis } = template;

  return (
    <>
      {kpis ? ( 
        kpis.map((kpi: any) => (
          <TableRow key={kpi.id}>
            <TableCell>{kpi.name}</TableCell>
            <TableCell>{kpi.weight}</TableCell>
            <TableCell>
            </TableCell>
          </TableRow>
        ))
      ) : null}
    </>
  );
}