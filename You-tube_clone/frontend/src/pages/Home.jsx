import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({type}) => {

  const [videos,setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = () => {
    
      fetch('http://localhost:8080/videos/'+type)
      .then(res => res.json())
      .then(response => {
        setVideos(response.videos)
    })
    .catch(err => console.log(err));
    }

    fetchVideos();
  },[type]);

  const videoContent = videos.map(video => <Card key={video._id} video={video} />);

  return (
    <Container>
      {videoContent}
    </Container>
  );
};

export default Home;
