import React, { useState, useContext, useEffect } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import AuthContext from "../../context/auth/authContext";
import LocaleContext from "../../context/locale/localeContext";

const Login = (props) => {
    const authContext = useContext(AuthContext);
    const { login, error, clearErrors, isAuthenticated } = authContext;

    const localeContext = useContext(LocaleContext);
    const { translations: t } = localeContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push("/entries");
        }

        if (error === "Invalid Credentials - Email unknown") {
            M.toast({
                html: t.unknown_email,
                classes: "red lighten-3",
            });
            clearErrors();
        } else if (error === "Invalid Credentials - Password incorrect") {
            M.toast({
                html: t.wrong_password,
                classes: "red lighten-3",
            });
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const { email, password } = user;

    //   update user fields with whatever changes in the form
    const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        if (email === "") {
            M.toast({ html: t.please_enter_email, classes: "red lighten-3" });
        } else if (password === "") {
            M.toast({ html: t.please_enter_password, classes: "red lighten-3" });
        }
        else {
            login({ email, password });
        }
    };

    return (
        <div className="row">
            <div className="col s12 m10 l8 push-m1 push-l2">
                <div className="row">
                    <h2 className="center">{t.login}</h2>
                    <form className="col s12" onSubmit={onSubmit}>
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
                        <button
                            type="submit"
                            value="Register"
                            className="btn-large waves-effect waves-light green lighten-1"
                            style={{ width: "100%", marginTop: "30px", marginBottom: "20px" }}
                        >
                            {t.login}
                        </button>
                    </form>
                    <div className="row center-align">
                        <div className="col s12">
                            {t.not_yet_account} <a href="/register">{t.register}</a>.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
