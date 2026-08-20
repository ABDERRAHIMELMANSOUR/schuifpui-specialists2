import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

/** Toont een score van 1 t/m 5 als sterren, met een tekstueel alternatief. */
const StarRating = ({
  rating,
  className,
  size = "w-5 h-5",
}: {
  rating: number;
  className?: string;
  size?: string;
}) => (
  <div className={cn("flex items-center gap-1", className)} role="img" aria-label={`${rating} van 5 sterren`}>
    {[1, 2, 3, 4, 5].map((value) => (
      <Star
        key={value}
        aria-hidden="true"
        className={cn(size, value <= rating ? "text-accent fill-accent" : "text-muted-foreground/30")}
      />
    ))}
  </div>
);

export default StarRating;
