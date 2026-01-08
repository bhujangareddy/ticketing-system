import { Button, Space, Table, Tag, Empty, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import EditTicketModal from "../components/EditTicketModal";
// import TaskCard from "../components/TaskCard";
// import { useMediaQuery } from "react-responsive";
import { fetchTasks } from "../features/ticket/TicketSlice";
// import { showDeleteConfirm } from "../utils/delete";

const TicketScreen = () => {
  const role = useSelector((state) => state.Auth.user.role);
  const email = useSelector((state) => state.Auth.user.email);
  const { tasks, loading, error } = useSelector((state) => state.Tickets);
//   const isMobile = useMediaQuery({ maxWidth: 768 });
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) =>
        role === "admin" ? (
          <Link to={`/tasks/${record.id}`}>{text}</Link>
        ) : (
          <span>{text}</span>
        ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Category", // changed the table title from Type to Category
      dataIndex: "type",
      key: "type",
      render: (_, { type }) => {
        const types = Array.isArray(type)
          ? type
          : typeof type === "string"
          ? type.split(",")
          : [];

        return (
          <>
            {types.map((t) => {
              let color = "";
              switch (t.trim()) { 
                case "Bug":
                  color = "red";
                  break;
                case "Task":
                  color = "blue";
                  break;
                case "Backend":
                  color = "purple";
                  break;
                case "Frontend":
                  color = "green";
                  break;
                case "Database":
                  color = "orange";
                  break;
                case "Testing":
                  color = "cyan";
                  break;
                default:
                  color = "grey";
              }
              return (
                <Tag color={color} key={t}>
                  {t}
                </Tag>
              );
            })}
          </>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
    },
    ...(role === "admin"
      ? [
          {
            title: "Assignee",
            dataIndex: "assignee",
            key: "assignee",
            render: (assignee) => assignee?.name || "—",
          },
        ]
      : []
    ),
    ...(role === "user"
      ? [
        {
          title: "Reporter",
          dataIndex: "reporter",
          key: "reporter",
          render: (reporter) => reporter?.name || "—",
        },
      ]
      : []
    ),
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
    },
    ...(role === "admin"
      ? [
          {
            title: "Action",
            key: "action",
            render: (_, record) => (
              <Space size="middle">
                <Button onClick={() => showDrawer(record)} type="primary">
                  Edit
                </Button>
                <Button
                  color="danger"
                  variant="solid"
                  onClick={() => showDeleteConfirm(record, dispatch)}
                >
                  Delete
                </Button>
              </Space>
            ),
          },
        ]
      : []),
  ];

  // Fetch tasks using Redux thunk
//   useEffect(() => {
//     if (email) {
//     //   dispatch(fetchTasks(email));
//     }
//   }, [email, dispatch]);

//   if (loading) return <div>Loading tasks...</div>;
//   if (error) return <div>Error: {error}</div>;

  const showDrawer = (record) => {
    setSelectedTask(record);
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <>
        {tasks.length > 0 ?
        <div className="m-4 text-center">
          <h1 className="text-xl font-semibold my-2">
            Welcome to Task Manager
          </h1>
          <p className="mb-4">
            Stay organized, stay productive — manage your tasks effortlessly
            with Task Manager
          </p>

          <Table columns={columns} dataSource={tasks} rowKey="id" />

          <Drawer
            title="Edit Task"
            width={500}
            open={open}
            onClose={closeDrawer}
            footer={null}
            destroyOnHidden
          >
            {selectedTask && (
              <EditTicketModal selectedTask={selectedTask} setOpen={setOpen} />
            )}
          </Drawer>
        </div> : <div className="text-2xl text-green-400">No Tickets Added Yet</div>}
    </>
  );
};

export default TicketScreen;
