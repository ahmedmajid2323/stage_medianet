import Accordion from 'react-bootstrap/Accordion';
import {PDFDownloadLink} from '@react-pdf/renderer';
import Personnelle from './forms_components.jsx/personnelle';
import Experience from './forms_components.jsx/experience';
import Projets from './forms_components.jsx/projets';
import Certificats from './forms_components.jsx/certificats';
import Competences from './forms_components.jsx/competences';

export default function Forms({document}) {

  return (
    <div>
      <div className="flex justify-evenly mb-11">
 
        <h1 style={{fontFamily:'cursive',fontWeight:'600'}} className="text-gray-800">
            create your resume 
        </h1>
        <div className='p-3 hover:bg-gray-500 cursor-pointer rounded-lg bg-gray-800 flex justify-normal items-center'>
          <PDFDownloadLink document={document} >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6">
                <path className='text-white' strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
          </PDFDownloadLink>
        </div>
       
      </div>

      <Accordion>
      <Accordion.Item eventKey="0" >
        <Accordion.Header >Informations personnelles</Accordion.Header>
        <Accordion.Body>

            <Personnelle/>

        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="1">
        <Accordion.Header>Experience </Accordion.Header>
        <Accordion.Body>
        
            <Experience/>

        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="2">
        <Accordion.Header>Vos projets</Accordion.Header>
        <Accordion.Body>
        
            <Projets/>

        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="3">
        <Accordion.Header>Vos certificats</Accordion.Header>
        <Accordion.Body>
       
            <Certificats/>

        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="4">
        <Accordion.Header>Vos compétences</Accordion.Header>
        <Accordion.Body>
          
            <Competences/>

        </Accordion.Body>
      </Accordion.Item>
     
    </Accordion>

    

    </div>
  )
}
