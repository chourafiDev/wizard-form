"use client";

import StoreProvider from "@/Providers/StoreProvider";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SplashScreen from "./SplashScreen";

const AppLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isLoading, setIsLoading] = useState(isHome);

  useEffect(() => {
    if (isLoading) {
      return;
    }
  }, [isLoading]);

  const finishLoading = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && isHome ? (
        <SplashScreen finishLoading={finishLoading} />
      ) : (
        <StoreProvider>{children}</StoreProvider>
      )}
    </>
  );
};

export default AppLayout;
