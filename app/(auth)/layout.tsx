import React from "react";

export default function AuthPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="h-full w-full absolute top-0 left-0">{children}</main>;
}
