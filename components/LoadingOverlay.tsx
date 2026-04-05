import { Loader2 } from "lucide-react";

const steps = [
  "Uploading files…",
  "Extracting text from PDF…",
  "Preparing for AI synthesis…",
];

interface LoadingOverlayProps {
  isOpen: boolean;
}

const LoadingOverlay = ({ isOpen }: LoadingOverlayProps) => {
  if (!isOpen) return null;

  return (
    <div className="loading-wrapper">
      <div className="loading-shadow-wrapper bg-white">
        <div className="loading-shadow">
          <Loader2 className="loading-animation w-12 h-12 text-[var(--color-brand)]" />
          <h3 className="loading-title">Processing Your Book</h3>
          <div className="loading-progress">
            {steps.map((step) => (
              <div key={step} className="loading-progress-item">
                <span className="loading-progress-status" />
                <span className="text-[var(--text-secondary)]">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
