import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import headerStyle from "../styles/Header.module.css";

const Header = () => {
  const router = useRouter();
  const { query, pathname } = router;
  const [title, setTitle] = useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSearch = () => {
    console.log("Object.keys(params)", Object.keys(query));
    if (title) {
      Router.push({ query: { ...query, title } });
    } else {
      Object.keys(query).forEach((param) => {
        if (param === "title") {
          console.log("param is title", param);
          delete query[param];
        }
      });
      router.replace(
        {
          pathname,
          query,
        },
        undefined,
        { shallow: true }
      );
    }
  };

  return (
    <header className={headerStyle.header}>
      <div className={headerStyle.header__title}>
        <div className={headerStyle.header__logo}>
          <span>netflix</span>roulette
        </div>
        <button
          onClick={() => {
            setOpenModal(true);
          }}
        >
          + Add movie
        </button>
      </div>
      <div className={headerStyle.header__searchContainer}>
        <h2>Find your movie</h2>
        <div>
          <input
            type="text"
            placeholder="What do you want to watch?"
            value={title}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }

              if (e.key === "Escape") {
                setTitle("");
              }
            }}
            autoFocus
          />
          <button id="search" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
