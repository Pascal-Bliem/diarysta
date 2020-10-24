import React, { useContext } from "react";
import diary from "../../utils/diary.svg";
import terms from "../../utils/terms.svg";
import LocaleContext from "../../context/locale/localeContext";

const About = () => {
  const localeContext = useContext(LocaleContext);
  const { translations: t } = localeContext;

  return (
    <div className="center row" style={{ paddingTop: "50px" }}>
      <div className="col s12 m8 l6 push-m2 push-l3">
        <img src={diary} width="50px" />
        <h4>Diarysta</h4>
        <p style={paragraphStyle}>{t.about_statement}</p>
        <img src={terms} width="50px" />
        <h4>{t.terms_heading}</h4>
        <p style={paragraphStyle}>{t.terms_statement}</p>
      </div>

      <footer style={{ fontSize: "12px", position: "absolute", bottom: "5px", left: "50%", transform: "translateX(-50%)" }}>Icons on this page made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> and <a href="https://www.flaticon.com/authors/nhor-phai" title="Nhor Phai">Nhor Phai</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></footer>
    </div>
  );
};

const paragraphStyle = {
  textAlign: "justify",
  paddingBottom: "100px"
}

export default About;
