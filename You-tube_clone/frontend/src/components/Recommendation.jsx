import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";

const Container = styled.div`
  flex: 2;
`;

const Recommendation = ({ tags }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = () => {
      fetch('http://localhost:8080/videos/tags/?tags='+tags,{
        method : 'GET',
        credentials : 'include'
      })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        setVideos(result.videos);
      }).catch(err => console.log(err));
    };

    fetchVideos();
  }, [tags]);

  return (
    <Container>
      {videos.map((video) => (
        <Card type="sm" key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Recommendation;