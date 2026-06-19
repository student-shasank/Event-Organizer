"use client";
import { useState } from 'react';
import ModalVideo from 'react-modal-video';
import 'react-modal-video/css/modal-video.css';
import videoBg from '../..//assets/images/resources/maxresdefault.png'

export default function VideoOne() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <> 
            <section className="video-one" style={{ position: 'relative'}}>
                <div className="container">
                    <div className="video-one__inner wow fadeInUp" data-wow-delay="300ms">
                        <div className="video-one__img" style={{position:'relative' 
                            
                        }}>
                            
                            {/* overlay to hide unwanted number */}
                            <div style={{
                                position:'absolute',
                                inset:0,
                                background:'#e9e9e9',
                                borderRadius:'20px',
                                zIndex:0
                            }}></div>

                            <img src={videoBg} alt="Video Thumbnail" style={{position:'relative', zIndex:1, height:'500px' , objectFit:'cover'}} />

                            <div className="video-one__video-link" style={{zIndex:3}}>
                                <div 
                                    onClick={() => setIsOpen(true)} 
                                    className="video-popup" 
                                    style={{ cursor: 'pointer', display: 'inline-block' }}
                                >
                                    <div className="video-one__video-icon">
                                        <span className="icon-awesome-play"></span>
                                        <i className="ripple"></i>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <ModalVideo
                    channel="youtube"
                    isOpen={isOpen}
                    videoId="RFe1gk9zs64"
                    onClose={() => setIsOpen(false)}

                   
                />
            </section>
        </>
    );
}