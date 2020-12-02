import react, { useEffect, useState } from 'react';
import Link from 'next/link'
import Head from 'next/head';
import classes from './home.module.css';
import { Row, Col, Container, Card, CardImg, CardTitle, CardText, CardBody, Button } from 'reactstrap';


function HomePage(props) {
    const FilterRow = (props) => {
        let col = [];
        for (let intial = props.FromYear; intial <= props.ToYear; intial++) {
            col.push(<Col className="mt-1 fliter_parent text-center"  lg={6} md={3} sm={4} xs={6}><Button className={classes.filte_btn } onClick={() => onYearButtonClick(intial)}><center>{intial}</center></Button></Col>)
        }

        return (<Row>{col}</Row>)
    }
    const onYearButtonClick = (year) => {
        getSpaceData(`https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true&land_success=true&launch_year=${year}`)

    }
    const onLaunSuccessButtonClick = (type, fieldValue) => {
        if (fieldValue === "lauch") {
            getSpaceData(`https://api.spaceXdata.com/v3/launches?limit=100&launch_success=${type}`)


        }
        else {
            getSpaceData(`https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true&land_success=${type}`)


        }

    }

    const [spaceData, setSpaceData] = useState([]);
    const [activeButton, setActive] =useState(2006)

    
    const getSpaceData = (url) => {
        fetch(url ? url : 'https://api.spaceXdata.com/v3/launches?limit=100')
            .then(res => res.json())
            .then(data => setSpaceData(data))
    }

    useEffect(() => {
        getSpaceData();

    }, []);
    const subTitle = [{
        label: "Mission Ids", dataIndex: "mission_id"
    },
    {
        label: "Launch  Year", dataIndex: "launch_year"
    },
    {
        label: "Successful Launch", dataIndex: "launch_success"
    },
    {
        label: "Succesful Landing", dataIndex: "launch_landing"
    }

    ]
    return (
        <>
            <div className={classes.container1}>
                <Head>
                    <title>SpaceX Launch Program</title>
                    <link rel="icon" href="/favicon.ico" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                </Head>
                <div>
                    <h1 className={classes.title}>
                        SpaceX Launch Program
                </h1>
                    <Row>
                        <Col lg={2} sm={12}>
                            <Card>
                                <CardBody>
                                    <CardTitle tag="h5"><b>Filters</b></CardTitle>
                                    <CardText><center><u>Launch Year</u></center></CardText>
                                    <CardText>
                                        <FilterRow FromYear={2006} ToYear={2020}></FilterRow>
                                    </CardText>
                                </CardBody>
                                <CardBody>
                                    <CardText><center><u>Successful Launch </u></center></CardText>
                                    <CardText>
                                        <Row>
                                            <Col className="mt-1 fliter_parent text-center"  lg={6} md={3} xs={6}><Button className={classes.filte_btn } onClick={() => onLaunSuccessButtonClick(true, "launch")}><center>True</center></Button></Col>
                                            <Col className="mt-1 fliter_parent text-center"  lg={6} md={3} xs={6}><Button className={classes.filte_btn } onClick={() => onLaunSuccessButtonClick(false, "launch")}><center>False</center></Button></Col></Row>
                                    </CardText>
                                </CardBody>
                                <CardBody>
                                    <CardText><center><u>Successful Landing</u></center></CardText>
                                    <CardText>
                                        <Row><Col className="mt-1 fliter_parent text-center"  lg={6} md={3} sm={6}><Button className={classes.filte_btn } onClick={() => onLaunSuccessButtonClick(true, "land")} > <center>True</center></Button></Col>
                                            <Col className="mt-1 fliter_parent text-center"  lg={6} md={3} sm={6}><Button className={classes.filte_btn } onClick={() => onLaunSuccessButtonClick(false, "land")} > <center>False</center></Button></Col></Row>

                                    </CardText>
                                </CardBody>
                            </Card>

                        </Col>
                        <Col lg={10} sm={12} md={12}>
                            <Row>
                                {
                                    spaceData.map((item) => {
                                        return (<Col lg={3} sm={12} md={6}>
                                            <Card>
                                                <div className={classes.customcardimg}>
                                                    <CardImg top width="80%" src={item.links.mission_patch || "/noimage.png"} alt="Card image cap" />
                                                </div>

                                                <CardBody>

                                                    <CardTitle className={classes.cardTitleColor}><b>{`${item.mission_name} # ${item.flight_number}`}</b></CardTitle>
                                                    {subTitle.map((field) =>
                                                        <CardText >
                                                            <b>{field.label}:</b> {item[field.dataIndex] && item[field.dataIndex].toString()}
                                                        </CardText>)
                                                    }
                                                </CardBody>
                                            </Card>
                                        </Col>)
                                    })
                                }
                                {
                                    spaceData.length === 0 && <img width= "60%" height="70%" style ={{justifyContent:"center"}} src ="/noimage.png"></img>
                                }
                            </Row>
                        </Col>
                    </Row>
                    <Row className={classes.footer}>
                        <b>Developed By:</b> Tulika Singh
                    </Row>

                </div>
            </div>

        </>
    )
}

export default HomePage