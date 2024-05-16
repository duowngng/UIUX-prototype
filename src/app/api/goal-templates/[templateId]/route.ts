import fs from 'fs-extra'; // Import for file system access
import { NextResponse } from "next/server";

export async function PATCH (
  req: Request,
  { params }: { params: { templateId: string } }
) {
  try {
    const updates = await req.json();
    const data = JSON.parse(await fs.readFile('./src/app/data.json', 'utf-8'));

    // Find the template with the specified id
    const templateIndex = data.templates.findIndex((template: any) => template.id === params.templateId);

    if (templateIndex === -1) {
      return NextResponse.json({ message: 'Template not found' }, { status: 404 });
    }

    // Update the template properties
    data.templates[templateIndex] = {
      ...data.templates[templateIndex],
      ...updates
    };

    // Write the updated data back to data.json
    await fs.writeFile('./src/app/data.json', JSON.stringify(data, null, 2));

    return NextResponse.json({ message: 'Template updated successfully!' }, { status: 200 });
  } catch (error) {
    console.log('[TEMPLATE_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE (
  _req: Request,
  { params }: { params: { templateId: string } }
) {
  try {
    const data = JSON.parse(await fs.readFile('./src/app/data.json', 'utf-8'));
    // Delete the template property using bracket notation

    const filteredTemplates = data.templates.filter((template: any) => template.id !== params.templateId);

    // Check if the template was actually deleted
    if (filteredTemplates.length === data.templates.length) {
      return NextResponse.json({ message: 'Template not found' }, { status: 404 });
    }

    // Update the data object with the filtered templates
    data.templates = filteredTemplates;

    // Write the updated data back to data.json
    await fs.writeFile('./src/app/data.json', JSON.stringify(data, null, 2)); // Add indentation for readability

    return NextResponse.json({ message: 'Template deleted successfully!' }, { status: 200 });
  } catch (error) {
    console.log('[TEMPLATE_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}