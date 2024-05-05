import { Link } from "react-router-dom"

import "../../styles/Footer.css"
import {
  birdGirl,
  mermaidIllustration,
  michelleLeafShoot,
  rachaelFal,
  tatianaRino,
  yorkieBoy,
} from "../../assets/images/footer-photos"

function Footer() {
  return (
    <footer>
      <h3>Footer</h3>
      <div className="footer-links">
        <Link to="/portraits">Portraits</Link>
        <Link to="/pets">Pets</Link>
        <Link to="/creative">Creative</Link>
        <Link to="/pricing">Pricing</Link>
        <Link to="/about">About</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/admin">Admin</Link>
      </div>
      <div className="footer-social-links">
        <a href="https://www.instagram.com/kaylakossajda/" target="_blank" rel="noreferrer">
          Instagram
        </a>
        <a href="https://www.facebook.com/kaylakossajda" target="_blank" rel="noreferrer">
          Facebook
        </a>
      </div>
      <div className="footer-images">
        <img src={rachaelFal.width768} alt="Rachael fall" className="footer-image" />
        <img src={birdGirl.width768} alt="Bird girl" className="footer-image" />
        <img
          src={mermaidIllustration.width768}
          alt="mermaid illustration"
          className="footer-image"
        />
        <img src={michelleLeafShoot.width768} alt="Michelle leaf shoot" className="footer-image" />
        <img src={tatianaRino.width768} alt="Tatiana Rino" className="footer-image" />
        <img src={yorkieBoy.width768} alt="Yorkie boy" className="footer-image" />
      </div>
    </footer>
  )
}

export default Footer
