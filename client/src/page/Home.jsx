import React, { useState, useEffect } from "react";
import { Loader, Card, FormField } from "../components";
import Header from "./Header";

const RenderCards = ({ data, title }) => {
  console.log(data);
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  } else {
    return (
      <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">
        {title}
      </h2>
    );
  }
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/v1/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setAllPosts(result.data.reverse());
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchResults(searchResult);
      }, 500)
    );
  };

  return (
    <>
      <Header />
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <section className="max-w-7x1 mx-auto">
          <div>
            <h1 className="font-extrabold text-[#222328] text-[32px]">
              The Community Showcase
            </h1>
            <p className="mt-2 text-[#6666e75] text-[16px] max-w [500px]">
              Browse through a collection of imaginative and visually stunning
              images generated by DALL-E AI
            </p>
          </div>
          <div className="mt-16">
            <FormField
              labelName="Search Post"
              type="text"
              name="text"
              placeholder="Search posts"
              value={searchText}
              handleChange={handleSearchChange}
            />
          </div>

          <div className="mt-10">
            {loading ? (
              <div className="flex justify-center items-center">
                <Loader />
              </div>
            ) : (
              <>
                {searchText && (
                  <h2 className="font-medium text-[#666e75] text-xl mb-3">
                    Showing results for{" "}
                    <span className="text-[#222328"> {searchText} </span>
                  </h2>
                )}
                <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                  {searchText ? (
                    <RenderCards
                      data={searchResults}
                      title="No search results"
                    />
                  ) : (
                    <RenderCards data={allPosts} title="No posts found" />
                  )}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
