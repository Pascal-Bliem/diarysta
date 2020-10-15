import React, { useContext, useRef, useEffect } from "react";
import EntryContext from "../../context/entry/entryContext";
import LocaleContext from "../../context/locale/localeContext";

const EntryFilter = () => {
    const localeContext = useContext(LocaleContext);
    const { translations: t } = localeContext;

    const entryContext = useContext(EntryContext);
    const text = useRef("");

    const { filterEntries, clearFilter, filtered } = entryContext;

    useEffect(() => {
        if (filtered === null) {
            text.current.value = "";
        }
    });

    const onChange = (e) => {
        if (text.current.value !== "") {
            filterEntries(e.target.value);
        } else {
            clearFilter();
        }
    };

    return (
        <div className="row">
            <div className="col s12 m8 l6 push-m2 push-l3">
                <form>
                    <input
                        className="entry-filter"
                        ref={text}
                        type="text"
                        placeholder={`🔍   ${t.search_entries}`}
                        onChange={onChange}
                    />
                </form>
            </div>
        </div>
    )
}

export default EntryFilter;
