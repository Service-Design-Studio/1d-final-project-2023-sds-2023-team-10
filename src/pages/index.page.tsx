import Image from "next/image";
import MainLayout from "../../components/MainLayout";
import { ConfigProvider } from "antd";
import withAuth from "../../components/withAuth";

function Home() {
  return (
    <MainLayout>
      <div className="flex items-center min-h-screen justify-center">
        Hello world!
      </div>
    </MainLayout>
  );
}

export default withAuth(Home);
