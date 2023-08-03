import React, { useEffect, useRef, useState } from "react";
import ServiceCard from "../../components/ServiceCard/ServiceCard";
import { useQuery } from "@tanstack/react-query";
import createRequest from "../../utils/createRequest";
import { useLocation } from "react-router-dom";
import "./services.scss";

const Services = () => {
  const [sort, setSort] = useState("Sales");
  const [open, setOpen] = useState(false);
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

  const budgetApply = () => {
    refetch();
  };

  return (
    <section className="services">
      <main>
        <span className="breadcrumbs">{`FIVERR > GRAPHICS > DESIGN`}</span>
        <h1>
          {search === "?search=uiux"
            ? "UI/UX Design"
            : search === "?search=web"
            ? "Web Development"
            : "AI Services"}
        </h1>
        <p>
          Explore the boundries of art and technology with Fiverr's AI artistcs
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
