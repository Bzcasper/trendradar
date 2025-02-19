
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  tag: string;
}

export const FeatureCard = ({ icon: Icon, title, description, tag }: FeatureCardProps) => {
  return (
    <div className="feature-card">
      <div className="icon-wrapper">
        <Icon className="feature-icon" />
      </div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
      <div className="feature-tag">{tag}</div>
    </div>
  );
};
