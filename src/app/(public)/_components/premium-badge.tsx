import { Star } from "lucide-react";

export function PremiumCardBadge() {
  return (
    <div className="absolute top-2 right-2 bg-yellow-500 w-10 h-10 rounded-full flex items-center justify-center z-20">
      <Star className="text-white" />
    </div>
  );
}
