import type { FC, ReactNode } from "react";

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  padding?: string;
  margin?: string;
}

const SectionContainer: FC<SectionContainerProps> = ({
  children,
  className = "",
  padding = "px-3 sm:px-5",
  margin = "mb-16 md:mb-18 lg:mb-24",
}) => {
  return (
    <div className={`container mx-auto ${className} ${padding} ${margin}`}>
      {children}
    </div>
  );
};

export default SectionContainer;
