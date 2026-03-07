import { cn } from "@/lib/utils";
import React from "react";

export interface BentoItem {
    title: string;
    description: string;
    icon: React.ReactNode;
    status?: string;
    tags?: string[];
    meta?: string;
    cta?: string;
    colSpan?: number;
    hasPersistentHover?: boolean;
}

interface BentoGridProps {
    items: BentoItem[];
}

function BentoGrid({ items }: BentoGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
            {items.map((item, index) => (
                <div
                    key={index}
                    className={cn(
                        "group relative p-6 rounded-2xl transition-all duration-300",
                        "bg-white/[0.03] border border-white/[0.06]",
                        "hover:bg-white/[0.05] hover:border-white/[0.1]",
                        "hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]",
                        item.colSpan === 2 ? "md:col-span-2" : "col-span-1",
                        item.hasPersistentHover && "bg-white/[0.05] border-white/[0.1] shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
                    )}
                >
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/[0.06] group-hover:bg-white/[0.1] transition-colors duration-300">
                                {item.icon}
                            </div>
                            {item.meta && (
                                <span className="text-xs font-medium text-slate-500 tracking-wide">
                                    {item.meta}
                                </span>
                            )}
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-white mb-1.5 tracking-tight">
                                {item.title}
                            </h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                {item.description}
                            </p>
                        </div>

                        {item.tags && item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-1">
                                {item.tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="text-xs px-2.5 py-1 rounded-full bg-white/[0.06] text-slate-500"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export { BentoGrid };
