/** @format */
"use client";
import { MantineProvider } from '@mantine/core';
import Card, { CardContent, CardProps } from "@/components/Card";
import {CycleProps} from "@/app/dashboard/OverViewContent";

  export default function HistoryContent(props: CycleProps) {


    return (
      <MantineProvider> 
          <div> 
            <h1>History Content</h1>
          </div>
      </MantineProvider>
    );
  }
  