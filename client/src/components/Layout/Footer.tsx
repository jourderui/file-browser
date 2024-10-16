import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  className?: string;
}

export const Footer = ({ className }: Props) => {
  return <div className={className}>Footer</div>;
};
