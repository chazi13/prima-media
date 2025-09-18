"use client";

import {
  Breadcrumb,
  Button,
  Card,
  Divider,
  Input,
  Radio,
  Table,
  Tabs,
  Tag,
} from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight, FaRegCopyright } from "react-icons/fa6";
import { FiHome } from "react-icons/fi";
import { GoDot } from "react-icons/go";

import { cn } from "@/lib/utils";

const supplier = {
  name: "PT Setroom Indonesia",
  address: "Fatmawati Raya St, 33",
  city: "Jakarta Selatan",
  status: "Active",
  nickname: "Setroom",
};

const materialData = [
  { key: "1", group: "IT - Device", id: "Computer / Notebook", active: true },
  { key: "2", group: "IT - Device", id: "Computer / PC", active: true },
];

const materialColumns = [
  {
    title: "Material Group",
    dataIndex: "group",
    key: "group",
    render: (text: string) => (
      <Input defaultValue={text} size="small" className="w-32" />
    ),
  },
  {
    title: "Material ID",
    dataIndex: "id",
    key: "id",
    render: (text: string) => (
      <Input defaultValue={text} size="small" className="w-32" />
    ),
  },
  {
    title: "Active",
    key: "active",
    render: (_: unknown, record: { key: string; active: boolean }) => (
      <input
        type="checkbox"
        checked={record.active}
        className="h-4 w-4"
        readOnly
      />
    ),
    width: 70,
  },
];

const outstandingsData = [
  {
    key: "1",
    invoice: "INV1234",
    project: "Project ABC",
    amount: "123.000",
    aging: "34",
  },
];
const outstandingsColumns = [
  { title: "#", dataIndex: "key", key: "key", width: 40 },
  { title: "Invoice Number", dataIndex: "invoice", key: "invoice" },
  { title: "Project Name", dataIndex: "project", key: "project" },
  { title: "Amount", dataIndex: "amount", key: "amount" },
  { title: "Aging (days)", dataIndex: "aging", key: "aging" },
];

const ratings = [
  {
    price: 4,
    delivery: 5,
    notes: "Notes",
    date: "Feb 14, 2025",
    user: "User Legal",
  },
  {
    price: 3,
    delivery: 4,
    notes: "Notes",
    date: "Feb 12, 2025",
    user: "User Legal",
  },
];

function RatingStars({ value }: { value: number }) {
  return (
    <span>
      {"★".repeat(value)}
      {"☆".repeat(5 - value)}
    </span>
  );
}

