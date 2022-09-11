import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";

interface SelectProps {
  options: Object[];
  label?: string;
  name?: string;
  price?: string;
  onChange?: (option: Object) => void;
  defaultValue?: { value: string; label: string };
  containerClassname?: string;
}

export const useSelectStyles = () => {
  const selectStyles = useMemo(
    () => ({
      container: (styles: any) => ({
        ...styles,
        border: "none",
      }),
      control: (styles: any, { isFocused }: any) => ({
        ...styles,
        backgroundColor: "#18191a",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        height: "44px",
        padding: "0 14px",
        justifyContent: "center",
        boxShadow: "none",
      }),
      valueContainer: (styles: any) => ({
        ...styles,
        height: "44px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        flexWrap: "no-wrap",
      }),
      indicatorSeparator: (styles: any) => ({ ...styles, display: "none" }),
      menu: (styles: any) => ({
        ...styles,
        boxShadow:
          "0px 4px 6px -2px hsla(220, 43%, 11%, 0.05), box-shadow: 0px 12px 16px -4px hsla(220, 43%, 11%, 0.1)",
        marginTop: "8px",
        padding: "0",
        borderRadius: "8px",
        backgroundColor: "#060213",
      }),
      menuList: (styles: any) => ({
        ...styles,
        "::-webkit-scrollbar": {
          width: "8px",
          height: "0px",
        },
        "::-webkit-scrollbar-track": {
          background: "#060213",
        },
        "::-webkit-scrollbar-thumb": {
          background: "#4A00E0",
        },
        "::-webkit-scrollbar-thumb:hover": {
          background: "#4A00E0",
        },
      }),
      option: (styles: any, { isFocused }: any) => ({
        ...styles,
        backgroundColor: isFocused ? "#14073B" : "#060213",
        color: "#fff",
        padding: "8px",
      }),
      singleValue: (styles: any) => ({
        ...styles,
        color: "#8E2DE2",
        padding: "12px 0",
      }),
    }),
    []
  );
  return selectStyles;
};

const CustomOption = ({
  innerProps,
  isDisabled,
  isFocused,
  isSelected,
  children,
  data: { url, label, price },
  ...rest
}: any) => {
  return !isDisabled ? (
    <div
      {...innerProps}
      // style={{
      //   display: "flex",
      //   gap: "12px",
      //   alignItems: "center",
      //   padding: "6px 6px 6px 12px",
      //   backgroundColor: isFocused ? "#14073B" : "#060213",
      //   color: "#fff",
      //   cursor: isDisabled ? "not-allowed" : "pointer",

      //   ":active": {
      //     backgroundColor: isSelected ? "#14073B" : undefined,
      //   },
      // }}
      className={`flex items-center gap-3 p-6 cursor-pointer color-white ${
        ":active" && "bg-gray-dark"
      } ${isFocused && "bg-gray"}`}
    >
      {url && <img width={24} height={24} src={url} alt={label} />}
      <div className="flex flex-col">
        <p>{label}</p>
        <p>${price.toFixed(2)}</p>
      </div>
    </div>
  ) : null;
};

const CustomValue = ({
  innerProps,
  isFocused,
  isSelected,
  children,
  data: { url, label, price },
  ...rest
}: any) => {
  return (
    <div {...innerProps} className="flex flex-row items-center gap-3 ">
      {url && <img width={24} height={24} src={url} alt={label} />}
      <div>
        {label}
        <p className="text-sm text-gray-light">${price.toFixed(2)} </p>
      </div>
    </div>
  );
};

const Selector = ({
  label,
  name,
  price,
  options = [],
  defaultValue,
  onChange,
  containerClassname = "",
}: SelectProps) => {
  const [selectedOption, setSelectedOption] = useState<any>(
    defaultValue ?? options[0]
  );
  useEffect(() => {
    setSelectedOption(defaultValue);
  }, [defaultValue]);

  const handleChange = (selectedOption: any) => {
    if (onChange) onChange(selectedOption);
    setSelectedOption(selectedOption);
  };

  const selectStyles = useSelectStyles();

  const uniqueOptions = useMemo(
    () => options, //.filter((option: any, index: number) => options.findIndex((o: any) => o.value === option.value) === index),
    [options]
  );

  return (
    <div className={`input-container ${containerClassname}`}>
      {label && (
        <label className="input-label block mb-1.5">
          <span>{label}</span>
        </label>
      )}
      <Select
        name={name}
        options={uniqueOptions}
        onChange={handleChange}
        components={{
          Option: CustomOption,
          SingleValue: CustomValue,
        }}
        styles={selectStyles}
        value={selectedOption}
        isSearchable={false}
      />
    </div>
  );
};

export default Selector;
