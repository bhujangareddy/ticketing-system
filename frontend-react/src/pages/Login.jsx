import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { namePattern, emailEnd, pwdPattern, pwdRule } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/AuthSlice";
import axios from "axios";
import { handleAxiosError } from "../utils/HandleAxiosError";

const Login = ({ handleOk, handleCancel }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log("Login Data:", values);

    try {
      // direct de-structuring from the response that we get from the API Call
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/token/",
        values
      );

      console.log("Backend Response:", response.data);
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);

      // // Attach token for future API calls
      // axios.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;
      
      dispatch(login({...values, ...response.data}));
      form.resetFields();
      handleOk();
      // navigate("/tasks");
      message.success("Login Successful!");
    } catch (error) {
      handleAxiosError(error);
      console.log(error);
      message.error("Invalid Credentials");
    }
  };
  return (
    <>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {/* <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "Enter a valid email address!" },
            {
              max: 30,
              message: "Email must not exceed more than 30 characters!",
            },
            {
              pattern: emailEnd,
              message: "Email should follow the format 'example@domain.com'",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="text-gray-400" />}
            placeholder="Enter your email"
            size="large"
            allowClear
          />
        </Form.Item> */}

        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: "Please enter your username." },
          ]}
        >
          <Input
            prefix={<UserOutlined className="text-gray-400" />}
            placeholder="Pati Bhujanga Reddy"
            size="large"
            allowClear
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please enter your password!" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="Create a password"
            size="large"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            className="rounded-lg"
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
