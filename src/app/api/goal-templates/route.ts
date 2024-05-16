import fs from 'fs-extra'; // Import for file system access
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
) {
  try {
    const templatesData = await fs.readJson('./src/app/data.json'); // Read existing data
    const newData = await req.json(); // Type assertion for request body
    templatesData.templates.push({ 
      id: newData?.name.replace(/\s/g, '').normalize("NFD").replace(/[\u0300-\u036f]/g, ''),
      ...newData,
    }); // Add new data
    await fs.writeFile('./src/app/data.json', JSON.stringify(templatesData, null, 2)); // Write updated data
    return NextResponse.json({ message: 'Template created successfully!' }, { status: 201 });
} catch (error) {
  console.log('[TEMPLATES_POST]', error);
  return new NextResponse("Internal error", { status: 500 });
}
}
