import type { FC, ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  padding?: string;
  margin?: string;
}

const PageContainer: FC<PageContainerProps> = ({
  children,
  className = "",
  padding = "",
  margin = "",
}) => {
  return (
    <section
      className={`w-full max-w-[1600px] mx-auto ${className} ${padding} ${margin}`}
    >
      {children}
    </section>
  );
};

export default PageContainer;
