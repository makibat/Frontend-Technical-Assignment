import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

interface TileImageProps {
  src: StaticImport;
}

export function TileImage({ src }: TileImageProps) {
  return (
    <Image
      tabIndex={-1}
      quality={100}
      fill
      alt="image"
      src={src}
      style={{
        maxWidth: "100%",
        display: "block",
        objectFit: "contain",
        pointerEvents: "none",
      }}
    />
  );
}
