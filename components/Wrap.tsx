import React, { PropsWithChildren } from "react";

interface WrapProps {
  title: string;
  description: string;
}

export const Wrap = ({
  title,
  description,
  children,
}: PropsWithChildren<WrapProps>) => {
  return (
    <div className="mx-auto max-w-md space-y-6 py-6">
      <div className="space-y-2 px-3 text-center">
        <h1 className="text-3xl font-bold hidden">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
};
