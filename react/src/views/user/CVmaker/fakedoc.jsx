

export default function Fakedoc({personnelleData,certificatData,experienceData,projectData,competenceData}) {

  const page=  {
    display: 'grid', 
    gridTemplateColumns : '30% 70%' ,
    height:'100%',
    border : '1.5px solid lightgray'
  }
  const gauche= {
    backgroundColor: 'lightgray',
    padding: 15,
  }
  const  droite= {
    padding: 10,
  }
  const name = {
    textAlign:'center',
    fontSize:'20px',
  }
  const profession = {
    fontSize: 12,
    textAlign: 'center',
    fontFamily:'Rubik',
    marginTop: 5 ,
    marginBottom: 60 ,
  }
  const email_phone = {
    display:'flex',
    justifyContent:'space-between',
    flexDirection:'row',
  }
  const phone = {
    fontFamily:'Rubik',
    fontSize:12,
    marginLeft: '-3px'
  }
  const email ={
    fontFamily:'Rubik',
    fontSize:12
  }
  const address ={
    fontFamily:'Rubik',
    fontSize:12,
    marginTop: '8px'
  }
  const title ={
    borderBottom:'1px solid black',
    padding:'3px 0px 8px 0px',
    textAlign:'left',
    fontWeight:'600',
    fontSize:'15px',
    marginBottom : '8px'
  }
  const title_project ={
    borderBottom:'1px solid black',
    padding:'3px 0px 8px 0px',
    textAlign:'left',
    fontWeight:'600',
    fontSize:'15px',
    marginBottom : '8px'
  }
  const summary= {
    marginTop : 8
  }
  const column ={
    marginBottom :'5px'
  }
  const experience = {
    flexDirection: 'row', // Arrange items in a row
    display:'flex',
    justifyContent:'space-between', 
    padding: '10 10 0 10'
  }
  const experience1 = {
    flexDirection: 'row', // Arrange items in a row
    display:'flex',
    justifyContent:'space-between', 
    padding: '0 10 0 10'
  }
  const projectName ={
    fontSize:'12px',
    marginBottom: 4
  }
  const technicalSkill = {
    flexDirection: 'row', 
    marginBottom: '10px',
  }
  const technicalSkillColumn = {
    width: '45%',
  }
  const technicalSkills ={
    marginTop: '10px',
    marginLeft:'20px',
    display : 'flex', 
    justifyContent: 'space-evenly', 
  }
  const listItemText = {
    fontSize: 12,
  }
  const filledBox= {
    width: 10,
    height: 10,
    borderRadius : '50%',
    marginRight: 5,
    backgroundColor: 'black',
  }
  const emptyBox= {
    width: 10,
    borderRadius : '50%',
    height: 10,
    marginRight: 5,
    borderWidth: 1,
    borderColor: 'black',
  }
  const skillContainer= {
    marginBottom: 10,
    marginTop: 10,
    display:'flex',
    justifyContent:'space-evenly'
  }
  const skillRow= {
    display:'flex',
    marginTop:'4px'
  }
  const skillLabel= {
    fontSize: 12,
    marginBottom: 5,
  }
  const technicalSkillss = competenceData?.technical_skills || [];
  const midIndex = Math.ceil(technicalSkillss.length / 2);
  const firstHalf = technicalSkillss.slice(0, midIndex);
  const secondHalf = technicalSkillss.slice(midIndex);
    return (
      
    <div style={page}>
{/********************************gauche************************* */}
        <div style={gauche}>
            <div style={name}>
              {personnelleData ? personnelleData.fullname : ''}
            </div>
            <div style={profession}>
                {personnelleData ? personnelleData.profession : ''}
            </div>

            {competenceData?.technical_skills ? <div style={title}>Technical skills</div> : null}
            <div style={technicalSkills}>
              <div style={technicalSkillColumn}>
                {firstHalf.map((item, index) => (
                  <div style={technicalSkill} key={index}>
                    <div style={listItemText}>•{item}</div>
                  </div>
                ))}
              </div>

              <div style={technicalSkillColumn}>
                {secondHalf.map((item, index) => (
                  <div style={technicalSkill} key={midIndex + index}>
                    <div style={listItemText}>•{item}</div>
                  </div>
                ))}
              </div>
            </div>
  

            {competenceData?.general_skills ? <div style={title}>General skills</div> : null}
            {Array.isArray(competenceData?.general_skills) && competenceData.general_skills.length > 0 ? (
              competenceData.general_skills.map((item, index) => (
                <div key={index} style={skillContainer}>
                  <div style={skillLabel}>{item.title}</div>
                  <div style={skillRow}>
                    {Array.from({ length: 4 }, (_, i) => (
                      <div
                        key={i}
                        style={i < Number(item.level) ? filledBox : emptyBox}
                      />
                    ))}
                  </div>
                </div>
              ))
            ) : ''}

            {competenceData?.languages ? <div style={title}>Languages</div> : null}
            {competenceData?.languages?.length > 0 ? (
              competenceData.languages.map((item, index) => (
                <div key={index} style={skillContainer}>
                  <div style={skillLabel}>{item.title}</div>
                  <div style={skillRow}>
                    {Array.from({ length: 4 }, (_, i) => (
                      <div
                        key={i}
                        style={i < Number(item.level) ? filledBox : emptyBox}
                      />
                    ))}
                  </div>
                </div>
              ))
            ) : ''}

        </div>


    {/***********************************droite***************************/}
        <div style={droite}>
            <div style={email_phone}>
                <div >
                    <div style={email}>
                        {personnelleData ? personnelleData.email : ''}
                    </div>
                </div>
                <div >
                    <div style={phone}>
                        {personnelleData ? personnelleData.phone:''}
                    </div>
                </div>
            </div>
            <div style={address}>{personnelleData ? personnelleData.address:''}</div>
            
            {personnelleData?.summary ? <div style={title}>Summary</div> :null}
            <div style={summary}>
                <div style={phone}> {personnelleData ? personnelleData.summary:''}</div>
            </div>

            {experienceData ? <div style={title}>Experience</div> :null}
            {experienceData ? experienceData.map((item , index)=>(
                <div style={column} key={index}>
                    <div style={experience}>
                        <div>
                            <div style={email}> • {item.diplome}</div>
                        </div>
                        <div>
                            <div style={phone}> {item.lieu}</div>
                        </div>
                    </div>
                    <div style={experience1}>
                        <div>
                            <div style={email}>{item.company}</div>
                        </div>
                        <div>
                            <div style={phone}> {item.date}</div>
                        </div>
                    </div>
                </div>
            )) : ''}
            

            {projectData ? <div style={title_project}>Projects</div> :null}
            {projectData ? projectData.map((item , index)=>(
                <div style={summary} key={index}>
                    <div>
                        <div style={projectName}>{item.project}:</div>
                    </div>
                    <div style={phone}>
                        {item.description}
                    </div>
                </div>
            )) : ''}

            {certificatData ? <div style={title_project}>Certificates</div> : null}
            { certificatData ? certificatData.map((item , index)=>(
                <div style={column} key={index} >
                    <div style={experience}>
                        <div>
                            <div style={email}>• {item.organization}</div>
                        </div>
                        <div>
                            <div style={phone}>{item.date}</div>
                        </div>
                    </div>

                    <div style={experience1}>
                        <div>
                            <div style={email}> {item.title}</div>
                        </div>
                    </div>
                </div>
             )) : ''} 
            
        </div>
    </div>
  )

 
} 
