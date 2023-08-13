"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const testimonials = [
  {
    name: "Sarah Miller",
    avatar: "SM",
    title: "Software Engineer",
    description:
      "As a Marketing Director, integrating this AI SaaS platform was a game-changer. Game-changer for our marketing efforts! The AI-powered insights have taken our campaigns to new heights.",
  },
  {
    name: "Lisa Adams",
    avatar: "LA",
    title: "HR Manager",
    description:
      "Managing HR processes is complex, but this AI SaaS platform simplifies everything. From candidate screening to employee engagement analysis.",
  },
  {
    name: "Maria Hernandez",
    avatar: "MH",
    title: "CFO",
    description:
      "As a CFO, financial insights are paramount. This AI SaaS platform's financial forecasting and risk assessment capabilities have been indispensable.",
  },
  {
    name: "Michael Williams",
    avatar: "MW",
    title: "Data Analyst",
    description:
      "Being a data analyst, I'm amazed by the insights this AI SaaS platform provides. ",
  },
  {
    name: "Amanda Smith",
    avatar: "AS",
    title: "CEO",
    description:
      "As a CEO, this AI SaaS platform has redefined our business strategy. Its ability to provide actionable insights across departments.",
  },
  {
    name: " Robert Johnson",
    avatar: "RJ",
    title: "Product Development Lead",
    description:
      "Innovation drives us, and this AI SaaS platform fuels our product development.",
  },
];

const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10 tracking-wide">
        Testimonials
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((item) => (
          <Card
            key={item.description}
            className="bg-[#192339] border-none text-white"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg tracking-wider">{item.name}</p>
                  <p className="text-zinc-400 text-sm tracking-widest">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LandingContent;
