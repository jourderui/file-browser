import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  className?: string;
}

export const Content = ({ className, children }: Props) => {
  return <div className={className}>{children}</div>;
};
