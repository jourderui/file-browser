import { ReactElement, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  className?: string;
}

export const Content = ({ className, children }: Props): ReactElement => {
  return <div className={className}>{children}</div>;
};
