import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { message } from "antd";

interface DecodedToken {
  exp: number;
}

const withAuth = (WrappedComponent: React.ElementType) => {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    const Router = useRouter();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
      // Next.js server side code will not run this useEffect hook
      const storedToken =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      if (storedToken) {
        try {
          const decodedToken: DecodedToken = jwtDecode(storedToken);
          if (decodedToken.exp * 1000 < Date.now()) {
            // Token has expired
            message.error("Session expired. Please login.");
            Router.replace("/login");
            return;
          }

          setToken(storedToken);
        } catch (error) {
          // Token is invalid
          message.error("Invalid token. Please login.");
          Router.replace("/login");
        }
      } else {
        Router.replace("/login");
      }
    }, []);

    // token can be undefined when running server side. The component will be rerendered with token != null on the client side
    return token && <WrappedComponent {...props} />;
  };
};

export default withAuth;
