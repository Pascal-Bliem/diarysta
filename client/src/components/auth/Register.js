import React, { useState, useContext, useEffect } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import AuthContext from "../../context/auth/authContext";
import LocaleContext from "../../context/locale/localeContext";

const Register = (props) => {
  const authContext = useContext(AuthContext);
  const { register, error, clearErrors, isAuthenticated } = authContext;

  const localeContext = useContext(LocaleContext);
  const { translations: t } = localeContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/entries");
    }

    if (error === "User already exists") {
      M.toast({
        html: t.user_already_exists,
        classes: "red lighten-3",
      });
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = user;

  //   update user fields with whatever changes in the form
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "") {
      M.toast({ html: t.please_enter_name, classes: "red lighten-3" });
    } else if (email === "") {
      M.toast({ html: t.please_enter_email, classes: "red lighten-3" });
    } else if (password === "") {
      M.toast({ html: t.please_enter_password, classes: "red lighten-3" });
    } else if (password !== password2) {
      M.toast({ html: t.passwords_no_match, classes: "red lighten-3" });
    } else {
      register({ name, email, password });
    }
  };

  return (
    <div className="row">
      <div className="col s12 m10 l8 push-m1 push-l2">
        <div className="row">
          <h2 className="center">{t.register}</h2>
          <form className="col s12" onSubmit={onSubmit}>
            <div className="row">
              <div className="col s12">
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={onChange}
                  required
                  className="validate"
                  placeholder={t.enter_your_name}
                />
                <label htmlFor="name">{t.name}</label>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                  className="validate"
                  placeholder={t.enter_your_email}
                />
                <label htmlFor="email">{t.email}</label>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                  minLength="6"
                  className="validate"
                  placeholder={t.enter_your_password}
                />
                <label htmlFor="password">{t.password}</label>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <input
                  type="password"
                  name="password2"
                  value={password2}
                  onChange={onChange}
                  required
                  minLength="6"
                  className="validate"
                  placeholder={t.confirm_your_password}
                />
                <label htmlFor="password2">{t.confirm_password}</label>
              </div>
            </div>
            <button
              type="submit"
              value="Register"
              className="btn-large waves-effect waves-light green lighten-1"
              style={{ width: "100%", marginTop: "30px", marginBottom: "20px" }}
            >
              {t.register}
            </button>
          </form>
          <div className="row center-align">
            <div className="col s12">
              {t.already_got_account} <a href="/login">{t.login}</a>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
