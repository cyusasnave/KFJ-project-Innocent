import { ReactNode } from "react";

type FormWrapperProps = {
  title: string;
  children: ReactNode;
};

export function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <div className="w-full">
      <h2 className="w-full text-center text-2xl font-bold">{title}</h2>
      <div className="flex justify-center items-center flex-col w-full">
        {children}
      </div>
    </div>
  );
}
