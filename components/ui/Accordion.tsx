"use client";
import * as Accordion from "@radix-ui/react-accordion";
import { RiArrowDownSLine } from "@remixicon/react";

interface AccordionItem {
  id: string;
  title: string;
  content: string[];
}

interface BgrAccordionProps {
  items: AccordionItem[];
}

export default function BgrAccordion({ items }: BgrAccordionProps) {
  return (
    <Accordion.Root type="multiple" className="w-full">
      {items.map(item => (
        <Accordion.Item
          key={item.id}
          value={item.id}
          className="mb-4 cursor-pointer overflow-hidden rounded-md border border-gray-300"
        >
          <Accordion.Header>
            <Accordion.Trigger className="group w-full bg-white px-4 py-4 text-left md:px-8 md:py-6">
              <div className="flex items-center justify-between">
                <p className="text-base font-medium md:text-lg">{item.title}</p>
                <RiArrowDownSLine className="duration-250 group-data-[state=open]:rotate-180" />
              </div>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="data-[state=open]:animate-slidedown data-[state=closed]:animate-slideup overflow-hidden bg-white">
            <div className="px-4 py-4 pt-3 md:px-8 md:py-7">
              {item.content.map((text, idx) => (
                <p key={idx} className="text-sm md:text-base">
                  {text}
                </p>
              ))}
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
