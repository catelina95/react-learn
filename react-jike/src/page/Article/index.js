import {
  Card,
  Breadcrumb,
  Form,
  Radio,
  Select,
  DatePicker,
  Button,
  Table,
  Tag,
  Space,
  Popconfirm,
} from "antd";
import { Link } from "react-router-dom";
import locale from "antd/es/date-picker/locale/zh_CN";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import img404 from "@/assets/error.png";
import { useNavigate } from "react-router-dom";
import { useArticleChannel } from "@/hook/useArticle";
import { api_getArticleList, api_deleteArticle } from "@/api/articleApi";

const { Option } = Select;
const { RangePicker } = DatePicker;

const Article = () => {
  const navigate = useNavigate();
  const status = {
    1: <Tag color="warning">待审核</Tag>,
    2: <Tag color="success">审核通过</Tag>,
  };
  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      width: 120,
      render: (cover) => {
        return (
          <img src={cover.images[0] || img404} width={80} height={60} alt="" />
        );
      },
    },
    {
      title: "标题",
      dataIndex: "title",
      width: 220,
    },
    {
      title: "状态",
      dataIndex: "status",
      // data - 后端返回的状态status 根据它做条件渲染
      // data === 1 => 待审核
      // data === 2 => 审核通过
      render: (data) => status[data],
    },
    {
      title: "发布时间",
      dataIndex: "pubdate",
    },
    {
      title: "阅读数",
      dataIndex: "read_count",
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
    },
    {
      title: "操作",
      render: (data) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                navigate(`/publish?id=${data.id}`);
                // window.location.reload();
              }}
            />
            <Popconfirm
              title="删除文章"
              description="确认要删除当前文章吗?"
              onConfirm={() => handleDeleteArticle(data)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  // 获取文章列表
  const [reqData, setReqData] = useState({
    status: "",
    channel_id: "",
    begin_pubdate: "",
    end_pubdate: "",
    page: 1,
    per_page: 10,
  });
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const getArticleList = async () => {
      const res = await api_getArticleList(reqData);
      const data = res.data.results;
      setCount(res.data.total_count);
      setList(data);
    };
    getArticleList();
  }, [reqData]);

  const { channelList } = useArticleChannel();

  // 筛选
  const onFinish = (value) => {
    const { date, status, channel_id } = value;
    setReqData({
      ...reqData,
      page: 1,
      status,
      channel_id: channel_id || "",
      begin_pubdate: date?.[0] ? date[0].format("YYYY-MM-DD") : "",
      end_pubdate: date?.[1] ? date[1].format("YYYY-MM-DD") : "",
    });
    // reqData 发生变化，会执行 useEffect 里的获取接口
  };

  // 删除文章
  const handleDeleteArticle = async (data) => {
    await api_deleteArticle(data.id);
    // 请求数据
    setReqData({ ...reqData });
  };

  // 更改页面
  const handlePageChange = (page) => {
    setReqData({ ...reqData, page });
  };

  return (
    <div>
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
              { title: "文章列表" },
            ]}
          />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: "" }} onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={""}>全部</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select placeholder="请选择文章频道" style={{ width: 120 }}>
              {channelList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 表格区域 */}
      <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={list}
          pagination={{
            total: count,
            pageSize: reqData.per_page,
            onChange: handlePageChange,
          }}
        />
      </Card>
    </div>
  );
};

export default Article;
