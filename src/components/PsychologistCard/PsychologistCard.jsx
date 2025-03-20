import css from './PsychologistCard.module.css';
import { AiFillStar, AiOutlineHeart } from "react-icons/ai";

const PsychologistCard = ({ psychologist }) => {
  if (!psychologist) return null;
    const { name,
        avatar_url,
        experience,
        reviews,
        price_per_hour,
        rating,
        license,
        specialization,
        initial_consultation,
        about,
    } = psychologist;

    return (
      <>
        <div className={css.containerCard}>
          <div className={css.cardHeader}>
            <img src={avatar_url} alt={name} className={css.avatar} />
          </div>
          <h3 className={css.tittleName}>{name}</h3>
          <p className={css.text}>Psychologist</p>
        </div>

        <div className={css.cardInfo}>
          <span className={css.rating}>
            <AiFillStar className={css.starIcon} /> {rating}
            <span className={css.reviews}>({reviews} reviews)</span>
          </span>
          <span className={css.divider}>|</span>
          <span className={css.price}>
            Price / 1 hour:{" "}
            <span className={css.highlightPrice}>${price_per_hour}</span>
          </span>
          <AiOutlineHeart className={css.heartIcon} />
        </div>
        <div className={css.cardTags}>
          <span className={css.tag}>
            Experience: <strong>{experience} years</strong>
          </span>
          <span className={css.tag}>License: {license}</span>
        </div>
        <div className={css.specialization}>
          <span>
            Specialization:{" "}
            <a href="#specialization" className={css.link}>
              {specialization}
            </a>
          </span>
          <span>
            | Initial consultation:{" "}
            <a href="#consultation" className={css.link}>
              {initial_consultation
                ? "Free 45-minute initial consultation"
                : "Not available"}
            </a>
          </span>
        </div>
        <p className={css.about}>{about}</p>
        <div>
          <a href="#read-more" className={css.readMore}>
            Read more
          </a>
        </div>
      </>
    );
}
export default PsychologistCard;