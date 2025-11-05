"use client";

import { useAppSelector } from "@/app/redux";
import Header from "@/components/Header";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import { useGetTasksQuery } from "@/state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useMemo } from "react";
import { Avatar, Box, Typography } from "@mui/material";

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const TableView = ({ id, setIsModalNewTaskOpen }: Props) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ projectId: Number(id) });

  // Map tasks to flatten author/assignee fields
  const rows = useMemo(() => {
    return (
      tasks?.map((task: any) => ({
        ...task,
        authorName: task.author?.username || "Unknown",
        authorPic: task.author?.profilePictureUrl || "",
        assigneeName: task.assignee?.username || "Unassigned",
        assigneePic: task.assignee?.profilePictureUrl || "",
      })) || []
    );
  }, [tasks]);

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", flex: 1, minWidth: 150 },
    { field: "description", headerName: "Description", flex: 1.5, minWidth: 200 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <span
          className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800 dark:bg-green-900 dark:text-green-200"
        >
          {params.value}
        </span>
      ),
    },
    { field: "priority", headerName: "Priority", flex: 0.8, minWidth: 100 },
    { field: "tags", headerName: "Tags", flex: 1, minWidth: 130 },
    { field: "startDate", headerName: "Start Date", flex: 1, minWidth: 130 },
    { field: "dueDate", headerName: "Due Date", flex: 1, minWidth: 130 },
    {
      field: "authorName",
      headerName: "Author",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Box className="flex items-center space-x-2 hover:text-blue-500 dark:hover:text-blue-400">
          <Avatar
            src={`https://pm-s3-images.s3.us-east-2.amazonaws.com/${params.row.authorPic}`}
            alt={params.value}
            sx={{ width: 28, height: 28 }}
          />
          <Typography
            variant="body2"
            sx={{
              color: isDarkMode ? "#f0f0f0" : "#111",
              fontWeight: 500,
            }}
          >
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: "assigneeName",
      headerName: "Assignee",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Box className="flex items-center space-x-2 hover:text-blue-500 dark:hover:text-blue-400">
          <Avatar
            src={`https://pm-s3-images.s3.us-east-2.amazonaws.com/${params.row.assigneePic}`}
            alt={params.value}
            sx={{ width: 28, height: 28 }}
          />
          <Typography
            variant="body2"
            sx={{
              color: isDarkMode ? "#f0f0f0" : "#111",
              fontWeight: 500,
            }}
          >
            {params.value}
          </Typography>
        </Box>
      ),
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (error || !tasks) return <div>An error occurred while fetching tasks</div>;

  return (
    <div className="h-[540px] w-full px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="Table"
          buttonComponent={
            <button
              className="flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              Add Task
            </button>
          }
          isSmallText
        />
      </div>

      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        className={dataGridClassNames}
        sx={{
          ...dataGridSxStyles(isDarkMode),
          "& .MuiDataGrid-cell:hover": {
            backgroundColor: isDarkMode ? "#1e293b" : "#f1f5f9",
          },
          "& .MuiDataGrid-cell": {
            color: isDarkMode ? "#e2e8f0" : "#111827",
          },
        }}
      />
    </div>
  );
};

export default TableView;
