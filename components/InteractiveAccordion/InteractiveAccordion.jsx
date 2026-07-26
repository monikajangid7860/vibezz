"use client";

import { useState } from "react";
import panelData from "./panelData";
import { DesktopPanel, MobilePanel } from "./AccordionPanel";

export default function InteractiveAccordion() {
  const [activeId, setActiveId] = useState(panelData[0].id);

  return (
    <section className="w-full">
      {/* Desktop */}
      <div className="hidden h-[650px] w-full gap-2 md:flex">
        {panelData.map((panel) => (
          <DesktopPanel
            key={panel.id}
            panel={panel}
            isActive={activeId === panel.id}
            onActivate={() => setActiveId(panel.id)}
          />
        ))}
      </div>

      {/* Mobile */}
      <div className="space-y-3 md:hidden">
        {panelData.map((panel) => (
          <MobilePanel
            key={panel.id}
            panel={panel}
            isActive={activeId === panel.id}
            onActivate={() =>
              setActiveId((prev) =>
                prev === panel.id ? null : panel.id
              )
            }
          />
        ))}
      </div>
    </section>
  );
}