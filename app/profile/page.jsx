"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGetProfile, useUpdateProfile } from "@/hooks/useProfile";
import { useGetCampaigns, useDeleteCampaign } from "@/hooks/useCampaign";
import { toast, Toaster } from "react-hot-toast";
import { Trash2 } from "lucide-react";

export default function Profile() {
  const { data: profile, isLoading, isError } = useGetProfile();
  const { mutate: updateProfile } = useUpdateProfile();
  const { data: campaigns, isLoading: campaignsLoading } = useGetCampaigns();
  const { mutate: deleteCampaign } = useDeleteCampaign();
  const [campaignToDelete, setCampaignToDelete] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    bio: "",
    website: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile?.user?.first_name || "",
        last_name: profile?.user?.last_name || "",
        bio: profile?.bio || "",
        website: profile?.website || "",
      });
    }
  }, [profile]);

  if (isLoading) return <p className="text-center text-white">Loading profile...</p>;
  if (isError) return <p className="text-center text-red-500">Error loading profile</p>;

  const handleEditClick = () => setIsEditing(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateProfile(formData, {
      onSuccess: () => {
        setIsEditing(false);
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white">
      {/* Profile Header */}
      <div className="w-full bg-gradient-to-r from-[#e87415] to-[#ff9f1c] text-white flex flex-col items-center py-10 relative">
        <div className="absolute top-4 left-4 bg-black rounded-md w-35 h-35">
          <Link href="/">
            <Image src="/logo.jpg" alt="Logo" height={30} width={40} className="cursor-pointer" />
          </Link>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={profile?.picture || "/default-avatar.png"}
            alt="Profile Picture"
            width={100}
            height={100}
            className="rounded-full border-4 border-white shadow-md"
          />
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold">{profile?.user?.first_name} {profile?.user?.last_name}</h1>
            <p className="text-gray-200">{profile?.bio}</p>
            {profile?.website && (
              <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-white hover:underline">
                {profile.website}
              </a>
            )}
          </div>
          <button
            className="bg-[#e87415] hover:bg-[#d76612] transition-all px-4 py-2 rounded-lg text-white shadow-md"
            onClick={handleEditClick}
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-center text-[#e87415]">Edit Profile</h2>
            <div>
              <label className="block text-gray-400">First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-gray-400">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-gray-400">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-gray-400">Website</label>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-gray-700 text-white"
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-500 px-4 py-2 rounded-lg text-white mr-2 hover:bg-gray-600"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button
                className="bg-[#e87415] hover:bg-[#d76612] transition-all px-4 py-2 rounded-lg text-white shadow-md"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {campaignToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-center text-[#e87415]">Delete Campaign</h2>
            <p className="text-white text-center mb-6">
              Are you sure you want to delete "{campaignToDelete.name}"? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-gray-500 px-4 py-2 rounded-lg text-white hover:bg-gray-600"
                onClick={() => setCampaignToDelete(null)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white"
                onClick={() => {
                  deleteCampaign(campaignToDelete.id, {
                    onSuccess: () => {
                      toast.success("Campaign deleted successfully");
                      setCampaignToDelete(null);
                    },
                    onError: () => {
                      toast.error("Failed to delete campaign");
                      setCampaignToDelete(null);
                    },
                  });
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Campaigns Section */}
      <div className="w-full bg-gray-800 py-10 px-4 md:px-8">
        <h2 className="text-2xl font-semibold mb-6 text-center text-[#e87415]">Your Campaigns</h2>
        <Toaster />
        {campaignsLoading ? (
          <p className="text-gray-400 text-center">Loading campaigns...</p>
        ) : campaigns?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="bg-gray-700 rounded-lg shadow-md p-4 group relative"
              >
                <Link
                  href={`/canvas/${campaign.id}`}
                  className="block hover:text-white transition-all"
                >
                  <p className="text-lg font-semibold">{campaign.name}</p>
                  <p className="text-sm text-gray-300">{campaign.description}</p>
                  <p className="text-xs text-gray-400 mt-2">Created: {new Date(campaign.created_at).toLocaleDateString()}</p>
                  <p className="text-xs text-gray-400">Updated: {new Date(campaign.updated_at).toLocaleDateString()}</p>
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setCampaignToDelete(campaign);
                  }}
                  className="absolute top-2 right-2 p-2 rounded-full bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                >
                  <Trash2 size={16} className="text-white" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center">No campaigns available.</p>
        )}
      </div>
    </div>
  );
}
