import WorldVideo from '../../../assets/digital.mp4'
import logo from '../../../assets/logo1.png'

export default function HomeSection() {
  return (
    <div className="relative w-full" style={{ paddingTop: '43.4%' }}>
        <video
            src={WorldVideo}
            autoPlay
            loop
            muted
            className="absolute inset-0 w-full h-full object-cover"
        ></video>
        <div style={{position : "absolute" , top : "0" , height: "100%" , justifyContent:'center' ,
            width:"100%", display : 'flex', flexDirection:'column' , alignItems:"center" }}>
           <h1 className='text-white text-7xl'>welcome to
            <img style={{filter: 'drop-shadow(0px 12px 24px whitesmoke)'}} src={logo} className=' w-100' alt="" />
            </h1>
           <p className='text-white text-4xl'>create your resume and much more</p>
        </div>
</div>

  )
}
