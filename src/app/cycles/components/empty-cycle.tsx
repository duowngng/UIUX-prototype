import { FileSearch } from "lucide-react";

export function EmptyCycles() {
  return (
    <div className="text-center mt-5">
      <FileSearch
        className="mx-auto h-12 w-12 text-foreground"
        strokeWidth={1}
      />
      <h3 className="mt-2 text-sm font-medium text-foreground">
        Không có chu kỳ
      </h3>
      {/* <div className="mt-6">
        <AddCycleModal>
          <Button
            className="w-full flex gap-x-3 items-center justify-center px-3"
            title="Add New Cycle"
          >
            <PlusIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span>Add Cycle</span>
          </Button>
        </AddCycleModal>
      </div> */}
    </div>
  );
}
