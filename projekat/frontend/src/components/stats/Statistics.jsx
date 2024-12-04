import React, { useEffect, useState, useRef } from "react";
import {
  getNumberOfAdmins,
  getNumberOfArticlesPerCategory,
  getNumberOfCommentsByCategory,
  getNumberOfUsers,
} from "../../services/statsService";
import { Chart } from 'react-google-charts';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

function Statistics() {
  const [numberOfArticles, setNumberOfArticles] = useState([]);
  const [numberOfUsers, setNumberOfUsers] = useState(null);
  const [numberOfAdmins, setNumberOfAdmins] = useState(null);
  const [numberOfComments, setNumberOfComments] = useState([]);
  const chartsRef = useRef();

  useEffect(() => {
    async function fetchData() {
      try {
        const articles = await getNumberOfArticlesPerCategory();
        const users = await getNumberOfUsers();
        const admins = await getNumberOfAdmins();
        const comments = await getNumberOfCommentsByCategory();
        const formattedData = [["Kategorija", "Broj Članaka"]];
        formattedData.push(["NBA", articles.nba]);
        formattedData.push(["Evroliga", articles.evroliga]);
        formattedData.push(["Evrokup", articles.evrokup]);

        setNumberOfArticles(formattedData);
        setNumberOfUsers(users.broj_korisnika);
        setNumberOfAdmins(admins.broj_admina);
        setNumberOfComments(comments);
      } catch (error) {
        alert(error.message);
      }
    }
    fetchData();
  }, []);

  const userAdminData = [
    ['Tip', 'Broj'],
    ['Korisnici', numberOfUsers],
    ['Administratori', numberOfAdmins],
  ];

  const commentsData = [
    ['Kategorija', 'Broj Komentara'],
    ['NBA', numberOfComments.nba],
    ['Evroliga', numberOfComments.evroliga],
    ['Evrokup', numberOfComments.evrokup],
  ];

  const handleExportToPDF = () => {
    const doc = new jsPDF();
    html2canvas(chartsRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 190;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let position = 10;

      doc.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      doc.save("statistika.pdf");
    });
  };

  return (
    <div className="Statistics-div" ref={chartsRef}>
      <h2 className="Statistics-h2">Statistika</h2>
      <h3 className="Statistics-h3">Broj Članaka po Kategoriji</h3>
      <div className="Statistics-chart">
        <Chart
          chartType="ColumnChart"
          data={numberOfArticles}
          options={{
            title: "Broj Članaka po Kategoriji",
            chartArea: { width: "50%" },
            hAxis: {
              title: "Kategorija",
              minValue: 0,
            },
            vAxis: {
              title: "Broj Članaka",
            },
          }}
          width="100%"
          height="400px"
          legendToggle
        />
      </div>
      <h3 className="Statistics-h3">Korisnici i Administratori</h3>
      <div className="Statistics-pie-chart">
        <Chart
          chartType="PieChart"
          data={userAdminData}
          options={{
            title: 'Korisnici vs Administratori',
          }}
          width="100%"
          height="400px"
        />
      </div>
      <h3 className="Statistics-h3">Broj Komentara po Kategoriji</h3>
      <div className="Statistics-chart">
        <Chart
          chartType="ColumnChart"
          data={commentsData}
          options={{
            title: "Broj Komentara po Kategoriji",
            chartArea: { width: "50%" },
            hAxis: {
              title: "Kategorija",
              minValue: 0,
            },
            vAxis: {
              title: "Broj Komentara",
            },
          }}
          width="100%"
          height="400px"
          legendToggle
        />
      </div>
      <button className="user-button" onClick={handleExportToPDF}>Izvezi u PDF</button>
    </div>
  );
}

export default Statistics;