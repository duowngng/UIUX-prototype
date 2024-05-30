"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type Unit = Record<"value" | "label", string>;

const UNITS = [
  {
    value: "phantram",
    label: "%",
  },
  {
    value: "baibao",
    label: "Bài báo",
  },
  {
    value: "diem",
    label: "Điểm",
  },
  {
    value: "gio",
    label: "Giờ",
  },
  {
    value: "lan",
    label: "Lần",
  },
  {
    value: "sinhvien",
    label: "Sinh viên",
  },
] satisfies Unit[];

export function FancyBox({
  onChange,
  value,
}: {
  onChange: (value: Unit) => void;
  value: Unit;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [units, setUnits] = React.useState<Unit[]>(UNITS);
  const [openCombobox, setOpenCombobox] = React.useState(false);
  const [inputValue, setInputValue] = React.useState<string>("");
  const [selectedValue, setSelectedValue] = React.useState<Unit | null>(value);

  const createUnit = (name: string) => {
    const newUnit = {
      value: name.toLowerCase(),
      label: name,
    };
    setUnits((prev) => [...prev, newUnit]);
    setSelectedValue(newUnit);
    onChange(newUnit);
  };

  const selectUnit = (unit: Unit) => {
    setSelectedValue(unit);
    onChange(unit);
    inputRef?.current?.focus();
  };

  const onComboboxOpenChange = (value: boolean) => {
    inputRef.current?.blur();
    setOpenCombobox(value);
  };

  const isInputValueInUnits = units.some(unit => 
    unit.label.includes(inputValue)
  );

  return (
    <div className="max-w-full">
      <Popover open={openCombobox} onOpenChange={onComboboxOpenChange}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openCombobox}
            className="w-full justify-between text-foreground"
          >
            <span
              className={cn("truncate font-normal", {
                "text-muted-foreground": !selectedValue,
              })}
            >
              {selectedValue ? selectedValue.label : "Chọn đơn vị"}
            </span>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command loop>
            <CommandInput
              ref={inputRef}
              placeholder="Tìm kiếm hoặc tạo đơn vị"
              value={inputValue}
              onValueChange={setInputValue}
            />
            <CommandList>
              <CommandGroup className="overflow-hidden">
                <ScrollArea className={isInputValueInUnits ? "h-[145px]" : ""}>
                  {units.map((unit) => {
                    const isActive = selectedValue?.value === unit.value;
                    return (
                      <CommandItem
                        key={unit.value}
                        value={unit.label} // Use label here for filtering
                        onSelect={() => selectUnit(unit)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            isActive ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <div className="flex-1">{unit.label}</div>
                      </CommandItem>
                    );
                  })}
                  <CommandItemCreate
                    onSelect={() => createUnit(inputValue)}
                    {...{ inputValue, units }}
                  />
                  <ScrollBar />
                </ScrollArea>
              </CommandGroup>
              <CommandSeparator alwaysRender />
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

const CommandItemCreate = ({
  inputValue,
  units,
  onSelect,
}: {
  inputValue: string;
  units: Unit[];
  onSelect: () => void;
}) => {
  const hasNoUnit = !units
    .map(({ label }) => label) // Change to label
    .includes(`${inputValue}`);

  const render = inputValue !== "" && hasNoUnit;

  if (!render) return null;

  return (
    <CommandItem
      key={`${inputValue}`}
      value={`${inputValue}`}
      className="text-xs text-muted-foreground"
      onSelect={onSelect}
    >
      <div className={cn("mr-2 h-4 w-4")} />
      Tạo đơn vị mới &quot;{inputValue}&quot;
    </CommandItem>
  );
};
