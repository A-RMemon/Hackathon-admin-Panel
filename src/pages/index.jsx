import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { SectionProvider } from "../../config/ContextApi";
import Login from "./login";

export default function Home() {
  return (
 
        <Login/>
   
  );
}
