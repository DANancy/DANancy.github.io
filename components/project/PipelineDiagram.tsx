import { ArrowRight } from "lucide-react";
import { pipelineStages } from "@/content/projects/green-certificate";

export function PipelineDiagram() {
  return (
    <div className="glass p-6 overflow-x-auto">
      <div className="flex items-stretch gap-3 min-w-[900px]">
        {pipelineStages.map((stage, i) => (
          <div key={stage.title} className="flex items-center gap-3 flex-1">
            <div className="flex-1 rounded-card border border-[var(--glass-border)] bg-[var(--glass-fill)] p-4 min-w-[160px]">
              <div
                className="h-2 w-8 rounded-full mb-3"
                style={{ backgroundColor: stage.color }}
              />
              <div className="text-body-sm font-semibold text-text-primary">{stage.title}</div>

              {stage.medallion && (
                <div className="flex gap-2 mt-2 mb-1">
                  {stage.medallion.map((m) => (
                    <span key={m} className="text-caption text-text-muted normal-case tracking-normal">
                      {m.split(" — ")[0]}
                    </span>
                  ))}
                </div>
              )}

              <ul className="mt-2 flex flex-col gap-1">
                {(stage.medallion ?? stage.items).map((item) => (
                  <li key={item} className="text-body-sm text-text-secondary">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {i < pipelineStages.length - 1 && (
              <ArrowRight size={18} className="text-text-muted shrink-0" />
            )}
          </div>
        ))}
      </div>
      <div className="text-body-sm text-text-muted mt-5 pt-4 border-t border-[var(--glass-border)]">
        ↩ Metadata, lineage, monitoring &amp; security — spans every stage of the pipeline
      </div>
    </div>
  );
}
