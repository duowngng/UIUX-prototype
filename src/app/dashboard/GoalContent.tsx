/** @format */
"use client";
import { MantineProvider } from '@mantine/core';
import {CycleProps} from "@/app/dashboard/OverViewContent";

  export default function GoalContent(props: CycleProps) {


    return (
      <MantineProvider> 
          <div> 
            <h1>History Content</h1>
          </div>
      </MantineProvider>
    );
  }
  