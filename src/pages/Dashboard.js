import React from "react";
import Footer from "../components/footer";
import { makeStyles } from "@material-ui/core/styles";
import "./swal_style.css";
import {
  Grid,
  CardMedia,
  Box,
  AppBar,
  Button,
  Toolbar,
  GridList,
  InputLabel,
  Card,
  Fade,
  Select,
  MenuItem,
  Modal,
  TextareaAutosize,
  Backdrop,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import axios from "axios";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import * as loadingData from "../components/Loading/loading.json";
import * as emptyData from "../components/Loading/empty.json";
import { orange } from "@material-ui/core/colors";
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loadingData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const defaultOptions3 = {
  loop: false,
  autoplay: true,
  animationData: emptyData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontFamily: "Kanit",
    justifyContent: "center",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  CardTrack: {
    padding: "50px",
    borderRadius: "30px",
    margin: "5px",
    width: "450px",
  },
  title: {
    fontFamily: "Kanit",
    flexGrow: 1,
    textDecoration: "none",
  },
  input: {
    color: "white",
  },
  bar: {
    fontFamily: "Kanit",
    background:
      "linear-gradient( 19.5deg,  rgba(245,81,4,1) 11.2%, rgba(255,181,2,1) 91.1% )",
  },
  text: {
    padding: "10px",
    fontFamily: "Kanit",
    textDecoration: "none",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  Card: {
    padding: "2rem",
    justifyContent: "center",
    textAlign: "center",
    height: "auto",
    overflow: "scroll",
  },
  CardBTN: {
    margin: "1rem",

    minWidth: "280px",
    maxHeight: "auto",

    borderRadius: "20px",
    // overflowY: "scroll",
  },

  Button: {
    background:
      "linear-gradient( 19.5deg,  rgba(245,81,4,1) 11.2%, rgba(255,181,2,1) 91.1% )",
    fontFamily: "Kanit",
    color: "white",
    width: "auto",
    borderRadius: 5,
  },
  ButtonEdit: {
    magin: "15px",
    background:
      "linear-gradient( 19.5deg,  rgba(245,81,4,1) 11.2%, rgba(255,181,2,1) 91.1% )",
    fontFamily: "Kanit",
    color: "white",
    width: "auto",
    borderRadius: 5,
  },
  head: {
    margin: "5px",
    background:
      "linear-gradient( 19.5deg,  rgba(245,81,4,1) 11.2%, rgba(255,181,2,1) 91.1% )",
    fontFamily: "Kanit",
    color: "white",
    width: "auto",
    textAlign: "center",
    padding: "2px",
    borderRadius: 30,
  },
  summaryCard: {
    marginTop: "10px",
    color: "white",
    width: "180px",
    background:
      "linear-gradient( 19.5deg,  rgba(245,81,4,1) 11.2%, rgba(255,181,2,1) 91.1% )",
    fontFamily: "Kanit",
    height: "180px",
    padding: "1rem",
    borderRadius: 20,
  },
  buttonProgress: {
    color: orange[50],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  media: {
    height: 140,
  },
}));

function Dashboard() {
  const classes = useStyles();
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  // Function นี้จะเป็นการเรียกใช้ Search paramiter

  let query = useQuery();
  // เรียกใช้ function ด้านบนในรูปย่อ
  let id = query.get("id");
  // กำหนดตัวเเปร id เพื่อรับค่าจาก query string ชื่อ id

  const [works, setWorks] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [IsUpdated, setIsUpdated] = React.useState(false);
  const [objId, setobjId] = React.useState("");
  const [refId, setRefId] = React.useState("");
  const [update, setUpdate] = React.useState({ Status: "", Discription: "" });
  const [loading, setLoading] = React.useState(false);
  const [IsDel, setIsDel] = React.useState(false);
  const [link, setLink] = React.useState("");
  const baseURL = "https://sws-mantainance.herokuapp.com";
  function generalate_report() {
    setLoading(true);
    const fetchData = async () => {
      await axios
        .get(baseURL + "/api/get_report")
        .then((res) => {
          // console.log(res.data);

          setTimeout(() => {
            setLoading(false);
            setLink(res.data.report.url);
            console.log(res.data.report.url);
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }
  React.useEffect(() => {
    const fetchData = async () => {
      await axios(baseURL + "/api/get-allwork")
        .then((res) => {
          setWorks(res.data.works);
          setTimeout(() => {
            generalate_report();
            setSuccess(true);
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    setTimeout(() => {
      fetchData();
    }, 1500);
  }, [id, IsUpdated, IsDel]);

  const handleLogout = () => {
    localStorage.removeItem("loginToken");
    window.location = "/dashboard";
  };
  const handleOpen = (workID, refId) => {
    setobjId(workID);
    setRefId(refId);
    setOpen(true);
  };
  const handleOpen2 = (workID, refId) => {
    setobjId(workID);
    setRefId(refId);
    setOpen2(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleChangeStatus = (e) => {
    e.preventDefault();
    setUpdate({
      ...update,
      Id: objId,
      [e.target.name]: e.target.value,
      refId: refId,
    });
    // console.log(update);
  };
  const handleChangeDiscription = (e) => {
    e.preventDefault();
    setUpdate({
      ...update,
      Id: objId,
      [e.target.name]: e.target.value,
      refId: refId,
    });
  };
  const status_color = (work) => {
    let style = {};
    if (work === "แล้วเสร็จ") {
      style = {
        fontFamily: "Kanit",
        textDecoration: "none",
        color: "rgb(255,255,255)",
        backgroundImage:
          "radial-gradient( circle 862px at 6% 18%,  rgba(21,219,149,1) 9.4%, rgba(26,35,160,1) 83.6% )",
        borderRadius: "20px",
      };
    }
    if (work === "รอดำเนินการ") {
      style = {
        fontFamily: "Kanit",
        textDecoration: "none",
        color: "rgb(255,255,255)",
        backgroundColor: "rgb(255,2,102)",
        borderRadius: "20px",
      };
    }
    if (work === "รออะไหล่") {
      style = {
        fontFamily: "Kanit",
        textDecoration: "none",
        color: "rgb(255,255,255)",
        backgroundColor: "rgb(255,200,15)",
        borderRadius: "20px",
      };
    }
    if (work === "มีค่าใช้จ่าย") {
      style = {
        fontFamily: "Kanit",
        textDecoration: "none",
        color: "rgb(255,255,255)",
        backgroundColor: "rgb(245,81,4)",
        borderRadius: "20px",
      };
    }
    if (work === "ซ่อมไม่ได้") {
      style = {
        fontFamily: "Kanit",
        textDecoration: "none",
        color: "rgb(255,255,255)",
        backgroundColor: "rgb(50,50,50)",
        borderRadius: "20px",
      };
    }
    return style;
  };
  function CoutWorks(works) {
    let summary = {
      all_work: 0,
      wait_parts: 0,
      pendding: 0,
      pay: 0,
      done: 0,
      cannot_fix: 0,
    };
    let all_work = 0;
    let pendding = 0;
    let wait_parts = 0;
    let pay = 0;
    let done = 0;
    let cannot_fix = 0;

    works.map((user) =>
      Object.entries(user).map((work) => {
        all_work += 1;
        if (work[1].WorkInfo.Status === "รอดำเนินการ") {
          pendding += 1;
        } else if (work[1].WorkInfo.Status === "มีค่าใช้จ่าย") {
          pay += 1;
        } else if (work[1].WorkInfo.Status === "รออะไหล่") {
          wait_parts += 1;
        } else if (work[1].WorkInfo.Status === "แล้วเสร็จ") {
          done += 1;
        } else if (work[1].WorkInfo.Status === "ซ่อมไม่ได้") {
          cannot_fix += 1;
        }
        return 0;
      })
    );
    summary = {
      all_work: all_work,
      wait_parts: wait_parts,
      pendding: pendding,
      pay: pay,
      done: done,
      cannot_fix: cannot_fix,
    };
    // console.log(summary);
    return summary;
  }
  function updateData() {
    setLoading(true);
    const fetchData = async () => {
      await axios
        .post(
          baseURL +
            "/api/update?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoi4Lie4Lix4LiX4LiY4LiZ4Lix4LiZ4LiX4LmMIOC4meC4uOC5iOC4oeC4nOC5iOC4reC4hyIsIlN0dWRlbnRJZCI6NjEzMDYwMn0.CYbnwnSMfSkZZj0HL-92_VByS2chxh55YHji_LQTwOI",
          update
        )
        .then((res) => {
          setIsUpdated(true);
          setTimeout(() => {
            setIsUpdated(false);
            setLoading(false);
            setOpen(false);
            setOpen2(false);
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }

  function ProgressWithLabel() {
    return (
      <Box position="relative" display="inline-flex">
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
          style={{ marginTop: "30px" }}
        >
          <Typography
            variant="caption"
            component="div"
            color="white"
            style={{
              fontSize: "50px",
              fontFamily: "Kanit",
              textAlign: "center",
            }}
          >
            {`${Math.round(
              (CoutWorks(works).done / CoutWorks(works).all_work) * 100
            )}%`}
          </Typography>
        </Box>
      </Box>
    );
  }

  function confrimDel(Id, refId) {
    // console.log(Id, refId);
    Swal.fire({
      title:
        '<h1 style={{fontFamily: "Kanit",textAlign: "center"}}>แน่ใจนะว่าจะลบงานซ่อม</h1 >',
      html:
        '<h1 style={{fontFamily: "Kanit",textAlign: "center",}} >ไม่สามารถเรียกคืนได้นะ</h1>',
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "ใช่, ลบเลย!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        setIsDel(true);
        setSuccess(false);
        const delData = async () => {
          await axios
            .post(
              baseURL +
                "/api/delete?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoi4Lie4Lix4LiX4LiY4LiZ4Lix4LiZ4LiX4LmMIOC4meC4uOC5iOC4oeC4nOC5iOC4reC4hyIsIlN0dWRlbnRJZCI6NjEzMDYwMn0.CYbnwnSMfSkZZj0HL-92_VByS2chxh55YHji_LQTwOI",
              { Id: Id, refId: refId }
            )
            .then((res) => {
              setTimeout(() => {
                Swal.fire("ลบสำเร็จ!", "", "success");
                setIsDel(false);
                setLoading(false);
                setSuccess(true);
              }, 1000);
            })
            .catch((err) => {
              console.log(err);
            });
        };
        delData();
      }
    });
  }
  return (
    <div className="App">
      <AppBar position="static" className={classes.bar}>
        <img
          onClick={() => (window.location = "/")}
          alt="icon"
          width="64px"
          style={{
            borderRadius: "50px",
            margin: "8px",
            alignSelf: "center",
          }}
          src="data:image/jpeg;base64,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"
        />
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            ระบบแจ้งซ่อมสำหรับหอพักนักเรียน โรงเรียนสุรวิวัฒน์
          </Typography>

          <Button
            style={{
              padding: "0.5rem",
              color: "orange",
              fontFamily: "Kanit",
              textAlign: "center",
              background: "white",
              marginRight: "10px",
            }}
            onClick={() => {
              window.location = "/";
            }}
          >
            <i className="fas fa-home" style={{ padding: "0.1rem" }}></i>
            Home
          </Button>
          <a href={link}>
            <Button
              style={{
                padding: "0.5rem",
                fontFamily: "Kanit",
                textAlign: "center",
                color: "white",
                background: "green",
                marginRight: "10px",
              }}
            >
              <i className="fas fa-table" style={{ padding: "0.1rem" }}></i>
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
              รายงาน
            </Button>
          </a>
          <Button
            style={{
              fontFamily: "Kanit",
              textAlign: "center",
              padding: "0.5rem",
              color: "orange",
              background: "white",
              marginRight: "10px",
            }}
            onClick={handleLogout}
          >
            <i
              className="fas fa-sign-out-alt"
              style={{ padding: "0.1rem" }}
            ></i>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Card className={classes.Card}>
        {!success ? (
          <FadeIn>
            <div>
              <Box display="flex" justifyContent="center">
                <h1
                  style={{
                    fontFamily: "Kanit",
                    textAlign: "center",
                  }}
                >
                  กำลังโหลด...
                </h1>
              </Box>
              <Box display="flex" justifyContent="center">
                <Lottie options={defaultOptions} height={240} width={240} />
              </Box>
            </div>
          </FadeIn>
        ) : (
          <div>
            <Box display="flex" justifyContent="center">
              <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
                spacing={1}
              >
                <Card item xs={6} className={classes.summaryCard}>
                  <CardMedia>
                    <i
                      className="fas fa-check-circle"
                      style={{ height: "50px" }}
                    ></i>
                  </CardMedia>
                  <Typography
                    style={{ fontFamily: "Kanit", textAlign: "center" }}
                  >
                    งานซ่อมแล้วเสร็จ
                  </Typography>
                  <ProgressWithLabel />
                </Card>
                <Card item xs={6} className={classes.summaryCard}>
                  <CardMedia>
                    <i className="fas fa-wrench" style={{ height: "50px" }}></i>
                  </CardMedia>
                  <Typography
                    style={{ fontFamily: "Kanit", textAlign: "center" }}
                  >
                    งานซ่อมทั้งหมด<br></br>
                    <span style={{ fontSize: "35px" }}>
                      {CoutWorks(works).all_work}
                    </span>
                    <br></br>
                    งาน
                  </Typography>
                </Card>
                <Card item xs={6} className={classes.summaryCard}>
                  <CardMedia>
                    <i className="fas fa-clock" style={{ height: "50px" }}></i>
                  </CardMedia>
                  <Typography
                    style={{ fontFamily: "Kanit", textAlign: "center" }}
                  >
                    รออะไหล่<br></br>
                    <span style={{ fontSize: "35px" }}>
                      {CoutWorks(works).wait_parts}
                    </span>
                    <br></br>
                    งาน
                  </Typography>
                </Card>
                <Card item xs={6} className={classes.summaryCard}>
                  <CardMedia>
                    <i className="fas fa-clock" style={{ height: "50px" }}></i>
                  </CardMedia>
                  <Typography
                    style={{ fontFamily: "Kanit", textAlign: "center" }}
                  >
                    รอดำเนินการ<br></br>
                    <span style={{ fontSize: "35px" }}>
                      {CoutWorks(works).pendding}
                    </span>
                    <br></br>
                    งาน
                  </Typography>
                </Card>
                <Card item xs={6} className={classes.summaryCard}>
                  <CardMedia>
                    <i
                      className="fab fa-bitcoin"
                      style={{ height: "50px" }}
                    ></i>
                  </CardMedia>
                  <Typography
                    style={{ fontFamily: "Kanit", textAlign: "center" }}
                  >
                    มีค่าใช้จ่าย<br></br>
                    <span style={{ fontSize: "35px" }}>
                      {CoutWorks(works).pay}
                    </span>
                    <br></br>
                    งาน
                  </Typography>
                </Card>
                <Card item xs={6} className={classes.summaryCard}>
                  <CardMedia>
                    <i className="fas fa-times-circle"></i>
                  </CardMedia>
                  <Typography
                    style={{ fontFamily: "Kanit", textAlign: "center" }}
                  >
                    ซ่อมไม่ได้<br></br>
                    <span style={{ fontSize: "35px" }}>
                      {CoutWorks(works).cannot_fix}
                    </span>
                    <br></br>
                    งาน
                  </Typography>
                </Card>
              </Grid>
            </Box>
            <Box display="grid">
              {works.length === 0 ? (
                <div>
                  <Lottie options={defaultOptions3} height={240} width={240} />
                  <p
                    style={{
                      fontFamily: "Kanit",
                      textDecoration: "none",
                      fontSize: "50px",
                      color: "black",
                    }}
                  >
                    ไม่มีรายการแจ้งซ่อม
                  </p>
                </div>
              ) : (
                works.map((user, idx) => (
                  <GridList
                    cellHeight={780}
                    cols={3}
                    style={{ marginTop: "50px" }}
                  >
                    {Object.entries(user).map((work, idx) => (
                      <Card style={{ width: "auto", overflowX: "scroll" }}>
                        <Card
                          className={classes.CardBTN}
                          key={idx}
                          style={{
                            padding: "1rem",
                            width: "320px",
                            height: "580px",
                            overflowY: "auto",
                          }}
                        >
                          <CardMedia>
                            <Typography
                              gutterBottom
                              variant="h8"
                              component="h4"
                              className={classes.head}
                              style={{
                                fontFamily: "Kanit",
                                textDecoration: "none",
                              }}
                            >
                              ผู้เเจ้ง : {work[1].WorkInfo.Name}
                            </Typography>
                            <Typography className={classes.head}>
                              No.{idx + 1}
                            </Typography>
                          </CardMedia>

                          <CardMedia
                            className={classes.media}
                            image={
                              work[1].hasOwnProperty("Image")
                                ? work[1].Image.Url
                                : "https://res.cloudinary.com/image-chatbot/image/upload/v1600499727/sws_fix/no-image_iysxah.jpg"
                            }
                          ></CardMedia>
                          <CardMedia>
                            <Typography
                              gutterBottom
                              variant="h8"
                              component="h4"
                              className={classes.text}
                              style={{
                                fontFamily: "Kanit",
                                textDecoration: "none",
                                color: "black",
                              }}
                            >
                              เลขประจำตัวนักเรียน : {work[1].WorkInfo.StudentId}
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="h8"
                              component="h4"
                              className={classes.text}
                              style={{
                                fontFamily: "Kanit",
                                textDecoration: "none",
                                color: "black",
                              }}
                            >
                              เลขห้องพัก : {work[1].WorkInfo.RoomCode}
                              {work[1].WorkInfo.RoomNumber}
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="h8"
                              component="h4"
                              className={classes.text}
                              style={{
                                fontFamily: "Kanit",
                                textDecoration: "none",
                                color: "black",
                              }}
                            >
                              รหัสอ้างอิง : #{work[0].slice(1, -1)}
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="h8"
                              component="h4"
                              className={classes.text}
                              style={{
                                fontFamily: "Kanit",
                                textDecoration: "none",
                                color: "black",
                              }}
                            >
                              ประเภทงานซ่อม : {work[1].WorkInfo.work}
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="h8"
                              component="h4"
                              className={classes.text}
                              style={{
                                fontFamily: "Kanit",
                                textDecoration: "none",
                                color: "black",
                              }}
                            >
                              อาการเสียที่แจ้ง : {work[1].WorkInfo.Discription}
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="h8"
                              component="h4"
                              className={classes.text}
                              style={{
                                fontFamily: "Kanit",
                                textDecoration: "none",
                                color: "black",
                              }}
                            >
                              วันที่แจ้ง : {work[1].Date}
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="h8"
                              component="h4"
                              className={classes.text}
                              style={status_color(work[1].WorkInfo.Status)}
                            >
                              สถานะ : {work[1].WorkInfo.Status}
                              {loading && (
                                <CircularProgress
                                  size={24}
                                  className={classes.buttonProgress}
                                />
                              )}
                              <Button
                                onClick={() => {
                                  handleOpen(
                                    work[0],
                                    work[1].WorkInfo.RoomCode +
                                      work[1].WorkInfo.RoomNumber +
                                      work[1].WorkInfo.StudentId
                                  );
                                }}
                              >
                                <i
                                  className="fas fa-edit"
                                  style={{ marginLeft: "25px", color: "white" }}
                                ></i>
                              </Button>
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="h8"
                              component="h4"
                              className={classes.text}
                              style={{
                                fontFamily: "Kanit",
                                textDecoration: "none",
                                color: "black",
                              }}
                            >
                              {loading && (
                                <CircularProgress
                                  size={24}
                                  className={classes.buttonProgress}
                                />
                              )}
                              คำอธิบายการซ่อม : <br></br>
                              {work[1].WorkInfo.FixDetail === ""
                                ? "คลิกเพื่อออธิบายงานซ่อม"
                                : work[1].WorkInfo.FixDetail}
                              <Button
                                onClick={() => {
                                  handleOpen2(
                                    work[0],
                                    work[1].WorkInfo.RoomCode +
                                      work[1].WorkInfo.RoomNumber +
                                      work[1].WorkInfo.StudentId
                                  );
                                }}
                              >
                                <i
                                  className="fas fa-edit"
                                  style={{ marginLeft: "25px", color: "black" }}
                                ></i>
                              </Button>
                            </Typography>
                            <Button
                              style={{
                                fontFamily: "Kanit",
                                textDecoration: "none",
                                color: "rgb(255,255,255)",
                                backgroundColor: "rgb(255,20,102)",
                                borderRadius: "20px",
                              }}
                              onClick={() => {
                                confrimDel(
                                  work[0],
                                  work[1].WorkInfo.RoomCode +
                                    work[1].WorkInfo.RoomNumber +
                                    work[1].WorkInfo.StudentId
                                );
                              }}
                            >
                              <i
                                className="fas fa-trash-alt"
                                style={{ padding: "0.1rem" }}
                              ></i>
                              {loading && (
                                <CircularProgress
                                  size={24}
                                  className={classes.buttonProgress}
                                />
                              )}
                              ลบงานซ่อม
                            </Button>
                          </CardMedia>
                        </Card>
                      </Card>
                    ))}
                  </GridList>
                ))
              )}
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <Card className={classes.CardTrack}>
                    <Typography
                      style={{ fontFamily: "kanit", fontSize: "25px" }}
                    >
                      Update Status
                      <br></br>
                      {refId}
                      <br></br>#{objId.slice(1, -1)}
                    </Typography>

                    <InputLabel
                      style={{
                        marginTop: "45px",
                        fontFamily: "Kanit",
                        color: "red",
                      }}
                      id="demo-simple-select-label"
                    ></InputLabel>
                    <InputLabel
                      style={{
                        marginTop: "60px",
                        fontFamily: "Kanit",
                      }}
                      id="demo-simple-select-label"
                    >
                      สถานะ
                    </InputLabel>
                    <Select
                      name="Status"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      onChange={handleChangeStatus}
                    >
                      <MenuItem value={"แล้วเสร็จ"}>แล้วเสร็จ</MenuItem>
                      <MenuItem value={"รออะไหล่"}>รออะไหล่</MenuItem>
                      <MenuItem value={"รอดำเนินการ"}>รอดำเนินการ</MenuItem>
                      <MenuItem value={"มีค่าใช้จ่าย"}>มีค่าใช้จ่าย</MenuItem>
                      <MenuItem value={"ซ่อมไม่ได้"}>ซ่อมไม่ได้</MenuItem>
                    </Select>

                    <Button
                      className={classes.Button}
                      style={{ marginLeft: "50px" }}
                      onClick={updateData}
                    >
                      {loading && (
                        <CircularProgress
                          size={24}
                          className={classes.buttonProgress}
                        />
                      )}
                      ยืนยันการเเก้ไข
                    </Button>
                  </Card>
                </Fade>
              </Modal>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open2}
                onClose={handleClose2}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open2}>
                  <Card className={classes.CardTrack}>
                    <Typography
                      style={{ fontFamily: "kanit", fontSize: "25px" }}
                    >
                      Update คำอธิบายการซ่อม <br></br>
                      {refId}
                      <br></br>#{objId.slice(1, -1)}
                    </Typography>
                    <InputLabel
                      style={{
                        marginTop: "45px",
                        fontFamily: "Kanit",
                        color: "red",
                      }}
                      id="demo-simple-select-label"
                    ></InputLabel>
                    <InputLabel
                      style={{
                        marginTop: "60px",
                        fontFamily: "Kanit",
                      }}
                      id="demo-simple-select-label"
                    >
                      คำอธิบายการซ่อม เช่น อาการเสีย, วิธีการแก้ไข
                    </InputLabel>

                    <TextareaAutosize
                      rowsMin={5}
                      columnMin={5}
                      name="Discription"
                      aria-label="maximum height"
                      placeholder="อาการเสีย, วิธีการแก้ไข"
                      defaultValue=""
                      style={{
                        marginTop: "10px",
                        width: "210px",
                        padding: "5px",
                        fontFamily: "Kanit",
                      }}
                      onChange={handleChangeDiscription}
                    />

                    <Button
                      className={classes.Button}
                      style={{ marginLeft: "50px" }}
                      onClick={updateData}
                    >
                      {loading && (
                        <CircularProgress
                          size={24}
                          className={classes.buttonProgress}
                        />
                      )}
                      ยืนยันการเเก้ไข
                    </Button>
                  </Card>
                </Fade>
              </Modal>
            </Box>
          </div>
        )}
      </Card>

      <Footer />
    </div>
  );
}

export default Dashboard;
