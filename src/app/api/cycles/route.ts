import { format } from 'date-fns';
import fs from 'fs-extra'; // Import for file system access
import { NextResponse } from "next/server";

type Cycle = {
  id: string;
  name: string;
  dateRange: {
    from: string;
    to: string;
  };
  goals: any[];
  history: any[];
};

export async function POST(
  req: Request,
) {
  try {
    const timestamp = Date.now();
    const cyclesData = await fs.readJson('./src/app/data.json'); // Read existing data
    const newData = await req.json(); // Type assertion for request body
    const id = `${newData?.name.replace(/\s/g, '').normalize("NFD").replace(/[\u0300-\u036f]/g, '')}-${timestamp}`;
    cyclesData.cycles.push({ 
      ...newData,
      "id": id,
      "dateRange": {
        from: format(newData?.dateRange.from, "dd/MM/yyyy"),
        to: format(newData?.dateRange.to, "dd/MM/yyyy"), 
      },
    });
    await fs.writeFile('./src/app/data.json', JSON.stringify(cyclesData, null, 2)); // Write updated data
    return NextResponse.json({ id: id, message: 'Cycle created successfully!' }, { status: 201 });
} catch (error) {
  console.log('[CYCLES_POST]', error);
  return new NextResponse("Internal error", { status: 500 });
}
}
