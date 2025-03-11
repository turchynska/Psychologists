import css from './HeroSection.module.css';
import Header from '../Header/Header';
import hero1x from '../../img/hero/hero1x.png'
import Icon from '../Icon/Icon';

const HeroSection = () => {
    return (
      <>
        <Header />
        <section className={css.hero}>
          <div className={css.container}>
            <div className={css.content}>
              <h1 className={css.title}>
                The road to the <span className={css.titleSpan}>depths</span> of
                the human soul
              </h1>
              <p className={css.text}>
                We help you to reveal your potential, overcome challenges and
                find a guide in your own life with the help of our experienced
                psychologists.
              </p>
              <button className={css.btn}>Get started</button>
            </div>
            <div className={css.imageWrapper}>
              <img src={hero1x} alt="hero" className={css.heroImg} />
              <div className={css.cardContainer}>
                <span className={css.checkIcon}>✔️</span>
                <div>
                  <p className={css.textCard}>Experienced psychologists</p>
                  <strong className={css.textNum}>15,000</strong>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
}
export default HeroSection;