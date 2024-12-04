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
            try {
                const tabela = await getStandings(tournamentId, seasonId);
                setStandings(tabela.standings);
            } catch (error) {
                setError(error.message);
                setStandings([]);
            }
            setLoading(false);
        }
        fetchStandings();

    },[tournamentId,seasonId]);

  return {standings,loading,error};
}

export default useStandings