export default function SupplierDetailPage() {
  const [editMode, setEditMode] = useState(false);
  const [stage, setStage] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumb
            className="mb-4"
            separator={<FaChevronRight size={10} className="mt-1.5" />}
            items={[
              {
                title: (
                  <Link className="text-blue-500" href="/">
                    <FiHome className="mt-1" />
                  </Link>
                ),
              },
              {
                title: (
                  <Link className="text-blue-500" href="/supplier">
                    Supplier Management
                  </Link>
                ),
              },
              {
                title: (
                  <Link className="text-blue-500" href="/supplier/list">
                    Supplier List
                  </Link>
                ),
              },
              { title: "Supplier Detail" },
            ]}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button type="primary" danger className="ml-auto">
            Block / Unblock
          </Button>
          <div>
            <Button shape="circle" className="mr-2">
              <FaChevronLeft />
            </Button>
            <Button shape="circle">
              <FaChevronRight />
            </Button>
          </div>
          <span>1 of 32</span>
        </div>
      </div>
      <Card className="bg-transparent p-0 [&>div]:p-0">
        <div className="flex max-w-xl flex-1 items-center gap-4 bg-transparent p-4">
          <div className="flex h-[80px] w-[80px] items-center justify-center rounded border border-gray-400 text-xs text-gray-500">
            Logo
          </div>
          <div className="flex flex-1 justify-between">
            <div>
              <div className="text-lg font-semibold">{supplier.name}</div>
              <div className="text-sm text-gray-600">{supplier.address}</div>
              <div className="text-sm text-gray-600">{supplier.city}</div>
            </div>
            <div className="mt-2 flex flex-col items-end gap-2">
              <Tag color="green" className="flex items-center gap-1">
                <GoDot size={16} /> Active
              </Tag>
              <Tag className="flex items-center gap-1 px-4">
                <FaRegCopyright /> {supplier.nickname}
              </Tag>
            </div>
          </div>
        </div>
      </Card>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: "Overview",
            children: (
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Card className="col-span-1 [&_.ant-card-body]:pt-2">
                    <Tabs
                      defaultActiveKey="4"
                      items={[
                        { key: "1", label: "Address", children: <div /> },
                        { key: "2", label: "Contacts", children: <div /> },
                        { key: "3", label: "Groups", children: <div /> },
                        {
                          key: "4",
                          label: "Material List",
                          children: (
                            <div>
                              <div className="mb-2 flex items-center justify-between">
                                <span className="font-semibold">
                                  Materials provided by Supplier
                                </span>
                                <Button
                                  icon={
                                    editMode ? (
                                      <AiOutlineCheck />
                                    ) : (
                                      <FaRegEdit />
                                    )
                                  }
                                  size="small"
                                  onClick={() => setEditMode(!editMode)}
                                >
                                  {editMode ? "Save" : "Edit"}
                                </Button>
                              </div>
                              <Table
                                columns={materialColumns}
                                dataSource={materialData}
                                pagination={false}
                                size="small"
                              />
                            </div>
                          ),
                        },
                        { key: "5", label: "Others", children: <div /> },
                      ]}
                    />
                  </Card>
                  <Card>
                    <span className="font-semibold">Outstandings</span>
                    <Table
                      columns={outstandingsColumns}
                      dataSource={outstandingsData}
                      pagination={false}
                      size="small"
                    />
                  </Card>
                </div>
                <div className="col-span-1 flex flex-col gap-4">
                  <Card>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-semibold">
                        Stage: Supplier Creation
                      </span>
                      <span className="text-xs">SLA: 72 hour(s)</span>
                    </div>
                    <div className="mb-2 flex justify-between gap-4">
                      {[
                        "Draft",
                        "separator-1",
                        "In Review",
                        "separator-2",
                        "In Assessment",
                        "separator-3",
                        "Active",
                      ].map((label, idx) => {
                        if (label.includes("separator")) {
                          return (
                            <div key={label} className="flex-1">
                              <Divider className="m-0 mt-2.5 border-1" />
                            </div>
                          );
                        }

                        return (
                          <div
                            key={label}
                            className="flex max-w-4 flex-col items-center"
                          >
                            <Radio
                              checked={stage === idx}
                              onClick={() => setStage(idx)}
                              className="mr-0"
                            />
                            <span
                              className={cn(
                                "text-center",
                                stage === idx
                                  ? "text-blue-600"
                                  : "text-gray-500",
                              )}
                            >
                              {label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mb-2 text-xs">Elapsed 05:00:10</div>
                    <Input.TextArea
                      rows={2}
                      placeholder="Notes"
                      className="mb-2"
                    />
                    <Button className="ml-auto block">Next Stage</Button>
                  </Card>
                  <Card>
                    <span className="font-semibold">Performance Ratings</span>
                    <div className="mt-2 flex flex-col gap-2">
                      {ratings.map((r, i) => (
                        <div key={i} className="rounded border p-2">
                          <div>
                            Price: <RatingStars value={r.price} />
                          </div>
                          <div>
                            Delivery Time: <RatingStars value={r.delivery} />
                          </div>
                          <div className="text-xs">{r.notes}</div>
                          <div className="text-xs text-gray-500">
                            {r.date} by {r.user}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            ),
          },
          { key: "2", label: "Assessment", children: <div /> },
          { key: "3", label: "Material Catalog", children: <div /> },
          { key: "4", label: "Orders", children: <div /> },
          { key: "5", label: "Invoices", children: <div /> },
          { key: "6", label: "Projects", children: <div /> },
          { key: "7", label: "Services", children: <div /> },
          { key: "8", label: "History", children: <div /> },
        ]}
      />
    </div>
  );
}
