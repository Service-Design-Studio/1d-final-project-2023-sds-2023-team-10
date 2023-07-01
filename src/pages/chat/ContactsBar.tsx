import VirtualList from "rc-virtual-list";
import { Layout, List, Avatar, Divider, Typography, Spin, Badge } from "antd";
import { UserOutlined } from "@ant-design/icons";

const ContactsBar = ({ contacts, setSelectedChatId }: any) => {
  return (
    <List style={{ width: "100%" }}>
      <VirtualList data={contacts} height={800} itemKey="id">
        {(chatroom: any) => {
          return (
            <List.Item
              key={chatroom.id}
              className="cursor-pointer hover:bg-pink-100"
              onClick={() => {
                setSelectedChatId(chatroom.id);
              }}
            >
              <List.Item.Meta
                avatar={<Avatar size={"large"} icon={<UserOutlined />} />}
                title={
                  chatroom.opponent_first_name && chatroom.opponent_second_name
                    ? `${chatroom.opponent_first_name} ${chatroom.opponent_second_name}`
                    : "Guest user " + chatroom.id
                }
                description={chatroom.last_message?.content}
              />
              <Badge
                className="site-badge-count-109"
                count={
                  chatroom.unread_messages_count > 0
                    ? chatroom.unread_messages_count
                    : 0
                }
                style={{ backgroundColor: "#52c41a" }}
              />
            </List.Item>
          );
        }}
      </VirtualList>
    </List>
  );
};

export default ContactsBar;
