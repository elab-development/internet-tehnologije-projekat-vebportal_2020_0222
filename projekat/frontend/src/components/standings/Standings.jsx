import React from 'react';
import './Standings.css';

function Standings({ standings }) {
  return (
    <div className="standings-container">
      {standings.map((group, index) => (
        <div key={index} className="standings-group">
          <h2 className="standings-tournament-name">Tabela Evrolige</h2>
          <table className="standings-table">
            <thead>
              <tr>
                <th>Pozicija</th>
                <th>Naziv Tima</th>
                <th>Broj Pobeda</th>
                <th>Broj Poraza</th>
                <th>Niz</th>
              </tr>
            </thead>
            <tbody>
              {group.rows.map((team, index) => (
                <tr key={index}>
                  <td>{team.position}</td>
                  <td>{team.team.name}</td>
                  <td>{team.wins}</td>
                  <td>{team.losses}</td>
                  <td>{team.streak}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default Standings;
