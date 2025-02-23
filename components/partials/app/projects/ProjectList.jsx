import Card from "@/components/ui/Card";
import Dropdown from "@/components/ui/Dropdown";
import Icon from "@/components/ui/Icon";
import ProgressBar from "@/components/ui/ProgressBar";
import { Menu } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import { removeProject, updateProject } from "./store";

const ProjectList = ({ projects }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const COLUMNS = [
    {
      Header: "Name",
      accessor: "name",
      Cell: (row) => {
        return (
          <div className="flex space-x-3 items-center text-left rtl:space-x-reverse">
            <div className="flex-none">
              <div className="h-10 w-10 rounded-full text-sm bg-[#E0EAFF] dark:bg-slate-700 flex flex-col items-center justify-center font-medium -tracking-[1px]">
                {row?.cell?.value.charAt(0) +
                  row?.cell?.value.charAt(row?.cell?.value.length - 1)}
              </div>
            </div>
            <div className="flex-1 font-medium text-sm leading-4 whitespace-nowrap">
              {row?.cell?.value.length > 20
                ? row?.cell?.value.substring(0, 20) + "..."
                : row?.cell?.value}
            </div>
          </div>
        );
      },
    },
    {
      Header: "Email",
      accessor: "email",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Start Date",
      accessor: "startDate",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "End Date",
      accessor: "endDate",
      Cell: (row) => {
        return <div>{row?.cell?.value}</div>;
      },
    },
    {
      Header: "assignee",
      accessor: "assignee",
      Cell: (row) => {
        return (
          <div>
            <div className="flex justify-end sm:justify-start lg:justify-end xl:justify-start -space-x-1 rtl:space-x-reverse">
              {row?.cell?.value.map((user, userIndex) => (
                <div
                  className="h-6 w-6 rounded-full ring-1 ring-slate-100"
                  key={userIndex}
                >
                  <img
                    src={user.image}
                    alt={user.label}
                    className="w-full h-full rounded-full"
                  />
                </div>
              ))}
              <div className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-300 text-xs ring-2 ring-slate-100 dark:ring-slate-700 rounded-full h-6 w-6 flex flex-col justify-center items-center">
                +2
              </div>
            </div>
          </div>
        );
      },
    },
    {
      Header: "Status",
      accessor: "progress",
      Cell: (row) => {
        return (
          <span className="min-w-[220px] block">
            <ProgressBar value={row?.cell?.value} className="bg-primary-500" />
            <span className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1 font-medium mt-3">
              12/15 Task Completed
            </span>
          </span>
        );
      },
    },

    {
      Header: "action",
      accessor: "action",
      Cell: (row) => {
        return (
          <div>
            <Dropdown
              classMenuItems="right-0 w-[140px] top-[110%] "
              label={
                <span className="text-xl text-center block w-full">
                  <Icon icon="heroicons-outline:dots-vertical" />
                </span>
              }
            >
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {actions.map((item, i) => (
                  <Menu.Item
                    key={i}
                    onClick={() => item.doit(row?.row?.original)}
                  >
                    <div
                      className={`
                
                  ${
                    item.name === "delete"
                      ? "bg-danger-500 text-danger-500 bg-opacity-30   hover:bg-opacity-100 hover:text-white"
                      : "hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50"
                  }
                   w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer 
                   first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse `}
                    >
                      <span className="text-base">
                        <Icon icon={item.icon} />
                      </span>
                      <span>{item.name}</span>
                    </div>
                  </Menu.Item>
                ))}
              </div>
            </Dropdown>
          </div>
        );
      },
    },
  ];
  const actions = [
    {
      name: "view",
      icon: "heroicons-outline:eye",
      doit: (item) => router.push(`/projects/${item.id}`),
    },
    {
      name: "edit",
      icon: "heroicons:pencil-square",
      doit: (item) => dispatch(updateProject(item)),
    },
    {
      name: "delete",
      icon: "heroicons-outline:trash",
      doit: (item) => dispatch(removeProject(item.id)),
    },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => projects, [projects]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },

    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    setGlobalFilter,
    prepareRow,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;
  return (
    <>
      <Card noborder>
        <div className="md:flex justify-between items-center mb-6">
          <h4 className="card-title">Employee List</h4>
        </div>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table
                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                {...getTableProps}
              >
                <thead className=" bg-slate-100 dark:bg-slate-700">
                  {headerGroups.map((headerGroup) => (
                    <tr
                      {...headerGroup.getHeaderGroupProps()}
                      key={`ex-tr-${headerGroup.id}`}
                    >
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          key={`ex-th-${column.id}`}
                          scope="col"
                          className=" table-th "
                        >
                          {column.render("Header")}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? " 🔽"
                                : " 🔼"
                              : ""}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                  {...getTableBodyProps}
                >
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr
                        key={`ex-tr2-${row.id}`}
                        {...row.getRowProps()}
                        className=" even:bg-slate-100 dark:even:bg-slate-700"
                      >
                        {row.cells.map((cell) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className="table-td"
                              key={`ex-td-${cell.column.id}`}
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default ProjectList;
