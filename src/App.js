import React, { useEffect, useState } from "react";
import "./index.scss";
import { Collection } from "./Collection";

const categories = [
  { name: "All" },
  { name: "Sea" },
  { name: "Mountains" },
  { name: "Architecture" },
  { name: "Cities" },
];
function App() {
  const [categoryId, setCategoryId] = useState(0);
  const [page, setPage ] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [collections, SetCollections] = useState();
  useEffect(() => {
    setIsLoading(true);
    const category=categoryId ? `category=${categoryId}` : "";
  
    fetch(
      `https://65c7281ce7c384aada6e3b7b.mockapi.io/photo_collections?page=${page}&limit=3&${category}`
    ).then((res) =>
      res
        .json()
        .then((json) => {
          SetCollections(json);
        })
        .catch((err) => {
          console.warn(err);
          alert("Error receiving data");
        }).finally(()=>setIsLoading(false))
    );
    // console.log('collections', collections)
  }, [categoryId,page]);
  return (
    <div className="App">
      <h1>My photo collection</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((obj, i) => (
            <li
              onClick={() => setCategoryId(i)}
              className={categoryId === i ? "active" : ""}
              key={obj.name}
            >
              {obj.name}{" "}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Search by name"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Is Loading ... </h2>
        ) : (
          collections
            .filter((obj) => {
              return obj.name.toLowerCase().includes(searchValue.toLowerCase());
            })
            .map((obj, index) => (
              <Collection key={index} name={obj.name} images={obj.photos} />
            ))
        )}
      </div>
      <ul className="pagination">
       {[...Array(5)].map((_,i)=>( <li onClick={() => setPage(i+1)} className={page===(i+1)?"active":""}>{i+1}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
