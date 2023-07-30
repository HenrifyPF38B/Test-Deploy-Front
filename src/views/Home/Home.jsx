import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Home.module.css";
import { PlaylistContext } from "../../contexts/playlistContext";
import PlaylistModal from "../../modals/playlistModal";
import drake from "../../components/assets/quiente.jpg";
import { useNavigate } from 'react-router-dom';
import DropdownMenu from '../../components/dropdownMenu/dropdownMenu';
import PlaylistCard from "../../components/Cards/playlistCard";
import AlbumCard from "../../components/Cards/albumCard";
import SongCard from "../../components/Cards/songCard";
import anuncio from '../../components/assets/anuncio.png';
import video from "../../components/assets/polina.mp4"
import { useDispatch, useSelector } from "react-redux";
import { getSongs } from "../../redux/Actions/SongsActions";
import { getAlbums } from "../../redux/Actions/AlbumsActions";
import { Typeahead } from "react-bootstrap-typeahead";

const Home = () => {


  const testCards = [1, 2, 3, 4];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const { songs, albums, playlists } = state;

  const data = useContext(PlaylistContext);
  const { modalOpen, setModalOpen } = data;


  const refSlider = useRef();

  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const period = 2000;
  const toRotate = [
    "Welcome to Soul Life!",
    "Life is better with music!",
    "Listen your favorite songs!",
  ];
  const [popOpen, setPopOpen] = useState(false);
  const [optionsSearch, setOptionsSearch] = useState([]);


  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);
    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  };

  useEffect(() => {

    console.log(songs);
    let options = [];
    songs.map((el, index) => {
      options.push({
        id: el.id,
        label: el.artists[0].name + " • " + el.name,
        name: el.name,
        audioPreview: el.audioPreview,
        audioFull: el.audioFull,
        image: el.image,
        artists: el.artists
      });
    });
    setOptionsSearch(options);
  }, [songs]);

  

  return (
    <div>
             
      <div className={styles.welcome}>
        <span className="wrap">{text}</span>
      </div>

        <div className={styles.container}>
          <div className="d-flex justify-content-start ps-5 ms-4 mb-5 pb-3">
            {/* <div className={styles.searchBar}>
              <Typeahead

                placeholder='What do you want to listen today?'
                onChange={(selected) => console.log(selected)}
                options={optionsSearch}
              />
            </div> */}
          </div>
          {/* POPULAR PLAYLISTS */}
          <div className={styles.container2}>
            <div className='d-flex align-items-center justify-content-between'>
              <h2 style={{letterSpacing: "1.5px"}}>Popular Playlists</h2>
              <span className={styles.seeAll} onClick={()=> navigate("/seeAll/playlists")}>See all</span>
            </div>
            <div ref={refSlider} className={styles.containerSlider}>
            {
                playlists.length && playlists.map((el, index) =>{
              
                  if(index === 0 || index === 7 || index === 8 || index === 4)
                  return(
                    <PlaylistCard
                      
                      key={index}
                      creator={el.owner}
                      playlist={el.name}
                      image={el.image}
                      id={el.id}
                      playlistId={el.playlistId}
                      price={el.price}
                    />
                  )
                })
              }
            </div>
          </div>
          {/* FIRTS POP UP */}
          <div className={styles.videoWrapper}>
            <video playsInline autoPlay muted loop>
                <source src={video} type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
            <div className={styles.welcomePop}>
              <div className={styles.leftPop}>
                <div>
                  <p>Did you know you can create your own personalized Playlist?</p>
                  <p>Just click the button below!</p>
                </div>
                <div className="fa-bounce" onClick={()=> navigate("/myPlaylist")}>
                  <button>Let's go!</button>
                </div>
              </div>
            </div>
          </div>

          {/* POPULAR SONGS */}
          <div className={styles.container2} style={{marginTop:"7rem"}}>
            <div className='d-flex align-items-center justify-content-between'>
              <h2 style={{letterSpacing: "1.5px"}}>Popular Songs</h2>
              <span className={styles.seeAll} onClick={()=> navigate("/store")}>See all</span>
            </div>
            <div ref={refSlider} className={styles.containerSlider}>
            <SongCard
              artist={songs[0]?.artists.map((artist, index) => {
                if(index === songs[0]?.artists.length - 1){
                  return artist.name
                }else{
                  return artist.name + " • "
                }
              })}
              song={songs[0]?.name}
              id={songs[0]?.id}
              img={songs[0]?.image}
              audio={songs[0]?.audioPreview}
              audioFull={songs[0]?.audioFull}
              songId={songs[0]?.songId}
              explicit={songs[0]?.explicit}
            />
            <SongCard
              artist={songs[60]?.artists.map((artist, index) => {
                if(index === songs[60]?.artists.length - 1){
                  return artist.name
                }else{
                  return artist.name + " • "
                }
              })}
              song={songs[60]?.name}
              id={songs[60]?.id}
              img={songs[60]?.image}
              audio={songs[60]?.audioPreview}
              audioFull={songs[60]?.audioFull}
              songId={songs[60]?.songId}
              explicit={songs[60]?.explicit}
            />
            <SongCard
              artist={songs[150]?.artists.map((artist, index) => {
                if(index === songs[150]?.artists.length - 1){
                  return artist.name
                }else{
                  return artist.name + " • "
                }
              })}
              song={songs[150]?.name}
              id={songs[150]?.id}
              img={songs[150]?.image}
              audio={songs[150]?.audioPreview}
              audioFull={songs[150]?.audioFull}
              songId={songs[150]?.songId}
              explicit={songs[150]?.explicit}
            />
            <SongCard
              artist={songs[15]?.artists.map((artist, index) => {
                if(index === songs[15]?.artists.length - 1){
                  return artist.name
                }else{
                  return artist.name + " • "
                }
              })}
              song={songs[15]?.name}
              id={songs[15]?.id}
              img={songs[15]?.image}
              audio={songs[15]?.audioPreview}
              audioFull={songs[15]?.audioFull}
              songId={songs[15]?.songId}
              explicit={songs[15]?.explicit}
            />
            
            
            </div>
          </div>

          <div className={styles.bestSellerWrapper}>
            <div className={styles.bestSellerImg}>
              {/* <img className='me-5' src="/images/star.svg" alt="abc" /> */}
              <div className={styles.landingPanelTitle}>
                <h2>Best Sellers Songs</h2>
              </div>

              {/* <img className='ms-5' src="/images/surprise.svg" alt="abc" /> */}
            </div>
            <div className={styles.prizes}>

                <div className={styles.prizesCard}>
                  <div className={styles.prizeImg}>
                    <img src="/images/prize1.svg" alt="abc" />
                  </div>
                  <div className={styles.cardImg}>
                    <img src={songs[72]?.image} alt="abc" />
                  </div>
                  
                  <div className={styles.span}>
                    <span>{songs[72]?.artists[0].name}</span>
                    <span>{songs[72]?.name.length > 27 ? songs[72]?.name.slice(0, 26) + "…" : songs[72]?.name}</span>
                  </div>
                </div>
                
                <div className={styles.prizesCard}>
                  <div className={styles.prizeImg}>
                    <img src="/images/prize2.svg" alt="abc" />
                  </div>
                  <div className={styles.cardImg}>
                    <img src={songs[370]?.image} alt="abc" />
                  </div>
                  
                  <div className={styles.span}>
                    <span>{songs[370]?.artists[0].name}</span>
                    <span>{songs[370]?.name.length > 27 ? songs[370]?.name.slice(0, 26) + "…" : songs[370]?.name}</span>
                  </div>
                </div>
                
                <div className={styles.prizesCard}>
                  <div className={styles.prizeImg}>
                    <img src="/images/prize3.svg" alt="abc" />
                  </div>
                  <div className={styles.cardImg}>
                    <img src={songs[400]?.image} alt="abc" />
                  </div>
                  
                  <div className={styles.span}>
                    <span>{songs[400]?.artists[0].name}</span>
                    <span>{songs[400]?.name.length > 27 ? songs[400]?.name.slice(0, 26) + "…" : songs[400]?.name}</span>
                  </div>
                </div>
                
                <div className={styles.prizesCard}>
                  <div className={styles.prizeImg}>
                    <img src="/images/prize4.svg" alt="abc" />
                  </div>
                  <div className={styles.cardImg}>
                    <img src={songs[336]?.image} alt="abc" />
                  </div>
                  
                  <div className={styles.span}>
                    <span>{songs[336]?.artists[0].name}</span>
                    <span>{songs[336]?.name.length > 27 ? songs[336]?.name.slice(0, 26) + "…" : songs[336]?.name}</span>
                  </div>
                </div>
              
            </div>
            
          </div>
        
          {/* POPULAR ALBUMS */}
          <div className={styles.container2} style={{marginTop:"7rem"}}>
            <div className='d-flex align-items-center justify-content-between'>
              <h2 style={{letterSpacing: "1.5px"}}>Popular Albums</h2>
              <span className={styles.seeAll} onClick={()=> navigate("/seeAll/albums")}>See all</span>
            </div>
            <div ref={refSlider} className={styles.containerSlider}>
            <AlbumCard
              artist={albums[0]?.artists}
              album={albums[0]?.name}
              image={albums[0]?.image}
              id={albums[0]?.id}
              albumId={albums[0]?.albumId}
              price={albums[0]?.price}
            />
            <AlbumCard
              artist={albums[1]?.artists}
              album={albums[1]?.name}
              image={albums[1]?.image}
              id={albums[1]?.id}
              albumId={albums[1]?.albumId}
              price={albums[1]?.price}
            />
            <AlbumCard
              artist={albums[2]?.artists}
              album={albums[2]?.name}
              image={albums[2]?.image}
              id={albums[2]?.id}
              albumId={albums[2]?.albumId}
              price={albums[2]?.price}
            />
            <AlbumCard
              artist={albums[3]?.artists}
              album={albums[3]?.name}
              image={albums[3]?.image}
              id={albums[3]?.id}
              albumId={albums[3]?.albumId}
              price={albums[3]?.price}
            />
            </div>
          </div>
        </div>
    </div>
  );
};

export default Home;