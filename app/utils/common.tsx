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