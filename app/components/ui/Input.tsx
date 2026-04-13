import { ElementType } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: ElementType;
  className?: string;
}

const Input = ({ icon: Icon, className = "",value="", ...props }: InputProps) => {
  return (
    <div className="relative mb-6">
      {Icon && (
        <div className="absolute  inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Icon className="size-5 text-green-500" />
        </div>
      )}
      <input
        {...props}
        className={`w-full pl-10 pr-3 py-2 outline-none  bg-opacity-50 rounded-lg border border-gray-700 
        focus:border-green-500 focus:ring-2 focus:ring-green-500  placeholder-gray-400 
        transition duration-200 ${className}`}
      />
      
    </div>
  );
};

export default Input;