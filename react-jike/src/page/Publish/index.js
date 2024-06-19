import "./index.scss";
import {
  Card,
  Form,
  Breadcrumb,
  Input,
  Select,
  Space,
  Button,
  message,
  Radio,
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  api_articleAdd,
  api_getArticleDetail,
  api_articleUpdate,
} from "@/api/articleApi";
import { useArticleChannel } from "@/hook/useArticle";
const { Option } = Select;

const Publish = () => {
  const navigate = useNavigate();
  const { channelList } = useArticleChannel();
  const [coverType, setCoverType] = useState(0);
  const [imageList, setImageList] = useState([]);

  // 回显数据
  const [searchParams] = useSearchParams();
  const articleId = searchParams.get("id") || "";
  const [form] = Form.useForm();
  useEffect(() => {
    // 请求数据

    const getDetail = async () => {
      const res = await api_getArticleDetail(articleId);
      // 这里的 res 要回显到 form
      // 回显 封面图
      const { type, images } = res.data.cover;
      form.setFieldsValue({ ...res.data, type });

      setCoverType(type);
      setImageList(images.map((img) => ({ url: img })));
    };

    // 有 id 的时候，才是编辑状态
    articleId && getDetail();
  }, [articleId, form]);

  // 发布按钮
  const onFinish = async (value) => {
    // 校验封面类型和数量是否匹配
    if (imageList.length !== coverType) {
      message.warning("封面类型和图片数量不匹配");
      return;
    }
    const { title, content, channel_id } = value;
    const data = {
      title,
      content,
      cover: {
        type: coverType,
        images: imageList.map((item) => {
          if (item.response) {
            // 发布文章时的图片结构
            return item.response.data.url;
          } else {
            // 编辑文章时的图片结构
            return item.url;
          }
        }),
      },
      channel_id,
    };

    articleId
      ? await api_articleUpdate({ ...data, id: articleId })
      : await api_articleAdd(data);
    message.success(`${articleId ? "编辑" : "发布"}文章成功`);
    navigate("/article", { replace: true });
  };

  // 上传图片
  const handleImageUpload = (value) => {
    const { file, fileList } = value || {};
    const { status } = file;

    if (status === "done") {
      setImageList(fileList);
    }
  };

  // 切换封面类型
  const handleCoverChange = (e) => {
    setCoverType(e.target.value);
    // 无图的时候，要清空图片列表
    if (e.target.value === 0) {
      setImageList([]);
    }
  };

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              {
                title: (
                  <Link to={"/"} replace>
                    首页
                  </Link>
                ),
              },
              { title: `${articleId ? "编辑" : "发布"}文章` },
            ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }} // name 为 type 的表单默认值
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: "请选择文章频道" }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {/* value属性用户选中之后会自动收集起来作为接口的提交字段 */}
              {channelList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={handleCoverChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {coverType !== 0 && (
              <Upload
                maxCount={coverType} // 最多上传图片数量
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                name="image" // 上传的接口字段名
                onChange={handleImageUpload}
                fileList={imageList}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            {/* 富文本编辑器 */}
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
