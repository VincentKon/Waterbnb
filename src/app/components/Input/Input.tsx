"use client";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  value?: string | number;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  required,
  register,
  errors,
  value,
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-700 absolute top-3 left-2"
        />
      )}
      <input
        type={type}
        id={id}
        disabled={disabled}
        {...register(id, { required: `${label} is required` })}
        placeholder={" "}
        value={value}
        className={`peer w-full p-2 pt-4 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed 
            ${formatPrice ? "pl-9" : "pl-4"}
            ${errors[id] ? "border-rose-500" : "border-neutral-300"}
            ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
            `}
      />
      <input
        id={id}
        placeholder=" " // important: a space so :placeholder-shown works
        className="peer"
      />

      <label
        htmlFor={id}
        className={`absolute text-base duration-150 transform -translate-y-3 top-4 z-10 origin-[0] 
  ${formatPrice ? "left-9" : "left-4"}
  ${errors[id] ? "text-rose-500" : "text-zinc-400"}
  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
  peer-focus:scale-75 peer-focus:-translate-y-4
  peer-[&:not(:placeholder-shown)]:scale-75 peer-[&:not(:placeholder-shown)]:-translate-y-4`}
      >
        {label}
      </label>

      {errors[id] && (
        <p className="text-rose-500 text-sm mt-1">
          {errors[id]?.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default Input;
