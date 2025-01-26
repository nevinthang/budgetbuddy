import React from "react";
import Navbar from "../components/navbar";
import Workflow from "@/components/analyzer_card";

export default function Index() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-16 flex-grow flex items-center">
        <div className="flex items-center w-full justify-end">
          <div className="w-1/2 pl-12 max-w-2xl">
            <h1 className="text-8xl font-bold mb-6 leading-tight tracking-tight text-text italic">
              WELCOME TO
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Review Pulse</span>
            </h1>
            <p className="desc mb-6 text-text">Review Pulse is a cutting-edge platform designed to help users share and discover valuable insights on products, services, and experiences through Natural Language Processing.</p>
            <div className="flex space-x-9">
              <button className="px-6 py-3 bg-primary text-black rounded-lg shadow-md">
                <a href="/analyzer">Get Started</a>
              </button>
              <button className="px-6 py-3 bg-secondary text-text rounded-lg">Learn More</button>
            </div>
          </div>
          <div className="w-1/2 flex justify-center">
            <img src="/images/hero_img.png" alt="Review Pulse Hero Image" className="object-contain max-w-[500px] max-h-[500px]" />
          </div>
        </div>
      </main>
      <div className="py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary text-center tracking-tight leading-tight mb-8">Discover How Our Analyzer Works</h1>
        <Workflow></Workflow>
      </div>
    </div>
  );
}
