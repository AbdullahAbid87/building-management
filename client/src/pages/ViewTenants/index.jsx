import React, { Fragment } from "react";
import withDashboard from "../../HOC/withDashboard";
import Card from "../../components/Card";
import Table from "../../components/Table";
import Layout from "../../components/Layout";

const ViewTenants = () => {
  return (
    <Fragment>
      <Layout>
        <Table />
      </Layout>
    </Fragment>
  );
};

export default withDashboard(ViewTenants);
