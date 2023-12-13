import React from "react";

export default function Main({children}) {
  return (
    <main className="container vh-100 d-flex flex-column justify-content-center align-items-center">
      <h3>Messaging App</h3>
      {children}
    </main>
    );
}
