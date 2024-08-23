import React, { useEffect, useState } from 'react'
import { getStandings } from '../services/rapidApiService';

function useStandings({tournamentId, seasonId}) {

    const [standings, setStandings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{

        const fetchStandings = async()=>{
            if(tournamentId === 0){
                setStandings([]);
                return;
            }
            setLoading(true);
            console.log("Pre try catch-a");
            try {
                const tabela = await getStandings(tournamentId, seasonId);
                console.log("Pre await: ");
                setStandings(tabela.standings);
                console.log("Stanje: " + JSON.stringify(standings) );
            } catch (error) {
                setError(error.message);
                console.log("Errorcina");
            }
            setLoading(false);
        }
        fetchStandings();

    },[tournamentId,seasonId]);

  return {standings,loading,error};
}

export default useStandings