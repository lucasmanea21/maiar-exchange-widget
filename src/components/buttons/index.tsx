import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const ButtonContent = ({
  disabled,
  link,
  className,
  type,
  children,
  external,
  hideComingSoon,
  ...rest
}: any) => {
  if (external) {
    return (
      <a href={external} className={`btn ${className}`}>
        {children}
      </a>
    );
  }

  if (link) {
    return (
      <Link to={link} className={`btn ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <Fragment>
      <button
        className={`btn ${className}`}
        type={type}
        disabled={disabled}
        {...rest}
      >
        {children}
      </button>
      {disabled && !hideComingSoon && (
        <div className="absolute p-2 text-xs rounded -right-2 z-100 bg-purple md:-right-6 -top-5">
          Coming Soon
        </div>
      )}
    </Fragment>
  );
};

const Button = (props: any) => {
  const { hideAnimate, containerClassname = "", ...rest } = props;

  return (
    <div className={`relative w-full ${containerClassname}`}>
      {<ButtonContent {...rest} />}
    </div>
  );
};

export default Button;
