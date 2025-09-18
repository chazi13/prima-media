import {
  Button,
  Input,
  Modal,
  Radio,
  Space,
  Table,
  Tabs,
  Upload,
  UploadProps,
} from "antd";
import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { LuCirclePlus } from "react-icons/lu";

import { FileType, getBase64 } from "@/lib/upload";

const addressData = [
  {
    key: "1",
    name: "Head Office",
    address: "Fatmawati Raya St, 123",
  },
  {
    key: "2",
    name: "Branch Office",
    address: "Ciawi, 99",
  },
];

const contactsData = [
  {
    key: "1",
    name: "Albert",
    job: "CEO",
    email: "einstein@gmail.com",
    phone: "021.123456",
    mobile: "0811234567",
  },
  {
    key: "2",
    name: "Isaac",
    job: "Mgr Proc",
    email: "newton@gmail.com",
    phone: "021.654321",
    mobile: "0811765432",
  },
];

const groupsData = [
  {
    key: "1",
    name: "Industry",
    value: "Manufacture",
    active: true,
  },
  {
    key: "2",
    name: "Telkom Group",
    value: "Non Telkom Group",
    active: true,
  },
];

export default function NewSupplierDialog({
  open,
  onCancel,
  onSave,
}: {
  open: boolean;
  onCancel: () => void;
  onSave: () => void;
}) {
  const [mainIdx, setMainIdx] = useState("1");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [mainContactIdx, setMainContactIdx] = useState("1");
  const [groupActive, setGroupActive] = useState<{ [key: string]: boolean }>({
    "1": true,
    "2": true,
  });

  const addressColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <Space>
          <span className="inline-block w-5 text-center font-bold">
            {text === "Head Office" ? "🏢" : "🏬"}
          </span>
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Main",
      key: "main",
      render: (_: unknown, record: { key: string }) => (
        <Radio
          checked={mainIdx === record.key}
          onChange={() => setMainIdx(record.key)}
        />
      ),
      width: 70,
    },
  ];

  const contactsColumns = [
    { title: "#", dataIndex: "key", key: "key", width: 40 },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Job Position", dataIndex: "job", key: "job" },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email: string) => (
        <span className="whitespace-pre-line">{email}</span>
      ),
    },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Mobile", dataIndex: "mobile", key: "mobile" },
    {
      title: "Main",
      key: "main",
      render: (_: unknown, record: { key: string }) => (
        <Radio
          checked={mainContactIdx === record.key}
          onChange={() => setMainContactIdx(record.key)}
        />
      ),
      width: 70,
    },
  ];

  const groupsColumns = [
    { title: "#", dataIndex: "key", key: "key", width: 40 },
    { title: "Group Name", dataIndex: "name", key: "name" },
    { title: "Value", dataIndex: "value", key: "value" },
    {
      title: "Active",
      key: "active",
      render: (_: unknown, record: { key: string }) => (
        <input
          type="checkbox"
          checked={groupActive[record.key]}
          onChange={() =>
            setGroupActive((prev) => ({
              ...prev,
              [record.key]: !prev[record.key],
            }))
          }
          className="h-4 w-4"
        />
      ),
      width: 70,
    },
  ];

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }

    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button
      className="flex flex-col items-center border-0 bg-transparent"
      type="button"
    >
      {loading ? (
        <AiOutlineLoading size={24} className="animate-spin" />
      ) : (
        <LuCirclePlus size={24} />
      )}
      <div className="mt-2">Upload</div>
    </button>
  );

  return (
    <Modal
      open={open}
      title="New Supplier"
      onCancel={onCancel}
      footer={null}
      width={600}
      centered
      classNames={{
        body: "pb-0",
      }}
    >
      <div className="flex gap-6">
        <div className="flex flex-col items-center gap-2">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader overflow-hidden"
            showUploadList={false}
            onChange={handleChange}
          >
            {imageUrl ? (
              <Image
                draggable={false}
                src={imageUrl}
                alt="avatar"
                className="h-full w-full object-contain"
                width={200}
                height={200}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>
        <div className="flex-1">
          <div className="mb-2">
            <label className="mb-1 block text-xs font-medium">
              Supplier Name
            </label>
            <Input defaultValue="" />
          </div>
          <div className="mb-2">
            <label className="mb-1 block text-xs font-medium">Nick Name</label>
            <Input defaultValue="" />
          </div>
        </div>
      </div>
      <Tabs
        className="mt-4"
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: "Address",
            children: (
              <Table
                columns={addressColumns}
                dataSource={addressData}
                pagination={false}
                size="small"
                className="mt-2"
              />
            ),
          },
          {
            key: "2",
            label: "Contacts",
            children: (
              <Table
                columns={contactsColumns}
                dataSource={contactsData}
                pagination={false}
                size="small"
                className="mt-2"
              />
            ),
          },
          {
            key: "3",
            label: "Groups",
            children: (
              <Table
                columns={groupsColumns}
                dataSource={groupsData}
                pagination={false}
                size="small"
                className="mt-2"
              />
            ),
          },
          { key: "4", label: "Material List", children: <div /> },
          { key: "5", label: "Others", children: <div /> },
        ]}
      />
      <div className="flex justify-end gap-2 py-4">
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="primary" onClick={onSave}>
          Save
        </Button>
      </div>
    </Modal>
  );
}
