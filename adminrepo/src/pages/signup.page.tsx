// pages/signup.tsx

import React, { useState } from "react";
import axios from "./axiosFrontend";
import { Form, Input, Button, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import Link from "next/link";

const { Title } = Typography;

const SignupPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      const response = await axios.post("/api/signup", {
        email: values.email,
        password: values.password,
      });

      const token = response.data.token;
      const userId = response.data.userId;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      // Redirect to the home page
      router.push("/");
    } catch (error) {
      setError("An error occurred while signing up. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div
        className="shadow-md flex flex-col justify-center px-8 pt-6 pb-8 mb-4 bg-white rounded"
        style={{ minWidth: "30vw", minHeight: "30vh" }}
      >
        <Title level={3} className="mb-6 text-center ">
          Sign Up
        </Title>
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        <Form
          name="normal_signup"
          className="signup-form"
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
              className="signup-form-button w-full"
            >
              Sign Up
            </Button>
          </Form.Item>
          Or <Link href="/login">login now!</Link> {/* Add this line */}
        </Form>
      </div>
    </div>
  );
};

export default SignupPage;
