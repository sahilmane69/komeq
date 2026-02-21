"use client";
import dynamic from "next/dynamic";

export const Skiper31 = dynamic(() => import("./skiper31").then(mod => mod.Skiper31), { ssr: false });
