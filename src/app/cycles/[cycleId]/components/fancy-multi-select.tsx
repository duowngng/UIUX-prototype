"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { Controller } from "react-hook-form"; // Import Controller

interface FancyMultiSelectProps {
  options: { id: string; name: string }[];
  control: any;
  name: string;
}

export function FancyMultiSelect({ options, control, name }: FancyMultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  return (
    <>
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Command className="overflow-visible bg-transparent">
          <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
            <div className="flex gap-1 flex-wrap">
              {value.map((option: { id: string; name: string }) => {
                return (
                  <Badge key={option.id} variant="secondary">
                    {option.name}
                    <button
                      className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      onClick={() => onChange(value.filter((o: { id: string }) => o.id !== option.id))}
                    >
                      <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                    </button>
                  </Badge>
                );
              })}
              <CommandPrimitive.Input
                ref={inputRef}
                value={inputValue}
                onValueChange={setInputValue}
                onBlur={() => setOpen(false)}
                onFocus={() => setOpen(true)}
                placeholder="Select templates..."
                className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
              />
            </div>
          </div>
          <div className="relative mt-2">
            {open && options.filter(option => !value?.includes(option)).length > 0 ? (
              <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                <CommandGroup className="h-full overflow-auto">
                  {options.filter(option => !value?.includes(option)).map(option => {
                    return (
                      <CommandItem
                        key={option.id}
                        onSelect={() => {
                          setInputValue("");
                          onChange([...value || [], option]); // Update the value using onChange
                        }}
                        className="cursor-pointer"
                      >
                        {option.name}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </div>
            ) : null}
          </div>
        </Command>
      )}
    />
    </>
  );
}
