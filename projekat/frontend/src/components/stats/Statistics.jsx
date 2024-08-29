import React, { useEffect, useState } from "react";
import {
  getNumberOfAdmins,
  getNumberOfArticlesPerCategory,
  getNumberOfCommentsByCategory,
  getNumberOfUsers,
} from "../../services/statsService";
import { Chart } from 'react-google-charts';

function Statistics() {
  const [numberOfArticles, setNumberOfArticles] = useState([]);
  const [numberOfUsers, setNumberOfUsers] = useState(null);
  const [numberOfAdmins, setNumberOfAdmins] = useState(null);
  const [numberOfComments, setNumberOfComments] = useState([]);

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

  return (
    <div className="Statistics-div">
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
    </div>
  );
}

export default Statistics;
