import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";

function Piechart() {
  const [objdata, setObjData] = useState([]);
  const [objlength, setObjLength] = useState(0);

  const [data, setData] = useState([]);
  const [noticeperiod, setNoticeperiod] = useState([]);
  const [noticedata, SetNoticeData] = useState([]);
  const [noticelength, SetNoticelength] = useState(0);
  const [experience, SetExperience] = useState([]);
  const [experiencelength, SetExperiencelength] = useState(0);

  const [coursejava, setCoursejava] = useState([]);
  const [courselength, setCourselength] = useState(0);

  const [coursepython, setCoursepython] = useState([]);
  const [course1length, setCourse1length] = useState(0);

  const [select, setSelect] = useState([]);
  const [interview, setInterview] = useState(0);
  const [rejected, setRejected] = useState(0);

  useEffect(() => {
    const immidiate = [];

    const getdata = async () => {
      const reqData = await fetch("http://localhost:1279/req");
      const resData = await reqData.json();

      setData(resData);
      for (let i = 0; i < resData.length; i++) {
        immidiate.push(resData[i].immi);

        noticeperiod.push(resData[i].notice);
        experience.push(resData[i].rexpy);
        coursejava.push(resData[i].id);
        select.push(resData[i].expy);
      }

      const filteredImmidiate = immidiate.filter((value) => value === "yes");
      const filteredNotice = noticeperiod.filter((value) => value < 30);
     
      const filteredexperience = experience.filter((value) => value > 2);
      const filteredcoursejava = coursejava.filter(
        (value) => value === "Sr JAVA Dev Jun23"
      );
      const filteredcoursepython = coursejava.filter(
        (value) => value === "Sr PYTHON Dev Jun23"
      );
      const filteredinterview = select.filter((value) => value === "InterView");
      const filteredrejected = select.filter((value) => value === "Rejected");
if(filteredexperience!==null){
  SetExperiencelength(filteredexperience.length)
}
else{
  SetExperiencelength(0)
}
if(filteredNotice!==null){
  SetNoticelength(filteredNotice.length)
}else{
  SetNoticelength(filteredNotice.length)
}
      if (filteredinterview !== null) {
        setInterview(filteredinterview.length);
      } else {
        setInterview(0);
      }

      if (filteredrejected !== null) {
        setRejected(filteredrejected.length);
      } else {
        setRejected(0);
      }
      if (filteredcoursejava !== null) {
        setCourselength(filteredcoursejava.length);
      } else {
        setCourselength(0);
      }
      if (filteredcoursepython !== null) {
        setCourse1length(filteredcoursepython.length);
      } else {
        setCourse1length(0);
      }
      setObjData(filteredImmidiate);
      setObjLength(filteredImmidiate.length);
    
    
     
    };

    getdata();
  }, []);

  return (
    <React.Fragment>
      <div className="container-flucourse mb-3">
        <h3 className="text-center">Welcome to Piechart </h3>
        <h4 className="text-center">Total No.of Applicants {data.length}</h4>
        <Chart
          type="pie"
          wcourseth={1349}
          height={550}
          series={[
            interview !== 0 ? interview / 2 : 0,
            rejected !== 0 ? rejected / 2 : 0, 
            courselength != 0 ? courselength / 2 : 0,
            course1length != 0 ? course1length / 2 : 0,
            objlength,
            noticelength!=0?noticelength/2:0,
            experiencelength!=0?experiencelength/2:0,
          ]}
          options={{
            title: { text: "" },
            noData: { text: "Empty Data" },
            // colors:["#f90000","#f0f"],
            labels: [
              "Selected InterView",
              "Rejected Candidates",
              "Applied For Sr JAVA Dev Jun23",
              "Applied For Sr PYTHON Dev Jun23",
              "Immidiate Joiners",
              "Notice Period below 30 Days",
              "Experience above 2 Years",
            ],
          }}
        ></Chart>
        <br />
        <br />
        <center>
          <Link to="/viewalldetails">View All Details</Link>
        </center>
      </div>
    </React.Fragment>
  );
}

export default Piechart;
