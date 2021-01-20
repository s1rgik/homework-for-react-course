const Card = ({ imgUrl, title, text }) => {
  return (
    <div className="card">
      <img className="card-img-top" src={imgUrl} alt="dish" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{text}</p>
        <a href="/" className="btn btn-primary">
          Go somewhere
        </a>
      </div>
    </div>
  );
};

export default Card;
