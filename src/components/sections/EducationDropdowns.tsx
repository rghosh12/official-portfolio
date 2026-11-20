"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type DropdownSection = {
  key: string;
  label: string;
  items: readonly string[];
};

function EducationDropdown({ section }: { section: DropdownSection }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="box-btn box-btn--block justify-between text-left"
        aria-expanded={isOpen}
      >
        <span>{section.label}</span>
        <ChevronDown
          className={`w-4 h-4 text-[var(--muted)] transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[720px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-2 pb-3">
          {section.items.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {section.items.map((item) => (
                <li
                  key={item}
                  className="text-sm text-[var(--muted)] leading-relaxed pl-4 relative"
                >
                  <span
                    className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[var(--accent)]/60"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-[var(--muted)] italic">More details coming soon.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function EducationDropdowns({
  courses,
  extracurriculars,
}: {
  courses: readonly string[];
  extracurriculars: readonly string[];
}) {
  const sections: DropdownSection[] = [
    { key: "courses", label: "Courses", items: courses },
    { key: "extracurriculars", label: "Extracurriculars", items: extracurriculars },
  ];

  return (
    <div className="mt-5 pt-5 border-t border-[var(--border)] flex flex-col gap-3">
      {sections.map((section) => (
        <EducationDropdown key={section.key} section={section} />
      ))}
    </div>
  );
}
