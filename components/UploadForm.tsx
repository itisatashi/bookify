"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, ImageIcon } from "lucide-react";

import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import FileUploadField from "@/components/FileUploadField";
import InputField from "@/components/InputField";
import VoiceSelector from "@/components/VoiceSelector";
import LoadingOverlay from "@/components/LoadingOverlay";

import { UploadSchema } from "@/lib/zod";
import { DEFAULT_VOICE, ACCEPTED_PDF_TYPES, ACCEPTED_IMAGE_TYPES } from "@/lib/constants";
import type { BookUploadFormValues } from "@/types";

const UploadForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BookUploadFormValues>({
    resolver: zodResolver(UploadSchema),
    defaultValues: {
      title: "",
      author: "",
      voice: DEFAULT_VOICE,
    },
  });

  const onSubmit = async (values: BookUploadFormValues) => {
    setIsSubmitting(true);

    try {
      // TODO: Replace with real server action
      console.log("Form submitted:", {
        pdf: values.pdf.name,
        cover: values.cover?.name,
        title: values.title,
        author: values.author,
        voice: values.voice,
      });

      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      alert("Book uploaded successfully! (placeholder)");
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <LoadingOverlay isOpen={isSubmitting} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* 1. PDF Upload */}
          <FileUploadField
            control={form.control}
            name="pdf"
            label="Book PDF File"
            acceptTypes={ACCEPTED_PDF_TYPES}
            disabled={isSubmitting}
            icon={Upload}
            placeholder="Click to upload PDF"
            hint="PDF file (max 50MB)"
          />

          {/* 2. Cover Image Upload */}
          <FileUploadField
            control={form.control}
            name="cover"
            label="Cover Image (Optional)"
            acceptTypes={ACCEPTED_IMAGE_TYPES}
            disabled={isSubmitting}
            icon={ImageIcon}
            placeholder="Click to upload cover image"
            hint="Leave empty to auto-generate from PDF"
          />

          {/* 3. Title */}
          <InputField
            control={form.control}
            name="title"
            label="Title"
            placeholder="ex: Rich Dad Poor Dad"
            disabled={isSubmitting}
          />

          {/* 4. Author */}
          <InputField
            control={form.control}
            name="author"
            label="Author Name"
            placeholder="ex: Robert Kiyosaki"
            disabled={isSubmitting}
          />

          {/* 5. Voice Selector */}
          <FormField
            control={form.control}
            name="voice"
            render={({ field }) => (
              <FormItem>
                <VoiceSelector
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isSubmitting}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="form-btn"
          >
            Begin Synthesis
          </button>
        </form>
      </Form>
    </>
  );
};

export default UploadForm;
