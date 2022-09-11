import React, { forwardRef, useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  containerClassName?: string;
  LabelButton?: React.ReactNode;
}

const Input = forwardRef<any, InputProps>(
  ({ label, name, LabelButton, containerClassName, ...rest }, ref) => {
    return (
      <label className={`input-container ${containerClassName}`} htmlFor={name}>
        <div className="flex items-center justify-between w-full">
          <span className="font-bold">{label}</span>
          {LabelButton}
        </div>
        <div className="input-wrapper">
          <input ref={ref} type="text" {...rest} />
        </div>
      </label>
    );
  }
);

export default Input;
