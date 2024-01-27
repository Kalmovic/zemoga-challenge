import React from "react";
import { Button as RadixButton } from "@radix-ui/themes";

type ButtonProps = {
  disabled?: boolean;
  onClick: () => void;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

export function Button(props: ButtonProps) {
  return (
    <RadixButton
      disabled={props.disabled}
      onClick={props.onClick}
      style={{
        backgroundColor: "var(--color-dark-background)",
        color: "var(--color-light-gray)",
        border: "1px solid var(--color-light-gray)",
        padding: "18px 20px",
        fontSize: "15px",
        lineHeight: "normal",
        ...props.style,
      }}
    >
      {props.children}
    </RadixButton>
  );
}
