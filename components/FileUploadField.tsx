"use client";

import { useRef } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import type { FileUploadFieldProps, BookUploadFormValues } from "@/types";

const FileUploadField = ({
  control,
  name,
  label,
  acceptTypes,
  disabled,
  icon: Icon,
  placeholder,
  hint,
}: FileUploadFieldProps<BookUploadFormValues>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { setValue } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const file = field.value as File | undefined;

        return (
          <FormItem>
            <label className="form-label">{label}</label>
            <FormControl>
              <div className="file-upload-shadow">
                <input
                  ref={inputRef}
                  type="file"
                  accept={acceptTypes.join(",")}
                  disabled={disabled}
                  className="hidden"
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0];
                    if (selectedFile) {
                      field.onChange(selectedFile);
                    }
                  }}
                />

                {file ? (
                  /* Uploaded state */
                  <div
                    className={cn(
                      "upload-dropzone upload-dropzone-uploaded",
                      "border-2 border-dashed border-[#8B7355] w-full"
                    )}
                    onClick={() => inputRef.current?.click()}
                  >
                    <Icon className="upload-dropzone-icon" />
                    <p className="upload-dropzone-text">{file.name}</p>
                    <p className="upload-dropzone-hint">
                      {(file.size / (1024 * 1024)).toFixed(1)} MB
                    </p>
                    <button
                      type="button"
                      className="upload-dropzone-remove mt-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        setValue(name, undefined as never, {
                          shouldValidate: true,
                        });
                        if (inputRef.current) inputRef.current.value = "";
                      }}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  /* Empty state */
                  <div
                    className={cn(
                      "upload-dropzone",
                      "border-2 border-dashed border-[var(--border-medium)] w-full"
                    )}
                    onClick={() => inputRef.current?.click()}
                  >
                    <Icon className="upload-dropzone-icon" />
                    <p className="upload-dropzone-text">{placeholder}</p>
                    <p className="upload-dropzone-hint">{hint}</p>
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default FileUploadField;
