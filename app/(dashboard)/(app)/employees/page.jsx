"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWidth from "@/hooks/useWidth";
import Button from "@/components/ui/Button";
import ProjectGrid from "@/components/partials/app/projects/ProjectGrid";
import ProjectList from "@/components/partials/app/projects/ProjectList";
import GridLoading from "@/components/skeleton/Grid";
import TableLoading from "@/components/skeleton/Table";
import { toggleAddModal } from "@/components/partials/app/projects/store";
import AddProject from "@/components/partials/app/projects/AddProject";
import { ToastContainer } from "react-toastify";
import EditProject from "@/components/partials/app/projects/EditProject";

const ProjectPostPage = () => {
  const [filler, setfiller] = useState("card");
  const { width, breakpoints } = useWidth();
  const [isLoaded, setIsLoaded] = useState(false);

  const { projects } = useSelector((state) => state.project);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoaded(true);
    setTimeout(() => {
      setIsLoaded(false);
    }, 1500);
  }, [filler]);

  return (
    <div>
      <ToastContainer />
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
        Employees
        </h4>
        <div
          className={`${
            width < breakpoints.md ? "space-x-rb" : ""
          } md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse`}
        >
          <Button
            icon="heroicons:list-bullet"
            text="Table view"
            disabled={isLoaded}
            className={`${
              filler === "table"
                ? "bg-slate-900 dark:bg-slate-700  text-white"
                : " bg-white dark:bg-slate-800 dark:text-slate-300"
            }   h-min text-sm font-normal`}
            iconClass=" text-lg"
            onClick={() => setfiller("table")}
          />
          <Button
            icon="heroicons-outline:view-grid"
            text="Card view"
            disabled={isLoaded}
            className={`${
              filler === "card"
                ? "bg-slate-900 dark:bg-slate-700 text-white"
                : " bg-white dark:bg-slate-800 dark:text-slate-300"
            }   h-min text-sm font-normal`}
            iconClass=" text-lg"
            onClick={() => setfiller("card")}
          />
          <Button
            icon="heroicons-outline:filter"
            text="On going"
            className="bg-white dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-900 hover:text-white btn-md  h-min text-sm font-normal"
            iconClass=" text-lg"
          />
          <Button
            icon="heroicons-outline:plus"
            text="Add Employee With Task"
            className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
            iconClass=" text-lg"
            onClick={() => dispatch(toggleAddModal(true))}
          />
        </div>
      </div>
      {isLoaded && filler === "card" && (
        <GridLoading count={projects?.length} />
      )}
      {isLoaded && filler === "table" && (
        <TableLoading count={projects?.length} />
      )}

      {filler === "card" && !isLoaded && (
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          {projects.map((project, projectIndex) => (
            <ProjectGrid project={project} key={projectIndex} />
          ))}
        </div>
      )}
      {filler === "table" && !isLoaded && (
        <div>
          <ProjectList projects={projects} />
        </div>
      )}
      <AddProject />
      <EditProject />
    </div>
  );
};

export default ProjectPostPage;
