import React from 'react'
import AgoraRTC from "agora-rtc-sdk-ng";
import car from '../image/OIP.jpg';
import VidDevicesDropDown from "./VidDevicesDropDown";


    class Vdeo extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                hosting: false,
                vidDevices: []
            }
            this.rtc = {
                // For the local client.
                client: null,
                // For the local audio and video tracks.
                localAudioTrack: null,
                localVideoTrack: null,
            }
            this.options = {
                // Pass your app ID here.
                appId: "27ff03eb707843b0aa1c5eb4256e12e5",
                // Set the channel name.
                channel: "satyam",
                // Pass a token if your project enables the App Certificate.
                token: "00627ff03eb707843b0aa1c5eb4256e12e5IABfq7HGM0ikBkTlDxvDu+leJJchNiwb5Ed9J4NjEr8YMSajvmgAAAAAEABoKgnHVTsiYAEAAQBXOyJg",
                uid:null,
            }
        }
        async joinchannel(role){
            this.rtc.client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
             await this.rtc.client.join(this.options.appId, this.options.channel, this.options.token,this.options.uid?this.options.uid:null)
            await this.getDevices();
            console.log(this.vidDevices);
            this.rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
            this.rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
            this.rtc.localVideoTrack.play("video-div");
            this.rtc.localAudioTrack.play("");
            
         }
        leavechannel = async ()=>{

            // Destroy the local audio and video tracks.
            this.rtc.localAudioTrack.close();
            this.rtc.localVideoTrack.close();
            await this.rtc.client.leave();
            this.setState(
                {
                    hosting:false,
                    vidDevices: []
            });
        }
       async getDevices(){
            let videoDevices=[]
            AgoraRTC.getDevices().then(async(devices) => {
                // console.log('AMan',devices);
                videoDevices = devices.filter(function (device) {
                    return device.kind === "videoinput";
                });
                this.setState(
                    {
                        hosting:true,
                        vidDevices: videoDevices
                });
            })
        }
        render() {
            return (
                <div className="Main-div" >
                    <div>
                    <header>
                    <p style={{fontWeight:'bold'}}>videoDevices</p>
                    {this.state.hosting && <VidDevicesDropDown devices={this.state.vidDevices}/>}
                    
                    {!this.state.hosting && <button style={{marginLeft:"90%",marginRight:"15px",fontWeight:'bold'}} type="button" id="myBtn" onClick={()=>this.joinchannel('host')}>host</button>}
                    <img src={car} alt="leave" width="40px" height="40px" onClick={this.leavechannel} />
                    </header>
                    </div>
                    <div className="video" id="video-div" style={{height:'100vh',}}></div>
                  </div>
            )
        }
    
}

export default Vdeo
