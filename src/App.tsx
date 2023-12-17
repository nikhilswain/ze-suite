import { useState } from "react";
import { ZeTable, Column } from "./components/ZeTable/ZeTable";
const data = [
  { id: 1, name: "John Doe", age: 25 },
  { id: 2, name: "Jane Smith", age: 30 },
  { id: 3, name: "Bob Johnson", age: 35 },
];

const columns: Column[] = [
  { header: "ID", key: "id" },
  { header: "Name", key: "name", textAlign: "center" },
  { header: "Age", key: "age" },
];

const App = () => {
  return (
    <div className="App">
      <h1>Hello World</h1>
      <p>NS - SUITE</p>
      <ZeTable data={data} columns={columns} />
    </div>
  );
};

export default App;
