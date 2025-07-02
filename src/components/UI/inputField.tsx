import { ReactNode } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type InputFieldProps = {
  id: string;
  label: string;
  icon?: ReactNode;
  placeholder?: string;
  type?: string;
  error?: string;
  auto_complete?: string;
  register: UseFormRegisterReturn;
};

export default function InputField({
  id,
  label,
  icon,
  placeholder,
  auto_complete,
  type = "text",
  error,
  register,
}: InputFieldProps) {
  return (
    <div className="mb-6 max-lg:mb-3 relative">
      <label
        htmlFor={id}
        className="block text-primary dark:text-third font-medium mb-2 max-lg:mb-1"
      >
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="text-gray-400 size-5 max-lg:size-3">{icon}</div>
          </div>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          autoComplete={auto_complete || "off"}
          spellCheck="false"
          className={`w-full px-4 py-3 max-lg:py-2 border border-sixth rounded-lg focus:outline-none focus:border-secondary ${
            icon ? "pl-10 max-lg:pl-7" : ""
          }`}
          {...register}
        />
      </div>
      {error && (
        <p className="text-error text-[13px] absolute italic max-lg:text-[10px]">
          {error}
        </p>
      )}
    </div>
  );
}
