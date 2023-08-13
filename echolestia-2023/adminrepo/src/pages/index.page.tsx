import { useRouter } from "next/router";
import Image from "next/image";
import { Button } from "antd";
import MainLayout from "../../components/MainLayout";
import withAuth from "../../components/withAuth";

function AdminHome() {
  const router = useRouter();

  const redirectToChat = () => {
    router.push("/chat");
  };

  return (
    <MainLayout>
      <div
        className="flex flex-col items-center justify-center space-y-6"
        style={{ minHeight: "70vh" }}
      >
        <h1 className="text-4xl font-bold text-center">
          Guiding Hand Admin Portal
        </h1>
        <p className="text-xl text-gray-700">
          Manage and assist pregnancy journeys.
        </p>

        {/* For this example, I'm using a generic counselor image. Please replace this with a more appropriate image or use your own asset. */}
        <div className="w-1/2 h-1/2 relative">
          <Image
            src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw&ixlib=rb-1.2.1&q=80&w=400"
            layout="fill"
            alt="Counselor"
            objectFit="cover"
          />
        </div>

        <Button
          onClick={redirectToChat}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 rounded-full focus:outline-none"
        >
          Manage Chats
        </Button>
      </div>
    </MainLayout>
  );
}

export default withAuth(AdminHome);
