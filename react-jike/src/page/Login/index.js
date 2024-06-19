import { Card, Form, Input, Checkbox, Button, message } from "antd";
import "./index.scss";
import logo from "@/assets/logo.png";
import { loginApi } from "@/store/modules/userStore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const onFinish = async (values) => {
    console.log("Success:", values);
    // 调用登录接口
    await dispatch(loginApi(values));
    // 跳转到首页
    navigator("/");
    // 提示用户
    message.success("登录成功");
  };

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form validateTrigger={["onBlur", "onChange"]} onFinish={onFinish}>
          <Form.Item
            name="mobile"
            rules={[
              { required: true, message: "请输入手机号" },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: "手机号格式不正确",
                validateTrigger: "onBlur",
              },
            ]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              { required: true, message: "请输入验证码" },
              { len: 6, message: "验证码长度为6位", validateTrigger: "onBlur" },
            ]}
          >
            <Input size="large" maxLength={6} placeholder="请输入验证码" />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className="login-checkbox-label">
              我已阅读并同意「用户协议」和「隐私条款」
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
