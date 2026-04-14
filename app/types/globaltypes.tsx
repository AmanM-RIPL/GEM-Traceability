import {  type ChangeEvent, type FormEvent } from "react";
export interface FormData{
  email:string;
}
export interface KycDashboardProps {
    heading?: string;
    description?: string;
    containerVariants?: any;
    itemVariants?: any;
    value: string;
    error?: string;
    isValid?: boolean;
    img?:string;
    show?:boolean
    isLoading?: boolean;    
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onScan: () => void;
    LazyLoadImage?:React.ElementType
    LazyComponent?:React.ElementType
    onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}
export type PictureProps={
  image?:string 
}
export type CardProps = {
    Icon: React.ReactElement;
    title: string;
    id: string | number;
    value: number;
    iconPage?: string; // Optional page to navigate to when icon is clicked
};
export  interface TabsProps {
  heading?: string;
  description?: string;
}

export type detailsProps={
 heading:string,
 description:string,
}
export interface columns{
  key:string;
  label:string;
}