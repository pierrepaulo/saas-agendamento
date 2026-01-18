import { ReactNode } from "react";

type ContainerProps = {
  overline: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function Container({
  overline,
  title,
  subtitle,
  children,
}: ContainerProps) {
  return (
    <div className="space-y-4 scroll-mt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            {overline}
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base text-muted-foreground ">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
}
