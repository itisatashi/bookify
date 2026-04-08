"use client";

import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import type { InputFieldProps, BookUploadFormValues } from "@/types";

const InputField = ({
  control,
  name,
  label,
  placeholder,
  disabled,
}: InputFieldProps<BookUploadFormValues>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <label htmlFor={field.name} className="form-label">
            {label}
          </label>
          <FormControl>
            <input
              id={field.name}
              type="text"
              className="form-input border border-[var(--border-subtle)] shadow-soft-sm"
              placeholder={placeholder}
              disabled={disabled}
              name={field.name}
              ref={field.ref}
              onBlur={field.onBlur}
              onChange={field.onChange}
              value={(field.value as string) ?? ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputField;
