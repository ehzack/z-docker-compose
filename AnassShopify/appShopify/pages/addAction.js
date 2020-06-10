import { EmptyState, Layout, Page, Stack, Navigation } from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";
import store from "store-js";
import { Input, InputNumber } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { UserOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import "antd/dist/antd.css";
import { Card, AutoComplete, Avatar, Button } from "antd";
import EmailEditor from "react-email-editor";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Formik } from "formik";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import Cookies from "js-cookie";
import Router from "next/router";
import { Alert } from "react";
import swal from "sweetalert";

const backendUrl = "https://ca-customer.herokuapp.com/v1/graphql";

const GET_PRODUCTS = gql`
  query getProducts {
    products(first: 199) {
      edges {
        node {
          title
          handle
          descriptionHtml
          id
          images(first: 1) {
            edges {
              node {
                originalSrc
                altText
              }
            }
          }

          priceRange {
            maxVariantPrice {
              amount
              currencyCode
            }
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;
class AddAction extends React.Component {
  constructor(props) {
    super(props);
    this.editor = null;
  }
  state = { open: false };

  componentDidMount() {
    console.log(this.editor);
  }

  upadteData = async (data, htmlDoc, jsonHtml) => {
    console.log(data);

    fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": "zakaria123",
      },
      body: JSON.stringify({
        query: `
      mutation  MyMutation($ProductMatch: jsonb, $Product_Info: jsonb,$HtmlDoc:String,$jsonHtml:jsonb) {
        insert_match(objects: {Price:${data.price}, ProductID:"${
          data.buyProduct.key
        }", ProductMatch: $ProductMatch, jsonHtml: $jsonHtml, ProductMatchID: "${
          data.matchProduct.key
        }", Product_Info: $Product_Info, Title: "${
          data.title
        }", HTML: $HtmlDoc,store:"${Cookies.get("shopOrigin")}"}) {
          affected_rows
        }
      } 
      `,

        variables: {
          ProductMatch: {
            key: data.matchProduct.key,
            image: data.matchProduct.image,
            title: data.matchProduct.value,

            Product_Info: {
              key: data.buyProduct.key,
              image: data.buyProduct.image,
              title: data.buyProduct.value,
            },
          },
          jsonHtml: jsonHtml,
          HtmlDoc: htmlDoc.replace(/(\r\n|\n|\r)/gm, ""),
        },
      }),
    })
      .then((res) => res.json())

      .then((objects) => {
        if (objects.data && objects.data.insert_match) {
          swal(" Saved  ");
        } else {
          swal(" Product already used");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  renderTitle = (title) => (
    <span>
      {title}
      <a
        style={{
          float: "right",
        }}
        href="https://www.google.com/search?q=antd"
        target="_blank"
        rel="noopener noreferrer"
      >
        more
      </a>
    </span>
  );

  renderItem = (index, title, price, image) => ({
    key: index,
    value: title,
    image: image,
    label: (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Avatar shape="square" size={64} src={image} />
        {title}
        <span>{price} MAD</span>
      </div>
    ),
  });

  render() {
    return (
      <Formik
        initialValues={{
          title: "",
          buyProduct: "",
          matchProduct: "",
          price: "",
        }}
        onSubmit={(values, { resetForm }) => {
          this.editor.exportHtml((data) => {
            const { design, html } = data;
            this.upadteData(values, html, design);
            resetForm({ values: "" });
          });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,

          /* and other goodies */
        }) => (
          <form>
            <Card sectioned title="Title">
              <Input
                placeholder="title"
                name="title"
                style={{ width: "100%" }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
            </Card>
            <LoadingOverlay
              active={this.state.open}
              text="Loading your content..."
              spinner={<BounceLoader size={150} color={"#123abc"} />}
            ></LoadingOverlay>

            <Query query={GET_PRODUCTS}>
              {({ data, loading, error }) => {
                if (loading) {
                  return (
                    <div>
                      <Card sectioned title="Produit Acheter">
                        <AutoComplete
                          name="buyProduct"
                          dropdownClassName="certain-category-search-dropdown"
                          onSelect={(value, option) => {
                            setFieldValue("buyProduct", option);
                          }}
                          onBlur={handleBlur}
                          dropdownMatchSelectWidth={500}
                          style={{
                            width: "100%",
                          }}
                          options={[]}
                          filterOption={(inputValue, option) =>
                            option.value
                              ? option.value
                                  .toUpperCase()
                                  .indexOf(inputValue.toUpperCase()) !== -1
                              : ""
                          }
                        >
                          <Input.Search size="large" placeholder="input here" />
                        </AutoComplete>
                      </Card>
                      <Card sectioned title="Produit Affichez">
                        <AutoComplete
                          name="matchProduct"
                          onBlur={handleBlur}
                          dropdownClassName="certain-category-search-dropdown"
                          dropdownMatchSelectWidth={500}
                          style={{
                            width: "100%",
                          }}
                          onSelect={(value, option) => {
                            setFieldValue("matchProduct", option);
                          }}
                          options={[]}
                          filterOption={(inputValue, option) =>
                            option.value
                              ? option.value
                                  .toUpperCase()
                                  .indexOf(inputValue.toUpperCase()) !== -1
                              : ""
                          }
                        >
                          <Input.Search size="large" placeholder="input here" />
                        </AutoComplete>
                      </Card>
                    </div>
                  );
                }
                if (error) {
                  return <div>{error.message}</div>;
                }

                var options = [
                  {
                    label: this.renderTitle("Products"),
                    options: [],
                  },
                ];
                data.products.edges.map((e, index) => {
                  options[0].options.push(
                    this.renderItem(
                      e.node.id,
                      e.node.title,
                      e.node.priceRange.minVariantPrice.amount / 100,
                      e.node.images.edges.length > 0
                        ? e.node.images.edges[0].node.originalSrc
                        : null
                    )
                  );
                });

                return (
                  <div>
                    <Card sectioned title="Produit Acheter">
                      <AutoComplete
                        name="buyProduct"
                        dropdownClassName="certain-category-search-dropdown"
                        onSelect={(value, option) => {
                          setFieldValue("buyProduct", option);
                        }}
                        onBlur={handleBlur}
                        dropdownMatchSelectWidth={500}
                        style={{
                          width: "100%",
                        }}
                        options={options}
                        filterOption={(inputValue, option) =>
                          option.value
                            ? option.value
                                .toUpperCase()
                                .indexOf(inputValue.toUpperCase()) !== -1
                            : null
                        }
                      >
                        <Input.Search size="large" placeholder="input here" />
                      </AutoComplete>
                    </Card>

                    <Card sectioned title="Produit Affichez">
                      <AutoComplete
                        name="matchProduct"
                        onBlur={handleBlur}
                        dropdownClassName="certain-category-search-dropdown"
                        dropdownMatchSelectWidth={500}
                        style={{
                          width: "100%",
                        }}
                        onSelect={(value, option) => {
                          setFieldValue("matchProduct", option);
                        }}
                        options={options}
                        filterOption={(inputValue, option) =>
                          option.value
                            ? option.value
                                .toUpperCase()
                                .indexOf(inputValue.toUpperCase()) !== -1
                            : null
                        }
                      >
                        <Input.Search size="large" placeholder="input here" />
                      </AutoComplete>
                    </Card>
                  </div>
                );
              }}
            </Query>

            <Card sectioned title="Prix">
              <InputNumber
                placeholder="prix"
                name="price"
                style={{ width: "100%" }}
                onChange={(e) => setFieldValue("price", e)}
                onBlur={handleBlur}
                value={values.price}
              />
            </Card>

            <Card sectioned title="Presentation">
              <EmailEditor
                ref={(editor) => (this.editor = editor)}
                projectId={1}
                templateId={100}
                options={{
                  appearance: { theme: "dark" },
                  customJS: [
                    "https://ca-customer-tools-custom.herokuapp.com/button",
                  ],
                }}
              />
            </Card>
            <Card sectioned>
              <Button onClick={handleSubmit}>Enregistrer</Button>
            </Card>
          </form>
        )}
      </Formik>
    );
  }
}

export default AddAction;
