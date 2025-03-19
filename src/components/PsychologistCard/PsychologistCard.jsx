import css from './PsychologistCard.module.css';
import { AiFillStar, AiOutlineHeart } from "react-icons/ai";

const PsychologistCard = ({ psychologist }) => {
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
          </span>
          <span className={css.divider}>|</span>
          <span className={css.price}>
            Price / 1 hour:{" "}
            <span className={css.highlight-price}>${price_per_hour}</span>
          </span>
                <AiOutlineHeart className={css.heart - icon} />
        </div>
      </>
    );
}