import ProgressBar from 'react-bootstrap/ProgressBar';

export default function Resume_tracker({technical , general , languages , experiences , projects , certificates}) {

  return (
    <div className=" flex justify-center items-center"
              style={{display:'grid',gridTemplateColumns: "50% 50%",gap:'10%',padding:'30px'}}>
                <div>

                  <h5 style={{ fontFamily: 'cursive', fontSize:'90%' }} className="text-gray-800 flex justify-center">
                    experience(s)
                  </h5>
                  <h5 style={{ fontFamily: 'cursive', fontSize:'90%' }} className="text-gray-800 flex justify-center">
                    ({experiences}/3)
                  </h5>
                  <ProgressBar animated variant='primaire' now={(experiences*100)/3} max={100} 
                  label={isNaN(Number(((experiences*100)/3).toFixed(1))) ? null : Number(((experiences*100)/3).toFixed(1))
                    &&
                    ((experiences*100)/3) >100 ? 100 : Number(((experiences*100)/3).toFixed(1))
                  }  />  

                  <br />
                  <h5 style={{ fontFamily: 'cursive', fontSize:'90%' }} className="text-gray-800 flex justify-center">
                    project(s)
                  </h5>
                  <h5 style={{ fontFamily: 'cursive', fontSize:'90%' }} className="text-gray-800 flex justify-center">
                    ({projects}/6)
                  </h5>
                  <ProgressBar animated variant='primaire' now={(projects*100)/6} max={100} 
                  label={isNaN(Number(((projects*100)/6).toFixed(1))) ? null : Number(((projects*100)/6).toFixed(1))
                    &&
                    ((projects*100)/3) >100 ? 100 : Number(((projects*100)/6).toFixed(1))
                  }   />   
                  <br />
                  <h5 style={{ fontFamily: 'cursive', fontSize:'90%' }} className="text-gray-800 flex justify-center">
                    certificate(s)
                  </h5>
                  <h5 style={{ fontFamily: 'cursive', fontSize:'90%' }} className="text-gray-800 flex justify-center">
                    ({certificates}/3)
                  </h5>
                  <ProgressBar animated variant='primaire' now={(certificates*100)/3} max={100}
                   label={isNaN(Number(((certificates*100)/3).toFixed(1))) ? null : Number(((certificates*100)/3).toFixed(1))
                    &&
                    ((certificates*100)/3) >100 ? 100 : Number(((certificates*100)/3).toFixed(1))
                   }   />    
                      

                </div>

                <div>
                     
                  <h5 style={{ fontFamily: 'cursive', fontSize:'90%' }} className="text-gray-800 flex justify-center">
                    technical skills
                  </h5>
                  <h5 style={{ fontFamily: 'cursive', fontSize:'90%' }} className="text-gray-800 flex justify-center">
                    ({technical}/6)
                  </h5>
                  <ProgressBar animated variant='primaire' now={(technical*100)/6} 
                  label={isNaN(Number(((technical*100)/6).toFixed(1))) ? null : Number(((technical*100)/6).toFixed(1))
                    &&
                    ((technical*100)/6) >100 ? 100 : Number(((technical*100)/6).toFixed(1))
                  }   />
                  <br />
                  <h5 style={{ fontFamily: 'cursive', fontSize:'90%' }} className="text-gray-800 flex justify-center">
                    general skills
                  </h5>
                  <h5 style={{ fontFamily: 'cursive', fontSize:'90%' }} className="text-gray-800 flex justify-center">
                    ({general}/3)
                  </h5>
                  <ProgressBar animated variant='primaire' now={(general*100)/3} max={100}
                  label={isNaN(Number(((general*100)/3).toFixed(1))) ? null : Number(((general*100)/3).toFixed(1))
                    &&
                    ((general*100)/3) >100 ? 100 : Number(((general*100)/3).toFixed(1))
                  }   /> 
                  <br />
                  <h5 style={{ fontFamily: 'cursive', fontSize:'90%' }} className="text-gray-800 flex justify-center">
                    languages
                  </h5>
                  <h5 style={{ fontFamily: 'cursive', fontSize:'90%' }} className="text-gray-800 flex justify-center">
                    ({languages}/3)
                  </h5>
                  <ProgressBar animated variant='primaire' now={(languages*100)/3} max={100}
                  label={isNaN(Number(((languages*100)/3).toFixed(1))) ? null : Number(((languages*100)/3).toFixed(1))
                    &&
                    ((languages*100)/3) >100 ? 100 : Number(((languages*100)/3).toFixed(1))
                  }   />
                  

                </div>
              </div>
  )
}
