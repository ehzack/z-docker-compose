import { EmptyState, Layout, Page, Stack, Navigation } from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";
import store from "store-js";
import { Input, InputNumber } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { UserOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import "antd/dist/antd.css";
import { Table, Tag, Space, Avatar, Button } from "antd";
import EmailEditor from "react-email-editor";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Formik } from "formik";
import moment from "moment";
import { DeleteFilled, UpCircleTwoTone, AlertFilled } from "@ant-design/icons";
import Cookies from "js-cookie";
import Router from "next/router";

const backendUrl = "https://ca-customer.herokuapp.com/v1/graphql";

class ListActions extends React.Component {
  state = { open: false, actionsFetch: [] };

  columns = [
    {
      title: "Title",
      dataIndex: "Title",
      key: "title",
    },
    {
      title: "Product 1",
      key: "Product_Info",
      render: (text, record) => (
        <Space size="middle">
          <Avatar src={record.Product_Info.image} />

          <a>{record.Product_Info.title}</a>
        </Space>
      ),
    },

    {
      title: "Product 2",
      key: "Product_Info",
      render: (text, record) => (
        <Space size="middle">
          <Avatar src={record.ProductMatch.image} />

          <a>{record.ProductMatch.title}</a>
        </Space>
      ),
    },

    {
      title: "Price",
      dataIndex: "Price",
      key: "Price",
    },
    {
      title: "Created At",
      key: "created_at",
      render: (text, record) => (
        <Space size="middle">
          <a>{moment(record.created_at).format("YYYY-MM-DD HH:mm")}</a>
        </Space>
      ),
    },
    {
      title: "Update",
      dataIndex: "",
      width: "160px",
      render: (_, record) => (
        <div className="table-actions">
          <Button
            type="primary"
            shape="round"
            icon={<UpCircleTwoTone />}
            onClick={(e) =>
              Router.push({
                pathname: "/updateAction",
                query: { key: record.key },
              })
            }
          />
        </div>
      ),
    },
    {
      title: "activate",
      dataIndex: "",
      width: "160px",
      render: (_, record) => (
        <div className="table-actions">
          <Button
            type={record.active ? "primary" : "danger"}
            shape="round"
            icon={<AlertFilled />}
            onClick={(e) => this.activateAction(record.key, record.active)}
          />
        </div>
      ),
    },
    {
      title: "Delete",
      dataIndex: "",
      width: "160px",
      render: (_, record) => (
        <div className="table-actions">
          <Button
            type="primary"
            shape="round"
            icon={<DeleteFilled />}
            onClick={(e) => this.removeAction(record.key)}
          />
        </div>
      ),
    },
  ];

  activateAction = (id, flag) => {
    fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": "zakaria123",
      },
      body: JSON.stringify({
        query: `  mutation MyMutation {
          update_match(where: {key: {_eq: ${id}}}, _set: {active: ${!flag}}) {
            affected_rows
          }
        }
         `,
      }),
    })
      .then((res) => res.json())

      .then((objects) => {
        this.getData();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  removeAction = (id) => {
    fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": "zakaria123",
      },
      body: JSON.stringify({
        query: ` mutation MyMutation {
            delete_match(where: {key: {_eq: ${id}}}) {
              affected_rows
            }
          }
          `,
      }),
    })
      .then((res) => res.json())

      .then((objects) => {
        this.getData();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  getData = () => {
    fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": "zakaria123",
      },
      body: JSON.stringify({
        query: ` query MyQuery {
    match(where: {store: {_eq: "${Cookies.get("shopOrigin")}"}}) {
      key
      created_at
      Title
      Product_Info
      ProductMatch
      Price
      active
    }
  }`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data.match) {
          this.setState({ actionsFetch: data.data.match });
        }
      });
  };
  componentDidMount = () => {
    this.getData();
  };

  render() {
    return (
      <Table columns={this.columns} dataSource={this.state.actionsFetch} />
    );
  }
}

export default ListActions;
