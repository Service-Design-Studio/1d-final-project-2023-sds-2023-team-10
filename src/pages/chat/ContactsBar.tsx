import React, { useEffect, useState } from "react";
import { User } from "../../../types";
import axios from "axios";
import { Avatar, List, Spin } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import VirtualList from "rc-virtual-list";

const avatarUrl =
  "https://s3.eu-central-1.amazonaws.com/uploads.mangoweb.org/shared-prod/visegradfund.org/uploads/2021/03/depositphotos_121233300-stock-illustration-female-default-avatar-gray-profile.jpg";

const ContactsBar = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(false);

  const getUsers = async () => {
    setIsLoadingUsers(true);
    const createUserResponse = await axios.get("/api/chat", {
      headers: {
        accept: "application/json",
      },
    });

    const fetchedUsers = createUserResponse.data;
    setTimeout(() => {
      console.log("test");
      setUserData(fetchedUsers);
      setIsLoadingUsers(false);
    }, 200);
    setUserData(fetchedUsers);
  };

  useEffect(() => {
    getUsers();

    console.log("users", userData);

    return () => {
      setUserData([]);
    };
  }, []);

  if (isLoadingUsers) {
    return <Spin size="small" />;
  }

  const userList = () => {
    return (
      <List style={{ width: "100%" }}>
        <VirtualList data={userData} height={400} itemHeight={50} itemKey="id">
          {(user: User) => (
            <List.Item key={user.id}>
              <List.Item.Meta
                avatar={<Avatar src={avatarUrl} size={"large"} />}
                title={user.username ? user.username : "Guest user " + user.id}
                description={user.type}
              />
              <ExclamationCircleOutlined />
            </List.Item>
          )}
        </VirtualList>
      </List>
    );
  };

  return <div className="flex flex-row">{userList()}</div>;
};

export default ContactsBar;
