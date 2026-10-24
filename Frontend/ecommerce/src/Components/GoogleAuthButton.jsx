import { useContext, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { AuthDataContext } from "../context/AuthDataContext.jsx";

const GoogleAuthButton = ({ onAuthenticated }) => {
  const { serverURL } = useContext(AuthDataContext);
  const [loading, setLoading] = useState(false);

  const handleGoogleSuccess = async (credentialResponse) => {
    if (!credentialResponse.credential) {
      console.error("Google sign-in did not return an ID token");
      alert("Google sign-in failed. Please try again.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${serverURL}/api/auth/google`,
        { credential: credentialResponse.credential },
        { withCredentials: true }
      );
      await onAuthenticated();
    } catch (error) {
      console.error("Google sign-in failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-12 w-full items-center justify-center">
      {loading ? (
        <span className="text-sm font-semibold text-ink">Signing in with Google...</span>
      ) : (
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => {
            console.error("Google sign-in popup failed");
            alert("Google sign-in failed. Please try again.");
          }}
          text="continue_with"
          shape="rectangular"
          theme="outline"
          size="large"
          width="400"
        />
      )}
    </div>
  );
};

export default GoogleAuthButton;
