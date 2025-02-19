
import { LoadingLogo } from "./loading-logo";

interface LoadingStateProps {
  text?: string;
}

export const LoadingState = ({ text = "Loading..." }: LoadingStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
      <LoadingLogo size="lg" />
      <p className="text-[#48D1CC] font-medium animate-pulse">{text}</p>
    </div>
  );
};
