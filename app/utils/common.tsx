// utils/dynamicImport.tsx
import dynamic, { DynamicOptions, Loader } from "next/dynamic";
import { ComponentType } from "react";

type LoaderComponent<P = object> = Loader<P>;

export function dynamicImport<P = object>(
  loader: LoaderComponent<P>,
  options?: DynamicOptions<P>,
  title?:string
): ComponentType<P> {
  return dynamic(loader, {
    loading: () => <p>{title|| "loading..."}</p>,
    ssr: false,
    ...options,
  });
}
export const LazyLoadImage = dynamicImport(() => import("../components/layout/Picture"), { ssr: false }, "Loading Image...");
export const CameraModal = dynamicImport(() => import("../components/layout/Picture"));
