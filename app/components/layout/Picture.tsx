import { detailsProps, PictureProps } from "@/app/types/type";
import Image from "next/image";

const Picture = ({image,details}:PictureProps &{details?:detailsProps}) => {
  return (
 <div className="relative w-full max-w-xs sm:max-w-md ">
          {image && <Image
            src={image}
            alt="Pan Card image"            
            width={660}
            height={440}
            quality={25}
            priority
            className="h-auto w-full object-contain"
          />}
        {details && 
          <div className="relative w-full max-w-xs sm:max-w-md  text-left">
          <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl font-semibold leading-snug mb-4">
            {details && details.heading ? details?.heading :"NA"}
          </h3>

          <p className="text-white/70 text-sm sm:text-base lg:text-lg leading-relaxed">
             {details && details.description ? details?.description :"NA"}
          </p>
        </div>
        }
        </div>

  );
};

export default Picture;