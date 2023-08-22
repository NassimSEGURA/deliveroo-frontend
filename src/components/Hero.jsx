const Hero = ({ data }) => {
  const { name, description, picture } = data.restaurant;
  return (
    <div className="restaurantInfosWrapper">
      <div className="restaurantInfos">
        <div className="leftSide">
          <h1>{name}</h1>
          <p>{description}</p>
        </div>
        <div className="rightSide">
          <img className="rightSidePic" src={picture} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
