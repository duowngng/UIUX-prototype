import { TableCell, TableHead, TableRow } from "@/components/ui/table";
import data from "@/app/data.json";

export default function TemplatesCollapsible({templateId}: {templateId: string}) {
  const template = data.templates.find(t => t.id === templateId);

  // Check if the template is found
  if (!template) {
    return <div>Template not found</div>;
  }

  // Extract the kpis array from the found template
  const { kpis } = template;

  return (
    <>
      <TableRow className="bg-neutral-100">
        <TableHead className="font-medium"></TableHead>
        <TableHead className="font-medium">Tiêu chí đánh giá</TableHead>
        <TableHead className="font-medium">Chỉ tiêu</TableHead>
        <TableHead className="font-medium">Đơn vị</TableHead>
        <TableHead className="font-medium w-[90px]">Trọng số <br />thành phần</TableHead>
        <TableHead className="font-medium w-[90px]">Tần suất <br />cập nhật</TableHead>
        <TableHead></TableHead>
      </TableRow>
      {kpis ? (
        kpis.map((kpi: any, index: number) => (
          <TableRow key={kpi.id} className="bg-neutral-100">
            <TableCell>{index + 1}</TableCell>
            <TableCell>{kpi.name}</TableCell>
            <TableCell>{kpi.target}</TableCell>
            <TableCell>{kpi.unit}</TableCell>
            <TableCell>{kpi.weight}</TableCell>
            <TableCell>{kpi.frequency}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        ))
      ) : null}
    </>
  );
}
