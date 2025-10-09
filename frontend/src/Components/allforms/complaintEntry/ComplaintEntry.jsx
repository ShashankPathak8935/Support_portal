import React, { Fragment } from "react";
import IssueLogCreation from "./IssueLogCreation";

const ComplaintEntry = () => {
    return (
      <Fragment>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-serif mb-8 mt-1">Issue Log Entry</h1>
        </div>
        <IssueLogCreation/>
      </Fragment>
    );
};

export default ComplaintEntry;
