import "../styles/variables.css";
import "../styles/profileIcon.css";

const ProfileIcon = () => {
  const handleProfile = () =>{
    window.open('https://inotebook-496bd.web.app/signup', '_blank');
  }
  return (
    <div className="profileIcon" onClick={handleProfile}>
      <div className="headIcon"></div>
      <div className="bodyIcon" />
    </div>
  );
};

export default ProfileIcon;
