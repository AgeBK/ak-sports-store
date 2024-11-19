import Image from 'next/image';
import data from '@/app/lib/appData.json';
import { ImgProps } from '../lib/definitions';

export default function Img({
  imgSrc,
  imgAlt,
  imgWidth,
  imgHeight,
  imgPriority,
}: ImgProps) {
  // main image component used across site
  const { imgPath } = data;
  return (
    <Image
      src={`${imgPath}${imgSrc}`}
      alt={imgAlt}
      width={imgWidth}
      height={imgHeight}
      priority={imgPriority || false}
    />
  );
}
