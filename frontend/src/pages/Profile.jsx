import { useEffect, useState } from "react";
import api from "../api/axoisInstance";
import { toast } from "react-toastify";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({});
  const [image, setImage] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put("/profile", form);
      setProfile(data);
      toast.success("Profile updated!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed!");
    }
  };

  const handleImageChange = (e) => setImage(e.target.files[0]);
  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!image) return;
    const formData = new FormData();
    formData.append("profileImage", image);
    try {
      const { data } = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProfile((prev) => ({ ...prev, profileImage: data.profileImage }));
      toast.success("Image uploaded!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    }
  };

  useEffect(() => {
    api.get("/profile").then((res) => {
      setProfile(res.data);
      setForm({ name: res.data.name, email: res.data.email });
    });
  }, []);

  if (!profile)
    return <div className="flex items-center justify-center">Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center px-2 mt-10 ">
      <div className="rounded-xl shadow-lg border border-indigo-300 p-8 w-full max-w-md space-y-6">
        <div className="flex flex-col items-center justify-center space-y-2">
          <img
            src={
              profile.profileImage ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                form.name || "User"
              )}&background=8600e9&bold=true&color=fff`
            }
            alt=""
            className="w-32 h-32 rounded-full object-cover mb-2 border-4 border-indigo-300 text-center"
          />
          <form
            onSubmit={handleImageUpload}
            className="flex flex-col items-center gap-2 w-full"
          >
            <input
              type="file"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-50 file:text-indigo-700"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 w-full rounded font-semibold hover:bg-indigo-700 transition"
            >
              Upload New Picture
            </button>
          </form>
        </div>
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded border focus:ring-2 focus:ring-indigo-400"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded border focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700 transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
export default Profile;
