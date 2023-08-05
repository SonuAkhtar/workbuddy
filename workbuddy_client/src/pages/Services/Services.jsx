import React, { useEffect, useRef, useState } from "react";
import ServiceCard from "../../components/ServiceCard/ServiceCard";
import { useQuery } from "@tanstack/react-query";
import createRequest from "../../utils/createRequest";
import { Link, useLocation } from "react-router-dom";
import "./services.scss";

const Services = () => {
  const [sort, setSort] = useState("Sales");
  const [open, setOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState("");

  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["services"],
    queryFn: () =>
      createRequest
        .get(
          `/services${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
        )
        .then((res) => {
          return res.data;
        }),
  });

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort]);

  useEffect(() => {
    let title = "";
    if (search === "?category=uiux") title = "UI/UX Design";
    else if (search === "?category=web") title = "Web Development";
    else if (search === "?category=mobile") title = "Mobile Apps";
    else if (search === "?category=ai") title = "AI Services";
    else if (search === "?category=music") title = "Music Generation";
    else if (search === "?category=cloud") title = "Cloud Services";
    else if (search === "?category=animation") title = "Animation Cration";
    else if (search === "?category=graphics") title = "Graphics Design";
    else title = "";

    setPageTitle(title);
  }, []);

  const budgetApply = () => {
    refetch();
  };

  console.log(data);

  return (
    <section className="services">
      <main>
        <span className="breadcrumbs">
          <Link to="/">Workbuddy</Link>
          {` > `}
          <Link to="/services">{pageTitle}</Link>
        </span>
        <h1>{pageTitle}</h1>
        <p>
          Explore the boundries of art and technology with Workbuddy's AI
          artistcs
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="text" placeholder="min" />
            <input ref={maxRef} type="text" placeholder="max" />
            <button onClick={budgetApply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">SortBy: </span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img
              src="./images/down.png"
              alt="arrow"
              onClick={() => setOpen(!open)}
            />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("CreatedAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isLoading
            ? "Loading"
            : error
            ? "Something went wrong"
            : data.map((service) => (
                <ServiceCard key={service._id} item={service} />
              ))}
        </div>
      </main>
    </section>
  );
};

export default Services;
