
import { TemplateForm } from "./components/template-form";

import data from "@/app/data.json";

const TemplatePage = async ({
  params
}: {
  params: { templateId: string}
}) => {
  let template;
  for (const key in data.templates) {
    if (data.templates[key].id === params.templateId) {
      template = data.templates[key];
      break;
    }
  }

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <TemplateForm initialData={template}/>
      </div>
    </div>
  );
}

export default TemplatePage;