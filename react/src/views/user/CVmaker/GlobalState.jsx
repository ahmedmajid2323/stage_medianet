import { createContext,  useState } from 'react';

export const GlobalContext = createContext({
  personnelle : {}, setPersonnelle:()=>{} ,
  experience_data:[] , setExperience:()=>{},
  projet:[] , setProjet:()=>{},
  certificat:[] , setCertificat:()=>{},
  competence:{} , setCompetence:()=>{},
});

// Provider 
export const GlobalProvider = ({ children }) => {

  const [personnelle , setPersonnelle] = useState({})
  const [experience_data , setExperience] = useState([])
  const [projet , setProjet] = useState([])
  const [certificat , setCertificat] = useState([])
  const [competence , setCompetence] = useState({})

  return (
    <GlobalContext.Provider 
    value={{
      setPersonnelle , personnelle ,
      experience_data , setExperience ,
      projet , setProjet ,
      certificat , setCertificat ,
      competence , setCompetence ,
     }}>

      {children}

    </GlobalContext.Provider>
  );
};
