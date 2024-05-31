import React from "react";

import { useParams } from "react-router-dom";

export default function BlogPage() {
  const { blogId } = useParams();

  function printHello() {
    console.log("Hello");
  }

  function printHI() {
    console.log("Hi");
    printHello();
  }

  const callBackFunction = () => {
    console.log("there");
  };

  function printThere() {
    setTimeout(callBackFunction, 0);
  }

  function printIX() {
    console.log("iX");
  }

  printHI();
  printThere();
  printIX();

  return <div>TODO Build the read blog page</div>;
}
