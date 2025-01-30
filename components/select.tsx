"use client";

import { useMemo } from "react";
import { SingleValue } from "react-select";
import CreatableSelect from "react-select/creatable";

type SelectProps = {
  onChange: (value?: string) => void;
  onCreate?: (value: string) => void;
  options?: { value: string; label: string }[];
  value?: string | null;
  disabled?: boolean;
  placeholder?: string;
  loading?: boolean;
};

export function Select({
  onChange,
  loading = false,
  disabled = false,
  onCreate,
  options = [],
  placeholder,
  value,
}: SelectProps) {
  const onSelect = (option: SingleValue<{ label: string; value: string }>) => {
    onChange(option?.value);
  };

  const formattedValue = useMemo(() => {
    return options.find((op) => op.value === value);
  }, [value, options]);

  return (
    <CreatableSelect
      placeholder={placeholder}
      className="h-10 text-sm"
      styles={{
        control: (base) => ({
          ...base,
          borderColor: "#e2e8fa",
          ":hover": {
            borderColor: "#e2e8fa",
          },
        }),
      }}
      value={formattedValue}
      onChange={onSelect}
      options={options}
      onCreateOption={onCreate}
      isDisabled={disabled}
      isLoading={loading}
    />
  );
}
