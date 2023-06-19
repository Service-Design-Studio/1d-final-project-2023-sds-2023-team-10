import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Upload, Space, Tag } from "antd";
import MainLayout from "../../../components/MainLayout";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const tags = [
  "Pregnancy",
  "Postpartum",
  "Infant Care",
  "Dealing with anxiety",
  "Dealing with depression",
  "Financial struggles",
  "Adoption",
  "Abortion",
  "Miscarriage",
  "Parenting",
  "1st Trimester",
  "2nd Trimester",
  "3rd Trimester",
];

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const ArticleForm: React.FC = () => {
  const [form] = Form.useForm();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
      form.setFieldsValue({
        tags: selectedTags.filter((t) => t !== tag),
      });
    } else {
      setSelectedTags([...selectedTags, tag]);
      form.setFieldsValue({
        tags: [...selectedTags, tag],
      });
    }
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
    setSelectedTags([]);
  };

  return (
    <>
      <div className="flex items-centre min-h-screen justify-center m-8">
        <div>
          <h1 className="text-3xl font-bold">Add an Article</h1>
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 600 }}
            form={form}
            onFinish={onFinish}
          >
            <Form.Item label="Article Title" name="title">
              <Input placeholder="Enter the article title" />
            </Form.Item>
            <Form.Item label="Article Link" name="articleLink">
              <Input placeholder="Enter the article URL" />
            </Form.Item>
            <Form.Item label="Author" name="author">
              <Input placeholder="Enter the article author" />
            </Form.Item>
            <Form.Item label="DatePicker" name="datePicker">
              <DatePicker />
            </Form.Item>
            <Form.Item
              label="Upload Article "
              name="upload"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload action="/upload.do" listType="picture-card">
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>

            <Form.Item name="tags" label="Tags" style={{ display: "none" }}>
              <Input />
            </Form.Item>
            <Form.Item label="Tags">
              <Space wrap>
                {tags.map((tag) => (
                  <Button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    type={selectedTags.includes(tag) ? "primary" : "default"}
                  >
                    {tag}
                  </Button>
                ))}
              </Space>
            </Form.Item>

            <div className="flex justify-between">
              <Button htmlType="button" onClick={onReset} className="inline">
                Reset
              </Button>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="inline">
                  Submit
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

const ArticleFormPage: React.FC = () => {
  return (
    <MainLayout>
      <ArticleForm />
    </MainLayout>
  );
};

export default ArticleFormPage;
