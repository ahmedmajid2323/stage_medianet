import { Page, Text, View,Font, Document, StyleSheet } from '@react-pdf/renderer';
import rubikSrc from './fonts/Rubik-VariableFont_wght.ttf'

export default function MyDocument({personnelleData,certificatData,experienceData,projectData,competenceData}) {

  Font.register({
    family: 'Rubik',
    src: rubikSrc
  });

  const styles = StyleSheet.create({
    emptyBox: {
      width: 10,
      height: 10,
      marginRight: 5,
      borderRadius:'100%',
      borderWidth: 1,
      borderColor: 'black',
    },
    filledBox: {
      width: 10,
      borderRadius:'100%',
      height: 10,
      marginRight: 5,
      backgroundColor: 'black',
    },
    page: {
      flexDirection: 'row', // This sets the direction of the main axis (like flex-direction in CSS)
      backgroundColor: '#ffffff',
    },
    gauche: {
      width: '30%', // Adjust width as needed
      backgroundColor: 'lightgray',
      padding: 15,
    },
    droite: {
      width: '70%', // Adjust width as needed
      padding: 10,
    },
    name: {
      textAlign:'center',
      fontFamily:'Rubik',
      fontSize:'20px',
      fontWeight:'600'
    },
    profession: {
      fontSize: 12,
      textAlign: 'center',
      fontFamily:'Rubik',
      marginTop: 5 ,
    },
    namediv:{
      marginBottom:'30px',
      marginTop:'30px'
    },
    title:{
      borderBottom:'1px solid black',
      padding:'10px 0px 8px 0px',
      textAlign:'left',
      fontWeight:'600',
      fontSize:'15px'
    },
    technicalSkills: {
      marginTop: '10px',
      flexDirection: 'row', // Arrange items in a row
      justifyContent: 'space-evenly', // Space evenly between items
    },
    technicalSkillColumn: {
      width: '45%', // Adjust width for each column as needed
    },
    technicalSkill: {
      flexDirection: 'row', // Arrange items in a row
      marginBottom: '10px', // Margin bottom for spacing between items
    },
    experience: {
      flexDirection: 'row', // Arrange items in a row
      display:'flex',
      justifyContent:'space-between', 
      padding: '10 10 0 10'
    },
    experience1: {
      flexDirection: 'row', // Arrange items in a row
      display:'flex',
      justifyContent:'space-between', 
      padding:' 0 10 0 10'
    },
    bulletPoint: {
      width: 5, // Width of the bullet point
      fontSize: 8, // Font size of the bullet point
      marginRight: 5, // Margin right for spacing between bullet point and text
    },
    bulletPoint1: {
      width: 10, // Width of the bullet point
      fontSize: 8, // Font size of the bullet point
      marginRight: 5, // Margin right for spacing between bullet point and text
    },
    listItemText: {
      fontSize: 12, // Font size of the list item text
       // Font family of the list item text
    },
    skillContainer: {
      marginBottom: 10,
      marginTop: 10,
      display:'flex',
      justifyContent:'space-between',
      flexDirection:'row'
    },
    skillRow: {
      flexDirection: 'row',
      marginBottom:'-5px'
    },
    skillLabel: {
      fontSize: 12,
      marginBottom: 5,
    },

    email_phone:{
      display:'flex',
      justifyContent:'space-between',
      flexDirection:'row',
    },
    phone:{
      fontFamily:'Rubik',
      fontSize:12
    },
    email:{
      fontFamily:'Rubik',
      fontSize:12
    },
    address:{
      fontFamily:'Rubik',
      fontSize:12,
      marginTop: 8 ,
    },
    summary:{
      marginTop: 8 ,
    },
    column:{
      marginBottom:'5px'
    },
    projectName:{
      fontSize:'12px',
      marginBottom: 4
    },
  })

  const technicalSkillss = competenceData?.technical_skills || [];
  const midIndex = Math.ceil(technicalSkillss.length / 2);
  const firstHalf = technicalSkillss.slice(0, midIndex);
  const secondHalf = technicalSkillss.slice(midIndex);

  return (
    <>

    <Document title='my resume'>
        <Page size='A4' style={styles.page}>

            {/* Partie gauche */}

            <View style={styles.gauche}>

              <View style={styles.namediv}>
                <Text style={styles.name} >
                  {personnelleData ? personnelleData.fullname : ''}
                </Text>
                <Text style={styles.profession} >
                {personnelleData ? personnelleData.profession : ''}
                </Text>
              </View>

              {competenceData?.technical_skills ? <Text style={styles.title}>Technical skills</Text> : null}
              <View style={styles.technicalSkills}>

                <View style={styles.technicalSkillColumn}>
                {firstHalf.map((item, index) => (
                  <Text style={styles.technicalSkill} key={index}>
                    <Text style={styles.listItemText}>•{item}</Text>
                  </Text>
                ))}
                </View>

                <View style={styles.technicalSkillColumn}>
                {secondHalf.map((item, index) => (
                  <Text style={styles.technicalSkill} key={midIndex + index}>
                    <Text style={styles.listItemText}>•{item}</Text>
                  </Text>
                ))}
                </View>

              </View>

              {competenceData?.general_skills ? <Text style={styles.title}>General skills</Text> : null}
              {Array.isArray(competenceData?.general_skills) && competenceData.general_skills.length > 0 ? (
              competenceData.general_skills.map((item, index) => (
                <View key={index} style={styles.skillContainer}>
                  <Text style={styles.skillLabel}>{item.title}</Text>
                  <View style={styles.skillRow}>
                    {Array.from({ length: 4 }, (_, i) => (
                      <View
                        key={i}
                        style={i < Number(item.level) ? styles.filledBox : styles.emptyBox}
                      />
                    ))}
                  </View>
                </View>
              ))
              ) : ''}

              {competenceData?.languages ? <Text style={styles.title}>Languages</Text> : null}
              {competenceData?.languages?.length > 0 ? (
              competenceData.languages.map((item, index) => (
                <View key={index} style={styles.skillContainer}>
                  <View>
                    <Text style={styles.skillLabel}>{item.title}</Text>
                  </View>  
                  <View style={styles.skillRow}>
                    {Array.from({ length: 4 }, (_, i) => (
                      <View
                        key={i}
                        style={i < Number(item.level) ? styles.filledBox : styles.emptyBox}
                      />
                    ))}
                  </View>
                </View>
              ))
            ) : ''}
          </View>

            {/* Partie droite */}

            <View style={styles.droite}>

              <View style={styles.email_phone}>
                <View>
                  <Text style={styles.email}>{personnelleData ? personnelleData.email : ''}</Text>
                </View>
                <View>
                  <Text style={styles.phone}>{personnelleData ? personnelleData.phone:''}</Text>
                </View>
              </View>
              <Text style={styles.address}>{personnelleData ? personnelleData.address:''}</Text>

              {personnelleData?.summary ? <Text style={styles.title}>Summary</Text> :null}
              <View style={styles.summary}>
                <Text style={styles.phone}>
                {personnelleData ? personnelleData.summary:''}
                </Text>
              </View>

              {experienceData ? <Text style={styles.title}>Experience</Text> :null}
              {experienceData ? experienceData.map((item , index)=>(
                <View key={index} style={styles.column} >

                <View style={styles.experience}>
                  <View >                  
                    <Text style={styles.email}>• {item.diplome}</Text>
                  </View>
                  <View>
                    <Text style={styles.phone}>{item.lieu}</Text>
                  </View>
                </View>

                <View style={styles.experience1}>
                  <View >                
                    <Text style={styles.email}>{item.company}</Text>
                  </View>
                  <View>
                    <Text style={styles.phone}>{item.date}</Text>
                  </View>
                </View>

              </View>
              )) : ''}
                

                {projectData ? <Text style={styles.title}>Projects</Text> :null}
                {projectData ? projectData.map((item , index)=>(
                  <View key={index} style={styles.summary}>
                  <View>
                    <Text style={styles.projectName}>{item.project}:</Text>
                  </View>
                  <Text style={styles.phone}>
                    {item.description}
                  </Text>
                </View>
                )) : ''}

                {certificatData ? <Text style={styles.title}>Certificates</Text> : null}
                { certificatData ? certificatData.map((item , index)=>(
                  <View key={index} style={styles.column} >

                  <View style={styles.experience}>
                    <View >                  
                      <Text style={styles.email}>• {item.organization}</Text>
                    </View>
                    <View>
                      <Text style={styles.phone}>{item.date}</Text>
                    </View>
                  </View>

                  <View style={styles.experience1}>
                    <View >                
                      <Text style={styles.email}> {item.title}</Text>
                    </View>
                  </View>

                </View>
                 )) : ''}


            </View>
          
        </Page>
        
    </Document>

    

    </>
  )
}
