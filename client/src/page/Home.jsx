import { useState, useEffect } from "react";
import { Loader, Card, FormField } from "../components";
import { useSelector } from "react-redux";
import axios from "axios";

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

  const { user } = useSelector((state) => state.auth);

  const fetchPosts = async () => {
    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      const response = await axios.get(
        "https://dall-e-y8h1.onrender.com/api/v1/post",
        config
      );
      console.log("response", response);
      if (response.data.success) {
        const data = response.data.data;

        console.log("res", data);
        setAllPosts(data);
      }
    } catch (error) {
      console.log("Error", error);
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
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <section className="max-w-7x1 mx-auto">
          <div>
            <h1 className="font-extrabold text-[#222328] text-[32px]">
              Welcome <span className="text-[#F9D949]">{user?.name}</span> to
              the Community Showcase
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
