"use client";

import { Button, Card, Input, Radio, Select, Space, Table, Tag } from "antd";
import React from "react";
import { BsGrid3X3Gap, BsList, BsPersonFillAdd } from "react-icons/bs";
import { FaRegFileExcel, FaRegPlusSquare } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa6";
import { MdDirectionsRun, MdPeople, MdTimer } from "react-icons/md";

import { Supplier, SupplierStatus } from "@/types/supplier";

import NewSupplierDialog from "./NewSupplierDialog";

const stats = [
  {
    title: "Total Supplier",
    value: 1869,
    icon: <MdPeople size={56} />,
    footer: <span className="text-green-600"> +8% vs Last Year</span>,
  },
  {
    title: "New Supplier",
    value: 27,
    icon: <BsPersonFillAdd size={56} />,
    footer: <span className="text-green-600"> +1% vs Last Year</span>,
  },
  {
    title: "Avg Cost per Supplier",
    value: "Rp 320,3 Mn",
    icon: <MdDirectionsRun size={56} />,
    footer: <span className="text-red-600">-1% vs Last Year</span>,
  },
  {
    title: "Blocked Supplier",
    value: 31,
    icon: <MdTimer size={56} />,
    footer: <span className="text-green-600"> -4% vs Last Year</span>,
  },
];

const columns = [
  {
    title: "#",
    dataIndex: "index",
    key: "index",
    width: 40,
    render: (_: unknown, __: unknown, i: number) => i + 1,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (_: unknown, record: Supplier) => (
      <Space direction="horizontal" size={12}>
        <Space direction="vertical" size={0} align="center">
          <FaRegImage size={18} />
          <span className="text-xs">{record.code}</span>
        </Space>
        <Space direction="vertical" size={0}>
          <span className="font-semibold">{record.name}</span>
          <span className="text-xs text-gray-500">
            <a href="#" className="text-xs text-blue-600">
              {record.id}
            </a>{" "}
            [{record.alias}]
          </span>
        </Space>
      </Space>
    ),
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Contact",
    dataIndex: "contact",
    key: "contact",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: SupplierStatus) => {
      if (status === "Active") return <Tag color="green">Active</Tag>;
      if (status === "In Progress") return <Tag color="blue">In Progress</Tag>;
      if (status === "Blocked") return <Tag color="red">Blocked</Tag>;
      return status;
    },
  },
];

const data: Supplier[] = [
  {
    name: "PT Setroom Indonesia",
    code: "STRM",
    alias: "Setroom",
    id: "61000012",
    address: "Jakarta, Indonesia",
    contact: "Albert Einstein",
    status: "Active",
  },
  {
    name: "PT Suka Suka",
    code: "SKSK",
    alias: "Sukasuka",
    id: "41000013",
    address: "Bandung, Indonesia",
    contact: "James Lee",
    status: "In Progress",
  },
  {
    name: "PT Angin Ribut",
    code: "ARIB",
    alias: "Angin",
    id: "41000014",
    address: "Denpasar, Indonesia",
    contact: "Maria Chen",
    status: "Blocked",
  },
];

function StatCard({
  title,
  value,
  icon,
  footer,
}: {
  title: string;
  value: React.ReactNode;
  icon: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <div className="mb-1 text-xs font-medium text-gray-700">{title}</div>
          <div className="text-2xl font-medium text-gray-900">{value}</div>
        </div>
        <div className="ml-2 flex items-center text-2xl text-gray-400">
          {icon}
        </div>
      </div>
      <div className="mt-2 text-xs">{footer}</div>
    </Card>
  );
}

export default function SupplierList() {
  const [modalOpen, setOpenModal] = React.useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6">
        <div className="flex justify-between">
          <h2 className="mb-4 text-lg font-semibold">Supplier List</h2>
          <Button
            type="primary"
            icon={<FaRegPlusSquare />}
            onClick={() => setOpenModal(true)}
          >
            New Supplier
          </Button>
        </div>
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
          {stats.map((stat, i) => (
            <StatCard
              key={i}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              footer={stat.footer}
            />
          ))}
        </div>
        <div className="mb-4 flex items-center justify-between gap-2">
          <div className="flex flex-1 gap-2">
            <Input.Search
              placeholder="Search Customer"
              style={{ maxWidth: 240 }}
            />
            <Select
              defaultValue="Active"
              style={{ width: 120 }}
              options={[
                { value: "Active", label: "Active" },
                { value: "In Progress", label: "In Progress" },
                { value: "Blocked", label: "Blocked" },
              ]}
            />
          </div>
          <div className="flex gap-2">
            <Button icon={<FaRegFileExcel />}>Export</Button>
            <Radio.Group
              defaultValue="table"
              optionType="button"
              buttonStyle="outline"
              options={[
                {
                  label: <BsGrid3X3Gap size={20} className="mt-1.25" />,
                  value: "grid",
                },
                {
                  label: <BsList size={20} className="mt-1.25" />,
                  value: "table",
                },
              ]}
            />
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          rowKey={(row) => row.id}
          rowHoverable
        />
        <NewSupplierDialog
          open={modalOpen}
          onCancel={handleCloseModal}
          onSave={handleCloseModal}
        />
      </div>
    </div>
  );
}
