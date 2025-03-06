
import icons from '../../img/icons/symbol-defs.svg'

const Icon = ({ id, width, height, className = '' }) => {
    return (
      <svg
        className={className}
        width={width}
        height={height}
        aria-hidden="true"
      >
        <use href={`${icons}#${id}`}></use>
      </svg>
    );
}
export default Icon