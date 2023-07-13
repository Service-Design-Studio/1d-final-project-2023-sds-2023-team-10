// pages/login.tsx

import React, { useState, FormEvent } from "react";
import axios from "./axiosFrontend";
import { Form, Input, Button, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import Link from "next/link";
const { Title } = Typography;

const LoginPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      const response = await axios.post("/api/login", {
        email: values.email,
        password: values.password,
      });

      const token = response.data.token;
      const userId = response.data.userId;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      router.push("/");
    } catch (error) {
      setError("Invalid email/password combination.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div
        className="shadow-md flex flex-col justify-center px-8 pt-6 pb-8 mb-4 bg-white rounded"
        style={{ minWidth: "30vw", minHeight: "30vh" }}
      >
        <Title level={3} className="mb-6 text-center ">
          Login
        </Title>
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              type="text"
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button w-full"
            >
              Log in
            </Button>
            Or <Link href="/signup">register now!</Link> {/* Add this line */}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
