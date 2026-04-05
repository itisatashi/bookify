"use client";

import {
  voiceOptions,
  voiceCategories,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { VoiceSelectorProps } from "@/types";

const VoiceSelector = ({
  disabled,
  className,
  value,
  onChange,
}: VoiceSelectorProps) => {
  const categories = [
    { label: "Male Voices", keys: voiceCategories.male },
    { label: "Female Voices", keys: voiceCategories.female },
  ];

  return (
    <div className={cn("space-y-4", className)}>
      <label className="form-label">Choose Assistant Voice</label>

      {categories.map((category) => (
        <div key={category.label}>
          <p className="text-sm font-medium text-[var(--text-secondary)] mb-2">
            {category.label}
          </p>
          <div className="voice-selector-options flex-wrap">
            {category.keys.map((key) => {
              const voice = voiceOptions[key as keyof typeof voiceOptions];
              const isSelected = value === key;

              return (
                <button
                  key={key}
                  type="button"
                  disabled={disabled}
                  className={cn(
                    "voice-selector-option",
                    isSelected
                      ? "voice-selector-option-selected"
                      : "voice-selector-option-default",
                    disabled && "voice-selector-option-disabled"
                  )}
                  onClick={() => onChange(key)}
                >
                  <div className="flex flex-col items-start text-left">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center",
                          isSelected
                            ? "border-[var(--color-brand)]"
                            : "border-[var(--border-medium)]"
                        )}
                      >
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)]" />
                        )}
                      </span>
                      <span className="font-semibold text-base text-[var(--text-primary)]">
                        {voice.name}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] mt-1 ml-5.5">
                      {voice.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VoiceSelector;
