"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

import data from "@/app/data.json";

type Template = Record<"id" | "name", string>;

const TEMPLATES = data.templates satisfies Template[];

export function FancyMultiSelect({ 
  onChange,
  value, 
}: { 
  onChange: (value: Template[]) => void;
  value?: Template[];
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Template[]>(value || []);
  const [inputValue, setInputValue] = React.useState("");

  const handleSelect = React.useCallback((template: Template) => {
    const updatedSelected = [...selected, template];
    setSelected(updatedSelected);
    onChange(updatedSelected);
  }, [selected, onChange]);

  const handleUnselect = React.useCallback((template: Template) => {
    setSelected(prev => prev.filter(s => s.id !== template.id));
  }, []);

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current
    if (input) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (input.value === "") {
          setSelected(prev => {
            const newSelected = [...prev];
            newSelected.pop();
            return newSelected;
          })
        }
      }
      // This is not a default behaviour of the <input /> field
      if (e.key === "Escape") {
        input.blur();
      }
    }
  }, []);

  const selectables = TEMPLATES.filter(template => !selected.includes(template));

  return (
    <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
      <div
        className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
      >
        <div className="flex gap-1 flex-wrap">
          {selected.map((template) => {
            return (
              <Badge key={template.id} variant="secondary">
                {template.name}
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(template);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(template)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            )
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={selectables.length === 0 ? "Chọn mẫu mục tiêu" : ""}
            className="bg-transparent outline-none placeholder:text-muted-foreground flex-1"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 ?
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandList>
            <CommandGroup className="overflow-auto">
              {selectables.map((template) => {
                return (
                  <CommandItem
                    key={template.id}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => handleSelect(template)}
                    className={"cursor-pointer"}
                  >
                    {template.name}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            </CommandList>
          </div>
          : null}
      </div>
    </Command >
  )
}