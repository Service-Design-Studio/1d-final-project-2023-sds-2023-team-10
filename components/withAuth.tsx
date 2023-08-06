import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { Toast } from "@chakra-ui/react";

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
            Toast({
              title: "Error",
              description: "Session expired. Please login.",
              status: "error",
              duration: 1000,
              isClosable: true,
            });
            Router.replace("/login");
            return;
          }

          setToken(storedToken);
        } catch (error) {
          // Token is invalid
          Toast({
            title: "Error",
            description: "Invalid token. Please login.",
            status: "error",
            duration: 1000,
            isClosable: true,
          });
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
