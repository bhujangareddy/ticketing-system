import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { emailEnd, pwdPattern, pwdRule } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/AuthSlice";

const Login = ({ handleOk, handleCancel }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log("Login Data:", values);
    dispatch(login(values));
    form.resetFields();
    handleOk()
    // try {
    //   // direct de-structuring from the response that we get from the API Call
    //   const { data } = await axios.post(
    //     "http://localhost:3000/users/login",
    //     values
    //   );

    //   console.log("Backend Response:", data);
    //   if (values.rememberMe) {
    //     localStorage.setItem("authToken", data.accessToken);
    //   } else {
    //     sessionStorage.setItem("authToken", data.accessToken);
    //   }

    //   // Attach token for future API calls
    //   axios.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;

    //   dispatch(login(data));
    //   navigate("/tasks");
    //   message.success("Login Successful!");
    // } catch (error) {
    //   handleAxiosError(error);
    // }
  };
  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
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
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please enter your password!" },
            { min: 8, message: "Password must be atleast 8 characters!" },
            {
              pattern: pwdPattern,
              message: pwdRule,
            },
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
