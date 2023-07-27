import VirtualList from "rc-virtual-list";
import {
  Layout,
  List,
  Avatar,
  Divider,
  Typography,
  Spin,
  Badge,
  Card,
} from "antd";
import { UserOutlined } from "@ant-design/icons";

const ContactsBar = ({ contacts, setSelectedChatId, selectedChatId }: any) => {
  return (
    <Card className="h-full py-2 overflow-y-scroll">
      <List style={{ width: "100%" }}>
        {contacts.map((chatroom: any) => {
          const isSelected = chatroom.id === selectedChatId;
          return (
            <List.Item
              key={chatroom.id}
              className={"cursor-pointer hover:bg-pink-100"}
              onClick={() => {
                setSelectedChatId(chatroom.id);
              }}
              style={{
                backgroundColor: `${isSelected ? "rgb(251 207 232)" : ""}`,
              }}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    size={"large"}
                    className="ml-3"
                    icon={<UserOutlined />}
                  />
                }
                title={
                  chatroom.opponent_first_name && chatroom.opponent_second_name
                    ? `${chatroom.opponent_first_name} ${chatroom.opponent_second_name}`
                    : `Guest user ${chatroom.id}`
                }
                description={chatroom.last_message?.content}
              />
            </List.Item>
          );
        })}
      </List>
    </Card>
  );
};

export default ContactsBar;
