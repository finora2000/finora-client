"use client";
import axios from "axios";

export function generateDepositId() {
  let id = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const length = 10;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters[randomIndex];
  }

  return "finora-" + id;
}

export function getRandomColor(text: string) {
  let hashCode = 0;

  for (let i = 0; i < text.length; i++) {
    hashCode = (hashCode << 5) - hashCode + text.charCodeAt(i);
    hashCode |= 0;
  }

  const hue = hashCode % 360;
  const saturation = 75 + Math.random() * 50;
  const lightness = 40 + Math.random() * 10;

  const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  return color;
}

export const numberFormatter = (
  i: number,
  notation: "compact" | "standard" = "compact"
) => {
  const formatter = Intl.NumberFormat("en", {
    notation,
    unitDisplay: "long",
  });
  return formatter.format(i);
};

export function isLocalhost() {
  return window.location.hostname === "localhost";
}

export class AxiosRequest {
  constructor(route: string, options?: { token: string } | any) {
    this.route = route;
  }
  authToken = "";
  route = "";
  msg = "";
  instance = axios.create({
    baseURL: isLocalhost()
      ? "http://localhost:8000/api"
      : "https://finora-server.onrender.com/api",
    timeout: this.route.includes("dashboard") ? 8000 : 3000,
    // withCredentials: true,
    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  async post(body: any) {
    try {
      const res = await this.instance.post(this.route, body);
      return { data: res.data, status: res.status, error: null };
    } catch (err: any) {
      if (err?.response?.data?.msg ?? err.message === "Unauthorized")
        window.location.href = "/?status=401";
      return {
        data: err?.response?.data ?? null,
        status: err?.response?.status ?? err.request.status,
        error: err?.response?.data?.msg ?? err.message,
      };
    }
  }

  async get() {
    try {
      const res = await this.instance.get(this.route);
      console.log("res.status", res.status);
      if (res.status !== 200) this.get();
      return { data: res.data, status: res.status, error: null };
    } catch (err: any) {
      if (err?.response?.data?.msg ?? err.message === "Unauthorized")
        window.location.href = "/?status=401";
      return {
        data: err?.response?.data ?? null,
        status: err?.response?.status ?? err.request.status,
        error: err?.response?.data?.msg ?? err.message,
      };
    }
  }
}
