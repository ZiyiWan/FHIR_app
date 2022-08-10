import { Breadcrumb, Col, Layout, Menu, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { Typography } from "antd";
import { getPatientList, getPatientsByName } from "../apiservice/axios";
import { Table } from "antd";

function PatientList() {
  const [dataSource, setDataSource] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  //const [searchFlag, setSearchFlag] = useState(false);
  const [searchingName, setSearchingName] = useState("");

  const { Header, Content, Footer } = Layout;
  const { Search } = Input;
  const { Title } = Typography;

  useEffect(() => {
    getPatientList(currentPage).then((res: any) => {
      console.log(res);
      console.log(res[0].resource.name[0].given[0]);
      const data: any = [];
      res.map((patient: any) => {
        let info = {
          name: patient.resource.name[0].given[0],
          birthDate: patient.resource.birthDate,
          gender: patient.resource.gender,
        };
        data.push(info);
      });

      setDataSource(data);
    });
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "BirthDate",
      dataIndex: "birthDate",
      key: "birthDate",
    },
  ];

  // const dataSource = [
  //   {
  //     key: "1",
  //     name: "Alice",
  //     age: 32,
  //     gender: "Female",
  //   },
  //   {
  //     key: "2",
  //     name: "Tom",
  //     age: 42,
  //     gender: "Male",
  //   },
  // ];
  async function onSearch(value: string){
    console.log(value);
    //setSearchFlag(true);
    setSearchingName(value);
    getPatientsByName(searchingName, currentPage).then((res: any) => {
      console.log(res);
      console.log(res[0].resource.name[0].given[0]);
      const data: any = [];
       res.map((patient: any) => {
        let info = {
          name: patient.resource.name[0].given[0],
          birthDate: patient.resource.birthDate,
          gender: patient.resource.gender,
        };
        data.push(info);
      });

      setDataSource(data);
    });
  };

  function onPageChange(page: number){
    console.log(page);
    var props = (page - 1) * 10;
    if (!searchingName) {
      //console.log("flag sss:" + searchFlag);
      getPatientList(props).then(function (res: any) {
        console.log("page:" + res);
        console.log("page info:" + res[0].resource.name[0].given[0]);
        const data: any = [];
        res.map((patient: any) => {
          let info = {
            name: patient.resource.name[0].given[0],
            birthDate: patient.resource.birthDate,
            gender: patient.resource.gender,
          };
          data.push(info);
        });

        setDataSource(data);
      });
    } else {
      getPatientsByName(searchingName, currentPage).then((res: any) => {
        //console.log("flag sss:" + searchFlag);
        console.log(res);
        console.log(res[0].resource.name[0].given[0]);
        const data: any = [];
        res.map((patient: any) => {
          let info = {
            name: patient.resource.name[0].given[0],
            birthDate: patient.resource.birthDate,
            gender: patient.resource.gender,
          };
          data.push(info);
        });

        setDataSource(data);
      });
    }
  }

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" />
      </Header>
      <Row justify="center">
        <Col span={14}>
          <Content style={{ padding: "0 50px", width: "100vh" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
            </Breadcrumb>
            <Title type="secondary">Search Patient</Title>
            <Search
              placeholder="search patient by name"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={onSearch}
              maxLength={5}
            />
            <Table
              dataSource={dataSource}
              columns={columns}
              style={{ marginTop: "8px" }}
              pagination={{
                defaultPageSize: 10,
                total: 122951,
                onChange: (page) => {
                  onPageChange(page);
                  setCurrentPage(page);
                },
              }}
            />
            ;
          </Content>
        </Col>
      </Row>
      <Footer style={{ textAlign: "center" }}>Fhir info render test</Footer>
    </Layout>
  );
}

export default PatientList;
