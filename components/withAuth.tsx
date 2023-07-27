// lib/withAuth.tsx

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const withAuth = (WrappedComponent: React.ElementType) => {
  return (props: any) => {
    const Router = useRouter();
    const [token, setToken] = useState<any>(null);

    useEffect(() => {
      // Next.js server side code will not run this useEffect hook
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      setToken(token);

      if (token == null) {
        Router.replace("/login");
      }
    }, []);

    // token can be undefined when running server side. The component will be rerendered with token != null on the client side
    return token != null && <WrappedComponent {...props} />;
  };
};

export default withAuth;
