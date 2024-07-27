import React from 'react';

function Standings({ standings }) {
  return (
    <div>
      {standings.map((group, index) => (
        <div key={index}>
          <h2>{group.tournament.name}</h2>
          <table>
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
