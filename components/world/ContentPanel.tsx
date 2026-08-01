"use client";
import { useEffect,useRef } from "react";
import { X } from "lucide-react";
import type { WorldLandmark } from "@/content/world";
export function ContentPanel({landmark,onClose}:{landmark:WorldLandmark;onClose:()=>void}) {
  const closeRef=useRef<HTMLButtonElement>(null);
  useEffect(()=>{closeRef.current?.focus();const onKey=(event:KeyboardEvent)=>event.key==="Escape"&&onClose();window.addEventListener("keydown",onKey);return()=>window.removeEventListener("keydown",onKey)},[onClose]);
  return <div className="world-panel-backdrop" role="presentation" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><article className="world-panel" role="dialog" aria-modal="true" aria-labelledby="landmark-title"><button ref={closeRef} onClick={onClose} className="world-icon-button" aria-label="Close panel"><X size={20}/></button><p className="world-eyebrow">{landmark.eyebrow}</p><h2 id="landmark-title">{landmark.title}</h2><p className="world-lead">{landmark.summary}</p>{landmark.details.map(detail=><p key={detail}>{detail}</p>)}{landmark.technologies&&<ul className="world-tags" aria-label="Related topics">{landmark.technologies.map(tag=><li key={tag}>{tag}</li>)}</ul>}</article></div>;
}
