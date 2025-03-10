import { useNavigate } from "react-router-dom";
import css from './Logo.module.css';


const Logo = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/");
  return (
    <div onClick={handleClick} className={css.container}>
      <svg viewBox="0 0 224 32">
        <path
          fill="var(--color1, #ff76e1)"
          style={{ opacity: 0.65 }}
          d="M4.207 23.091v-15h2.983v1.832h0.135c0.133-0.294 0.324-0.592 0.575-0.895 0.256-0.308 0.587-0.563 0.994-0.767 0.412-0.208 0.923-0.313 1.534-0.313 0.795 0 1.529 0.208 2.202 0.625 0.672 0.412 1.21 1.035 1.612 1.868 0.402 0.829 0.604 1.868 0.604 3.118 0 1.217-0.197 2.244-0.589 3.082-0.388 0.833-0.919 1.465-1.591 1.896-0.668 0.426-1.416 0.639-2.244 0.639-0.587 0-1.087-0.097-1.499-0.291-0.407-0.194-0.741-0.438-1.001-0.732-0.26-0.298-0.459-0.599-0.597-0.902h-0.092v5.838h-3.026z"
        />
      </svg>
      <span className={css.logoText}>
        psychologists.<span className={css.logoTextSpan}>services</span>
      </span>
    </div>
  );
};
export default Logo;