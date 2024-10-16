import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  className?: string;
}

export const Header = ({ className }: Props) => {
  return <div className={className}>Header</div>;
};
