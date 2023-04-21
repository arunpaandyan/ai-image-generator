import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";
import { useSelector } from "react-redux";
import axios from "axios";

const CreatePost = () => {
  const navigate = useNavigate();
  const [postCount, setPostCount] = useState(0);
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const { user } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [generatingImg, setGeneratingImg] = useState(false);

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
        setPostCount(data.length);
        console.log("res", data.length);
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

  const generateImage = async () => {
    if (postCount >= 3 && user.subscription === false) {
      alert("Subscription Needed!");
    } else if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(
          //"https://dall-e-y8h1.onrender.com/api/v1/dalle",
          "/api/v1/dalle",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: `${form.prompt.toString()}`,
            }),
          }
        );

        const data = await response.json();
        console.log(data);
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        console.log(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please provide proper prompt");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (postCount >= 3 && user.subscription === false) {
      alert("Subscription Needed!");
    } else if (form.prompt && form.photo) {
      setLoading(true);

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      let fD = { ...form };
      fD.user = user._id;

      try {
        const response = await axios.post(
          //"https://dall-e-y8h1.onrender.com/api/v1/post",
          "/api/v1/post",
          fD,
          config
        );
        console.log(response.data);
        navigate("/home");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please Enter fields");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  return (
    <>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <section className="max-w-7xl mx-auto">
          <div>
            <h1 className="font-extrabold text-[#222328] text-[32px]">
              Create
            </h1>
            <p className="mt-2 text-[#6666e75] text-[16px] max-w [500px]">
              {postCount >= 3 && user.subscription === false ? (
                <>
                  <span>
                    Subscription needed for creating more than 3 posts
                  </span>
                  <Link
                    to="/pay"
                    className="font-inter font-medium bg-[#FF6000] text-white ml-5 px-4 py-2 rounded-md"
                  >
                    Subscribe
                  </Link>
                </>
              ) : (
                <span>
                  Create imaginative and visually stunning images through DALL-E
                  AI and share them with the Community
                </span>
              )}
            </p>
          </div>
          <form className="mt-16" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">
              <FormField
                labelName="Name this Image"
                type="text"
                name="name"
                placeholder="Ex., Natural picture"
                value={form.name}
                handleChange={handleChange}
              />

              <FormField
                labelName="Prompt"
                type="text"
                name="prompt"
                placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
                value={form.prompt}
                handleChange={handleChange}
                isSurpriseMe
                handleSurpriseMe={handleSurpriseMe}
              />
              <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
                {form.photo ? (
                  <img
                    src={form.photo}
                    alt={form.prompt}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-9/12 h-9/12 object-contain opacity-40"
                  />
                )}

                {generatingImg && (
                  <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                    <Loader />
                  </div>
                )}
              </div>
            </div>
            <div className="mt-5 flex gap-5">
              <button
                type="button"
                onClick={generateImage}
                disabled={loading && true}
                className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                {generatingImg ? "Generating..." : "Generate"}
              </button>
            </div>
            <div className="mt-10">
              <p className="mt-2 text-[#666e75] text-[14px]">
                Once you have created the image you want, you can Save &
                download it
              </p>
              <button
                type="submit"
                disabled={loading === true && true}
                className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                {loading ? "Saving..." : "Save to your profile"}
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default CreatePost;
