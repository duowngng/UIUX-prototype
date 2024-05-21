import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from "@/components/ui/collapsible";

import TemplatesKpis from "./TemplateCollapsible";
import data from "@/app/data.json";
import { CellAction } from "./cell-action";

export default function TemplatesTable() {
  const templates = data.templates// these are template objects, we'll get there later

  return (
    <div className="w-full">
      <h2 className="p-4">All templates</h2>
      <div className="rounded-md sm:border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-medium">Tên mẫu mục tiêu</TableHead>
              <TableHead className="font-medium">Mô tả</TableHead>
              <TableHead className="font-medium">Trọng số</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {templates ? (
              templates.map((template) => (
                <Collapsible asChild>
                  <>
                  <CollapsibleTrigger asChild>
                    <TableRow key={template.id} >
                      <TableCell>{template.name}</TableCell>
                      <TableCell>{template.description}</TableCell>
                      <TableCell>{template.weight}
                      </TableCell>
                      <TableCell>
                        {/* <CellAction data={row.original}/> */}
                      </TableCell>
                    </TableRow>
                    </CollapsibleTrigger>
                    <CollapsibleContent asChild>
                      <TemplatesKpis templateId={template.id} />
                    </CollapsibleContent>
                  </>
                </Collapsible>
              ))
            ) : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}