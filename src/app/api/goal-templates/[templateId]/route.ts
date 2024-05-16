import fs from 'fs-extra'; // Import for file system access
import { NextResponse } from "next/server";

export async function PATCH (
  req: Request,
  { params }: { params: { cycleId: string } }
) {
  try {
    const updates = await req.json();
    const data = JSON.parse(await fs.readFile('./src/app/data.json', 'utf-8'));

    // Find the cycle with the specified id
    const cycleIndex = data.cycles.findIndex((cycle: any) => cycle.id === params.cycleId);

    if (cycleIndex === -1) {
      return NextResponse.json({ message: 'Cycle not found' }, { status: 404 });
    }

    // Update the cycle properties
    data.cycles[cycleIndex] = {
      ...data.cycles[cycleIndex],
      ...updates
    };

    // Write the updated data back to data.json
    await fs.writeFile('./src/app/data.json', JSON.stringify(data, null, 2));

    return NextResponse.json({ message: 'Cycle updated successfully!' }, { status: 200 });
  } catch (error) {
    console.log('[CYCLE_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE (
  _req: Request,
  { params }: { params: { cycleId: string } }
) {
  try {
    const data = JSON.parse(await fs.readFile('./src/app/data.json', 'utf-8'));
    // Delete the cycle property using bracket notation

    const filteredCycles = data.cycles.filter((cycle: any) => cycle.id !== params.cycleId);

    // Check if the cycle was actually deleted
    if (filteredCycles.length === data.cycles.length) {
      return NextResponse.json({ message: 'Cycle not found' }, { status: 404 });
    }

    // Update the data object with the filtered cycles
    data.cycles = filteredCycles;

    // Write the updated data back to data.json
    await fs.writeFile('./src/app/data.json', JSON.stringify(data, null, 2)); // Add indentation for readability

    return NextResponse.json({ message: 'Cycle deleted successfully!' }, { status: 200 });
  } catch (error) {
    console.log('[CYCLE_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}