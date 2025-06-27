import CONFIG from "../config";

// Endpoint
const ENDPOINTS = {
  ENDPOINT: `${CONFIG.BASE_URL}/your/endpoint/here`,
  BASE_URL: CONFIG.BASE_URL,
};

// Method getToken
function getToken() {
  return localStorage.getItem("token");
}

// Method Register
export const registerModel = {
  async register(name, email, password) {
    const response = await fetch(ENDPOINTS.BASE_URL + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to register");
    }

    return result;
  },
};

// Method Login
export const loginModel = {
  async login(email, password) {
    const response = await fetch(ENDPOINTS.BASE_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Login failed");
    }

    return result;
  },
};

// Method Get All Data
export async function getAllStories(
  page = 1,
  size = 7,
  location = 0,
  token = localStorage.getItem("token")
) {
  const params = new URLSearchParams();

  if (page !== undefined) params.append("page", page);
  if (size !== undefined) params.append("size", size);
  if (location !== undefined) params.append("location", location);

  const response = await fetch(
    `${ENDPOINTS.BASE_URL}/stories?${params.toString()}`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch stories");
  }

  return result;
}

// Method Get Detail Data = on progress
export async function getStoryDetail(
  id,
  token = localStorage.getItem("token")
) {
  const response = await fetch(`${ENDPOINTS.BASE_URL}/stories/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch story detail");
  }

  return result;
}

// Add New Data
export async function addDataStory(
  base64Image,
  description,
  latitude,
  longitude
) {
  const token = getToken();

  const blob = await (await fetch(base64Image)).blob();
  const file = new File([blob], "photo.jpg", { type: blob.type });

  const formData = new FormData();
  formData.append("photo", file);
  formData.append("description", description);
  if (latitude) formData.append("lat", parseFloat(latitude));
  if (longitude) formData.append("lon", parseFloat(longitude));

  const response = await fetch("https://story-api.dicoding.dev/v1/stories", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message);
  return result;
}
