import { PageHeader, Button, Descriptions } from "antd";
import "antd/dist/antd.css";
import AddAction from "./addAction";
import ListActions from "./listActions";

import { EmptyState, Layout, Page, Stack, Navigation } from "@shopify/polaris";

class Index extends React.Component {
  state = {
    key: 1,
  };
  render() {
    return <ListActions />;
  }
}

export default Index;
