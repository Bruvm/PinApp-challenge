import { useState } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


export default function ImageComponent({ imageUrl }: { imageUrl: string }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="mb-5">
      {imageError ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Skeleton className="w-[180px] h-[120px] rounded-xl" />
            </TooltipTrigger>
            <TooltipContent>
              <p>La imagen no se cargó correctamente.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

      ) : (
        <Image
          priority
          src={imageUrl}
          alt="Imagen descriptiva de producto"
          width={180}
          height={120}
          onError={() => setImageError(true)}
        />
      )}
    </div>
  );
}
