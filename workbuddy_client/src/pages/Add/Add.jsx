import React, { useReducer, useState } from "react";
import { INITIAL_STATE, gigReducer } from "../../reducers/gigReducer";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import createRequest from "../../utils/createRequest";
import { useNavigate } from "react-router-dom";
import "./add.scss";

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleUpload = async () => {
    setUploading(true);

    try {
      const coverImage = await upload(singleFile);

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);

      dispatch({ type: "ADD_IMAGES", payload: { coverImage, images } });
    } catch (error) {
      console.log(error);
    }
  };

  const mutation = useMutation({
    mutationFn: (gig) => {
      return createRequest.post("/gigs", gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleAddFeature = (e) => {
    e.preventDefault();

    if (e.target[0].value === "") return;

    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });

    e.target[0].value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state);

    navigate("/myGigs");
  };

  return (
    <section className="add">
      <main>
        <h1>Add new Gig</h1>
        <div className="sections">
          <div className="left">
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter a Title"
              onChange={handleChange}
            />

            <select name="category" id="category" onChange={handleChange}>
              <option hidden value="">
                Select a category
              </option>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>

            <div className="images">
              <div className="imagesInputs">
                <label htmlFor="">Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />
                <label htmlFor="">Upload Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button onClick={handleUpload}>
                {uploading ? "Uploading" : "Upload"}
              </button>
            </div>

            <textarea
              name="desc"
              id="desc"
              cols="30"
              rows="16"
              placeholder="Brief Description to introduce your service to customers"
              onChange={handleChange}
            ></textarea>
            <button onClick={handleSubmit}>Create</button>
          </div>
          <div className="right">
            <input
              type="text"
              name="shortTitle"
              placeholder="Service short title"
              onChange={handleChange}
            />

            <textarea
              name="shortDesc"
              id="shortDesc"
              cols="30"
              rows="10"
              placeholder="Add a Short Description"
              onChange={handleChange}
            ></textarea>

            <input
              id="deliveryTime"
              name="deliveryTime"
              type="number"
              placeholder="Enter Delivery Time"
              min={1}
              onChange={handleChange}
            />

            <input
              id="revisionNumber"
              name="revisionNumber"
              type="number"
              placeholder="Enter Revision Number"
              min={1}
              onChange={handleChange}
            />

            <input
              id="price"
              type="text"
              name="price"
              placeholder="Enter Price"
              onChange={handleChange}
            />

            <form onSubmit={handleAddFeature} className="add">
              <input
                id="feature"
                type="text"
                placeholder="Add Features (multiple)"
              />
              <button type="submit">Add</button>
            </form>

            <div className="addedFeatures">
              {state?.features?.map((feature, i) => (
                <div className="item" key={i}>
                  <button>
                    {feature}
                    <span
                      onClick={() =>
                        dispatch({ type: "REMOVE_FEATURE", payload: feature })
                      }
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Add;
