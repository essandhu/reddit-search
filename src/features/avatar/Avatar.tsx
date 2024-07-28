import React, { useEffect, useState } from 'react';
import './Avatar.css';
import defaultAvatar from '../../images/reddit-default-icon.png';

const Avatar = (props: any) => {
  const { name } = props;
  const userUrlInfo = `https://www.reddit.com/user/${name}/about.json`;
  //const defaultAvatar = `https://www.redditstatic.com/avatars/avatar_default_02_EA0027.png`;  // red background
  const [userUrl, setUserUrl] = useState('');

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetch(userUrlInfo);
        const data = await response.json();
        const imageSrc = data.data.icon_img;
        setUserUrl(imageSrc);
      } catch (error) {
        setUserUrl(defaultAvatar);
      }
    };
    fetchProfileImage();
  }, [name, userUrlInfo]);
  
  return (
    <img
      src={userUrl}
      alt={`${name} profile`}
      onError={() => setUserUrl(defaultAvatar)}
      className="avatar-profile-image"
    />
  );
};

export default Avatar;
