"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Eventcalendar, getJson, setOptions } from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import moment from "moment";
import { ChevronDown } from "react-feather";
import Image from "next/image";

setOptions({
  theme: "ios",
  themeVariant: "light",
});

export default function Home() {
  const [myEvents, setEvents] = useState([]);

  const view = useMemo(
    () => ({
      timeline: {
        type: "month",
        resolutionHorizontal: "hour",
        resolutionVertical: "day",
        startTime: "10:00",
        endTime: "21:00",
        currentTimeIndicator: false,
      },
    }),
    []
  );

  useEffect(() => {
    getJson(
      "https://trial.mobiscroll.com/timeline-vertical-events/",
      (events) => {
        setEvents(events);
      },
      "jsonp"
    );
  }, []);

  const renderCustomHeader = () => (
    <>
      <div className="flex items-center gap-2 ml-8 my-5">
        <Image
          className="rounded-full shadow-lg"
          src="/avatar.png"
          alt="Bonnie image"
          width={40}
          height={40}
        />
        <div className="">
          <div className="leading-6 flex justify-center items-center">
            <span className="font-medium text-16 text-brand-secondary">
              Agens Neilson
            </span>
            <ChevronDown className="w-6 h-6 font-normal text-brand-secondary ml-2" />
          </div>
          <p className="font-normal text-12 leading-0 text-border">
            Laravel department
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center gap-8 mr-16 my-5">
        <div>
          <p className="text-14 text-regular font-medium">40h 00m</p>
          <p className="text-11 text-border">Scheduled</p>
        </div>
        <div>
          <p className="text-14 text-regular font-medium">39h 30m</p>
          <p className="text-11 text-border">Logged</p>
        </div>
        <div>
          <p className="text-14 text-regular font-medium">-00h 30m</p>
          <p className="text-11 text-border">Balance</p>
        </div>
        <div>
          <p className="text-14 text-green font-medium">20h 30m</p>
          <p className="text-11 text-border">Approved</p>
        </div>
        <div>
          <p className="text-14 text-yellow font-medium">19h 30m</p>
          <p className="text-11 text-border">Pending</p>
        </div>
      </div>
    </>
  );

  const renderCustomDay = (args) => (
    <div className="py-2 pl-3">
      <p className="text-border font-medium text-12">
        {moment(args?.date).format("ddd")}
      </p>
      <p className="text-regular font-medium text-18 leading-7">
        {moment(args?.date).format("D")}
      </p>
      <p className="font-normal text-12 text-border pt-2">8h 30m</p>
    </div>
  );

  const renderCustomHour = (args) => (
    <p
      className="font-normal text-12 text-border"
      style={{ lineHeight: "18px" }}
    >
      {moment(args?.date).format("H.mm")}
    </p>
  );

  const renderEventContent = (arg) => {
    console.log("arg", arg);

    return <div className="bg-brand">asdasd</div>;
  };

  return (
    <main className="px-24 timeline-calender">
      <div className="m-8">
        <Eventcalendar
          theme="ios"
          themeVariant="light"
          view={view}
          data={myEvents}
          renderDay={renderCustomDay}
          renderHour={renderCustomHour}
          renderHeader={renderCustomHeader}
          extendDefaultEvent={renderEventContent}
        />
      </div>
    </main>
  );
}
