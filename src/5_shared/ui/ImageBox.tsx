import React, { useEffect, useState } from "react";
import { Box } from "../../../styled-system/jsx";
import Image, { ImageProps } from "next/image";

interface ImageBoxProps {
  w: string;
  h: string;
  initialSrc: string;
  fallbackSrc: string;
  styles?: React.CSSProperties;
  alt?: string;
  priority?: ImageProps["priority"];
  objectFit?: React.CSSProperties["objectFit"];
  imageSizes?: string;
}

export function ImageBox({
  w,
  h,
  initialSrc,
  fallbackSrc,
  styles,
  alt,
  priority,
  objectFit = "cover",
  imageSizes,
}: ImageBoxProps) {
  const [imageSrc, setImageSrc] = useState<string>(initialSrc);

  useEffect(() => {
    setImageSrc(initialSrc);
  }, [initialSrc]);

  const handleOnError = () => {
    if (imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
  };

  const SIZES_PROP_FOR_IMAGE =
    imageSizes || (w && w.endsWith("px") ? w : undefined);

  return (
    <Box position={"relative"} w={w} h={h} style={styles} overflow={"hidden"}>
      <Image
        src={imageSrc}
        fill
        alt={alt || "image"}
        onError={handleOnError}
        priority={priority}
        sizes={SIZES_PROP_FOR_IMAGE}
        style={{ objectFit: objectFit }}
      />
    </Box>
  );
}
