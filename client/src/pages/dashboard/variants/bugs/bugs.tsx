import React, { useState, useEffect } from "react";

import axios from "../../../../axios.default";

interface Bug {
  date_opened: Date;
  isOpen: boolean;
  title: string;
  description: string;
  id: string;
}

const Bugs = () => {
  const [bugs, setBugs] = useState<Bug[]>([]);

  useEffect(() => {
    axios
      .get("/bug")
      .then(({ data }) => {
        setBugs(data);
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div>
      {bugs.map((bug) => (
        <h2>{bug.title}</h2>
      ))}
    </div>
  );
};

export default Bugs;
